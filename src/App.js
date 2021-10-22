import './App.css';
import { FaceMesh } from "@mediapipe/face_mesh";
import * as Facemesh from "@mediapipe/face_mesh";
import * as cam from "@mediapipe/camera_utils";
import Webcam from "react-webcam";
import {useRef, useEffect} from 'react';
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Paper, Typography, Grid } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Header from './Header';


function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            QReal MediaPipe FaceMesh Demo
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {

  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  var camera = null;
  const connect = window.drawConnectors;

  function onResults(results){

    //Setting height and width of canvas
    canvasRef.current.width = webcamRef.current.video.videoWidth;
    canvasRef.current.height = webcamRef.current.video.videoHeight;

    const canvasElement = canvasRef.current;
    const canvasCtx = canvasElement.getContext("2d");
    canvasCtx.save();

    canvasCtx.clearRect(0,0,canvasElement.width,canvasElement.height);
    canvasCtx.drawImage(results.image,0,0,canvasElement.width,canvasElement.height);

    if(results.multiFaceLandmarks){
      for (const landmarks of results.multiFaceLandmarks) {
        connect(canvasCtx, landmarks, Facemesh.FACEMESH_TESSELATION,
                       {color: '#C0C0C070', lineWidth: 1});
        connect(canvasCtx, landmarks, Facemesh.FACEMESH_RIGHT_EYE, {color: '#30FF30', lineWidth: 1});
        connect(canvasCtx, landmarks, Facemesh.FACEMESH_RIGHT_EYEBROW, {color: '#30FF30', lineWidth: 1});
        connect(canvasCtx, landmarks, Facemesh.FACEMESH_RIGHT_IRIS, {color: '#30FF30', lineWidth: 1});
        connect(canvasCtx, landmarks, Facemesh.FACEMESH_LEFT_EYE, {color: '#30FF30', lineWidth: 1});
        connect(canvasCtx, landmarks, Facemesh.FACEMESH_LEFT_EYEBROW, {color: '#30FF30', lineWidth: 1});
        connect(canvasCtx, landmarks, Facemesh.FACEMESH_LEFT_IRIS, {color: '#30FF30', lineWidth: 1});
        connect(canvasCtx, landmarks, Facemesh.FACEMESH_FACE_OVAL, {color: '#E0E0E0', lineWidth: 1});
        connect(canvasCtx, landmarks, Facemesh.FACEMESH_LIPS, {color: '#FF3030', lineWidth: 1});
      }
    }
  }

  useEffect(() => {
    const faceMesh = new FaceMesh({
      locateFile:(file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`;
      }
    });

    faceMesh.setOptions({
      maxNumFaces: 1,
      refineLandmarks: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5
    });
  
    faceMesh.onResults(onResults);
  
    if(typeof webcamRef.current!=="undefined" && webcamRef.current!==null){
      camera = new cam.Camera(webcamRef.current.video,{
        onFrame:async()=>{
          await faceMesh.send({image: webcamRef.current.video});
        },
      });
      camera.start();
    }
  }, []);

  return (
      <ThemeProvider theme={darkTheme}>
        <Grid container direction="column">
          <Grid item xs={12}>
            <Header/>
          </Grid>
          <Grid item container style={{margin:"1rem"}}>
            <Grid item xs={0} sm={2} md={3} lg={3} xl={4}></Grid>
            <Grid item xs={12} sm={8} md={6} lg={6} xl={4}>
                <Webcam hidden ref={webcamRef} style={{zIndex:9}}/>
                <canvas className="responsive-canvas" ref={canvasRef} style={{zIndex:9}}>
                </canvas>
            </Grid>
            <Grid item xs={0} sm={2} md={3} lg={3} xl={4}></Grid>
          </Grid>
      </Grid>
      </ThemeProvider>
  );
}

export default App;

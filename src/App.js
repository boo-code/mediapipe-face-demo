import './App.css';
import { FaceMesh } from "@mediapipe/face_mesh";
import * as Facemesh from "@mediapipe/face_mesh";
import * as cam from "@mediapipe/camera_utils";
import Webcam from "react-webcam";
import {useRef, useEffect} from 'react';
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Grid } from '@mui/material';
import Header from './Header';
import { Canvas, useFrame } from "@react-three/fiber";
import { useLoader } from "@react-three/fiber";
import { Suspense } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "@react-three/drei";

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const Lights = () => {
  return (
      <>
          <ambientLight intensity={0.4} />
          <directionalLight 
              castShadow 
              position={-8, 16, -8}
              intensity={0}
              shadow-mapSize-width={1024}
              shadow-mapSize-height={1024}
              shadow-camera-far={50}
              shadow-camera-left={-10}
              shadow-camera-right={10}
              shadow-camera-top={10}
              shadow-camera-bottom={-10} />
          <pointLight position={[0,50,0]} intensity={2} />
      </>
  )
}

function Model(props) {
  const gltf = useLoader(GLTFLoader, "https://3dfoodmodel-modelviewer.s3.amazonaws.com/assets/Bolle/Nevada_Blue/BolleNevada_Blue_v1.glb");
  //console.log(gltf);
  const ref = useRef();
  const ref1 = useRef();
  useFrame((state, delta) => {
    ref.current.position.x = (landmark_x - 0.5)*10;
    ref.current.position.y = -(landmark_y - 0.5)*7.5;
    ref.current.position.z = -(landmark_z);
    ref.current.scale.x = scale_x*100;
    ref.current.scale.y = scale_x*100;
    ref.current.scale.z = scale_x*100;
    //ref.current.rotation.y += 0.001;
    //console.log(ref.current);
  });
  return (
    <>
      <primitive {...props} ref={ref} object={gltf.scene} scale={18}></primitive>
    </>
  );
}

var landmark_x = 0;
var landmark_y = 0;
var landmark_z = 0;
var scale_x = 0;
var scale_y = 0;

function App() {

  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  var camera = null;
  const connect = window.drawConnectors;

  function onResults(results){
    //console.log(Facemesh.FACEMESH_RIGHT_EYE);

    if(results.multiFaceLandmarks){
      for (const landmarks of results.multiFaceLandmarks) {
        if(landmarks[0].x !== undefined){
          landmark_x = landmarks[168].x;
          landmark_y = landmarks[168].y;
          landmark_z = landmarks[168].z;
          scale_x = landmarks[265].x - landmarks[35].x;
          scale_y = landmarks[446].y - landmarks[226].y;
        }
      }
      //console.log("x coordinate: " + landmark_x);
      //console.log("y coordinate: " + landmark_y);
      //console.log("z coordinate: " + landmark_z);
      //console.log(scale_x);
      //console.log(landmark_z);
    }

    //Setting height and width of canvas
    canvasRef.current.width = webcamRef.current.video.videoWidth;
    canvasRef.current.height = webcamRef.current.video.videoHeight;

    const canvasElement = canvasRef.current;
    const canvasCtx = canvasElement.getContext("2d");
    canvasCtx.save();

    canvasCtx.clearRect(0,0,canvasElement.width,canvasElement.height);
    canvasCtx.drawImage(results.image,0,0,canvasElement.width,canvasElement.height);

    //console.log(Facemesh.FACEMESH_FACE_OVAL);

    if(results.multiFaceLandmarks){
      for (const landmarks of results.multiFaceLandmarks) {
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
      minTrackingConfidence: 0.5,
      selfieMode: true,
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

  //landmarks_test[1],landmarks_test[2],landmarks_test[3]

  return (
      <ThemeProvider theme={darkTheme}>
        <Grid container direction="column">
          <Grid item xs={12}>
            <Header/>
          </Grid>
          <Grid item container style={{margin:"1rem"}}>
            <Grid item xs={0} sm={2} md={3} lg={3} xl={4}>
            
            </Grid>
            <Grid item xs={12} sm={8} md={6} lg={6} xl={4}>
                  <div className='outer-div'>
                    <Webcam ref={webcamRef} className="webcam-wrapper" mirrored={true}/>
                    <canvas hidden className="responsive-canvas" ref={canvasRef} style={{zIndex:9}}>
                    </canvas>
                    <Canvas className="canvas-wrapper">
                    <Lights/>
                      <Suspense fallback={null}>
                        <Model position={[0,0,-3]}/>
                        <OrbitControls />
                      </Suspense>
                    </Canvas>
                  </div>

            </Grid>
            <Grid item xs={0} sm={2} md={3} lg={3} xl={4}>
            </Grid>
          </Grid>
      </Grid>
      </ThemeProvider>
  );
}

export default App;

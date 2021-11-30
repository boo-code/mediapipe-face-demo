# Web Based Virtual Sunglasses Try-on Demo

This project aims to create Real-time Web based Virtual Sunglasses Try-on experiences.

It is built with [React](https://github.com/facebook/react), using [MediaPipe](https://github.com/google/mediapipe), [ThreeJS - react-three/fiber](https://github.com/pmndrs/react-three-fiber) and [react-webcam](https://github.com/mozmorris/react-webcam).\
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Demo

[Sunglasses Try-on Demo](https://master.d3ff7g3p8c7frc.amplifyapp.com/)

Try on Desktop and Mobile browsers to check the performance differences.

## Under the Hood

This demo app currently captures a video stream via [react-webcam](https://github.com/mozmorris/react-webcam), feeds the stream into [MediaPipe FaceMesh](https://google.github.io/mediapipe/solutions/face_mesh.html) which tracks 468 3D face landmarks in real-time, which then provides real-time locations to [ThreeJS - react-three/fiber](https://github.com/pmndrs/react-three-fiber) render the 3D object accordingly.

![468 face landmark](https://developers.google.com/ar/images/augmented-faces/augmented-faces-468-point-face-mesh.png)

## Limitations

- Unlike [MediaPipe Hands](https://google.github.io/mediapipe/solutions/hands.html), [MediaPipe FaceMesh](https://google.github.io/mediapipe/solutions/face_mesh.html) performs well (+20fps) both desktop and mobile browsers. Currently, no limitations have been discovered.
Check [Performance Characteristics](https://blog.tensorflow.org/2020/03/face-and-hand-tracking-in-browser-with-mediapipe-and-tensorflowjs.html)

## Work in Progress (WIP)

- The 3D model currently currently tracks the landmark location between the eyes, but 3D object rotations and scaling are WIP.
- GLTFLoader has a problem loading 3D objects from the public folder. We believe it is related to headers. It is currently WIP.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

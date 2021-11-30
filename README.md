# Web Based Virtual Sunglasses Try-on Demo

This project aims to create Real-time Web based Virtual Jewelery Try-on experiences.

It is built with [React](https://github.com/facebook/react), using [MediaPipe](https://github.com/google/mediapipe), [ThreeJS - react-three/fiber](https://github.com/pmndrs/react-three-fiber) and [react-webcam](https://github.com/mozmorris/react-webcam).\
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Demo

Try on Desktop and Mobile browsers to check the performance differences.

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

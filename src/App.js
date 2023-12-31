import React, { useRef } from 'react';
import './App.css';
import { Canvas } from '@react-three/fiber';
import Experience from './components/Experience';
import { CameraControls } from '@react-three/drei';

const DEG45 = Math.PI / 4;

function App() {

  const cameraControlRef = useRef();

  return (
    <>
    <Canvas
      shadows
      camera={{
        fov: 64,
        position: [5, 2.5, 2.3],
      }}
      
    >
      <CameraControls ref={cameraControlRef} />
      <Experience />
    </Canvas>
    <button
					type="button"
					onClick={() => {
						cameraControlRef.current?.rotate(DEG45, 0, true);
					}}
				>
					rotate theta 45deg
				</button>
        <button
					type="button"
					onClick={() => {
						cameraControlRef.current?.position(DEG45, 0, true);
					}}
				>
					position
				</button>
    </>
  );
}

export default App;

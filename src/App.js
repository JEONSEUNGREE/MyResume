import React, { useState, useCallback, Suspense } from 'react';
import './App.css';
import { Canvas } from '@react-three/fiber';
import LightModel from './components/LightModel';
import StaticModel from './components/StaticModel';
import CameraModel from './components/CameraModel';
import LoadingPage from './components/LoadingPage'

function App() {

  const [onRoom, setOnRoom] = useState(true);
  const [onMonitor, setOnMonitor] = useState(false);
  const [onTV, setOnTV] = useState(false);
  const [onAlbum, setOnAlbum] = useState(false);
  const [onLight, setOnLight] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const focusRoom = useCallback(() => {
    setOnRoom(true);
    setOnTV(false);
    setOnMonitor(false);
    setOnAlbum(false);
  }, []);

  const focusMonitor = useCallback(() => {
    setOnMonitor(true);
    setOnTV(false);
    setOnRoom(false);
    setOnAlbum(false);
  }, []);

  const focusTv = useCallback(() => {
    setOnTV(true);
    setOnMonitor(false);
    setOnRoom(false);
    setOnAlbum(false);
  }, []);

  const focusAlbum = useCallback(() => {
    setOnAlbum(true)
    setOnTV(false);
    setOnMonitor(false);
    setOnRoom(false);
  }, []);

  const turnOnLight = useCallback(() => {
    setOnLight(prev => !prev);
  }, []);

  return (
    <>
        <Canvas
          shadows
        >
          {/* <Suspense fallback={<LoadingPage setIsLoading={setIsLoading}/>}> */}
          {/* <CameraModel onMonitor={onMonitor} onTv={onTV} onRoom={onRoom} onAlbum={onAlbum} /> */}
          <LightModel onLight={onLight} />
          <pointLight position={[50, 50, 50]} />
          
          {/* <StaticModel/> */}
          {/* </Suspense> */}
        </Canvas>
        {!isLoading && (
          <div className='wrapper'>
            <a onClick={focusMonitor}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Monitor
            </a>
            <a onClick={focusTv}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              TV
            </a>
            <a onClick={focusRoom}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Room
            </a>
            <a onClick={turnOnLight}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Light
            </a>
            <a onClick={focusAlbum}>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              About
            </a>
          </div>
        )}
    </>
  );
}

export default App;

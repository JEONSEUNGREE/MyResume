import React, { useRef, useEffect, useState } from 'react'
import { useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei'
import { Room } from './Room';

export default function LightModel({ onLight }) {

  const sun = useRef();

  const light = useRef()

  const sofa = useRef()

  const monitorAround = useRef()

  const album = useRef()

  const monitorBack = useRef()

  const monitorFront = useRef()

  const [color, setColor] = useState('#f5cd8e');

  const [mColor, setMColor] = useState('#f5cd8e');

  const [roomLight, setRoomLight] = useState(false);

  const { scene } = useThree();

  useEffect(() => {
    setRoomLight(onLight)
    scene.add(monitorAround.current.target)
    scene.add(album.current.target)
    scene.add(monitorBack.current.target)
    scene.add(monitorFront.current.target)
    return() => {
      scene.remove(monitorAround.current.target)
      scene.remove(album.current.target)
      scene.remove(monitorBack.current.target)
      scene.remove(monitorFront.current.target)
    }
  }, [onLight])

  return (
    <>
      <directionalLight 
        name="sun" 
        ref={sun} 
        intensity={1} 
        color={"#f5b042"} 
        decay={2} 
        position={[12.707, 27.601, 9.271]} 
        rotation={[-1.415, 0.202, 2.506]} 
        visible={roomLight}
      />

      <directionalLight 
        name='light' 
        ref={light} 
        color={"#ffffff"} 
        intensity={2} 
        position={[15, 27, 15]} 
        visible={roomLight}
      />

      <spotLight 
        name='monitorAround' 
        ref={monitorAround} 
        color={color} 
        intensity={20} 
        position={[7, 9, -8.12]} 
        target-position={[6, 0, 5]}
        distance={10}
      />

      <spotLight 
        name='album' 
        ref={album} 
        color={"#f5cd8e"} 
        intensity={50} 
        position={[-5.8, 12.5, -6.2]} 
        target-position={[-7,-70,2]}
        distance={4.4}
        penumbra={1.4}
      />

      <spotLight 
        name='monitorBack' 
        ref={monitorBack} 
        color={"#f5cd8e"} 
        intensity={5} 
        position={[-8.4, 7.2, -1]} 
        target-position={[-180,30,0]}
        angle={80}
        penumbra={1.3}
      />

      <spotLight 
        name='monitorFront' 
        ref={monitorFront} 
        color={mColor} 
        intensity={8} 
        position={[-8.2, 7.2, -0.5]} 
        target-position={[90,-120,0]}
        angle={80}
        penumbra={1.3}
      />

      <pointLight 
        name='sofa' 
        ref={sofa} 
        color={'#f2d6aa'} 
        intensity={25} 
        position={[7, 8, 0]} 
      />

      <OrbitControls 
        autoRotateSpeed={1}
        position={1}
      />
      {/* <Room /> */}
    </>
  )
}

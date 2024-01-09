import { useRef, useEffect } from "react";
import { useThree, useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader } from 'three'
import * as THREE from 'three';

export default function StaticModel() {
  const meshRef = useRef();
  const macBookRef = useRef();
  const leftMonitorRef = useRef();
  const rightMonitorRef = useRef();

  const leftAlbumRef = useRef();
  const rightAlbumRef = useRef();

  const phoneRef = useRef();

  const videoRef = useRef()

  const { camera } = useThree();

  const leftAlbum = useLoader(TextureLoader, './img/leftAlbum.png')

  const rightAlbum = useLoader(TextureLoader, './img/rightAlbum.png')

  useEffect(() => {

    createVideo('./videos/tv.mov', meshRef);

    createVideo('./videos/macbook.webm', macBookRef);

    createVideo('./videos/leftMonitor.webm', leftMonitorRef);

    createVideo('./videos/rightMonitor.webm', rightMonitorRef);

    createVideo('./videos/phone.webm', phoneRef);

  }, []);

  function createVideo(src, valRef) {
    const video = document.createElement('video');
    video.src = src;
    video.load();
    video.muted = true;
    video.loop = true; 
    video.play();

    const videoTexture = new THREE.VideoTexture(video);
    const material = new THREE.MeshBasicMaterial({map: videoTexture});
    valRef.current.material = material;

    videoRef.current = video;
  }

  useFrame(() => {
    const leftAlbumCalc = camera.position.distanceTo(rightAlbumRef.current.position);
    const rightAlbumCalc = camera.position.distanceTo(leftAlbumRef.current.position);
    
    // 카메라가 Text3D와의 거리가 10 이하일 때만 Text3D가 보이도록 설정
    leftAlbumRef.current.visible = leftAlbumCalc <= 6;
    rightAlbumRef.current.visible = rightAlbumCalc <= 7;

  });
  
  return (
    <>
        <mesh ref={meshRef} position={[6.5, 9.65, -8.15]} rotation={[ Math.PI / 38, -0, 0]}>
          <planeGeometry attach="geometry" args={[11.3, 5]}/>
          <meshBasicMaterial attach="material" />
        </mesh>

        <mesh ref={macBookRef} position={[-8.04, 6.31, 3.87]} rotation={[- Math.PI / 2, Math.PI / 2.15, Math.PI / 2]}>
          <planeGeometry attach="geometry" args={[1.94, 1.24]}/>
          <meshBasicMaterial attach="material" />
        </mesh>

        <mesh ref={leftMonitorRef} position={[-8.29, 6.95, 0.18]} rotation={[- Math.PI / 2, Math.PI / 2, Math.PI / 2]}>
          <planeGeometry attach="geometry" args={[4.80, 2]}/>
          <meshBasicMaterial attach="material" />
        </mesh>

        <mesh ref={rightMonitorRef} position={[-8.328, 7.2, -3.5]} rotation={[- Math.PI / 2, Math.PI / 2, Math.PI / 2]}>
          <planeGeometry attach="geometry" args={[2.13, 3.8]}/>
          <meshBasicMaterial attach="material"/>
        </mesh>

        <mesh ref={phoneRef} position={[-7.3259, 5.65, -4.94]} rotation={[ Math.PI * - 45 / 180, Math.PI *  46.5 / 180 , Math.PI *  38 / 180]}>
          <planeGeometry attach="geometry" args={[0.5, 0.9]}/>
          <meshBasicMaterial attach="material" />
        </mesh>

        <mesh ref={leftAlbumRef} position={[-7.269, 10.28, -6.79]} rotation={[0, 0, 0]}>
          <planeGeometry attach="geometry" args={[2.3, 3.1]}/>
          <meshBasicMaterial attach="material" map={leftAlbum} />
        </mesh>


        <mesh ref={rightAlbumRef} position={[-4.64, 10.28, -6.79]} rotation={[0, 0, 0]}>
          <planeGeometry attach="geometry" args={[1.9, 2.6]}/>
          <meshBasicMaterial attach="material" map={rightAlbum} />
        </mesh>
    </>
  );
}

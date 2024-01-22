import { useRef, useEffect, useState } from "react";
import { useThree, useFrame, useLoader } from "@react-three/fiber";
import { Text3D, MeshWobbleMaterial } from "@react-three/drei";
import { TextureLoader } from 'three'
import * as THREE from 'three';
import { useSpring, a } from '@react-spring/three';

export default function StaticModel() {
  const meshRef = useRef();

  const macBookRef = useRef();

  const leftMonitorRef = useRef();

  const rightMonitorRef = useRef();

  const leftAlbumRef = useRef();

  const rightAlbumRef = useRef();

  const textRef = useRef();

  const innertextRef = useRef();

  const phoneRef = useRef();

  const videoRef = useRef()

  const gitHubLink = 'https://github.com/JEONSEUNGREE';

  const blogLink = 'https://heehee-myblog.tistory.com';

  const notionLink = 'https://thoughtful-humerus-65b.notion.site/fbc0316c923e4eafa18fce457ab109ea?pvs=4'

  const { camera } = useThree();

  const leftAlbum = useLoader(TextureLoader, './img/leftAlbum.png')

  const rightAlbum = useLoader(TextureLoader, './img/rightAlbum.jpg')

  useEffect(() => {

    createVideo('./videos/tv.mov', meshRef);

    createVideo('./videos/macbook.mp4', macBookRef);

    createVideo('./videos/leftMonitor.mp4', leftMonitorRef);

    createVideo('./videos/rightMonitor.mp4', rightMonitorRef);

    createVideo('./videos/phone.mp4', phoneRef);

  }, []);

  const { width: w, height: h } = useThree((state) => state.viewport);

  function createVideo(src, valRef) {
    const video = document.createElement('video');
    video.src = src;
    video.load();
    video.muted = true;
    video.setAttribute('playsinline', '');
    video.loop = true; 
    video.play();

    const videoTexture = new THREE.VideoTexture(video);
    const material = new THREE.MeshBasicMaterial({map: videoTexture});
    valRef.current.material = material;

    videoRef.current = video;
  }

  useFrame(() => {
    const leftAlbumCalc = camera.position.distanceTo(leftAlbumRef.current.position);
    const rightAlbumCalc = camera.position.distanceTo(rightAlbumRef.current.position);
    const textRefCalc = camera.position.distanceTo(textRef.current.position);
    
    // 카메라가 Text3D와의 거리가 8 이하일 때만 Text3D가 보이도록 설정`
    if(leftAlbumCalc <= 8 && rightAlbumCalc <= 8 &&  textRefCalc <= 8) {
      leftAlbumRef.current.visible = true;
      rightAlbumRef.current.visible = true;
      textRef.current.visible = true;
    }else {
      leftAlbumRef.current.visible = false;
      rightAlbumRef.current.visible = false;
      textRef.current.visible = false;
    }
  });

  function clickOpenWindow(url) {
      window.open(url, '_blank');
  }

  function LinkedText({ text, url, position, isPop }) {

    const [hovered, setHovered] = useState(false);
    const props = useSpring({
      scale: hovered ? [1.1, 1.1, 1.1] : [1, 1, 1],
    });
  
    return (
      !isPop ?
      <a.mesh
        scale={props.scale}
        onClick={() => clickOpenWindow(url)}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <Text3D
          position={position}
          ref={innertextRef}
          rotation={[0, 0, 0]}
          scale={[0.9,0.9,0.9]}
          font={"./font/KNU_TRUTH_TTF_Regular.json"}
          height={0}
          lineHeight={1}
          letterSpacing={0}
          size={0.1}
          bevelEnabled
          bevelSize={0.005}
          bevelThickness={0.005}
          maxWidth={[-w / 10, -h * 4, 10]}
        >
          {text}
        </Text3D>
      </a.mesh>
      : 
        (
          <Text3D
            ref={innertextRef}
            position={position}
            rotation={[0, - Math.PI, 0]}
            scale={[-0.25, 0.25, 0.25]}
            font={"./font/KNU_TRUTH_TTF_Regular.json"}
            height={0}
            lineHeight={1}
            letterSpacing={0}
            size={0.3}
            bevelEnabled
            bevelSize={0.005}
            bevelThickness={0.005}
            maxWidth={[-w / 10, -h * 4, 10]}
          >
            {text}
          </Text3D>
        )
    );
  }
  
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
          <planeGeometry attach="geometry" args={[2.25, 3.8]}/>
          <meshBasicMaterial attach="material"/>
        </mesh>

        <mesh ref={phoneRef} position={[-7.3259, 5.65, -4.94]} rotation={[ Math.PI * - 45 / 180, Math.PI *  46.5 / 180 , Math.PI *  38 / 180]}>
          <planeGeometry attach="geometry" args={[0.5, 0.9]}/>
          <meshBasicMaterial attach="material" />
        </mesh>

        <mesh ref={leftAlbumRef} position={[-7.269, 10.28, -6.8]} rotation={[0, 0, 0]} onClick={() => clickOpenWindow(gitHubLink)}>
          <planeGeometry attach="geometry" args={[2.3, 3.1]}/>
          <meshBasicMaterial attach="material" map={leftAlbum} />
        </mesh>


        <mesh ref={rightAlbumRef} position={[-4.64, 10.28, -6.79]} rotation={[0, 0, 0]} onClick={() => clickOpenWindow(notionLink)}>
          <planeGeometry attach="geometry" args={[1.9, 2.6]}/>
          <meshBasicMaterial attach="material" map={rightAlbum} />
        </mesh>

        <mesh ref={textRef} position={[-5.5, 6.4, -6.7]} rotation={[0, 0, 0]}>
          <LinkedText text={`안녕하세요! \n익숙함 보다는 새로운 도전을 좋아하는\n3년차 개발자 입니다\n\n주로 백엔드와 서버에 관심이 많으며,\n개발 공부를 하며 블로그에 학습 내용을\n기록하고 있습니다.\n\n직장에서 풀스택으로 작업이 주를 이루\n지만, 개인적인 시간에는 백엔드 기술과\n서버 관리에 대한 공부를 주로 진행하고\n좋아합니다.\n\n현재 제일 관심있는분야는 AI입니다.`} url="https://tistory.com" position={[0,2.2,0]} isPop={true} /> 
          <LinkedText text="                      |                    |" url="https://tistory.com" position={[0,0.35,0]} isPop={true} /> 
          <LinkedText text="GitHub   " url={gitHubLink} position={[0,0.35,0]} />
          <LinkedText text="Blog  " url={blogLink} position={[0.6,0.35,0]} /> 
          <LinkedText text="Notion" url={notionLink} position={[1.1,0.35,0]} />
        </mesh>
    </>
  );
}

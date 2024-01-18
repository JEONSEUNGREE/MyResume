import { useState, useEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { Vector3 } from 'three';

export default function CameraModel({ onMonitor, onTv, onRoom, onAlbum }) {
  const { camera } = useThree();
  const [focusRoom, setFocusRoom] = useState(false);
  const [focusMonitor, setFocusMonitor] = useState(false);
  const [focusTV, setFocusTV] = useState(false);
  const [foucsAlbum, setFocusAlbum] = useState(false);

  const monitorPos = new Vector3(-3, 8, 0);
  const monitorLookAt = new Vector3(-20, 0, 0);

  const roomPos = new Vector3(20, 20, 10);

  const tvPos = new Vector3(5, 5, 5);
  const tvLookAt = new Vector3(5, 10, -25);

  const albumPos = new Vector3(-6, 10.5, -4);
  const albumLookAt = new Vector3(-7, 9, -50);

  const cameraSpeed = 0.02;

  useEffect(() => {
      setFocusMonitor(onMonitor);
      setFocusTV(onTv);
      setFocusRoom(onRoom);
      setFocusAlbum(onAlbum);
  }, [onMonitor, onTv, onRoom, onAlbum]);
  let direction = 1; // 움직이는 방향: 1이면 정방향, -1이면 반대방향
  let theta = 0; // 원의 각도
  
  useFrame((state) => {

    if(foucsAlbum){
      camera.position.lerp(albumPos, cameraSpeed);
      camera.lookAt(albumLookAt);
    }

    if(focusRoom){
      camera.position.lerp(albumPos, cameraSpeed);
      camera.lookAt(albumLookAt);

      const radius = 500; // 원의 반지름
  
    //   // 원의 각도 계산
      if (theta >= 1.2 * Math.PI/2 && direction === 1) {
        direction = -1; // 반대 방향으로 움직이도록 방향 변경
      } else if (theta <= 0 && direction === -1) {
        direction = 1; // 다시 정방향으로 움직이도록 방향 변경
      }
      theta += direction * 0.01; // 원의 각도 업데이트
  
      // 원의 궤도를 따라 카메라의 위치 계산
      const x = radius * Math.cos(theta) + 1;
      const y = radius * Math.sin(theta) + 1;

      const pos = new Vector3(x , 0 , y - 35);
      const lookAt = new Vector3(-15, -5, -15);
  
      camera.position.lerp(pos, 0.001);
      camera.position.lerp(roomPos, cameraSpeed);
      camera.lookAt(lookAt);
    }

    // 한번더 state를 둔 이유는 useFrame에서 props를 바로 사용하게 되면 false일때 원점을 바라봄
    if (focusMonitor) {
      camera.position.lerp(monitorPos, cameraSpeed);
      camera.lookAt(monitorLookAt);
      camera.position.x = Math.max(-5, Math.min(5, camera.position.x));
      camera.position.y = Math.max(-5, Math.min(10, camera.position.y));
      camera.position.z = Math.max(-5, Math.min(5, camera.position.z));
    }


    if (focusTV) {
      camera.position.lerp(tvPos, cameraSpeed);
      camera.lookAt(tvLookAt);
      camera.position.x = Math.max(-5, Math.min(5, camera.position.x));
      camera.position.y = Math.max(-5, Math.min(10, camera.position.y));
      camera.position.z = Math.max(-5, Math.min(5, camera.position.z));
      if (camera.position.distanceTo(tvPos) < 1) {
        tvPos.x = tvPos.x + 10;
        tvPos.y = tvPos.y + 2;
        tvPos.z = tvPos.z - 5;
        tvLookAt.y = tvLookAt.y + 3;
        tvLookAt.z = tvLookAt.z - 10;
      }
    }
  });

  return null;
}
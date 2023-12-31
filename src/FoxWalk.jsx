import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

export function FoxModel(props) {
  const groupRef = useRef()
  const { nodes, materials } = useGLTF('./models/fox2.glb')

  useFrame(() => {
    console.log("test")
    if (groupRef.current) {
      groupRef.current.position.x += 0.01  // 이 값을 조절하여 속도를 변경할 수 있습니다.
    }
  })


  return (
    <group ref={groupRef} {...props} dispose={null}>
      <group position={[-0.001, 0.583, 0.061]} scale={[1.486, 1.185, 1.325]}>
        <mesh geometry={nodes.Cube009.geometry} material={materials.white} />
        <mesh geometry={nodes.Cube009_1.geometry} material={materials.skin} />
      </group>
      <group position={[-0.001, 0.583, 0.061]} scale={[1.486, 1.185, 1.325]}>
        <mesh geometry={nodes.Cube005.geometry} material={materials.white} />
        <mesh geometry={nodes.Cube005_1.geometry} material={materials.skin} />
        <mesh geometry={nodes.Cube005_2.geometry} material={materials.black} />
        <mesh geometry={nodes.Cube005_3.geometry} material={materials.red} />
      </group>
    </group>
  )
}

useGLTF.preload('./models/fox2.glb')

import React, { useRef, useEffect, useState } from 'react'
import { Text3D, Center, Float, Stars } from '@react-three/drei';
import { useThree } from "@react-three/fiber";
export default function LoadingPage({ setIsLoading }) {

    const [loadPercent, setLoadPercent] = useState("Loading . . .");

    const textRef = useRef();

    useEffect(() => {
        console.log("test")
        return(() => {
            setIsLoading(false);
            alert("test")
        })
    }, []);

    const { width: w, height: h } = useThree((state) => state.viewport);

    return (
        <>
        <ambientLight intensity={0.6} color={"#dee2ff"} />
        <Center scale={[0.5, 0.5, 0.5]}>
          <Float speed={3}>
            <Text3D
                ref={textRef}
                position={[0, 0, -10]}
                rotation={[0, Math.PI / 2 + 180 / 2, 0]}
                scale={[-1, 1, 1]}
                font={"./font/KNU_TRUTH_TTF_Regular.json"}
                height={0.1}
                lineHeight={1}
                letterSpacing={0}
                size={w / 4}
                bevelEnabled
                bevelSize={0.05}
                bevelThickness={0.03}
                maxWidth={[-w / 10, -h * 4, 10]}
            >
            {`${loadPercent}`}
            <meshMatcapMaterial color="white"/>
            </Text3D>
            <Stars
                radius={200}
                depth={100}
                count={6000}
                factor={4}
                saturation={1}
                fade
                speed={10}
            />  
        </Float>
    </Center>
    </>
  )
}

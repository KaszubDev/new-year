import { Center, Text3D } from "@react-three/drei"
import AnimatedChar from "./AnimatedChar";
import TWEEN, { Tween } from '@tweenjs/tween.js'
import { useContext, useEffect, useRef, useState } from "react";
import { MeshStandardMaterial, Vector3 } from "three";
import { useFrame } from "@react-three/fiber";
import CanvasContext from "../CanvasContext";

const fontSrc = "./src/fonts/Anton_Regular.json"

const Text = ({camera, handleOnClick}) => {
    const [isAnimationFirstStep, setIsAnimationFirstStep] = useState(true)
    const [isHovered, setIsHovered] = useState(false)
    const isGlobalAnimationStarted = useContext(CanvasContext)
    const groupRef = useRef(null)

    const textMaterial = new MeshStandardMaterial( { roughness: 0.1, metalness: 1.0, color: '#fff' } )

    const tweenText = new TWEEN.Tween({x: 0, y: 0, z: 0})
    .to({x: 0, y: 0.8, z: 0}, 1000)
    .easing(TWEEN.Easing.Bounce.In)
    .onUpdate((pos) => {
        groupRef.current.position.set(pos.x, pos.y, pos.z)
    })
    .onComplete(() => {
        setIsAnimationFirstStep(false)
    })

    const tweenTextBack = new TWEEN.Tween({x: 0, y: 0.8, z: 0})
    .to({x: 0, y: 0, z: 0}, 1000)
    .easing(TWEEN.Easing.Bounce.Out)
    .onUpdate((pos) => {
        groupRef.current.position.set(pos.x, pos.y, pos.z)
    })
    .onComplete(() => {
        setIsAnimationFirstStep(true)
    })
    tweenText.start()
    tweenTextBack.start()

    useFrame(() => {
    if (tweenText && tweenTextBack && !isGlobalAnimationStarted) {
        if (isAnimationFirstStep) {
            tweenText.update()
        } else {
            tweenTextBack.update()
        }
    }
    })

    useEffect(() => {
    document.body.style.cursor = isHovered ? 'pointer' : 'auto'
    }, [isHovered])

    return (
        <group ref={groupRef} onClick={() => handleOnClick()}>
        <Center>
            <Text3D 
            font={fontSrc}
            size={4}
            bevelEnabled={true}
            bevelSize={0.1}
            bevelThickness={0.3}
            material={textMaterial}
            onPointerOver={() => setIsHovered(true)}
            onPointerOut={() => setIsHovered(false)}
            >
            202
            </Text3D>
            <AnimatedChar material={textMaterial} camera={camera} />
        </Center>
        </group>
    )
}

export default Text;
import { Text3D } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useContext, useEffect, useRef, useState } from "react"
import { Vector3 } from "three"
import TWEEN, { Tween } from '@tweenjs/tween.js'
import CanvasContext from "../CanvasContext"

let tweenNewChar:Tween, tweenOldChar:Tween

const AnimatedChar = ({material}) => {
  const [isHovered, setIsHovered] = useState(false)
  const [animationRun, setAnimationRun] = useState(false)
  const [oldCharVisible, setOldCharVisible] = useState(true)
  const [newCharVisible, setNewCharVisible] = useState(false)
  const refOld = useRef(null)
  const refNew = useRef(null)
  const fontSrc = "./src/fonts/Anton_Regular.json"
  const isGlobalAnimationStarted = useContext(CanvasContext)

  useEffect(() => {
    document.body.style.cursor = isHovered ? 'pointer' : 'auto'
  }, [isHovered])
  
if (refOld.current && refNew.current) {
  tweenOldChar = new TWEEN.Tween(refOld.current.position)
      .to(new Vector3(0, -20, -100), 1000)
      .easing(TWEEN.Easing.Quadratic.InOut)
      .onUpdate()
      .onComplete(() => {
        setOldCharVisible(false)
        refNew.current.position.set(0, 20, 40)
        setNewCharVisible(true)
      })

    tweenNewChar = new TWEEN.Tween(refNew.current.position)
      .to(new Vector3(8.4, 0, 0), 3000)
      .easing(TWEEN.Easing.Bounce.InOut)
      .onUpdate()
      .onComplete(() => {
        setAnimationRun(false)
      })

  tweenOldChar.start()
  tweenNewChar.start()
}

  useEffect(() => {
    if (isGlobalAnimationStarted) {
      setAnimationRun(true)
    }
  }, [isGlobalAnimationStarted])

  useFrame(() => {
    if (refOld.current && oldCharVisible && animationRun) {
      tweenOldChar.update()
    }
    if (refNew.current && newCharVisible && animationRun) {
      tweenNewChar.update()
    }
  })

  return (
    <>
        <Text3D ref={refOld}
            font={fontSrc} 
            size={4}
            bevelEnabled={true}
            bevelSize={0.1}
            bevelThickness={0.15}
            name="rotating-char"
            position={[8.4, 0, 0]}
            onPointerOver={() => setIsHovered(true)}
            onPointerOut={() => setIsHovered(false)}
            visible={oldCharVisible}
            material={material}>
            4
        </Text3D>
        <Text3D ref={refNew}
            font={fontSrc} 
            size={4}
            bevelEnabled={true}
            bevelSize={0.1}
            bevelThickness={0.15}
            name="rotating-char"
            position={[8.4, 0, 0]}
            onPointerOver={() => setIsHovered(true)}
            onPointerOut={() => setIsHovered(false)}
            visible={newCharVisible}
            material={material}>
            5
        </Text3D>
    </>
  )
}

export default AnimatedChar
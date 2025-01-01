import { useCallback, memo, useEffect } from 'react'
import { Color, Vector3 } from 'three'
import { Html } from '@react-three/drei'
import useLaunchFireworks from '../../../hooks/useLaunchFireworks'

function ControlPanel({ setFireworks, textures }) {
  const fireworksStarter = useLaunchFireworks({
    setFireworks, 
    textures
  })

  const handleClick = () => {
    fireworksStarter.launchFirework()
  }

  const handlePointerOver = (e) => {
    document.body.style.cursor = 'pointer'
  }

  const handlePointerOut = (e) => {
    document.body.style.cursor = 'auto'
  }

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'f') {
        handleClick() // Ejecutar la misma acción que el click
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    // Cleanup al desmontar el componente
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleClick])

  return (
    <>
      {/* <Html position={[0, 0, -2]} rotation={[0, 0, 0]} center transform style={{ color: 'white', fontSize: '1.5em', userSelect: 'none' }}>
        FIREWORKS
      </Html>
      <mesh
        position={[0, -0.4, 0]} rotation={[-Math.PI / 2, 0, 0]} onClick={handleClick} onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        <planeGeometry args={[5, 1.4]} />
        <meshBasicMaterial color='#FF9900' />
      </mesh> */}
    </>
  )
}

const MemoizedControlPanel = memo(ControlPanel)

export default MemoizedControlPanel

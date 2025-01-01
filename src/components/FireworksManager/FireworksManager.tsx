import { useState, useRef, memo, useEffect, useContext } from 'react'
import FireworksRenderer from './FireworksRenderer'
import ControlPanel from './ControlPanel/ControlPanel'
import useTextures from '../../hooks/useTextures'
import useLaunchFireworks from '../../hooks/useLaunchFireworks'
import CanvasContext from '../../CanvasContext'

function FireworksManager({sizes}) {
  const [fireworks, setFireworks] = useState([])
  const textures = useTextures()
  const fireworksStarter = useLaunchFireworks({
    setFireworks, 
    textures
  })
  const isStarted = useContext(CanvasContext)

  const callbacksRef = useRef({})
  const shellCallbacksRef = useRef({})

  const handleComplete = (id) => {
    setFireworks((prev) => prev.filter((fw) => fw.id !== id))
  }

  useEffect(() => {
    isStarted && fireworksStarter.startShow()
  }, [isStarted])
  
  return (
    <group position={[0, -50, -10]}>
      <FireworksRenderer
        fireworks={fireworks}
        sizes={sizes}
        callbacksRef={callbacksRef}
        shellCallbacksRef={shellCallbacksRef}
        handleComplete={handleComplete}

      />
      <ControlPanel setFireworks={setFireworks} textures={textures} />
    </group>
  )
}

const MemoizedFireworksManager = memo(FireworksManager)

export default MemoizedFireworksManager

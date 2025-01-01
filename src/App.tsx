import { useEffect, useRef, useState } from "react"
import { Canvas } from "@react-three/fiber"
import CanvasContext from "./CanvasContext"
import { Loader, OrbitControls } from "@react-three/drei"
import { EquirectangularReflectionMapping, Euler, MeshBasicMaterial, MeshStandardMaterial, PerspectiveCamera, Scene, Vector3 } from "three"
import { RGBELoader } from "three/examples/jsm/Addons.js"
import getWindowSizes from './utils/getWindowsSizes'
import { HalfFloatType } from "three"
import FireworksManager from './components/FireworksManager/FireworksManager'
import { FireworkStation } from "./models/FireworkStation"
import Text from "./components/Text"

const audio = new Audio('./src/assets/music.mp3')
audio.volume = 0.2
audio.loop = true

function App() {
  const loader = new RGBELoader()
	const bgRotation = new Euler( 0, Math.PI/1.3, 0 )
  const sizes = getWindowSizes()
  const [isMusicPlaying, setIsMusicPlaying] = useState(false)
  const [isAnimation, setIsAnimation] = useState(false)
  const [camera, setCamera] = useState(new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000))
  
  loader.setDataType( HalfFloatType )
  let scene = new Scene();

  const loadEnvironment = function () {
    loader.load( './src/assets/shanghai_bund_4k.hdr', function ( texture ) {
      texture.mapping = EquirectangularReflectionMapping;
      texture.needsUpdate = true;
      
      scene.background = texture;
      scene.environment = texture;

      scene.backgroundRotation = bgRotation;
    });
  };

  useEffect(() => {
    loadEnvironment();
    // camera.position.set(0, -15, 40)
    camera.position.set(0, -5, 15)
  }, [])

  const handlePlayMusic = () => {
    if (isMusicPlaying) {
      audio.pause()
      setIsMusicPlaying(false)
    } else {
      audio.play()
      setIsMusicPlaying(true)
    }
  }

  const startAnimationEffects = () => {
    setIsAnimation(true)
    audio.play()
    setIsMusicPlaying(true)
    const interval = setInterval(() => {
        if (audio.volume < 1) {
          const newVolume = Math.min(audio.volume + 0.05, 1)
          audio.volume = newVolume
          return newVolume
        } else {
          clearInterval(interval)
          return audio.volume
        }
    }, 500)
  }

  return (
    <CanvasContext.Provider value={isAnimation}>
      <Canvas camera={camera} scene={scene}>
        <OrbitControls
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 1.5}
          minAzimuthAngle={-Math.PI / 3}
          maxAzimuthAngle={Math.PI / 3}
          maxDistance={20}
        />
        <Text camera={camera} handleOnClick={startAnimationEffects}/>
        <FireworksManager sizes={sizes} />
        <FireworkStation position={[0, -300, -50]} scale={0.1} />
      </Canvas>
      <Loader />
      <div className="music">
        <button className="btn-music" onClick={() => handlePlayMusic()}>
          <div className={`music-icon ${isMusicPlaying && 'play'}`}>
            <span />
            <span />
            <span />
          </div>
        </button>
      </div>
    </CanvasContext.Provider>
  )
}

export default App

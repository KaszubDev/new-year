/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Author: TwinFireworks (https://sketchfab.com/TwinFireworks)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/total-supremacy-e3187296dc3e4348b6b8f545649c5e61
Title: Total Supremacy
*/

import { useGLTF } from '@react-three/drei'

export function FireworkStation(props) {
  const { nodes, materials } = useGLTF('/models/total_supremacy.glb')
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane018_Material057_0.geometry}
        material={materials['Material.057']}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={100}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Circle033_Material057_0.geometry}
        material={materials['Material.057']}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={100}
      />
    </group>
  )
}

useGLTF.preload('/models/total_supremacy.glb')
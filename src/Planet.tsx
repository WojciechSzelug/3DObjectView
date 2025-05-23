/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.5.3 public/Planet/Planet.gltf -t -r public 
*/

import * as THREE from 'three'
import React, { useEffect, useMemo } from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    Sphere: THREE.Mesh
  }
  materials: {}
}

const vertexShader = `
  varying vec2 vUv;
  varying vec3 vNormal;
  
  void main() {
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const fragmentShader = `
  uniform vec4 _color;
  varying vec2 vUv;
  varying vec3 vNormal;
  
  void main() {
    vec3 lightDir = normalize(vec3(1.0, 1.0, 1.0));
    
    // Podstawowe oświetlenie
    float diffuse = max(dot(vNormal, lightDir), 0.0);
    
    // Łączymy kolor z oświetleniem
    vec4 baseColor = _color;
    vec4 finalColor = vec4(baseColor.rgb * (diffuse * 0.7 + 0.3), baseColor.a);
    
    gl_FragColor = finalColor;
  }
`

export function Planet(props: JSX.IntrinsicElements['group'], {color}) {
  const { nodes, materials } = useGLTF('public/Planet/Planet.gltf') as GLTFResult

  const uniforms = useMemo(() => ({
    _color: { value: new THREE.Vector4(1.0, 0.5, 0.0, 1.0) }
  }), [])

  useEffect(() => {
    uniforms._color.value.set(
      255 / 255,
      165 / 255,
      0 / 255,
      100 / 255
    )
  }, [color, uniforms._color])

  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Sphere.geometry} material={nodes.Sphere.material}>
      
      <meshStandardMaterial wireframe={true}/>
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={vertexShader}
        
        fragmentShader={fragmentShader}
        transparent={true}
        wireframe={true}
      />
      </mesh>
    </group>
  )
}

useGLTF.preload('public/Planet/Planet.gltf')

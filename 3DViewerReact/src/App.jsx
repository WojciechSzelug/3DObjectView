// src/App.jsx
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { useMemo, useState, useCallback, useEffect } from 'react'
import ColorControls from './modules/ColorControls'

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

function Box({ color }) {
  const uniforms = useMemo(() => ({
    _color: { value: new THREE.Vector4(1.0, 0.5, 0.0, 1.0) }
  }), [])

  useEffect(() => {
    uniforms._color.value.set(
      color.r / 255,
      color.g / 255,
      color.b / 255,
      color.a / 255
    )
  }, [color, uniforms._color])

  return (
    <mesh>
      <boxGeometry />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent={true}
      />
    </mesh>
  )
}

function App() {
  const [color, setColor] = useState({ r: 255, g: 165, b: 0, a: 255 })

  const handleColorChange = useCallback((component, value) => {
    setColor(prev => ({
      ...prev,
      [component]: value
    }))
  }, [])

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ColorControls onColorChange={handleColorChange} />
      <Canvas>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Box color={color} />
        <OrbitControls />
      </Canvas>
    </div>
  )
}

export default App
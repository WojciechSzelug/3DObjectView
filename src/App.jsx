import { Canvas, useThree } from '@react-three/fiber'
import { OrbitControls, useGLTF, Html } from '@react-three/drei'
import * as THREE from 'three'
import { useMemo, useState, useCallback, useEffect, Suspense } from 'react'
import ColorControls from './modules/ColorControls'
import { Planet } from './Planet'

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
    float diffuse = max(dot(vNormal, lightDir), 0.0);
    vec4 baseColor = _color;
    vec4 finalColor = vec4(baseColor.rgb * (diffuse * 0.7 + 0.3), baseColor.a);
    gl_FragColor = finalColor;
  }
`
class Color {
  constructor(r, g, b, a) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
  }
}

function Control(){
  const{
    camera,
    gl: {domElement},
  } = useThree();

  return <OrbitControls args={[camera,domElement]}/>
}

function ThreeScene(){

  const colorStructure = {
    r: 255,  // Czerwony (0-255)
    g: 165,  // Zielony (0-255)
    b: 0,    // Niebieski (0-255)
    a: 255   // Przezroczystość (0-255)
  }
  const [color, setColor] = useState(colorStructure);

  const handleColorChange = useCallback((component, value) => {
    setColor(prev => ({
      ...prev,
      [component]: value
    }))
  }, [])


  return (
      <Canvas>
        <ambientLight />
        <pointLight position={[5, 5, 5]} intensity ={1} />
        <Control/>
       
        <Planet color={color}/>
      </Canvas>
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
      <ThreeScene/>
    </div>
  )
}

export default App
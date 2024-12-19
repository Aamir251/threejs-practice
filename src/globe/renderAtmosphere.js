import * as THREE from "three"
import vertexShader from "../shaders/globe/atmosphereVertex.glsl"

import fragmentShader from "../shaders/globe/atmosphereFragment.glsl"



export function renderAtmosphere() {
  const geometry = new THREE.SphereGeometry(5, 50, 50)
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      blending : THREE.AdditiveBlending,
      side : THREE.BackSide
    })
  
    const mesh = new THREE.Mesh(geometry, material)
  
  
    return {
      atmosphere : mesh
    }
}
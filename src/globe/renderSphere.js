import * as THREE from "three"
import globeTexture from "../../assets/globe-uv.png"
import vertexShader from "../shaders/globe/vertex.glsl"

import fragmentShader from "../shaders/globe/fragment.glsl";




export function renderSphere() {
  const geometry = new THREE.SphereGeometry(5, 50, 50)
  const material = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms : {
      globeTexture : {
        value : new THREE.TextureLoader().load(globeTexture)
      }
    }
  })

  const mesh = new THREE.Mesh(geometry, material)


  return {
    mesh
  }
}
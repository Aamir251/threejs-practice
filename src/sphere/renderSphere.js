import * as THREE from 'three';
import vertexShader from "../shaders/sphere/vertex.glsl"
import fragmentShader from "../shaders/sphere/fragment.glsl"


export function renderSphere() {

  const material = new THREE.RawShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms : {
      uTime : {
        value : 0
      }
    }
  })


  const geometry = new THREE.SphereGeometry(2, 100)

  const mesh = new THREE.Mesh(geometry, material)


  return {
    sphere : mesh
  }
}
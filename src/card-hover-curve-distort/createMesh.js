import * as THREE from "three"
import vertexShader from "../shaders/card-hover-curve-distort/vertex.glsl"
import fragmentShader from "../shaders/card-hover-curve-distort/fragment.glsl"

export function createMesh(meshSize, meshPositionOffset) {

  const geometry = new THREE.PlaneGeometry(1,1,20,20)

  const material = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
  })


  const mesh = new THREE.Mesh(geometry, material)

  meshSize.set(250, 350)

  mesh.scale.set(meshSize.x, meshSize.y)

  mesh.position.set(meshPositionOffset.x, meshPositionOffset.y, 0)
  

  return mesh
}
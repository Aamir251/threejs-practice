import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as dat from 'dat.gui';
import gsap from 'gsap';
import { addHoverListener, mouseMoveListener } from './utils';
import { createMesh } from './createMesh';
import images from "./images"

const scene = new THREE.Scene()

const container = document.querySelector('main')
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

const cursor = {
  x : undefined,
  y : undefined
}

const uniforms = {
  uTexture : {
    value : new THREE.TextureLoader().load(images.imageThree)
  },

  uAlpha : {
    value : 0.0
  },
  // this should usually range between -0.05 and 0.05 for good curves
  uOffset : {
    value : new THREE.Vector2(0.0, 0.0)
  }
}

let perspective = 1000;

const meshSize = new THREE.Vector2(0, 0)

const meshPositionOffset = new THREE.Vector2(0, 0);

const watcher = {
  linksHover : false
}



const mesh = createMesh(meshSize, meshPositionOffset)
mesh.material.uniforms = {
  ...mesh.material.uniforms,
  ...uniforms

}
console.log(mesh.material.uniforms);

scene.add(mesh)


/**
 * Interactions
*/
mouseMoveListener(cursor)

addHoverListener((newTexture) => {
  uniforms.uTexture.value = newTexture
}, watcher)


// setting up camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.set(0, 0, perspective)
scene.add(camera)

// renderer
const renderer = new THREE.WebGLRenderer({ antialias : true, alpha : true })

container.appendChild(renderer.domElement)

renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))


// orbit controls

// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

// Clock
let time = Date.now()
const tick = () => {

  // time
  const currentTime = Date.now()
  const deltaTime = currentTime - time;


  time = currentTime



  // update orbitol controls
  // controls.update()
  // render
  renderer.render(scene, camera)
  time = currentTime

  window.requestAnimationFrame(tick)
}


// responsive canvas
window.addEventListener('resize', () => {
  // update the sizes variable
  sizes.width = window.innerWidth,
  sizes.height = window.innerHeight

  // update camera
  camera.aspect = sizes.width / sizes.height

  // update the Three JS Projections matrix
  camera.updateProjectionMatrix()
  // update renderer
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})


tick()

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as dat from 'dat.gui';
import gsap from 'gsap';
import cubeTexture from "/images/texture-main.png"
import { renderSphere } from './renderSphere';
import { renderAtmosphere } from './renderAtmosphere';


// Textures
const loadingManager = new THREE.LoadingManager()
const textureLoader = new THREE.TextureLoader(loadingManager)
const texture = textureLoader.load(cubeTexture)



// DAT GUI debugger
const gui = new dat.GUI();


// Three JS Scene

const scene = new THREE.Scene()

const canvas = document.querySelector('.webgl-canvas')
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}


const cursor = {
  x: 0,
  y: 0
}

window.addEventListener('mousemove', (event) => {
  const { clientX, clientY } = event;
  cursor.x = clientX / sizes.width;
  cursor.y = clientY / sizes.height;
})


/**
 * Sphere Mesh
 */

const { mesh: sphereMesh } = renderSphere()

const { atmosphere } = renderAtmosphere()

atmosphere.scale.set(1.2, 1.2, 1.2)

scene.add(sphereMesh)
scene.add(atmosphere)








const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 18
scene.add(camera)

// renderer
const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true
})

renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// animations

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



  sphereMesh.rotation.y += 0.001

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


// full screen immersive exp

window.addEventListener('dblclick', () => {
  // document.webkitFullscreenElement is used for safari as document.fullscreenElement is not supported in safari
  const fullScreenElement = document.fullscreenElement || document.webkitFullscreenElement;

  if (!fullScreenElement) {

    if (canvas.requestFullscreen) {
      canvas.requestFullscreen()
    } else if (canvas.webkitRequestFullscreen) {
      canvas.webkitRequestFullscreen()
    }
  } else {

    if (document.exitFullscreen) {
      document.exitFullscreen()
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen()
    }
  }
})

tick()

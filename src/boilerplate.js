import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as dat from 'dat.gui';
import gsap from 'gsap';


const scene = new THREE.Scene()

const canvas = document.querySelector('.webgl-canvas')
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}




// setting up camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 10
scene.add(camera)

// renderer
const renderer = new THREE.WebGLRenderer({
  canvas
})

renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// animations

// orbit controls

const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// Clock
let time = Date.now()
const tick = () => {

  // time
  const currentTime = Date.now()
  const deltaTime = currentTime - time;


  time = currentTime



  // update orbitol controls
  controls.update()
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

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as dat from 'dat.gui';


import { renderSphere } from './renderSphere';

/**
 * Three JS Scene
*/
const scene = new THREE.Scene()

const canvas = document.querySelector('.webgl-canvas')
const sizes = {
    width : window.innerWidth,
    height : window.innerHeight
}

const gui = new dat.GUI()



/**
 * Render Sphere
*/

const { sphere } = renderSphere()

console.log({ sphere });

scene.add(sphere)



/**
 * Camera
*/
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 5
scene.add(camera)



/**
 * Renderer
*/
const renderer = new THREE.WebGLRenderer({
    canvas
})

renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))


/** 
 * Orbit Controls
*/

const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true




/**
 * Clock (Main function)
*/

const clock = new THREE.Clock()
let time = Date.now()


const tick = () => {

    // time
    const currentTime = Date.now()
    const deltaTime = currentTime - time;

    const elapsedTime = clock.getElapsedTime()


    time = currentTime

    // console.log(elapsedTime);
    
    sphere.material.uniforms.uTime.value = elapsedTime;


    // console.log(sphere.material.uniforms.uTime);
    
    // update orbitol controls
    controls.update()
    // render
    renderer.render(scene, camera)
    time = currentTime

    window.requestAnimationFrame(tick)
}

tick()
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
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'




/** Load Model */

const modelLoader = new GLTFLoader()

modelLoader.load('../models/mushroom/scene.gltf', (model) => {
    scene.add(model.scene)
    console.log("model loaded ")
    // Add the model to the scene
    scene.add(model);

    // Position, rotate, and scale the model as needed
    model.position.set(0, 0, 0);
    model.rotation.set(0, 0, 0);
    model.scale.set(1, 1, 1);

    // 
});




/**
 * Scene Setup
 */
const canvas = document.querySelector('canvas')
const scene = new THREE.Scene;

const sizes = {
    width : canvas.offsetWidth,
    height : canvas.offsetHeight
}

// setting up camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 10
scene.add(camera)

// renderer
const renderer = new THREE.WebGLRenderer({
    canvas
})





/** 
 * Frame Update Tick Function 
*/

let time = Date.now()
const tick = () => {

    // time
    const currentTime = Date.now()
    const deltaTime = currentTime - time;


    time = currentTime

    // render
    renderer.render(scene, camera)
    time = currentTime

    window.requestAnimationFrame(tick)
}


/** 
 * Responsive Canvas 
*/

window.addEventListener('resize', () => {
    // update the sizes variable
    // sizes.width = window.innerWidth,
    // sizes.height = window.innerHeight

    // // update camera
    // camera.aspect = sizes.width / sizes.height

    // update the Three JS Projections matrix
    camera.updateProjectionMatrix()
    // update renderer
    // renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})




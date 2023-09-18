import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as dat from 'dat.gui';
import gsap from 'gsap';
import cubeTexture from "/images/texture-main.png"


// Textures
const loadingManager = new THREE.LoadingManager()
const textureLoader = new THREE.TextureLoader(loadingManager)
const texture = textureLoader.load(cubeTexture)



// DAT GUI debugger
const gui = new dat.GUI();
const parameters = {
    color : 0xfff000,
    spin : () => {
        gsap.to(cubeMesh.rotation, { y : 2, duration : 2 })
    }
}

// Three JS Scene

const scene = new THREE.Scene()

const canvas = document.querySelector('.webgl-canvas')
const sizes = {
    width : window.innerWidth,
    height : window.innerHeight
}


const cursor = {
    x : 0,
    y : 0
}

window.addEventListener('mousemove', (event) => {
    const { clientX, clientY } = event;
    cursor.x = clientX / sizes.width;
    cursor.y = clientY / sizes.height;
})

// create a box geometry (Red Cube)

const geometry = new THREE.BoxGeometry(1, 1, 1);

// const material = new THREE.MeshBasicMaterial({
//     map : texture
// })


// meshDepthMaterial
const material = new THREE.MeshLambertMaterial()


const cubeMesh = new THREE.Mesh(geometry, material);

scene.add(cubeMesh);


 /** Lights  */

 const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)

 scene.add(ambientLight)

// Cube Mesh Debug

gui.add(cubeMesh.rotation, 'y', -3, 3, 0.1)
gui.add(cubeMesh.rotation, 'x', -3, 3, 0.1)
gui.add(cubeMesh.rotation, 'z', -3, 3, 0.1)

gui
    .addColor(parameters, 'color')
    .onChange(() => {
        material.color.set(parameters.color)
    });
gui.
    add(parameters, 'spin');

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
    // update camera position based on mouse movement;
    // camera.position.x = Math.sin(cursor.x * 10) * 3;
    // camera.position.z = Math.cos(cursor.x * 10) * 3;
    // camera.position.z = Math.cos(Math.PI * cursor.x * 2)
    // camera.position.y = -cursor.y * 10
    camera.lookAt(cubeMesh.position)


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

    if(!fullScreenElement) {

        if(canvas.requestFullscreen) {
            canvas.requestFullscreen()
        } else if(canvas.webkitRequestFullscreen) {
            canvas.webkitRequestFullscreen()
        }
    } else {

        if(document.exitFullscreen) {
            document.exitFullscreen()
         } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen()
         }
    }
})

tick()

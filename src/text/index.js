import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as dat from 'dat.gui';
import gsap from 'gsap';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';


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



// orbit controls

const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true


/**
 * Texture Loader
 */

// const textureLoader = new THREE.TextureLoader()
// textureLoader.load("/images/expert-inner.png", (texture) => {
//     /**
//      * Plane Geometry
//      */

//     const planeGeom = new THREE.PlaneGeometry(8,8)
//     const planeMaterial = new THREE.MeshBasicMaterial({ map : texture })

//     const planeMesh = new THREE.Mesh(planeGeom, planeMaterial)
//     scene.add(planeMesh)
// });






/**
 * Text loader
 */

const loader = new FontLoader()
loader.load("/fonts/Novante_Regular.json", (font) => {
    const textGeometry = new TextGeometry('Hello World', {
        font : font,
        size : 2,
        height : 0.2,
        curveSegments : 3,
        bevelEnabled: true,
		bevelThickness: 0.03,
		bevelSize: 0.001,
		bevelOffset: 0,
		bevelSegments: 2,
    })

    textGeometry.computeBoundingBox()

    textGeometry.translate(
        -textGeometry.boundingBox.max.x * 0.5,
        -textGeometry.boundingBox.max.y * 0.5,
        -textGeometry.boundingBox.max.z * 0.5
    )

    const textMaterial = new THREE.MeshBasicMaterial({ wireframe : false })



    const text = new THREE.Mesh(textGeometry, textMaterial);

    scene.add(text)
});



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

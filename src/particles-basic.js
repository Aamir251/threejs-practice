import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as dat from 'dat.gui';
import gsap from 'gsap';


/**
 * Three JS Scene
 */
const scene = new THREE.Scene()

const canvas = document.querySelector('.webgl-canvas')
const sizes = {
    width : window.innerWidth,
    height : window.innerHeight
}



/**
 * Particles
 */

// Geometry
const particlesGeometry = new THREE.BufferGeometry()
const count = 5000

// setting positions
const positions = new Float32Array(count * 3)
const colors = new Float32Array(count * 3)

for(let i = 0; i < count; i ++) {
    positions[i] = (Math.random() - 0.5) * 15

    // colors
    colors[i] = Math.random()
}
particlesGeometry.setAttribute(
    'position',
    new THREE.BufferAttribute(positions, 3)
)
// setting color of each particle
particlesGeometry.setAttribute(
    'color',
    new THREE.BufferAttribute(colors, 3)
)
// Material
const particlesMaterial = new THREE.PointsMaterial({
    size : 0.1,
    sizeAttenuation : true,
    // color : "red"
})

particlesMaterial.vertexColors = true


let particles = new THREE.Points(particlesGeometry, particlesMaterial);

// material texture

const textureLoader = new THREE.TextureLoader()
textureLoader.load('/images/circle-texture.png', (texture) => {
    // particlesMaterial.transparent = true;
    particlesMaterial.map = texture;

    particlesMaterial.alphaTest = 0.001;

    // particlesMaterial.depthTest = false

    scene.add(particles)
})





/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 10
scene.add(camera)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas
})

renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/** Orbit Controls */

const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true


/**
 * Clock (Main function)
 */

const clock = new THREE.Clock()
let time = Date.now()
console.log(particlesGeometry.attributes.position.array);


const tick = () => {

    // time
    const currentTime = Date.now()
    const deltaTime = currentTime - time;

    const elapsedTime = clock.getElapsedTime()

    // particles.rotation.y = elapsedTime * 0.2;

    for( let i = 0; i < count * 3; i ++ ) {
        const i3 = i  * 3;
        const xPosition = particlesGeometry.attributes.position.array[i3 + 0];

        particlesGeometry.attributes.position.array[i3 + 1] = Math.sin(elapsedTime + xPosition);
        
    }

    particlesGeometry.attributes.position.needsUpdate = true

    time = currentTime
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
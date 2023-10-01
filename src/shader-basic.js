import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as dat from 'dat.gui';
import basicVertexShader from './shaders/basic/vertex.glsl'
import basicFragmentShader from './shaders/basic/fragment.glsl';


/**
 * Three JS Scene
*/
const scene = new THREE.Scene()

const canvas = document.querySelector('.webgl-canvas')
const sizes = {
    width : window.innerWidth,
    height : window.innerHeight
}

/** Dat GUI Instantiation*/
const gui = new dat.GUI()

const geometry = new THREE.PlaneGeometry(1, 1, 32, 32)

const count = geometry.attributes.position.count;

const randoms = new Float32Array(count)

for (let i = 0; i < count; i++)
{
    randoms[i] = Math.random()
}

geometry.setAttribute('aRandom', new THREE.BufferAttribute(randoms, 1))



const material = new THREE.RawShaderMaterial({
    vertexShader : basicVertexShader,
    fragmentShader : basicFragmentShader,
    transparent : true
    // wireframe : true
})


const mesh = new THREE.Mesh(geometry, material)


scene.add(mesh)


/**
 * Camera
*/
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 2
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
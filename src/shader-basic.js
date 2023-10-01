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

const gui = new dat.GUI()


/**
 * Textures
 */

const textureLoader = new THREE.TextureLoader()

const flagTexture = textureLoader.load('/images/flag-texture.jpg')


const geometry = new THREE.PlaneGeometry(1, 0.8, 32, 32)
const count = geometry.attributes.position.count;

const randoms = new Float32Array(count)

for (let i = 0; i < count; i++)
{
    randoms[i] = Math.random()
}

geometry.setAttribute('aRandom', new THREE.BufferAttribute(randoms, 1))

console.log(geometry);

const material = new THREE.RawShaderMaterial({
    vertexShader : basicVertexShader,
    fragmentShader : basicFragmentShader,
    transparent : true,
    uniforms : {
        uFrequency : { value : new THREE.Vector2(10, 5) },
        uTime : { value : 0 },
        uColor : { value : new THREE.Color('orange') },
        uTexture : { value : flagTexture }
    }
    // wireframe : true
})


const mesh = new THREE.Mesh(geometry, material)

// mesh.scale.y = 0.8


scene.add(mesh)


/**
 * Dat Gui Setup
 */

gui.add(material.uniforms.uFrequency.value, 'x').min(0).max(20).step(0.01).name('frequencyX')
gui.add(material.uniforms.uFrequency.value, 'y').min(0).max(20).step(0.01).name('frequencyY')

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

    /** Update material */

    material.uniforms.uTime.value = elapsedTime

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
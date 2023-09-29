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

/** Dat GUI Instantiation*/
const gui = new dat.GUI()




/**
 * Sphere Objects
 */

const object1 = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 16, 16),
    new THREE.MeshBasicMaterial({ color : '#ff0000' })
)
object1.position.x = -2

const object2 = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 16, 16),
    new THREE.MeshBasicMaterial({ color : '#ff0000' })
)

const object3 = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 16, 16),
    new THREE.MeshBasicMaterial({ color : '#ff0000' })
)
object3.position.x = 2


scene.add(object1, object2, object3)


/**
 * Ray Caster
*/

const raycaster = new THREE.Raycaster()



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


const tick = () => {

    // time
    const currentTime = Date.now()
    const deltaTime = currentTime - time;

    const elapsedTime = clock.getElapsedTime()



    // Animate the spheres
    object1.position.y = Math.sin(elapsedTime)
    object2.position.y = Math.sin(elapsedTime * 0.5)
    object3.position.y = Math.sin(elapsedTime * 1.8)


    /** Raycaster interaction */
    
    const rayOrigin = new THREE.Vector3(-3, 0, 0)
    const rayDirection = new THREE.Vector3(10, 0, 0)

    rayDirection.normalize()

    raycaster.set(rayOrigin, rayDirection)

    const objects = [object1, object2, object3]
    const intersects = raycaster.intersectObjects(objects);

    for (const object of objects ) {
        object.material.color.set('#ff0000')
    }

    for (const intersect of intersects)
    {
        intersect.object.material.color.set('#0000ff')
    }

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
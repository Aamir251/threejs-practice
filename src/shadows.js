import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';


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

/** 
 * Meshes
*/

// meshDepthMaterial
const material = new THREE.MeshStandardMaterial({ color : 0xffffff })
// const geometry = new THREE.BoxGeometry(2, 2, 2);

// const cubeMesh = new THREE.Mesh(geometry, material);
// scene.add(cubeMesh);

// Sphere Mesh
const sphereGeom = new THREE.SphereGeometry(1.3);
const sphereMesh = new THREE.Mesh(sphereGeom, material)
scene.add(sphereMesh)

// Plane Material
const planeMateral = new THREE.MeshStandardMaterial({ color : 0xffffff })
const planeGeom = new THREE.PlaneGeometry(8, 8)
const planeMesh = new THREE.Mesh(planeGeom, planeMateral)
planeMesh.position.set(0, -2, 0)
planeMesh.rotation.set(-1.5, 0,0)
scene.add(planeMesh)



/**
 * Light
 */

/** Directional light */
const directionalLight = new THREE.DirectionalLight(0x00fffc, 0.3)
directionalLight.position.set(2,2,0)
// scene.add(directionalLight)


/** Ambient light */

const ambientLight = new THREE.AmbientLight(0xffffff, 0.1)
scene.add(ambientLight)

/** Hemisphere Light */
const hemisphereLight = new THREE.HemisphereLight(0x00fffc, 0xff0000, 0.3)
// scene.add(hemisphereLight)


/** Point light */
const pointLight = new THREE.PointLight(0xff9000, 0.6)
pointLight.position.set(1.8, -0.5, 1)
// scene.add(pointLight)

/** point light helper */

const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight)
// scene.add(directionalLightHelper)

/** RectArea Light */
const rectAreaLight = new THREE.RectAreaLight(0x4e00ff, 3, 2, 1)
rectAreaLight.position.set(-1.5, 0, 1.5)
rectAreaLight.lookAt(new THREE.Vector3())
// scene.add(rectAreaLight)




/** 
 * Shadow Logic 
*/

// 1. directional light
planeMesh.receiveShadow = true;
sphereMesh.castShadow = true


directionalLight.castShadow = true

directionalLight.shadow.mapSize.width = 1024
directionalLight.shadow.mapSize.height = 1024

directionalLight.shadow.camera.far = 8
directionalLight.shadow.camera.top = 1.4
directionalLight.shadow.camera.right = 1.4
directionalLight.shadow.camera.bottom = -1.4
directionalLight.shadow.camera.left = -1.4
directionalLight.shadow.radius = 10

// 2. SpotLight
const spotlight = new THREE.SpotLight(0xffffff, 0.4, 10, Math.PI * 0.3)
spotlight.position.set(0,2,2)
spotlight.castShadow = true


spotlight.shadow.mapSize.width = 512
spotlight.shadow.mapSize.height = 512

spotlight.shadow.camera.fov = 25
spotlight.shadow.camera.near = 1
spotlight.shadow.camera.far = 10


scene.add(spotlight)
scene.add(spotlight.target)

    // camera helper
const spotlightCameraHelper = new THREE.CameraHelper(spotlight.shadow.camera)
scene.add(spotlightCameraHelper)

const directionalLightCameraHelper = new THREE.CameraHelper(directionalLight.shadow.camera)



// hiding the camera helper
directionalLightCameraHelper.visible = false
scene.add(directionalLightCameraHelper)




/** 
    Setting up Main Camera 
*/
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 10
scene.add(camera)

// renderer
const renderer = new THREE.WebGLRenderer({
    canvas
})
renderer.shadowMap.enabled = true
// renderer.shadowMap.type = THREE.PCFSoftShadowMap

renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))


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

    // cubeMesh.rotation.x += 0.008
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

tick()
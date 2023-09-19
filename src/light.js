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

/** Meshes */
// meshDepthMaterial
const material = new THREE.MeshStandardMaterial({ color : 0xffffff })
const geometry = new THREE.BoxGeometry(2, 2, 2);

const cubeMesh = new THREE.Mesh(geometry, material);
scene.add(cubeMesh);

// Plane Material
const planeMateral = new THREE.MeshStandardMaterial({ color : 0xffffff })
const planeGeom = new THREE.PlaneGeometry(7, 7)
const planeMesh = new THREE.Mesh(planeGeom, planeMateral)
planeMesh.position.set(0, -2, 0)
planeMesh.rotation.set(-1.5, 0,0)
scene.add(planeMesh)

/**
 * Light
 */

/** Directional light */
const directionalLight = new THREE.DirectionalLight(0x00fffc, 0.3)
directionalLight.position.set(1,1,0)
// scene.add(directionalLight)

/** Ambient light */

const ambientLight = new THREE.AmbientLight(0xffffff, 0.1)
// scene.add(ambientLight)

/** Hemisphere Light */
const hemisphereLight = new THREE.HemisphereLight(0x00fffc, 0xff0000, 0.3)
// scene.add(hemisphereLight)


/** Point light */
const pointLight = new THREE.PointLight(0xff9000, 0.6)
pointLight.position.set(1.8, -0.5, 1)
// scene.add(pointLight)

/** point light helper */

const pointLightHelper = new THREE.PointLightHelper(pointLight)
// scene.add(pointLightHelper)

/** RectArea Light */
const rectAreaLight = new THREE.RectAreaLight(0x4e00ff, 3, 2, 1)
rectAreaLight.position.set(-1.5, 0, 1.5)
rectAreaLight.lookAt(new THREE.Vector3())
// scene.add(rectAreaLight)

/** Spotlight */

const spotlight = new THREE.SpotLight(0x78ff00, 0.5, 10, Math.PI * 0.4, 0.25, 1)
spotlight.position.set(0,2,3)
scene.add(spotlight)


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
 * Ambient Light
 */


// camera.lookAt(planeMesh.position)


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

    cubeMesh.rotation.x += 0.008
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

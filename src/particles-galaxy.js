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
 * Galaxy
 */
const parameters = {
    count : 100000,
    size : 0.01,
    radius : 5,
    branches : 3,
    spin : 1,
    randomness : 0.2,
    randomnessPower : 3,
    insideColor : '#ff6030',
    outsideColor : '#1b3984'
}

let particlesGeometry = null;
let particlesMaterial = null;
let particles = null;

const generateGalaxy = () => 
{
    /** 
     * Destroy old Galaxy
    */

    if(particles !== null) {
        particlesGeometry.dispose()
        particlesMaterial.dispose()
        scene.remove(particles)
    }
    particlesGeometry = new THREE.BufferGeometry();
    particlesMaterial = new THREE.PointsMaterial({
        size : parameters.size,
        sizeAttenuation : true,
        depthWrite : false,
        blending : THREE.AdditiveBlending,
        vertexColors : true
    })
    particles = new THREE.Points(particlesGeometry, particlesMaterial)

    const positions = new Float32Array(parameters.count * 3);
    const colors = new Float32Array(parameters.count * 3);

    const insideColor = new THREE.Color(parameters.insideColor);
    const outsideColor = new THREE.Color(parameters.outsideColor);

    for ( let i = 0; i < parameters.count; i ++)
    {
        const i3 = i * 3;
        // distance refers to the distance between the center to the edge 
        // this equals the radius of the galaxy
        const distance = Math.random() * parameters.radius;

        const branchAngle = ((i % parameters.branches) / parameters.branches) * Math.PI * 2;

        const spinAngle = distance * parameters.spin

        const randomX = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1 )
        const randomY = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1 )
        const randomZ = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1 )

        

        // if( i < 20 ) {
        //     console.log('i ', i);
        //     console.log('branch angle ', branchAngle);
        // }

        positions[i3 + 0] = Math.cos(branchAngle + spinAngle) * distance + randomX
        // positions[i3 + 0] = (Math.random() - 0.5) * 15
        positions[i3 + 1] = 0 + randomY
        positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * distance + randomZ


        const mixedColor = insideColor.clone()

        mixedColor.lerp(outsideColor, distance / parameters.radius)

        // color property
        colors[i3 + 0] = mixedColor.r
        colors[i3 + 1] = mixedColor.g
        colors[i3 + 2] = mixedColor.b
    }

    particlesGeometry.setAttribute(
        'position', 
        new THREE.BufferAttribute(positions, 3)
    )
    particlesGeometry.setAttribute(
        'color', 
        new THREE.BufferAttribute(colors, 3)
    )

    scene.add(particles)
}




generateGalaxy()


/** Dat GUI setup */

gui.add(parameters, 'count').min(1000).max(10000).step(100).onFinishChange(generateGalaxy)
gui.add(parameters, 'size').min(0.001).max(0.2).step(0.001).onFinishChange(generateGalaxy)
gui.add(parameters, 'radius').min(1).max(15).step(1).onFinishChange(generateGalaxy)
gui.add(parameters, 'branches').min(2).max(15).step(1).onFinishChange(generateGalaxy)
gui.add(parameters, 'spin').min(-5).max(5).step(0.01).onFinishChange(generateGalaxy)
gui.add(parameters, 'randomness').min(0).max(2).step(0.001).onFinishChange(generateGalaxy)
gui.add(parameters, 'randomnessPower').min(1).max(10).step(0.001).onFinishChange(generateGalaxy)
gui.addColor(parameters, 'insideColor').onFinishChange(generateGalaxy)
gui.addColor(parameters, 'outsideColor').onFinishChange(generateGalaxy)


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
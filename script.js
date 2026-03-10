// Scene
const scene = new THREE.Scene()

scene.background = new THREE.Color(0x0b3c6d)

// Camera
const camera = new THREE.PerspectiveCamera(
75,
window.innerWidth / window.innerHeight,
0.1,
1000
)

// Renderer
const renderer = new THREE.WebGLRenderer({
canvas: document.querySelector('#bg'),
antialias:true
})

renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)

camera.position.setZ(30)

// Light
const pointLight = new THREE.PointLight(0xffffff,1)

pointLight.position.set(10,10,10)

scene.add(pointLight)

const ambientLight = new THREE.AmbientLight(0xffffff,0.4)

scene.add(ambientLight)


// 🌟 Plankton particles

const particleGeometry = new THREE.SphereGeometry(0.2,8,8)

const particleMaterial = new THREE.MeshStandardMaterial({
color:0x9bdcff
})

function addParticle(){

const particle = new THREE.Mesh(particleGeometry,particleMaterial)

const [x,y,z] = Array(3)
.fill()
.map(()=>THREE.MathUtils.randFloatSpread(200))

particle.position.set(x,y,z)

scene.add(particle)

}

Array(400).fill().forEach(addParticle)


// 🫧 Bubble particles

const bubbleGeometry = new THREE.SphereGeometry(0.4,16,16)

const bubbleMaterial = new THREE.MeshStandardMaterial({
color:0xffffff,
transparent:true,
opacity:0.6
})

const bubbles=[]

for(let i=0;i<80;i++){

const bubble = new THREE.Mesh(bubbleGeometry,bubbleMaterial)

bubble.position.x = (Math.random()-0.5)*80
bubble.position.y = (Math.random()-0.5)*80
bubble.position.z = (Math.random()-0.5)*80

scene.add(bubble)

bubbles.push(bubble)

}


// 🐋 Whale abstract shape

const whaleGeometry = new THREE.TorusKnotGeometry(8,2,200,32)

const whaleMaterial = new THREE.MeshStandardMaterial({
color:0xFFD66B,
wireframe:true
})

const whale = new THREE.Mesh(whaleGeometry,whaleMaterial)

scene.add(whale)


// Animation

function animate(){

requestAnimationFrame(animate)

// whale rotation
whale.rotation.x +=0.002
whale.rotation.y +=0.003


// bubbles rising

bubbles.forEach(bubble=>{

bubble.position.y +=0.03

if(bubble.position.y>50){

bubble.position.y=-50

}

})

renderer.render(scene,camera)

}

animate()


// Responsive

window.addEventListener("resize",()=>{

camera.aspect = window.innerWidth / window.innerHeight

camera.updateProjectionMatrix()

renderer.setSize(window.innerWidth,window.innerHeight)

})

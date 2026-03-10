// Scene
const scene = new THREE.Scene()

scene.background = new THREE.Color(0x20405E)

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
const loader = new THREE.GLTFLoader()

let whale
let jellys=[]


// 🐋 whale
loader.load('cartoon_whale.glb', function(gltf){

whale = gltf.scene
whale.scale.set(10,10,10)
whale.position.set(-40,0,-20)

scene.add(whale)

})



// 🪼 jellyfish
for(let i=0;i<6;i++){

loader.load('jellyfish.glb', function(gltf){

const jelly = gltf.scene

jelly.scale.set(2,2,2)

jelly.position.set(
Math.random()*60-30,
Math.random()*20-10,
Math.random()*-40
)

scene.add(jelly)

jellys.push(jelly)

})

}

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

// Animation

function animate(){

requestAnimationFrame(animate)

// whale swim
if(whale){

const t = Date.now() * 0.0003

whale.position.x = Math.sin(t) * 30
whale.position.z = Math.cos(t) * 20
whale.position.y = Math.sin(t*2) * 5

whale.rotation.y = -t

}


// jellyfish floating
jellys.forEach(jelly=>{

jelly.position.y += Math.sin(Date.now()*0.002)*0.05

})


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

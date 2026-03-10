const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(
75,
window.innerWidth/window.innerHeight,
0.1,
1000
)

const renderer = new THREE.WebGLRenderer({
canvas:document.querySelector('#bg')
})

renderer.setSize(window.innerWidth,window.innerHeight)

camera.position.z = 30

const starGeometry = new THREE.SphereGeometry(0.25,24,24)
const starMaterial = new THREE.MeshStandardMaterial({color:0xffffff})

function addStar(){

const star = new THREE.Mesh(starGeometry,starMaterial)

const [x,y,z] = Array(3)
.fill()
.map(()=>THREE.MathUtils.randFloatSpread(100))

star.position.set(x,y,z)

scene.add(star)

}

Array(200).fill().forEach(addStar)

const whaleGeometry = new THREE.TorusKnotGeometry(8,2,100,16)

const whaleMaterial = new THREE.MeshStandardMaterial({
color:0xFFD66B
})

const whale = new THREE.Mesh(whaleGeometry,whaleMaterial)

scene.add(whale)

const light = new THREE.PointLight(0xffffff)

light.position.set(5,5,5)

scene.add(light)

function animate(){

requestAnimationFrame(animate)

whale.rotation.x +=0.003
whale.rotation.y +=0.005

renderer.render(scene,camera)

}

animate()

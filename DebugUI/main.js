import './style.css'
import * as THREE from 'three'
import { OrbitControls }   from 'three/examples/jsm/controls/OrbitControls.js';

import gsap from 'gsap'
import GUI from 'lil-gui';


const paramerters = {
  color : 0xffff00,
  spin :() => {
    gsap.to(mesh.rotation,{ duration : 1 , y: mesh.rotation.y + 10 })
  }
}

console.log(GUI);

//Debug UI -------
const gui = new GUI( { closed : true, width : 400})



const scene = new THREE.Scene();

//Object
const boxGeometry = new THREE.BoxGeometry(1,1,1,10 ,10,10);
const material = new THREE.MeshBasicMaterial({color:paramerters.color})
const mesh = new THREE.Mesh(boxGeometry,material);
scene.add(mesh);

//Debug
gui
   .add(mesh.position,'y')
   .min(-3)
   .max(3)
   .step(0.01)
   .name('axis');

 gui
    .add(mesh,'visible')

gui.add(material,'wireframe')



// this is working but when we refresh it goes to red back to red😕
gui
.addColor(paramerters,'color')
.onChange(() => {
  material.color.set(paramerters.color)
})

gui.add(paramerters,'spin');

// function spin(){
//   gsap.to(mesh.rotation,{duration : 1, y: mesh.rotation.y + 10})
    
//   }

const aspect = {
  width : window.innerWidth,
  height: window.innerHeight
}

const camera = new THREE.PerspectiveCamera(75,aspect.width/aspect.height);
camera.position.z = 3;
// camera.lookAt(mesh.position);
scene.add(camera);


const canvas = document.querySelector("canvas")
const renderer = new THREE.WebGLRenderer({canvas});
renderer.setSize(aspect.width,aspect.height);

//Controls
const controls = new OrbitControls(camera,canvas)
controls.enableDamping = true;

const cursor = {
  x:0,
  y:0
}

window.addEventListener('mousemove',(event)=>{
  cursor.x = event.clientX / aspect.width -0.5,
  cursor.y = -(event.clientY / aspect.width -0.5)
 
})

let clock = new THREE.Clock(); 

function animate(){

  let elapsedTime = clock.getElapsedTime();

  camera.position.x = Math.sin(elapsedTime);
  camera.position.y = Math.cos(elapsedTime);

  // Update the camera 
  // camera.position.x = Math.sin(cursor.x* Math.PI * 2)*3;
  // camera.position.z = Math.cos(cursor.x * Math.PI * 2)*3;
  // camera.position.y = cursor.y * 5;
  // camera.lookAt(mesh.position)

  // update controls 
  
controls.update()
    
  window.requestAnimationFrame(animate)
  renderer.render(scene,camera);
}

animate();
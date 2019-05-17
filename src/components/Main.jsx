import React from 'react'
var THREE = require('three')

let scene;
let box;
let light;
let ambient;
let gridHelper;
let lightHelper;
let axisHelper;
let camera;
let renderer;
let width = 500;
let height = 200;
let theta = 0;


class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      boxPositionX: 0
    }
    this.renderThree = this.renderThree.bind(this)
    this.renderScene = this.renderScene.bind(this)
    this.moveForward = this.moveForward.bind(this)
    this.runScript = this.runScript.bind(this)
  }

  componentDidMount() {
    this.renderThree()
    this.renderScene()
  }

  renderThree() {
    scene = new THREE.Scene();

    box = new THREE.Mesh(
      new THREE.BoxGeometry(50, 50, 50),
      new THREE.MeshLambertMaterial({ 
        // color: 0xff0000 
        // color: '#00ff00' 
        color: new THREE.Color(0xff0000)
      }),
    );
    box.position.set(0, 0, 0);
    scene.add(box);

    light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(0, 100, 30);
    scene.add(light);
    ambient = new THREE.AmbientLight(0x404040, 1);
    scene.add(ambient);

    camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);
    camera.position.set(200, 100, 300);
    camera.lookAt(scene.position);

    gridHelper = new THREE.GridHelper(200, 50);
    scene.add(gridHelper);
    axisHelper = new THREE.AxisHelper(1000);
    scene.add(axisHelper);
    lightHelper = new THREE.DirectionalLightHelper(light, 20);
    scene.add(lightHelper);

    renderer = new THREE.WebGLRenderer({ anitialias: true });
    renderer.setSize(width, height);
    renderer.setClearColor(0xefefef);
    renderer.setPixelRatio(window.devicePixelRatio);

    document.getElementById('stage').appendChild(renderer.domElement);
  }

  moveForward() {
    if (Math.abs(this.state.boxPositionX-box.position.x) > 5) {
      this.setState({
        boxPositionX: box.position.x
      })
      return
    }
    requestAnimationFrame(this.moveForward);
    box.position.x += 0.5;
    renderer.render(scene, camera);
  }  

  renderScene() {
    // requestAnimationFrame(this.renderScene);
    // theta += 0.1;
    // camera.position.x = Math.cos(THREE.Math.degToRad(theta)) * 300;
    // camera.position.z = Math.sin(THREE.Math.degToRad(theta)) * 300;
    // box.position.y += 0.1;
    renderer.render(scene, camera);
  }

  runScript() {
    eval(`
      this.moveForward();
    `)
  }

  render() {
    return(
      <div className='main'>
        <button 
          type="button"
          onClick={this.runScript}
        >
          RUN
        </button>
        <div id="stage" />
      </div>
    );
  }
}

export default Main;
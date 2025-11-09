import '../App.css'
import axios from 'axios';
import React, { useState, useEffect, useRef } from "react";
import { useParams } from 'react-router-dom'
import Slider from 'react-input-slider';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

import xbot from '../Models/xbot/xbot.glb';
import ybot from '../Models/ybot/ybot.glb';
import xbotPic from '../Models/xbot/xbot.png';
import ybotPic from '../Models/ybot/ybot.png';


import * as words from '../Animations/words';
import * as alphabets from '../Animations/alphabets';
import { defaultPose } from '../Animations/defaultPose';

import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Button, Modal } from "react-bootstrap";

import { baseURL } from '../Config/config'


function Video() {
  const [text, setText] = useState("");
  const [bot, setBot] = useState(ybot);
  const [speed, setSpeed] = useState(0.1);
  const [pause, setPause] = useState(800);
  const [invalidId, setInvalidId] = useState(false)
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')

  const params = useParams()

  const componentRef = useRef({});
  const { current: ref } = componentRef;

  let id = React.createRef();

  useEffect(() => {

    ref.flag = false;
    ref.pending = false;

    ref.animations = [];
    ref.characters = [];

    ref.scene = new THREE.Scene();
    ref.scene.background = null;

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    ref.scene.add(ambientLight);
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.9);
    dirLight.position.set(5, 5, 5);
    ref.scene.add(dirLight);

    ref.camera = new THREE.PerspectiveCamera(
        30,
        window.innerWidth*0.57 / (window.innerHeight - 70),
        0.1,
        1000
    )

    ref.renderer = new THREE.WebGLRenderer({
      antialias: false,
      powerPreference: 'high-performance',
      alpha: true,
      stencil: false,
      depth: true,
      logarithmicDepthBuffer: false,
      preserveDrawingBuffer: false,
    });
    ref.renderer.setPixelRatio(1);
    ref.renderer.setClearColor(0x000000, 0);
    ref.renderer.setSize(window.innerWidth*0.57, window.innerHeight - 70);
    document.getElementById("canvas").innerHTML = "";
    document.getElementById("canvas").appendChild(ref.renderer.domElement);

    ref.camera.position.z = 1.6;
    ref.camera.position.y = 1.4;

    let loader = new GLTFLoader();
    loader.load(
      bot,
      (gltf) => {
        // Remove old avatar if exists
        if (ref.avatar) {
          ref.scene.remove(ref.avatar);
        }
        
        gltf.scene.traverse((child) => {
          if ( child.type === 'SkinnedMesh' ) {
            child.frustumCulled = false;
          }
          // Fix material issues for human model
          if (child.material) {
            if (Array.isArray(child.material)) {
              child.material.forEach(mat => {
                if (mat) {
                  mat.needsUpdate = true;
                  // Ensure materials are properly lit
                  if (!mat.emissive) mat.emissive = new THREE.Color(0x000000);
                }
              });
            } else {
              child.material.needsUpdate = true;
              if (!child.material.emissive) child.material.emissive = new THREE.Color(0x000000);
            }
          }
        });
        
        // Scale and position the model (default avatars already correctly scaled)
        
        ref.avatar = gltf.scene;
        // Keep avatar at normal size
        ref.avatar.scale.set(0.95, 0.95, 0.95);
        ref.scene.add(ref.avatar);
        // Cache bones for fast lookup
        ref.boneMap = {};
        ref.avatar.traverse((child) => {
          if (child.isBone || child.type === 'Bone') {
            ref.boneMap[child.name] = child;
          }
        });
        ref.getBone = (name) => ref.boneMap[name] || ref.avatar.getObjectByName(name);
        
        // Default camera positioning and cleanup for supported avatars
        ref.camera.position.z = 2.0;
        ref.camera.position.y = 1.5;
        // Remove any leftover human-specific lights if present
        const lightsToRemove = ref.scene.children.filter(child => 
          child.type === 'DirectionalLight' && child.userData && child.userData.isHumanLight
        );
        lightsToRemove.forEach(light => ref.scene.remove(light));
        
        // Try default pose, but don't fail if bones don't exist (human model might have different structure)
        try {
          defaultPose(ref);
        } catch (error) {
          console.warn('Could not apply default pose, model might have different bone structure:', error);
        }
        ref.renderer.render(ref.scene, ref.camera);
      },
      (xhr) => {
        console.log('Loading progress:', (xhr.loaded / xhr.total * 100) + '%');
      },
      (error) => {
        console.error('Error loading model:', error);
        // Keep transparent background
        ref.scene.background = null;
        ref.renderer.render(ref.scene, ref.camera);
      }
    );

    id.current.value=params.videoId

  }, [ref, bot]);

  ref.animate = () => {
    // Throttle to ~30 FPS
    const now = performance.now();
    if (ref.lastFrame && now - ref.lastFrame < (1000/30)) {
      requestAnimationFrame(ref.animate);
      return;
    }
    ref.lastFrame = now;

    if(ref.animations.length === 0){
        ref.pending = false;
      return ;
    }
    requestAnimationFrame(ref.animate);
    if(ref.animations[0].length){
        if(!ref.flag) {
          if(ref.animations[0][0]==='add-text'){
            const payload = ref.animations[0][1];
            if (typeof payload === 'string') {
              setText(prev => prev + payload);
            }
            ref.animations.shift();
          }
          else{
            for(let i=0;i<ref.animations[0].length;){
              let [boneName, action, axis, limit, sign] = ref.animations[0][i]
              const bone = ref.getBone(boneName);
              if(!bone){
                ref.animations[0].splice(i, 1);
                continue;
              }
              if(sign === "+" && bone[action][axis] < limit){
                  bone[action][axis] += speed;
                  bone[action][axis] = Math.min(bone[action][axis], limit);
                  i++;
              }
              else if(sign === "-" && bone[action][axis] > limit){
                  bone[action][axis] -= speed;
                  bone[action][axis] = Math.max(bone[action][axis], limit);
                  i++;
              }
              else{
                  ref.animations[0].splice(i, 1);
              }
            }
          }
        }
    }
    else {
      ref.flag = true;
      setTimeout(() => {
        ref.flag = false
      }, pause);
      ref.animations.shift();
    }
    ref.renderer.render(ref.scene, ref.camera);
  }

  const sign = (str) => {
    str = str.toUpperCase();
    var strWords = str.split(' ');
    setText('')

    for(let word of strWords){
      if(words[word]){
        ref.animations.push(['add-text', word+' ']);
        // Mild inward pre-pose before a full word sign to prevent outward spread
        ref.animations.push([
          ["mixamorigRightArm", "rotation", "y", -Math.PI/10, "-"],
          ["mixamorigLeftArm",  "rotation", "y",  Math.PI/10,  "+"],
          ["mixamorigRightForeArm", "rotation", "y", -Math.PI/14, "-"],
          ["mixamorigLeftForeArm",  "rotation", "y",  Math.PI/14,  "+"],
          ["mixamorigRightHand", "rotation", "y",  Math.PI/12,  "+"],
          ["mixamorigLeftHand",  "rotation", "y", -Math.PI/12,  "-"]
        ]);
        words[word](ref);
        
      }
      else{
        for(const [index, ch] of word.split('').entries()){
          if(index === word.length-1)
            ref.animations.push(['add-text', ch+' ']);
          else 
            ref.animations.push(['add-text', ch]);
          // Strong inward pre-pose to bring both hands near center
          ref.animations.push([
            // Upper arms tilt inward and slightly forward
            ["mixamorigRightArm", "rotation", "y", -Math.PI/6, "-"],
            ["mixamorigLeftArm",  "rotation", "y",  Math.PI/6,  "+"],
            ["mixamorigRightArm", "rotation", "z", -Math.PI/10, "-"],
            ["mixamorigLeftArm",  "rotation", "z",  Math.PI/10, "+"],
            ["mixamorigRightArm", "rotation", "x", -Math.PI/6,  "-"],
            ["mixamorigLeftArm",  "rotation", "x", -Math.PI/6,  "-"],
            // Forearms bend and yaw slightly inward
            ["mixamorigRightForeArm", "rotation", "x",  Math.PI/10, "+"],
            ["mixamorigLeftForeArm",  "rotation", "x",  Math.PI/10, "+"],
            ["mixamorigRightForeArm", "rotation", "y", -Math.PI/12, "-"],
            ["mixamorigLeftForeArm",  "rotation", "y",  Math.PI/12, "+"],
            // Hands angle toward center
            ["mixamorigRightHand", "rotation", "y",  Math.PI/8,  "+"],
            ["mixamorigLeftHand",  "rotation", "y", -Math.PI/8,  "-"],
            ["mixamorigRightHand", "rotation", "z", -Math.PI/12, "-"],
            ["mixamorigLeftHand",  "rotation", "z",  Math.PI/12, "+"]
          ]);
          if (alphabets[ch]) {
            alphabets[ch](ref);
          }
          // Post-letter center-pose settle to avoid outward drift
          ref.animations.push([
            ["mixamorigRightArm", "rotation", "y", -Math.PI/8, "-"],
            ["mixamorigLeftArm",  "rotation", "y",  Math.PI/8,  "+"],
            ["mixamorigRightArm", "rotation", "z", -Math.PI/16, "-"],
            ["mixamorigLeftArm",  "rotation", "z",  Math.PI/16, "+"],
            ["mixamorigRightArm", "rotation", "x", -Math.PI/8,  "-"],
            ["mixamorigLeftArm",  "rotation", "x", -Math.PI/8,  "-"],
            ["mixamorigRightForeArm", "rotation", "x",  Math.PI/10, "+"],
            ["mixamorigLeftForeArm",  "rotation", "x",  Math.PI/10, "+"],
            ["mixamorigRightForeArm", "rotation", "y", -Math.PI/10, "-"],
            ["mixamorigLeftForeArm",  "rotation", "y",  Math.PI/10, "+"],
            ["mixamorigRightHand", "rotation", "y",  Math.PI/6,  "+"],
            ["mixamorigLeftHand",  "rotation", "y", -Math.PI/6,  "-"]
          ]);
          
        }
      }
    }
  }

  const animateFromID = () => {
      const videoID = id.current.value;
      axios.get(`${baseURL}/videos/${videoID}`).then((res) => {
        console.log(res.data)
        setTitle(res.data.title)
        setDesc(res.data.desc)
        sign(res.data.content);
      }).catch(err => {
        console.log(err)
        setInvalidId(true)
      });
  }

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-3'>
          <label className='label-style'>
              Video ID
          </label>
          <input ref={id} splaceholder='Video ID' className='w-100 input-style' />
          <button onClick={animateFromID} className='btn btn-primary w-100 btn-style btn-start mb-3'>
              Start Video
          </button>
          <hr />
          {title && 
            <div className='d-flex flex-column justify-content-center align-items-center mt-3'>
            <label className='h3'>{title}</label>
            <label>{desc}</label>
            <div className='w-100'>
              <label className='label-style mt-4'>
                Processed Text
              </label>
              <textarea rows={10} value={text} className='w-100 input-style mt-2' readOnly />
              </div>
          </div>}
        </div>
        <div className='col-md-7'>
          <div id='canvas'/>
        </div>
        <div className='col-md-2'>
          <p className='bot-label'>
            Select Avatar
          </p>
          <img src={xbotPic} className='bot-image col-md-11' onClick={()=>{setBot(xbot)}} alt='Avatar 1: XBOT'/>
          <img src={ybotPic} className='bot-image col-md-11' onClick={()=>{setBot(ybot)}} alt='Avatar 2: YBOT'/>
          <p className='label-style'>
            Animation Speed: {Math.round(speed*100)/100}
          </p>
          <Slider
            axis="x"
            xmin={0.05}
            xmax={0.50}
            xstep={0.01}
            x={speed}
            onChange={({ x }) => setSpeed(x)}
            className='w-100'
          />
          <p className='label-style'>
            Pause time: {pause} ms
          </p>
          <Slider
            axis="x"
            xmin={0}
            xmax={2000}
            xstep={100}
            x={pause}
            onChange={({ x }) => setPause(x)}
            className='w-100'
          />
        </div>
      </div>
      <Modal show={invalidId} onHide={() => setInvalidId(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Invalid Video ID</Modal.Title>
        </Modal.Header>
        <Modal.Body>Please make sure that the video ID that your have entered is valid!</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setInvalidId(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default Video;
import '../App.css'
import React, { useState, useEffect, useRef, useMemo } from "react";
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

function LearnSign() {
  const [bot, setBot] = useState(ybot);
  const [speed, setSpeed] = useState(0.1);
  const [pause, setPause] = useState(800);
  const [isLoading, setIsLoading] = useState(true);

  const componentRef = useRef({});
  const { current: ref } = componentRef;

  useEffect(() => {
    // Wait for DOM to be ready
    const canvasHost = document.getElementById("canvas");
    if (!canvasHost) {
      console.error("Canvas element not found!");
      return;
    }

    // Show loading state
    setIsLoading(true);

    // Store current speed and pause in ref so animate function can access latest values
    ref.speed = speed;
    ref.pause = pause;
    ref.currentBot = bot;

    ref.flag = false;
    ref.pending = false;
    ref.animationStarted = false; // Will start after model loads

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
    // Limit pixel ratio for better performance on high-DPI displays
    ref.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    ref.renderer.setClearColor(0x000000, 0);
    canvasHost.innerHTML = "";
    canvasHost.appendChild(ref.renderer.domElement);
    ref.renderer.setSize(window.innerWidth * 0.57, (window.innerHeight - 70));

    // Match Convert page camera positioning exactly
    ref.camera.position.z = 1.6;
    ref.camera.position.y = 1.4;

    // Optimized animate function - only renders when needed
    let needsRender = false;
    ref.animate = () => {
      if (!ref.animationStarted || !ref.renderer || !ref.scene || !ref.camera) {
        return;
      }
      
      // Throttle to ~30 FPS when animating, ~10 FPS when idle
      const now = performance.now();
      const targetFPS = ref.animations.length > 0 ? 30 : 10;
      const frameTime = 1000 / targetFPS;
      
      if (ref.lastFrame && now - ref.lastFrame < frameTime) {
        if (needsRender || ref.animations.length > 0) {
          requestAnimationFrame(ref.animate);
        }
        return;
      }
      ref.lastFrame = now;

      // Process animations if any
      if(ref.animations.length > 0){
        needsRender = true;
        if(ref.animations[0].length){
          if(!ref.flag) {
            for(let i=0;i<ref.animations[0].length;){
              let [boneName, action, axis, limit, sign] = ref.animations[0][i]
              const bone = ref.getBone ? ref.getBone(boneName) : null;
              if (!bone) {
                ref.animations[0].splice(i, 1);
                continue;
              }
              if(sign === "+" && bone[action][axis] < limit){
                  bone[action][axis] += ref.speed;
                  bone[action][axis] = Math.min(bone[action][axis], limit);
                  i++;
              }
              else if(sign === "-" && bone[action][axis] > limit){
                  bone[action][axis] -= ref.speed;
                  bone[action][axis] = Math.max(bone[action][axis], limit);
                  i++;
              }
              else{
                  ref.animations[0].splice(i, 1);
              }
            }
          }
        }
        else {
          ref.flag = true;
          setTimeout(() => {
            ref.flag = false
          }, ref.pause);
          ref.animations.shift();
        }
      } else {
        ref.pending = false;
        // Only continue loop if we need to render
        if (needsRender) {
          needsRender = false;
          requestAnimationFrame(ref.animate);
        }
      }
      
      // Only render if something changed or we're animating
      if (needsRender || ref.animations.length > 0) {
        ref.renderer.render(ref.scene, ref.camera);
        requestAnimationFrame(ref.animate);
      }
    };
    
    // Start render loop only after model loads
    // Don't start immediately to save resources

    // Load model with optimizations
    let loader = new GLTFLoader();
    loader.load(
      bot,
      (gltf) => {
        // Remove old avatar if exists
        if (ref.avatar) {
          ref.scene.remove(ref.avatar);
          // Dispose of old geometry and materials to free memory
          ref.avatar.traverse((child) => {
            if (child.geometry) child.geometry.dispose();
            if (child.material) {
              if (Array.isArray(child.material)) {
                child.material.forEach(mat => mat.dispose());
              } else {
                child.material.dispose();
              }
            }
          });
        }
        
        // Match Convert page model loading exactly - simple and clean
        gltf.scene.traverse((child) => {
          if ( child.type === 'SkinnedMesh' ) {
            child.frustumCulled = false;
          }
        });
        
        ref.avatar = gltf.scene;
        ref.avatar.visible = true;
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
        
        // Apply default pose (same as Convert) - models are already positioned correctly in GLB files
        try {
          defaultPose(ref);
        } catch (error) {
          // Silently fail - some models might not have all bones
        }
        
        // Initial render
        ref.renderer.render(ref.scene, ref.camera);
        
        // Start render loop after model is loaded
        if (!ref.animationStarted) {
          ref.animationStarted = true;
          ref.animate();
        }
        
        // Hide loading state
        setIsLoading(false);
      },
      (xhr) => {
        // Progress tracking removed for performance
      },
      (error) => {
        console.error('Error loading model:', error);
        // Keep transparent background
        ref.scene.background = null;
        ref.renderer.render(ref.scene, ref.camera);
      }
    );

    // Handle window resize efficiently
    const handleResize = () => {
      if (ref.camera && ref.renderer) {
        ref.camera.aspect = window.innerWidth * 0.57 / (window.innerHeight - 70);
        ref.camera.updateProjectionMatrix();
        ref.renderer.setSize(window.innerWidth * 0.57, (window.innerHeight - 70));
        if (ref.avatar) {
          ref.renderer.render(ref.scene, ref.camera);
        }
      }
    };
    
    // Throttle resize handler
    let resizeTimeout;
    const throttledResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(handleResize, 250);
    };
    
    window.addEventListener('resize', throttledResize);

    return () => {
      // Cleanup: stop animation loop
      if (ref.animationStarted) {
        ref.animationStarted = false;
      }
      // Clear any pending animations
      if (ref.animations) {
        ref.animations = [];
      }
      // Remove resize listener
      window.removeEventListener('resize', throttledResize);
      // Dispose of renderer resources
      if (ref.renderer) {
        ref.renderer.dispose();
      }
      // Dispose of scene resources
      if (ref.scene) {
        ref.scene.traverse((child) => {
          if (child.geometry) child.geometry.dispose();
          if (child.material) {
            if (Array.isArray(child.material)) {
              child.material.forEach(mat => mat.dispose());
            } else {
              child.material.dispose();
            }
          }
        });
      }
    };

  }, [ref, bot]);

  // Update speed and pause in ref when they change (without recreating scene)
  useEffect(() => {
    if (ref) {
      ref.speed = speed;
      ref.pause = pause;
    }
  }, [speed, pause, ref]);

  const alphaButtons = useMemo(() => {
    const items = [];
    for (let i = 0; i < 26; i++) {
      items.push(
        <div className='col-md-3' key={`alpha-${i}`}>
          <button className='signs w-100' onClick={() => {
            if (ref.animations.length === 0 && ref.avatar) {
              alphabets[String.fromCharCode(i + 65)](ref);
            }
          }}>
            {String.fromCharCode(i + 65)}
          </button>
        </div>
      );
    }
    return items;
  }, []);

  const wordButtons = useMemo(() => {
    const items = [];
    for (let i = 0; i < words.wordList.length; i++) {
      const label = words.wordList[i];
      const labelForDisplay = label.replace(/_/g, ' ');
      items.push(
        <div className='col-md-4' key={`word-${label}`}>
          <button className='signs w-100' onClick={() => {
            if (ref.animations.length === 0 && ref.avatar) {
              words[label](ref);
            }
          }} title={label}>
            {labelForDisplay}
          </button>
        </div>
      );
    }
    return items;
  }, [words.wordList.length]);

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-3'>
            <h1 className='heading'>
              Alphabets
            </h1>
            <div className='row'>
                {
                    alphaButtons
                }
            </div>
            <h1 className='heading'>
              Words
            </h1>
            <div className='row'>
                {
                    wordButtons
                }
            </div>
        </div>
        <div className='col-md-7 canvas-section'>
          <div id='canvas' className='canvas-bg'/>
          {isLoading && (
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              color: '#0d9488',
              fontSize: '18px',
              fontWeight: 'bold'
            }}>
              Loading Avatar...
            </div>
          )}
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
    </div>
  )
}

export default LearnSign;

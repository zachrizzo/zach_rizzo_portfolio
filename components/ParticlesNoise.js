import * as THREE from "three";
import { useMemo, useState, useRef } from "react";
import { createPortal, useFrame } from "@react-three/fiber";
import { useFBO } from "@react-three/drei";
import { extend } from "@react-three/fiber";

//import data texture

//import getSphere
const getSphere = (count, size, p = new THREE.Vector4()) => {
  const data = new Float32Array(count * 4);
  for (let i = 0; i < count * 4; i += 4) getPoint(p, size, data, i);
  return data;
};
const getPoint = (v, size, data, offset) => {
  v.set(Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1);
  if (v.length() > 1) return getPoint(v, size, data, offset);
  return v.normalize().multiplyScalar(size).toArray(data, offset);
};

//create a particle system
const Particles = ({ count, size, ...props }) => {
  for (let i = 0; i < count * 4; i += 4) getPoint(p, size, data, i);
  return data;
};

const positionsTexture = new THREE.DataTexture(
  getSphere(512 * 512, 128),
  512,
  512,
  THREE.RGBAFormat,
  THREE.FloatType
);
positionsTexture.needsUpdate = true;

const [positions, setPositions] = useState(positionsTexture);
const [time, setTime] = useState(0);
const [curlFreq, setCurlFreq] = useState(0.25);
const { scene, camera, gl } = useThree();

const { read, write, swap } = useFBO({
  type: THREE.FloatType,
  minFilter: THREE.NearestFilter,
  magFilter: THREE.NearestFilter,
  depthBuffer: false,
  stencilBuffer: false,
});

const simulationMaterial = useMemo(() => {
  return new THREE.ShaderMaterial({
    vertexShader: `varying vec2 vUv;
            void main() {
                vUv = uv;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }`,
    fragmentShader: glsl`uniform sampler2D positions;
            uniform float uTime;
            uniform float uCurlFreq;
            varying vec2 vUv;
            #pragma glslify: curl = require(glsl-curl-noise2)
            #pragma glslify: noise = require(glsl-noise/classic/3d.glsl)      
            void main() {
                float t = uTime * 0.015;
                vec3 pos = texture2D(positions, vUv).rgb; // basic simulation: displays the particles in place.
                vec3 curlPos = texture2D(positions, vUv).rgb;
                pos = curl(pos * uCurlFreq + t);
                curlPos = curl(curlPos * uCurlFreq + t);
                curlPos += curl(curlPos * uCurlFreq * 2.0) * 0.5;
                curlPos += curl(curlPos * uCurlFreq * 4.0) * 0.25;
                curlPos += curl(curlPos * uCurlFreq * 8.0) * 0.125;
                curlPos += curl(pos * uCurlFreq * 16.0) * 0.0625;
                gl_FragColor = vec4(mix(pos, curlPos, noise(pos + t)), 1.0);
            }`,
    uniforms: {
      positions: { value: positions },
      uTime: { value: 0 },
      uCurlFreq: { value: 0.25 },
    },
  });
});

// display the particles on canvas

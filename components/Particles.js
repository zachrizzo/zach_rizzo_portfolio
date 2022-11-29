import { useLoader, PointsMaterialProps, useFrame } from "@react-three/fiber";

import React, { useMemo, useState, useRef } from "react";
//points import
import { useFBO } from "@react-three/drei";
import * as THREE from "three";
import circleImg from "../assets/circle.png";

export default function Particles() {
  //const texture = useLoader(THREE.TextureLoader, circleImg);
  var size = 512;
  const count = 1000;
  const simRef = useRef();
  const renderRef = useRef();
  const [scene] = useState(() => new THREE.Scene());
  const [camera] = useState(
    () => new THREE.OrthographicCamera(-1, 1, 1, -1, 1 / Math.pow(2, 53), 1)
  );
  const [positions] = useState(
    () =>
      new Float32Array([
        -1, -1, 0, 1, -1, 0, 1, 1, 0, -1, -1, 0, 1, 1, 0, -1, 1, 0,
      ])
  );
  const [uvs] = useState(
    () => new Float32Array([0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0])
  );

  const target = useFBO(size, size, {
    minFilter: THREE.NearestFilter,
    magFilter: THREE.NearestFilter,
    format: THREE.RGBAFormat,
    type: THREE.FloatType,
  });

  let position = useMemo(() => {
    const length = size * size;
    const particles = new Float32Array(length * 3);
    for (let i = 0; i < length; i++) {
      let i3 = i * 3;
      particles[i3 + 0] = (i % size) / size;
      particles[i3 + 1] = i / size / size;
    }
    return particles;
  }, [size]);

  // connect the points with lines if too close
  let lines = [];
  let linesM = useMemo(() => {
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        let a = new THREE.Vector3(
          positions[i * 3],
          positions[i * 3 + 1],
          positions[i * 3 + 2]
        );
        let b = new THREE.Vector3(
          positions[j * 3],
          positions[j * 3 + 1],
          positions[j * 3 + 2]
        );
        let dist = a.distanceTo(b);
        if (dist < 5) {
          lines.push(i, j);
        }
      }
    }

    return new Uint16Array(lines);
  }, [count, positions]);

  //make the points move around
  let velocities = useMemo(() => {
    let velocities = [];
    for (let i = 0; i < count; i++) {
      velocities.push(
        (Math.random() - 0.5) * 0.5,
        (Math.random() - 0.5) * 0.3,
        (Math.random() - 0.5) * 0.01
      );
    }

    return new Float32Array(velocities);
  });
  //make the points move  towards the each other
  useFrame((state) => {});

  //draw lines between points if they are 5 units apart

  const pointsRef = React.useRef();
  const linesRef = React.useRef();

  //set the material
  const material = useMemo(
    () => ({
      color: "white",
      size: 0.005,
      transparent: true,
      opacity: 0.5,
      //map: texture,
    }),
    []
  );
  //points geometry
  const geometry = useMemo(() => {
    return new THREE.BufferGeometry().setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );
  }, [positions]);
  //lines geometry
  const linesGeometry = useMemo(() => {
    return new THREE.BufferGeometry().setAttribute(
      "position",
      new THREE.BufferAttribute(new Float32Array(linesM), 1)
    );
  }, [linesM]);

  return (
    <group>
      <points
        ref={pointsRef}
        position={[0, 0, 0]}
        geometry={geometry}
        material={material}
      >
        <pointsMaterial color="white" size={0.05} attach="material" />
      </points>
      <line ref={linesRef} geometry={linesGeometry} material={material}>
        <lineBasicMaterial attach="material" color="white" />
      </line>
    </group>
  );
}

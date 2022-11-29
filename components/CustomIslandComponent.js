import React, { useState, useEffect, useRef } from "react";
import {
  Html,
  useGLTF,
  softShadows,
  ScrollControls,
  useScroll,
  useTexture,
  OrbitControls,
  CameraShake,
  Sphere,
  MeshDistortMaterial,
  Circle,
  Point,
  Points,
  Environment,
  PerspectiveCamera,
  Float,
  PresentationControls,
} from "@react-three/drei";
import { GodRays } from "@react-three/postprocessing";
import { BlendFunction, Resizer, KernelSize } from "postprocessing";
import { useRouter } from "next/router";
import { Color, CylinderGeometry, Mesh, MeshBasicMaterial } from "three";
import { Suspense, useMemo } from "react";
import FloatingIsland from "../components/FloatingIsland";
import PortalComponent from "../components/PortalComponent";
import IslandRocks from "../components/IslandRocks";
import FloatingRocks from "../components/FloatingRocks";
import IslandTrees from "../components/IslandTrees";
import Text from "../components/Text";
import Grass from "../components/Grass";
import SceneParticles from "../components/SceneParticles";
import {
  BrightnessContrast,
  ChromaticAberration,
  DepthOfField,
  EffectComposer,
  HueSaturation,
} from "@react-three/postprocessing";
import { useFrame } from "@react-three/fiber";

export default function CustomIslandComponent({ key, position }) {
  let lightColor = new Color(1, 0.2, 0.1);
  let mesh = new Mesh(
    new CylinderGeometry(0.3, 0.3, 0.2, 20),
    new MeshBasicMaterial({
      color: lightColor,
      transparent: true,
      opacity: 1,
    })
  );
  mesh.rotation.x = Math.PI * 0.5;
  mesh.position.set(1.17, 10.7, -4.1);
  mesh.scale.set(1.5, 1, 1);

  return (
    <>
      <Float
        position={position}
        key={key}
        speed={0.5}
        rotationIntensity={0.6}
        floatIntensity={0.6}
      >
        {/* <primitive object={mesh} /> */}
        <spotLight
          penumbra={1}
          distance={500}
          angle={60.65}
          attenuation={1}
          anglePower={3}
          intensity={0.3}
          color={lightColor}
          position={[1.19, 10.85, -4.45]}
          target-position={[0, 0, -1]}
        />

        {/* <PortalComponent /> */}
        <FloatingIsland key={key} />
        {/* <IslandTrees /> */}
        <IslandRocks />
        <Grass />
        {/* <SceneParticles /> */}
        <Text
          subTextPosition={[3.75, 6.5, 0.75]}
          mainTextPosition={[3.5, 7, 0]}
          mainText={"Zach Rizzo"}
          subtext={"Software Engineer"}
        />
        <Text
          subTextPosition={[-5.75, 6.8, 3.75]}
          subRotation={[0, 0.3, -0.05]}
          // mainTextPosition={[3.5, 7, 0]}
          // mainText={"Zach Rizzo"}
          subtext={"Zoom in To Portal to See More"}
          subTextSize={0.3}
        />
      </Float>
    </>
  );
}

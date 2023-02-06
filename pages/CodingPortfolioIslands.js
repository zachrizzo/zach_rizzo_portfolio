import React from "react";
import Head from "next/head";
import Image from "next/image";
//import Loader
import { useState } from "react";
// import ParticlesNoise from "../components/ParticlesNoise";
import { useLoader, Canvas, useFrame, useThree } from "@react-three/fiber";

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
import FloatingIsland from "../components/FloatingIsland";

import { Color, CylinderGeometry, Mesh, MeshBasicMaterial } from "three";
import { Suspense, useMemo } from "react";
import CustomIslandComponent from "../components/CustomIslandComponent";
import ThreeJSImageAndTextComponent from "../components/ThreeJSImageAndTextComponent";

export default function CodingPortfolioIslands() {
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      console.log("Latitude is :", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
    });
  });
  return (
    <div className="flex flex-col w-full h-[100vh] items-center justify-center py-2">
      <main className="flex justify-center items-center w-full h-full">
        <Canvas
          className=" flex justify-center items-center w-full h-full  "
          shadows={true}
        >
          {/* <ambientLight intensity={0.5} /> */}

          <directionalLight position={[-2, -5, -2]} intensity={1} />
          <pointLight position={[50, 70, -90]} />
          <Suspense fallback={null}>
            {/* <Environment background={"only"} files={"/bg.hdr"} />
            <Environment background={false} files={"/envmap.hdr"} /> */}
            <ThreeJSImageAndTextComponent
              image={[
                "/portfolioImages/useFullRobot/IMG_0085.JPG",
                "/portfolioImages/useFullRobot/IMG_0086.JPG",
              ]}
              mainText={"Useful Robot"}
              subText={"A robot that can be used to help people"}
            />

            <OrbitControls
              minDistance={13}
              maxDistance={25}
              enablePan={false}
              //allow to move the camera around the scene
              enableZoom={false}
              //allow to zoom in and out
              enableRotate={false}
              //allow to rotate the camera around the scene
            />
          </Suspense>
        </Canvas>
      </main>
    </div>
  );
}

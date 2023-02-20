import React, { useState, useEffect, useRef, Suspense } from "react";
import {
  ScrollControls,
  OrbitControls,
  Environment,
  PerspectiveCamera,
  Float,
} from "@react-three/drei";
import { GodRays } from "@react-three/postprocessing";
import { BlendFunction, Resizer, KernelSize } from "postprocessing";
import { useRouter } from "next/router";
import { Color, CylinderGeometry, Mesh, MeshBasicMaterial } from "three";
import { Canvas } from "@react-three/fiber";

export default function ShowVideosThreeJs() {
  const loadingFunction = () => {
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }, []);

    //create a spinner using tailwind
    if (loading) {
      return (
        <div className="flex items-center flex-col justify-center">
          <div className="h-20 w-20 animate-spin rounded-full border-b-4 border-[#0E19EE]"></div>
          <h1 className=" text-xl m-5">Loading...</h1>
        </div>
      );
    }
  };
  return (
    <div className=" h-[500px] w-full">
      <Suspense fallback={loadingFunction()}>
        <Canvas className=" flex justify-center items-center w-full h-full  ">
          {/* <ambientLight intensity={0.5} /> */}

          <directionalLight position={[-2, -5, -2]} intensity={1} />
          <pointLight position={[50, 70, -90]} />

          {/* <FloatingIslandSeen /> */}
        </Canvas>
      </Suspense>
    </div>
  );
}

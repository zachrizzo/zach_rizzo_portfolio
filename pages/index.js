import Head from "next/head";
import Image from "next/image";
//import Loader
import { useState } from "react";
// import ParticlesNoise from "../components/ParticlesNoise";
import { useLoader, Canvas, useFrame, useThree } from "@react-three/fiber";
//import circleImg from "/Users/zachrizzo/personal_portfolio_2.0/assets/circle.png";
//import Particles from "../components/Particles";
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
import FloatingIslandSeen from "../components/FloatingIslandSeen";

const Home = () => {
  const y = [1, 2, 3, 4];
  var numberOfP = Array(10);

  const [godRaysExposure, setGodRaysExposure] = useState(0.3);
  const [godRaysDecay, setGodRaysDecay] = useState(0.97);
  const [godRaysDensity, setGodRaysDensity] = useState(0.97);
  const [godRaysWeight, setGodRaysWeight] = useState(0.6);

  const Particle = numberOfP.map((i) => {
    return (
      <Sphere
        key={Math.random()}
        position={[Math.random() * i, 1 + i, Math.random() + i]}
        args={[1, 100, 200]}
        // rotation={3}
        scale={0.5}
      >
        <MeshDistortMaterial
          time={2 * i}
          speed={1 * i}
          color={"#ffffff"}
          attach="material"
        />
      </Sphere>
    );
  });
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

  //when i scroll in use the useFrame hook to increase the godRaysExposure

  return (
    <div className="flex flex-col w-full h-[100vh] items-center justify-center py-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex justify-center items-center w-full h-full">
        <Canvas className=" flex justify-center items-center w-full h-full  ">
          {/* <ambientLight intensity={0.5} /> */}

          <directionalLight position={[-2, -5, -2]} intensity={1} />
          <pointLight position={[50, 70, -90]} />
          <Suspense fallback={null}>
            <FloatingIslandSeen />
            {/* <Particles /> */}
            {/* <Sphere
              key={Math.random()}
              position={[0, 0, 0]}
              args={[1, 100, 200]}
              // rotation={3}
              scale={2}
            >
              <MeshDistortMaterial
                time={2}
                speed={1}
                color={"#7B3AF5"}
                attach="material"
              />
            </Sphere> */}
          </Suspense>
        </Canvas>
      </main>

      {/* <footer className="flex h-24 w-full items-center justify-center border-t">
        <a
          className="flex items-center justify-center gap-2"
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
        </a>
      </footer> */}
    </div>
  );
};

export default Home;

import Head from "next/head";

import { useState } from "react";

import { Canvas } from "@react-three/fiber";

import { Sphere, MeshDistortMaterial } from "@react-three/drei";
import { Color, CylinderGeometry, Mesh, MeshBasicMaterial } from "three";
import { Suspense } from "react";

import FloatingIslandSeen from "../components/FloatingIslandSeen";

export function getServerSideProps() {
  return {
    props: {},
  };
}

const Home = () => {
  const y = [1, 2, 3, 4];
  var numberOfP = Array(10);

  // const [godRaysExposure, setGodRaysExposure] = useState(0.3);
  // const [godRaysDecay, setGodRaysDecay] = useState(0.97);
  // const [godRaysDensity, setGodRaysDensity] = useState(0.97);
  // const [godRaysWeight, setGodRaysWeight] = useState(0.6);

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
          </Suspense>
        </Canvas>
      </main>
    </div>
  );
};

export default Home;

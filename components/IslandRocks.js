import React from "react";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export default function IslandRocks() {
  const gltf = useLoader(GLTFLoader, "/models/floating_island/rocks.glb");
  return <primitive object={gltf.scene} />;
}

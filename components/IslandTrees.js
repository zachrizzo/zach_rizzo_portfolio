import { useLoader } from "@react-three/fiber";
import { useEffect } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import React from "react";

export default function IslandTrees() {
  const gltf = useLoader(GLTFLoader, "/models/floating_island/trees.glb");

  useEffect(() => {
    if (!gltf) return;

    let mesh = gltf.scene.children[0];
    mesh.material.envMapIntensity = 2.5;
  }, [gltf]);

  return <primitive object={gltf.scene} />;
}

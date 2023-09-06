import React, { useEffect, useState } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import {
  Scene,
  WebGLRenderTarget,
  TextureLoader,
  EquirectangularReflectionMapping,
  AlwaysStencilFunc,
  ReplaceStencilOp,
  DoubleSide,
  LinearEncoding,
} from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { FillQuad } from "../FillQuad";

export default function Portal() {
  const [target, setTarget] = useState(null);
  const [scene, setScene] = useState(new Scene()); // Initialize scene state
  const model = useLoader(GLTFLoader, "/models/floating_island/portal.glb");
  const mask = useLoader(GLTFLoader, "/models/floating_island/portal_mask.glb");

  useEffect(() => {
    const newScene = new Scene();
    newScene.background = new TextureLoader().load(
      "/galaxy.jpeg",
      (texture) => {
        texture.encoding = LinearEncoding;
        texture.mapping = EquirectangularReflectionMapping;
      }
    );

    setScene(newScene); // Update scene state

    const newTarget = new WebGLRenderTarget(
      window.innerWidth,
      window.innerHeight,
      {
        stencilBuffer: false,
      }
    );

    setTarget(newTarget);

    const handleResize = () => {
      newTarget.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useFrame((state) => {
    if (!state?.gl || !scene) return; // Make sure scene is available
    state.gl.setRenderTarget(target);
    state.gl.render(scene, state.camera);
    state.gl.setRenderTarget(null);
  });

  useEffect(() => {
    if (!model || !mask) return;

    let mesh = model.scene.children[0];
    mesh.material.envMapIntensity = 3.5;

    let maskMesh = mask.scene.children[0];
    maskMesh.material.transparent = false;
    maskMesh.material.side = DoubleSide;
    maskMesh.material.stencilFunc = AlwaysStencilFunc;
    maskMesh.material.stencilWrite = true;
    maskMesh.material.stencilRef = 1;
    maskMesh.material.stencilZPass = ReplaceStencilOp;
  }, [model, mask]);

  return (
    <>
      {model && <primitive object={model.scene} />}
      {mask && <primitive object={mask.scene} />}
      {target && <FillQuad map={target.texture} maskId={1} />}
    </>
  );
}

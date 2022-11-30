import { useFrame, useLoader } from "@react-three/fiber";
import { useEffect } from "react";
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

const scene = new Scene();
var target;
//add event listener to check if document is defined

if (typeof window !== "undefined") {
  document.addEventListener("DOMContentLoaded", function () {
    scene.background = new TextureLoader().load("/galaxy.jpeg", (texture) => {
      texture.encoding = LinearEncoding;
      texture.mapping = EquirectangularReflectionMapping;
    });
    target = new WebGLRenderTarget(window.innerWidth, window.innerHeight, {
      stencilBuffer: false,
    });
    window.addEventListener("resize", () => {
      target.setSize(window.innerWidth, window.innerHeight);
    });
  });
}

export default function Portal() {
  // thanks to https://sketchfab.com/3d-models/portal-frame-da34b37a224e4e49b307c0b17a50af2c
  const model = useLoader(GLTFLoader, "/models/floating_island/portal.glb");
  const mask = useLoader(GLTFLoader, "/models/floating_island/portal_mask.glb");

  useFrame((state) => {
    state?.gl?.setRenderTarget(target);
    state?.gl?.render(scene, state.camera);
    state?.gl?.setRenderTarget(null);
  });
  //check if document is defined

  useEffect(() => {
    if (!model) return;

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
      <primitive object={model.scene} />
      <primitive object={mask.scene} />

      <FillQuad map={target?.texture} maskId={1} />
    </>
  );
}

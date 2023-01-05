import React, { useState, useEffect, useRef } from "react";
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

import FloatingIsland from "../components/FloatingIsland";
import PortalComponent from "../components/PortalComponent";
import IslandRocks from "../components/IslandRocks";
import FloatingRocks from "../components/FloatingRocks";
import IslandTrees from "../components/IslandTrees";
import Text from "../components/Text";
import Grass from "./Grass";
import SceneParticles from "../components/SceneParticles";
import {
  BrightnessContrast,
  ChromaticAberration,
  DepthOfField,
  EffectComposer,
  HueSaturation,
} from "@react-three/postprocessing";
import { useFrame } from "@react-three/fiber";

export default function FloatingIslandSeen() {
  const cameraRef = useRef();
  const [godRaysExposure, setGodRaysExposure] = useState(0.3);
  const [godRaysDecay, setGodRaysDecay] = useState(0.97);
  const [godRaysDensity, setGodRaysDensity] = useState(0.97);
  const [godRaysWeight, setGodRaysWeight] = useState(0.6);
  const [startingCameraX, setStartingCameraX] = useState(0);
  const [startingCameraY, setStartingCameraY] = useState(0);
  const [subTextOnePosition, setSubTextOnePosition] = useState([
    3.75, 6.5, 0.75,
  ]);
  const [subTextTwoPosition, setSubTextTwoPosition] = useState([
    -5.75, 6.8, 3.75,
  ]);
  const [mainTextOnePosition, setMainTextOnePosition] = useState([3.5, 7, 0]);
  const [mainTextSize, setMainTextSize] = useState(1);
  const [subTextOneRotation, setSubTextOneRotation] = useState([
    0, -0.2, -0.05,
  ]);
  const [subTextTwoRotation, setSubTextTwoRotation] = useState([0, 0.3, -0.05]);
  const [mainTextOneRotation, setMainTextOneRotation] = useState([
    0, -0.35, -0.05,
  ]);
  const [userZoomedIntoPortal, setUserZoomedIntoPortal] = useState(false);

  const router = useRouter();

  useEffect(() => {
    //get screen size
    const width = window.innerWidth;
    const height = window.innerHeight;
    //if its a mobile device
    if (width < 600) {
      //set the text position
      setSubTextOnePosition([-2.5, 6.5, 7.75]);
      setSubTextTwoPosition([-2, 12, 3.75]);
      setMainTextOnePosition([-1.5, 6.5, 3]);
      setMainTextSize(0.5);
      setSubTextOneRotation([0, -0.2, -0.05]);
      setSubTextTwoRotation([0, 0.3, -0.05]);
      setMainTextOneRotation([0, -0.3, 0]);
    }
  }, []);

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

  var maxScrollX = 9;
  var minScrollX = -6;
  var maxScrollY = 12;
  var minScrollY = 7;

  useEffect(() => {
    setStartingCameraX(cameraRef.current.position.x);
    setStartingCameraY(cameraRef.current.position.y);
  }, []);
  useEffect(() => {
    if (userZoomedIntoPortal) {
      router.replace("/BasicPortfolioPage2");
    }
  }, [userZoomedIntoPortal]);

  useFrame(({ clock }) => {
    var middleOfScrollX = (maxScrollX - minScrollX) / 2;
    var middleOfScrollY = (maxScrollY - minScrollY) / 2;

    // set the percentage of the camera from the starting camera position to the middle of the scroll
    var percentageX =
      (cameraRef.current.position.x - startingCameraX) / middleOfScrollX;
    var percentageY =
      (cameraRef.current.position.y - startingCameraY) / middleOfScrollY;
    // console.log(percentageX * 100);
    // console.log(cameraRef.current.position);

    if (
      cameraRef.current.position.x > minScrollX &&
      cameraRef.current.position.x < maxScrollX &&
      cameraRef.current.position.y > minScrollY &&
      cameraRef.current.position.y < maxScrollY &&
      cameraRef.current.position.z < 13
    ) {
      const IncreaseGodRays = async () => {
        for (let i = 0; i < percentageX * 100; i++) {
          if (i > 10) {
            setGodRaysExposure(i / 10);
            // setGodRaysDecay(i / 15);
            setGodRaysDensity(i / 12);
            //   setGodRaysWeight(i) / 800;
          }
        }
        await new Promise((r) => setTimeout(r, 4000));
      };
      IncreaseGodRays().then(() => {
        setUserZoomedIntoPortal(true);
      });
    } else {
      //set good rays back to normal
      setGodRaysExposure(0.3);
      setGodRaysDecay(0.97);
      setGodRaysDensity(0.97);
      setGodRaysWeight(0.6);
    }
  });

  return (
    <>
      <ScrollControls damping={0.1}>
        <Environment background={"only"} files={"/bg.hdr"} />
        <Environment background={false} files={"/envmap.hdr"} />

        <PerspectiveCamera
          ref={cameraRef}
          makeDefault
          fov={50}
          position={[-1.75, 10.85, 20.35]}
        />
        <OrbitControls
          target={[1, 5, 0]}
          //set max and min distance of the camera zoom
          minDistance={13}
          maxDistance={25}
          //get the camera position

          //set max and min angle of the camera
          minPolarAngle={Math.PI / -30}
          maxPolarAngle={Math.PI / 2.3}
          //get the zoom position of the camera
        />

        <Float speed={0.5} rotationIntensity={0.6} floatIntensity={0.6}>
          <primitive object={mesh} />
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

          <PortalComponent />
          <FloatingIsland />
          <IslandTrees />
          <IslandRocks />
          <Grass />
          <SceneParticles />
          <Text
            subTextPosition={subTextOnePosition}
            mainTextPosition={mainTextOnePosition}
            subRotation={subTextOneRotation}
            mainText={"Zach Rizzo"}
            subtext={"Software Engineer"}
            mainTextSize={mainTextSize}
            mainRotation={mainTextOneRotation}
          />
          <Text
            subTextPosition={subTextTwoPosition}
            subRotation={subTextTwoRotation}
            // mainTextPosition={[3.5, 7, 0]}
            // mainText={"Zach Rizzo"}
            subtext={"Zoom in To Portal to See More"}
            subTextSize={0.3}
          />
        </Float>

        <FloatingRocks />

        <EffectComposer stencilBuffer={true}>
          <DepthOfField
            focusDistance={0.012}
            focalLength={0.015}
            bokehScale={7}
          />
          <HueSaturation hue={0} saturation={-0.15} />
          <BrightnessContrast brightness={0.0} contrast={0.035} />
          <ChromaticAberration
            radialModulation={true}
            offset={[0.00175, 0.00175]}
          />
          <GodRays
            sun={mesh}
            blendFunction={BlendFunction.Screen}
            samples={40}
            density={godRaysDensity}
            decay={godRaysDecay}
            weight={godRaysWeight}
            exposure={godRaysExposure}
            clampMax={1}
            width={Resizer.AUTO_SIZE}
            height={Resizer.AUTO_SIZE}
            kernelSize={KernelSize.SMALL}
            blur={true}
          />
        </EffectComposer>
      </ScrollControls>
    </>
  );
}

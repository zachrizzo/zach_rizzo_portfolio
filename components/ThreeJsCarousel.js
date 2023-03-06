import React, { useEffect } from "react";
import * as THREE from "three";
import { useRef, useState } from "react";
import { Canvas, useFrame, useThree, useLoader } from "@react-three/fiber";
import {
  Image,
  ScrollControls,
  Scroll,
  useScroll,
  MeshReflectorMaterial,
  SpotLight,
} from "@react-three/drei";
import { useSnapshot } from "valtio";
import { Minimap } from "./MiniMap";
// import { damp } from "./util.js";
import { proxy } from "valtio";

import { VideoTexture } from "three";

function Item({
  aspectRatio,
  state,
  index,
  position,
  scale,
  screenWidth,
  device,
  video,
  c = new THREE.Color(),
  ...props
}) {
  // console.log(aspectRatio);
  const damp = THREE.MathUtils.damp;
  const ref = useRef();
  const scroll = useScroll();
  const { clicked, urls } = useSnapshot(state);
  const [hovered, hover] = useState(false);
  const click = () => (state.clicked = clicked === index ? index : index);

  useEffect(() => {
    if (clicked != null) {
      // ref.current.position.x = damp(
      //   ref.current.position.x,
      //   position[0],
      //   6,
      //   0.016
      // );
      console.log("clicked", clicked);
      console.log("index", index);
    }
  }, [clicked]);

  const over = () => hover(true);
  const out = () => hover(false);
  //get the width of the image currently clicked

  useFrame((state, delta) => {
    const y = scroll.curve(
      index / urls.length - 1.5 / urls.length,
      4 / urls.length
    );
    // const y = scroll.curve(
    //   index / urls.length - 1.5 / urls.length,
    //   4 / urls.length
    // );

    ref.current.material.scale[1] = ref.current.scale.y = damp(
      ref.current.scale.y,
      clicked === index
        ? device == "desktop"
          ? aspectRatio[clicked] == "landscape"
            ? 5
            : 7.5
          : aspectRatio[clicked] == "landscape"
          ? screenWidth / 3
          : screenWidth / 1.9
        : device == "desktop"
        ? 4 + y
        : 4,
      8,
      delta
    );
    ref.current.material.scale[0] = ref.current.scale.x = damp(
      ref.current.scale.x,
      clicked === index
        ? device == "desktop"
          ? aspectRatio[clicked] == "landscape"
            ? 10
            : 3.5
          : aspectRatio[clicked] == "landscape"
          ? screenWidth / 1.5
          : screenWidth / 4
        : scale[0],
      6,
      delta
    );
    if (clicked !== null && index < clicked)
      ref.current.position.x = damp(
        ref.current.position.x,
        aspectRatio[clicked] == "landscape"
          ? device == "desktop"
            ? position[0] - 5
            : position[0] - 2.5
          : device == "desktop"
          ? position[0] - 2
          : position[0] - 1,
        6,
        delta
      );
    if (clicked !== null && index > clicked)
      ref.current.position.x = damp(
        ref.current.position.x,
        aspectRatio[clicked] == "landscape"
          ? device == "desktop"
            ? position[0] + 5
            : position[0] + 2.5
          : device == "desktop"
          ? position[0] + 2
          : position[0] + 1,
        6,
        delta
      );
    if (clicked === null || clicked === index)
      ref.current.position.x = damp(
        ref.current.position.x,
        position[0],
        6,
        delta
      );
    ref.current.material.grayscale = damp(
      ref.current.material.grayscale,
      hovered || clicked === index ? 0 : Math.max(0, 1 - y),
      6,
      delta
    );
    ref.current.material.color.lerp(
      c.set(hovered || clicked === index ? "white" : "#aaa"),
      hovered ? 0.3 : 0.1
    );
  });

  const [videoTextures] = useState(() =>
    Object.assign(document.createElement("video"), {
      src: props.url,
      crossOrigin: "Anonymous",
      loop: true,
    })
  );

  if (video == false && props.url) {
    return (
      <meshPhysicalMaterial
        clearcoat={1}
        clearcoatRoughness={0}
        toneMapped={false}
        ref={ref}
        // onPointerOver={over}
        // onPointerOut={out}
        // position={position}
        // scale={scale}
        // onClick={click}
      >
        <videoTexture
          attach="map"
          args={[videoTextures]}
          flipY={false}
          repeat={[5, 9]}
          offset={[-0.1, 0]}
          wrapT={THREE.RepeatWrapping}
          wrapS={THREE.RepeatWrapping}
          encoding={THREE.sRGBEncoding}
        />
      </meshPhysicalMaterial>
    );
  } else {
    return (
      <Image
        ref={ref}
        // {...props}
        url={props.url}
        position={position}
        scale={scale}
        onClick={click}
        onPointerOver={over}
        onPointerOut={out}
      />
    );
  }
}

function Items({ w = 0.7, gap = 0.15, state1 }) {
  // const state1 = state;
  const { clicked, urls, aspectRatio, video } = useSnapshot(state1);
  var device = "mobile";
  // console.log(aspectRatio);
  // const urls = state1;
  // console.log(state1);
  const { width } = useThree((state) => state.viewport);
  if (width > 8) {
    device = "desktop";
  }
  const xW = w + gap;
  return (
    <ScrollControls
      horizontal
      damping={0.1}
      pages={(width - xW + urls.length * xW) / width}
    >
      <Minimap state={state1} />
      <Scroll>
        {
          urls.map((url, i) => <Item   key={i} index={i} device={device} screenWidth={width} aspectRatio={aspectRatio} video={video}  position={[i * xW, 0, 0]} scale={[w, 4, 1]} url={url} state={state1} />) /* prettier-ignore */
        }
      </Scroll>
    </ScrollControls>
  );
}

export default function ThreeJsCarousel({ urls }) {
  return (
    <Canvas
      className=" w-full [&::-webkit-scrollbar]:hidden overflow-clip"
      gl={{ antialias: false }}
      dpr={[1, 1.5]}
      onPointerMissed={() => (urls.clicked = null)}
    >
      <ambientLight position={[0, 6, 0]} intensity={0.07} />

      <Items state1={urls} />

      {/* <mesh position={[0, -2.6, 0]} rotation={[-Math.PI / 1.9, 0, 0]}>
        <planeGeometry args={[50, 50]} />
        <MeshReflectorMaterial
          blur={[300, 100]}
          resolution={2048}
          mixBlur={1}
          mixStrength={0.3}
          roughness={1}
          depthScale={1.2}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#FFFFFF"
          metalness={0.5}
        />
      </mesh> */}
    </Canvas>
  );
}

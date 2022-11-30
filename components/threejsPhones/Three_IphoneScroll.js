import * as THREE from "three";
import { forwardRef, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Html,
  useGLTF,
  softShadows,
  ScrollControls,
  useScroll,
  useTexture,
  Image,
} from "@react-three/drei";
import useRefs from "react-use-refs";
import Iphone13proMax2 from "./Iphone_max2";
import Iphone13ProMax from "./Iphone13ProMax";
import IpadPro from "./Ipad";
import classNames from "classnames";

softShadows();
const rsqw = (t, delta = 0.1, a = 1, f = 1 / (2 * Math.PI)) =>
  (a / Math.atan(1 / delta)) * Math.atan(Math.sin(2 * Math.PI * t * f) / delta);

export default function IphoneScroll({ enabled, pages }) {
  return (
    <Canvas
      shadows
      className="h-[100vh] w-[100vw]"
      dpr={[1, 2]}
      camera={{ position: [0, -3.2, 40], fov: 12 }}
    >
      <ScrollControls enabled={enabled} pages={8}>
        <Composition />
      </ScrollControls>
    </Canvas>
  );
}

function Composition({ ...props }) {
  const scroll = useScroll();
  const { width, height } = useThree((state) => state.viewport);
  const [visableState, setVisibleState] = useState("hidden");
  const [visableState2, setVisibleState2] = useState("hidden");
  const [visableState3, setVisibleState3] = useState("hidden");
  const [tagLocation1, setTagLocation1] = useState("ml-[400px]");
  const [tagLocation2, setTagLocation2] = useState("ml-[600px]");
  useEffect(() => {
    const responsive = () => {
      if (width <= 11) {
        // console.log(width);
        setTagLocation1("mt-[800px], ml-[200px]");
        setTagLocation2("mt-[400px], ml-[200px]");
      } else {
        setTagLocation1("ml-[400px]");
        setTagLocation2("ml-[600px]");
      }
    };
    return () => {
      responsive();
    };
  }, [width]);

  const group = useRefs();
  const mbp16 = useRefs();
  const mbp14 = useRefs();
  const keyLight = useRefs();
  const stripLight = useRefs();
  const fillLight = useRefs();
  const log = useRefs();
  const left = useRefs();
  const right = useRefs();
  const phone3 = useRefs();
  const todo = useRefs();

  //   const [textureRed, textureBlue] = useTexture([
  //     '/Chroma Red.jpg',
  //     '/Chroma Blue.jpg',
  //   ])
  useFrame((state, delta) => {
    const r1 = scroll.range(0 / 4, 1 / 4);
    const r2 = scroll.range(1 / 7, 1 / 4);
    const r3 = scroll.visible(0 / 4, 1 / 4);
    const r4 = scroll.visible(1 / 4, 1 / 1 / 2);
    const r5 = scroll.range(6 / 8, 1 / 4);
    const r6 = scroll.visible(7 / 8, 1 / 4);
    if (r3) {
      setVisibleState("visible");
    } else if (!r3) {
      setVisibleState("hidden");
    }
    if (r4) {
      setVisibleState2("visible");
    } else if (!r4) {
      setVisibleState2("hidden");
    }
    if (r6) {
      setVisibleState3("visible");
    } else if (!r6) {
      setVisibleState3("hidden");
    }
    mbp16.current
      ? (mbp16.current.rotation.x =
          Math.PI - (Math.PI / 2) * rsqw(r1) + r2 * 0.33)
      : null;
    mbp14.current
      ? (mbp14.current.rotation.x =
          Math.PI - (Math.PI / 2) * rsqw(r1) - r2 * 0.33)
      : null;
    // phone3.current
    //   ? (phone3.current.rotation.x =
    //       Math.PI - (Math.PI / 2) * rsqw(r2) - r4 * 0.33)
    //   : null
    group.current.rotation.y = THREE.MathUtils.damp(
      group.current.rotation.y,
      (-Math.PI / 1) * r5,
      4,
      delta
    );
    group.current.rotation.y = THREE.MathUtils.damp(
      group.current.rotation.y,
      (-Math.PI / 0.7) * r2,
      4,
      delta
    );
    group.current.position.x = THREE.MathUtils.damp(
      group.current.position.x,
      (-width / 10) * r2,
      4,
      delta
    );
    group.current.scale.x =
      group.current.scale.y =
      group.current.scale.z =
        THREE.MathUtils.damp(
          group.current.scale.z,
          1 + 0.24 * (1 - rsqw(r1)),
          4,
          delta
        );
    keyLight.current.position.set(
      0.25 + -15 * (1 - r1),
      4 + 11 * (1 - r1),
      3 + 2 * (1 - r1)
    );
    left.current ? left.current.classList.toggle("show", r3) : null;
    right.current ? right.current.classList.toggle("show", r3) : null;
    phone3.current ? phone3.current.classList.toggle("show", r4) : null;
  });
  //is it on a phone?
  const isMobile = window.innerWidth <= 700;

  // useFrame(() => {
  //   todo.current.material.width = todo.current.material.zoom = 3 // 1 and higher
  //   todo.current.material.grayscale = 1 // between 0 and 1
  //   // ref.current.material.color.set(...) // mix-in color
  // })
  return (
    <>
      <spotLight position={[0, -width * 0.7, 0]} intensity={0.5} />
      <directionalLight ref={keyLight} castShadow intensity={6}>
        <orthographicCamera
          attachObject={["shadow", "camera"]}
          args={[-10, 10, 10, -10, 0.5, 30]}
        />
      </directionalLight>
      <group ref={group} position={[0, -height / 3.65, 0]} {...props}>
        <spotLight
          ref={stripLight}
          position={[width * 2.5, 0, width]}
          angle={0.19}
          penumbra={1}
          intensity={0.25}
        />
        <spotLight
          ref={fillLight}
          position={[0, -width / 2.4, -width * 2.2]}
          angle={0.2}
          penumbra={1}
          intensity={2}
          distance={width * 3}
        />
        {/* <Iphone13proMax2 ref={mbp16} Gltf={'/iphone_ToDo.gltf'}> */}
        <group
          position={
            isMobile == 700 ? [width * 1.5, 0, 0] : [width * 0.08, 0, 0]
          }
        >
          <IpadPro ref={mbp16} PositionArray={[-1.5, -1, 0]}></IpadPro>
          <Image
            scale={[4.5, 5.9, 2]}
            position={[-1.5, 2.1, 0]}
            ref={todo}
            url="/FlowTeam/Screens/screen_baseColor.jpeg"
          />
          <Tag
            ref={right}
            // title="Flow Team"
            // Description=" Allowed Employees to clockin and clockout of their shifts. This allowed the company to track the amount of hours worked by each employee. Fall messaging capability is very similar to slack with different channels. "
            visableState={visableState}
            marginLeft={tagLocation1}
          />
          <Iphone13ProMax
            rotationArray={[Math.PI / 2, 5.5, 0]}
            ref={mbp14}
            GLTF={"/FlowTeam/gltf/Iphone13ProMaxTodoScreen.gltf"}
            PositionArray={[-0.3, 2, 1.5]}
          >
            {/* <Iphone13proMax2 ref={mbp14} Gltf={'/iphone_ToDo.gltf'}> */}
          </Iphone13ProMax>
          <Image
            rotation={[0, -3.9, 0]}
            scale={[2.2, 4.75, 6]}
            position={[Math.PI / -13, 1.5, -2.08]}
            ref={todo}
            url="/FlowTeam/Screens/ToDoScreen.png"
          />
          <Tag
            ref={phone3}
            //title="To-Do:"
            //Description="Keep your team on track to achiving the"
            visableState={visableState2}
            marginLeft={tagLocation2}
          />

          <Iphone13ProMax
            rotationArray={[Math.PI / 2, 6.9, 0]}
            ref={phone3}
            GLTF={"/FlowTeam/gltf/Iphone13ProMaxTodoScreen.gltf"}
            PositionArray={[-2.7, 2, 1.5]}
          ></Iphone13ProMax>
          <Image
            rotation={[0, 3.76, 0]}
            scale={[2.2, 4.75, 6]}
            position={[-2.75, 1.5, -2.09]}
            ref={todo}
            url="/FlowTeam/Screens/messaging.png"
          />
          <Tag
            //title="Instant Messaging:"
            //Description="Keep track of who's where to make sure things are done right77"
            visableState={visableState3}
            marginLeft={tagLocation2}
          />
        </group>
        {/* <Html>
          <div>
            <h1> hi</h1>
          </div>
        </Html> */}

        {/* </Iphone13proMax2> */}
      </group>
    </>
  );
}

/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
author: akshatmittal (https://sketchfab.com/akshatmittal)
license: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
source: https://sketchfab.com/3d-models/2021-macbook-pro-14-m1-pro-m1-max-f6b0b940fb6a4286b18a674ef32af2d3
title: 2021 Macbook Pro 14" (M1 Pro / M1 Max)
*/

const Tag = forwardRef(
  ({ marginLeft, visableState, title, Description, ref }) => {
    return (
      <Html
        zIndexRange={[0, 0]}
        className=" z-10  "
        transform={true}
        sprite={true}
        ref={ref}
      >
        <div
          className={classNames(
            ` z-0 w-[150px] duration-500 ${visableState} mb-[300px] ${marginLeft}`
          )}
        >
          <h1 className=" text-left text-lg text-[#a631f0] opacity-90">
            {title}
          </h1>
          <h3 className=" text-[#e6e5e5] text-left text-xs ">{Description}</h3>
        </div>
      </Html>
    );
  }
);

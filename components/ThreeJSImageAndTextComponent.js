import { Float, Image, ScrollControls, useScroll } from "@react-three/drei";
import React from "react";
import Text from "./Text";
import { useThree } from "@react-three/fiber";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function ThreeJSImageAndTextComponent({
  mainText,
  subText,
  image,
}) {
  const scroll = useScroll();
  const { width, height } = useThree((state) => state.viewport);
  const yPosition = 0;

  const listOfImages = image.map((image, index) => {
    //for each image map a ref to it
    //as scroll increases the ref will be used to change the position of the image
    const ref = useRef();

    return (
      <Image
        key={index}
        ref={ref}
        src={image}
        position={[-8, index * 10.5 - yPosition * index, 0]}
        rotation={[0.1, 0.2, 0]}
        scale={[10, 10, 10]}
        url={image}
      />
    );
  });

  return (
    <>
      <Float speed={0.5} rotationIntensity={0.6} floatIntensity={0.6}>
        <ScrollControls
          //on scroll move the images to the left
          //on scroll move the text to the left
          pages={image.length}
        >
          {listOfImages}
          <Text
            mainText={mainText}
            subtext={subText}
            mainTextPosition={[-9, 5, 1]}
            subTextPosition={[2, 3, 0]}
            mainRotation={[0, -0.01, -0.05]}
          />
        </ScrollControls>
      </Float>
    </>
  );
}

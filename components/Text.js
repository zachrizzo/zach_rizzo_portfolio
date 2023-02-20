import { Float, Text3D } from "@react-three/drei";
import React from "react";
export default function Text({
  subTextPosition,
  mainTextPosition,
  subtext,
  mainText,
  subTextSize,
  subRotation,
  mainRotation,
  mainTextSize,
}) {
  return (
    <>
      <Float
        position={subTextPosition}
        rotation={subRotation ? subRotation : [0, -0.2, -0.05]}
        rotationIntensity={0.35}
        floatIntensity={0.5}
      >
        <Text3D
          font={"/fonts/Roboto_Regular.json"}
          size={subTextSize ? subTextSize : 0.4}
          height={0.065}
          curveSegments={12}
        >
          {subtext}
          <meshStandardMaterial
            emissive={[0.13, 0.12, 12]}
            color={"rgb(255, 255, 255)"}
          />
        </Text3D>
      </Float>

      <Float
        position={mainTextPosition}
        rotation={mainRotation ? mainRotation : [0, -0.35, -0.05]}
        rotationIntensity={0.35}
        floatIntensity={0.5}
      >
        <Text3D
          font={"/fonts/Roboto_Regular.json"}
          size={mainTextSize ? mainTextSize : 1}
          height={0.065}
          curveSegments={12}
        >
          {mainText}
          <meshStandardMaterial
            color={"rgb(171, 103, 245)"}
            emissive={[0.3, 0.2, 12]}
          />
        </Text3D>
      </Float>
    </>
  );
}

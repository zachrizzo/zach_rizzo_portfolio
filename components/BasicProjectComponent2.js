import React, { useEffect, useState, useRef, Suspense } from "react";

import MainButton from "./MainButton";
import { Cursor, useTypewriter } from "react-simple-typewriter";
import { motion } from "framer-motion";
import Carousel from "./carosel";

import NextImage from "next/image";
import { sendToDb } from "../firebase";
import ShowVideosThreeJs from "./ShowVideosThreeJs";
import { Particles } from "./ParticlesNoise";
import { useControls } from "leva";
import { Canvas } from "@react-three/fiber";
import { CameraShake, Html, OrbitControls } from "@react-three/drei";
import ThreeJsCarousel from "./ThreeJsCarousel";

export default function BasicProjectComponent2({
  title,
  description,
  threeJsImageProxy,
  projectLink,
  HIPPA,
  displayImage,
  lat,
  lng,
  NotifyDbOnClick,
}) {
  return (
    <div className=" text-center  mb-[20px] flex  justify-center w-full flex-col ">
      <div className=" w-full justify-center items-center grid-rows-4 flex-col flex">
        {/* title */}
        <div className="w-full md:mb-[40px] mb-[40px] text-center flex flex-col  justify-center items-center h-[10%] ">
          <h3 className=" text-center  uppercase tracking-[20px] text-gray-500 text-lg md:text-2xl">
            {title}
          </h3>
        </div>
        {displayImage}
        {HIPPA && (
          <h4 className="text-white my-10 text-lg md:text-xl flex flex-col italic ">
            <span className="underline text-xl md:text-2xl text-red-500">
              HIPPA
            </span>{" "}
            Law Prevents me from showing Videos or Images including patient
            Information
          </h4>
        )}

        <div className="flex w-full overflow-clip [&::-webkit-scrollbar]:hidden h-[500px] flex-col justify-center items-center">
          <ThreeJsCarousel urls={threeJsImageProxy} />
        </div>
        {/* descrption */}
        <div className="mb-[30px] flex justify-center items-center  h-[40%]  w-[100%]">
          <p className=" mx-5 md:mx-[300px] text-sm md:text-lg text-[#e9e9e9]  md:mt-[50px] text-center ">
            {description}
          </p>
        </div>
        {/* button */}
        <div className=" flex justify-center items-center mt-1 ">
          {projectLink != null && (
            <MainButton
              buttonText="View Code"
              onClick={() => {
                //send the user to link in a new tab
                window.open(projectLink, "_blank");
                if (NotifyDbOnClick) {
                  sendToDb({
                    project_button: title + "-code",
                    lat: lat,
                    lng: lng,
                  });
                }
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

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

export default function BasicProjectComponent2({
  images,
  title,
  description,

  onClick,
  imageButtons,
  listOfVideoIndexes,
  buttonText,
  projectLink,
  videosHorizontal,
  videosVertical,
  carousel,
  HIPPA,
  displayImage,
  lat,
  lng,
  NotifyDbOnClick,
}) {
  const [text, count] = useTypewriter({
    words: description,
    loop: false,
    typeSpeed: 50,
    delaySpeed: 3000,
  });
  const [showImages, setShowImages] = useState(false);
  const videoElement = useRef(null);

  // make a carousel of images
  //   const allImages = images.map((image, index) => {
  //     // get image dimensions
  //     var img = new Image();
  //     img.src = image;
  //     var width = img.width;
  //     var height = img.height;

  //     if (
  //       !listOfVideoIndexes.includes(index) ||
  //       listOfVideoIndexes == undefined ||
  //       listOfVideoIndexes == null
  //     ) {
  //       // get image dimensions

  //       if (width > height && width != 4023) {
  //         return (
  //           <div className=" snap-center flex w-[697px] h-[696px] justify-center items-center">
  //             <img className="rounded-3xl" alt="" src={image} />
  //           </div>
  //         );
  //       } else {
  //         return (
  //           <div className=" snap-center w-[297px] h-[296px]" key={index + 1}>
  //             <img className="rounded-3xl" alt="" src={image} />
  //           </div>
  //         );
  //       }
  //     } else {
  //       return (
  //         <video
  //           className=" snap-center w-[397px] h-[396px] rounded-3xl"
  //           controls
  //         >
  //           <source src={image} type="video/mp4" />
  //         </video>
  //       );
  //     }
  //   });

  //   const videosVerticalMap = videosVertical.map((video, index) => {
  //     // get image dimensions
  //     return (
  //       <video
  //         className=" flex-shrink-0 mx-5 snap-center rounded-xl"
  //         height={150}
  //         width={150}
  //         controls
  //       >
  //         <source src={video} type="video/mp4" />
  //       </video>
  //     );
  //   });
  //   const videosHorizontalMap = videosHorizontal.map((video, index) => {
  //     // get image dimensions
  //     return (
  //       <video
  //         className=" flex-shrink-0 mx-5 snap-center w-[300px] h-[300px] rounded-xl"
  //         controls
  //       >
  //         <source src={video} type="video/mp4" />
  //       </video>
  //     );
  //   });

  //   const allImages2 = images.map((image, index) => {
  //     // get image dimensions
  //     var img;
  //     img = new Image();
  //     img.src = image;
  //     var width = img.width;
  //     var height = img.height;

  //     //map a carousel of images
  //     //Q: why is the first image not showing up in the carousel?

  //     if (width > height) {
  //       return (
  //         <div className="  mx-5 flex-shrink-0 snap-center ">
  //           <img
  //             className="rounded-3xl"
  //             width={200}
  //             height={200}
  //             alt=""
  //             src={image}
  //           />
  //         </div>
  //       );
  //     } else {
  //       return (
  //         <div className=" flex flex-shrink-0 mx-5 snap-center " key={index + 1}>
  //           <img
  //             height={"150px"}
  //             width={"150px"}
  //             className=" flex object-fill  rounded-3xl"
  //             alt=""
  //             src={image}
  //           />
  //         </div>
  //       );
  //     }
  //   });

  // if (width > height) {
  //   return (
  //     <div
  //       key={index}
  //       className="relative items-center snap-center flex justify-center w-full md:w-auto  flex-shrink-0   "
  //     >
  //       <img
  //         className=" rounded-xl"
  //         src={image}
  //         alt=""
  //         //make all images fit the same size
  //         width={400}
  //         height={200}
  //       />
  //     </div>
  //   );
  // } else {
  //   return (
  //     <div
  //       key={index}
  //       className="items-center ml-20 snap-center flex justify-center w-full  flex-shrink-0  "
  //     >
  //       <img
  //         className="rounded-3xl"
  //         src={image}
  //         alt=""
  //         //make all images fit the same size

  //         height={150}
  //         width={150}
  //       />
  //     </div>
  //   );
  // }

  // const props = useControls({
  //   focus: { value: 5.1, min: 3, max: 7, step: 0.01 },
  //   speed: { value: 100, min: 0.1, max: 100, step: 0.1 },
  //   aperture: { value: 1.8, min: 1, max: 5.6, step: 0.1 },
  //   fov: { value: 50, min: 0, max: 200 },
  //   curl: { value: 0.25, min: 0.01, max: 0.5, step: 0.01 },
  // });

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

        {imageButtons && (
          <div className=" my-10">
            <MainButton
              onClick={() => {
                setShowImages(!showImages);
                if (NotifyDbOnClick) {
                  sendToDb({
                    project_button: title + "-showImages",
                    lat: lat,
                    lng: lng,
                  });
                }
              }}
              buttonText={showImages ? "Hide Images" : "Show Images"}
            />
          </div>
        )}
        <div className=" w-full h-[900px]">
          {showImages && (
            <Canvas camera={{ position: [0, 0, 5], fov: 25 }}>
              <OrbitControls
                makeDefault
                autoRotate
                autoRotateSpeed={0.5}
                zoomSpeed={0.1}
              />
              <CameraShake
                yawFrequency={1}
                maxYaw={0.05}
                pitchFrequency={1}
                maxPitch={0.05}
                rollFrequency={0.5}
                maxRoll={0.5}
                intensity={0.2}
              />
              <Html></Html>
              <Particles {...props} />
            </Canvas>
          )}
        </div>
        {/* descrption */}
        <div className="mb-[30px] flex justify-center items-center  h-[40%]  w-[100%]">
          <p className=" mx-5 text-sm md:text-lg text-[#e9e9e9]  md:mt-[50px] text-center ">
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
      {/* <div className=" z-0 absolute top-[30%] bg-[#B644FD]/10 left-0 h-[200px] skew-y-12 w-full" /> */}
    </div>
  );
}
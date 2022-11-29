import React from "react";

import MainButton from "./MainButton";
import { Cursor, useTypewriter } from "react-simple-typewriter";
import { motion } from "framer-motion";
import Carousel from "./carosel";

import NextImage from "next/image";

export default function BasicProjectComponent({
  images,
  title,
  description,

  onClick,

  listOfVideoIndexes,
  buttonText,
  projectLink,
  videosHorizontal,
  videosVertical,
}) {
  const [text, count] = useTypewriter({
    words: description,
    loop: false,
    typeSpeed: 50,
    delaySpeed: 3000,
  });

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

  return (
    <div className=" mt-2  flex items-center justify-center w-full flex-col ">
      <div className=" justify-center items-center grid-rows-4 flex-col flex">
        <div className=" mx-10 ">
          <h3 className=" top-24 uppercase tracking-[20px] text-gray-500 text-lg md:text-2xl">
            {title}
          </h3>
        </div>

        <div className=" flex justify-center items-center w-[80%]   ">
          <Carousel listOfVideoIndexes={listOfVideoIndexes} images={images} />
        </div>

        {/* <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: [0.1, 0.8, 1] }}
        transition={{ duration: 2.5, repeat: 1 }}
        className=" "
      > */}
        <div className=" w-[90%]">
          <p className=" mx-10 text-md md:text-lg text-[#e9e9e9]  md:mt-[50px] text-center ">
            {description}
          </p>
        </div>
        {/* </motion.div> */}
        <div className=" mt-[20px]  mb-[10px]">
          {projectLink != null && (
            <MainButton
              buttonText={buttonText}
              onClick={() => {
                //send the user to link in a new tab
                window.open(projectLink, "_blank");
              }}
            />
          )}
        </div>
      </div>
      {/* <div className=" z-0 absolute top-[30%] bg-[#B644FD]/10 left-0 h-[200px] skew-y-12 w-full" /> */}
    </div>
  );
}

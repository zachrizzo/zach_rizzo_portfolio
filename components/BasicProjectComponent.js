import React, { useEffect, useState, useRef, Suspense } from "react";

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
  imageButtons,
  listOfVideoIndexes,
  buttonText,
  projectLink,
  videosHorizontal,
  videosVertical,
  carousel,
  HIPPA,
}) {
  const [text, count] = useTypewriter({
    words: description,
    loop: false,
    typeSpeed: 50,
    delaySpeed: 3000,
  });
  const [showImages, setShowImages] = useState(false);
  const videoElement = useRef(null);
  const [orientation, setOrientation] = useState("landscape");
  useEffect(() => {
    function handleResize() {
      if (window.innerHeight > window.innerWidth) {
        setOrientation("portrait");
      } else {
        setOrientation("landscape");
      }
      // console.log(`Video orientation: ${orientation}`);
      // console.log(`Window hight: ${window.innerHeight}`);
      // console.log(`Window width: ${window.innerWidth}`);
    }

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
    <div className=" text-center  mb-[20px] flex  justify-center w-full flex-col ">
      <div className=" w-full justify-center items-center grid-rows-4 flex-col flex">
        {/* title */}
        <div className="w-full md:mb-[40px] mb-[40px] text-center flex flex-col  justify-center items-center h-[10%] ">
          <h3 className=" text-center  uppercase tracking-[20px] text-gray-500 text-lg md:text-2xl">
            {title}
          </h3>
        </div>
        {/* images */}
        {HIPPA && (
          <h4 className="text-white my-10 text-lgmd:text-xl flex flex-col italic ">
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
              }}
              buttonText={showImages ? "Hide Images" : "Show Images"}
            />
          </div>
        )}
        {showImages && (
          <div className=" flex-col my-10 flex items-center justify-center h-[45%] 2xl:container 2xl:mx-auto 2xl:px-0 py-2 px-5   ">
            {carousel && (
              <Carousel
                listOfVideoIndexes={listOfVideoIndexes}
                images={images}
              />
            )}

            {!images
              ? null
              : images.map((images, index) => {
                  //detect if the image is landscape or portrait
                  //get image dimensions
                  var img;
                  img = new Image();
                  img.src = images.url;
                  var width = img.width;
                  var height = img.height;

                  if (
                    images.metadata.contentType != "video/mp4" &&
                    images.metadata.contentType != "video/quicktime"
                  ) {
                    return (
                      <div
                        key={index}
                        className="  relative rounded-3xl my-5 flex-col flex justify-center items-center"
                      >
                        {width < height && (
                          <a
                            //open image in new tab

                            href={images.url}
                            target="_blank"
                            className=" sm:w-[30%] rounded-3xl"
                            style={{
                              backgroundImage: `url(${images.url || ""})`,
                            }}
                          >
                            <img
                              src={images.url || ""}
                              alt={images.url}
                              className="w-full h-full rounded-2xl  "
                            />
                          </a>
                        )}

                        {width > height && (
                          <a
                            //open image in new tab

                            href={images.url}
                            target="_blank"
                            className="sm:w-[80%]  rounded-3xl"
                            style={{
                              backgroundImage: `url(${images.url || ""})`,
                            }}
                          >
                            <img
                              src={images.url || ""}
                              alt={images.url}
                              className="w-full h-full rounded-2xl  "
                            />
                          </a>
                        )}
                        {/* <a href={images.url} target="_blank" className="">
                        <h3 className="text-white my-6  mx-auto text-xs">
                          {images.url}
                        </h3>
                      </a> */}
                      </div>
                    );
                  } else {
                    //get video dimensions
                    var video;
                    var videoWidth = 0;
                    var videoHeight = 1;
                    {
                      /* video = document.createElement("video");
                    video.src = images.url;

                    video.onloadedmetadata = function () {
                      videoWidth = video.videoWidth;
                      videoHeight = video.videoHeight;
                      console.log("videoWidth", videoWidth);
                      console.log("videoHeight", videoHeight);
                    }; */
                    }

                    return (
                      <div
                        key={index}
                        className="rounded-3xl my-20 flex-col  flex justify-center items-center"
                      >
                        {videoWidth < videoHeight && (
                          <div
                            className=" sm:w-[30%]  "
                            style={{
                              backgroundImage: `url(${images.url || ""})`,
                            }}
                          >
                            <video
                              // src={images || ""}
                              // alt={images}
                              className=" my-15 rounded-3xl"
                              controls
                            >
                              <source
                                ref={videoElement}
                                src={images.url || ""}
                                type="video/mp4"
                              />
                            </video>
                          </div>
                        )}

                        {videoHeight < videoWidth && (
                          <div
                            className=" sm:w-[80%]  "
                            style={{
                              backgroundImage: `url(${images.url || ""})`,
                            }}
                          >
                            <video
                              // src={images || ""}
                              // alt={images}
                              className=" my-15 rounded-3xl"
                              controls
                            >
                              <source
                                ref={videoElement}
                                src={images.url || ""}
                                type="video/mp4"
                              />
                            </video>
                          </div>
                        )}
                        {/* <a
                        href={images.url}
                        className="h-full w-full aspect-square block absolute top-0 left-0 transition-opacity duration-300 opacity-0 hover:opacity-100 bg-blue-800/75 z-10"
                      >
                        <h3 className="text-white py-6 px-3 mx-auto text-xl">
                          {images.url}
                        </h3>
                      </a> */}
                      </div>
                    );
                  }
                })}
          </div>
        )}
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
              }}
            />
          )}
        </div>
      </div>
      {/* <div className=" z-0 absolute top-[30%] bg-[#B644FD]/10 left-0 h-[200px] skew-y-12 w-full" /> */}
    </div>
  );
}

import React from "react";
import { Cursor, useTypewriter } from "react-simple-typewriter";
import BackGroundCircles from "./BackGroundCircles";
import MainButton from "./MainButton";
import { motion } from "framer-motion";
import { useRouter } from "next/compat/router";
import { HomeIcon } from "@heroicons/react/24/solid";
import { sendToDb } from "../firebase";
import { Canvas } from "@react-three/fiber";
import { CameraShake, Html, OrbitControls } from "@react-three/drei";
import { Particles } from "./ParticlesNoise";
import { useControls } from "leva";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function IntroNameComponent({
  reactRef,
  RoboticsRef,
  automationRef,
  NotifyDbOnClick,
  lat,
  lng,
  router,
}) {
  // const router = useRouter();
  const [text, count] = useTypewriter({
    words: [
      "Hi, My Name is Zach",
      "<software engineer/>",
      // "console.log('UI/UX Designer')",
    ],
    loop: true,
    typeSpeed: 50,
    delaySpeed: 3000,
  });
  // const props = useControls({
  //   focus: { value: 5.1, min: 3, max: 7, step: 0.01 },
  //   speed: { value: 100, min: 0.1, max: 100, step: 0.1 },
  //   aperture: { value: 1.8, min: 1, max: 5.6, step: 0.1 },
  //   fov: { value: 50, min: 0, max: 200 },
  //   curl: { value: 0.25, min: 0.01, max: 0.5, step: 0.01 },
  // });
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: [0.1, 0.4, 0.2, 1] }}
      transition={{ duration: 2.5, repeat: false }}
      className="h-screen  flex flex-col space-y-8 items-center justify-center text-center overflow-hidden "
    >
      <h1 className="z-20 text-3xl font-bold text-[#ffffff]">
        <span>{text}</span>
        <Cursor cursorColor="#ffffff" />
      </h1>
      <motion.div
        initial={{ x: 100, opacity: 0, scale: 0.5 }}
        animate={{ x: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 1.5 }}
        className=" z-20 flex  w-full justify-center h-[8%]"
      >
        <MainButton
          buttonText={"React"}
          onClick={() => {
            if (NotifyDbOnClick) {
              sendToDb({ project_button: "React", lat: lat, lng: lng });
            }
            router.push("/BasicPortfolioPage2#react");
          }}
        />
        <MainButton
          buttonText={"About Me"}
          onClick={() => {
            router.push("/BasicPortfolioPage2#AboutMe");
            if (NotifyDbOnClick) {
              sendToDb({
                project_button: "About me",
                lat: lat,
                lng: lng,
              });
            }
          }}
        />
        <MainButton
          onClick={() => {
            router.push("/BasicPortfolioPage2#automation");
            if (NotifyDbOnClick) {
              sendToDb({
                project_button: "Automation",
                lat: lat,
                lng: lng,
              });
            }
          }}
          buttonText={"Automation"}
        />
      </motion.div>
      <button
        onClick={() => {
          router.push("/");
          if (NotifyDbOnClick) {
            sendToDb({ project_button: "Home", lat: lat, lng: lng });
          }
        }}
        className="cursor-pointer p-3 -p-3 rounded-full bg-[#ffffff] z-20"
      >
        <HomeIcon
          onClick={() => {
            router.push("/");
            if (NotifyDbOnClick) {
              sendToDb({ project_button: "Home", lat: lat, lng: lng });
            }
          }}
          className=" cursor-pointer h-6 w-6 text-blue-500"
        />
      </button>
      <BackGroundCircles />
    </motion.div>
  );
}

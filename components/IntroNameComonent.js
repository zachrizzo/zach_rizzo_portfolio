import React from "react";
import { Cursor, useTypewriter } from "react-simple-typewriter";
import BackGroundCircles from "./BackGroundCircles";
import MainButton from "./MainButton";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { HomeIcon } from "@heroicons/react/24/solid";
import { sendToDb } from "../firebase";

export default function IntroNameComponent({
  reactRef,
  RoboticsRef,
  automationRef,
  NotifyDbOnClick,
  lat,
  lng,
}) {
  const router = useRouter();
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
            router.push("/BasicPortfolioPage2#react");
            if (NotifyDbOnClick) {
              sendToDb({ project_button: "React", lat: lat, lng: lng });
            }
          }}
        />
        <MainButton
          buttonText={"Robotics"}
          onClick={() => {
            router.push("/BasicPortfolioPage2#robots");
            if (NotifyDbOnClick) {
              sendToDb({ project_button: "Robotics", lat: lat, lng: lng });
            }
          }}
        />
        <MainButton
          onClick={() => {
            router.push("/BasicPortfolioPage2#automation");
            if (NotifyDbOnClick) {
              sendToDb({ project_button: "Automation", lat: lat, lng: lng });
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

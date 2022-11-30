import React from "react";
import { motion } from "framer-motion";
import { Cursor, useTypewriter } from "react-simple-typewriter";
import SkillsComponent from "./skillsComponent";
import SkillsComponent2 from "./skillsComponent2";
import SkillsComponent3 from "./skillsComponent3";

export default function () {
  const [text, count] = useTypewriter({
    words: [
      "React",
      "Next.js",
      "react-three-fiber",
      "Node.js",
      "Firebase",
      "Three.js",

      "React Native",
    ],
    loop: true,
    typeSpeed: 50,
    delaySpeed: 2000,
  });

  return (
    <div
      // initial={{ opacity: 0 }}
      // whileInView={{
      //   opacity: [0.1, 0.8, 1.0],
      //   borderRadius: ["20%", "50%", "0"],
      // }}
      // transition={{ duration: 2.5, repeat: true }}
      className=" grid text-center  "
    >
      <div className="my-2  h-[5%]">
        <h3 className=" uppercase tracking-[20px] text-gray-500 text-2xl">
          About
        </h3>
      </div>

      <h4 className="my-2 h-[5%]  text-white text-3xl">
        Here's a <span className="underline decoration-[#9b2fcc]">little</span>{" "}
        about me
      </h4>

      <div className=" flex justify-center items-center md:mt-[20px] md:h-[80%]">
        <p className=" mt-[10px] mx-10  text-white text-center text-sm md:w-[80%] md:text-lg">
          I thrive in a high pace, fast-moving environment. I love automating
          daily tasks and streamlining everyday processes. I specialize in
          finding the most efficient way to carry out any given task. Whether
          it's creating a program to read and distribute faxes automatically
          using OCR (Optical Character Recognition) or a program that goes
          through an EMR (Electronic Medical Records) and grabs the information
          of 15,000 patients to put in a spreadsheet. I love challenges and
          solving problems. Having developed two apps on the app store and
          multiple web-based applications, my passion for Ui/UX is unmatched. I
          have experience creating and maintaining software used by the public
          in many different stages. I am currently learning about robotics and
          Machine learning in hopes of adding that to my quiver of arrows soon.
          In my free time, I love learning new skills, scuba diving, rock
          climbing, writing music, camping, and skydiving.
        </p>
      </div>
      <div className=" grid-cols-3 h-[10%] grid flex-row justify-center items-center md:mb-[60px] mb-2">
        <div className="">
          <h5 className="z-20 text-lg text-center font-bold text-[#ffffff]">
            <span>{text}</span>
            <Cursor cursorColor="#ffffff" />
          </h5>
        </div>
        <SkillsComponent />
        {/* <SkillsComponent2 /> */}
        <SkillsComponent3 />
      </div>
    </div>
  );
}

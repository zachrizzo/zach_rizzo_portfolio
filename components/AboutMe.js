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
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{
        opacity: [0.1, 0.8, 1.0],
        borderRadius: ["20%", "50%", "0"],
      }}
      transition={{ duration: 2.5, repeat: true }}
      className="   flex flex-col relative h-screen text-center md:text-left md:flex-row max-w-7xl justify-evenly mx-auto items-center"
    >
      <h3 className=" absolute top-5 mb-10 md:top-16 uppercase tracking-[20px] text-gray-500 text-2xl">
        About
      </h3>
      <div className=" flex-col flex justify-center items-center">
        <h4 className=" mb-[10px] text-white text-3xl">
          Here's a{" "}
          <span className="underline decoration-[#9b2fcc]">little</span> about
          me
        </h4>
        <p className=" mt-[20px] mx-10  text-white text-center text-base">
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
        <div className=" h-[70px] mb-2">
          <div className=" flex flex-row justify-between  items-center mt-[40px]">
            <div className=" mx-[10px]">
              <h5 className="z-20 text-lg font-bold text-[#ffffff]">
                <span>{text}</span>
                <Cursor cursorColor="#ffffff" />
              </h5>
            </div>
            <SkillsComponent />
            {/* <SkillsComponent2 /> */}
            <SkillsComponent3 />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

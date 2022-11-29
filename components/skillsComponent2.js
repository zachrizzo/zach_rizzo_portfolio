import React, { useEffect } from "react";
import { Cursor, useTypewriter } from "react-simple-typewriter";

export default function SkillsComponent2({
  delaySpeed,
  typeSpeed,
  words,
  loop,
}) {
  //get a random number between 1000 and 3000
  var randomDelaySpeed;
  var randomTypeSpeed;

  useEffect(() => {
    randomDelaySpeed = Math.floor(Math.random() * 3000) + 1000;

    //get a random number between 20 and 60

    randomTypeSpeed = Math.floor(Math.random() * 40) + 20;

    // console.log(randomDelaySpeed);
    // console.log(randomTypeSpeed);
  }, []);

  const [text, count] = useTypewriter({
    words: [
      "Git",
      "Github",
      "Unreal Engine 5 - in progress",
      "pandas",
      "numpy",
      "EMR",
    ],
    loop: true,
    typeSpeed: 25,
    delaySpeed: 3000,
  });
  return (
    <div className=" mx-[20px]">
      <h5 className="z-20 text-lg font-bold text-[#ffffff]">
        <span>{text}</span>
        <Cursor cursorColor="#ffffff" />
      </h5>
    </div>
  );
}

import React, { useEffect, useState, useRef } from "react";
import BasicProjectComponent from "../components/BasicProjectComponent";
import MainButton from "../components/MainButton";
import ParticleText from "../components/Particletext";
import IphoneScroll from "../components/threejsPhones/Three_IphoneScroll";
import { motion } from "framer-motion";
import IntroNameComponent from "../components/IntroNameComonent";
import AboutMe from "../components/AboutMe";

export default function BasicPortfolioPage() {
  const [activeStatus, setActiveStatus] = useState(null);
  const [companyDbB, setCompanyDbB] = useState(null);
  const [iphoneScrollInView, setIphoneScrollInView] = useState(false);
  const [iphoneScrollPages, setIphoneScrollPages] = useState(0);
  const reactRef = useRef(null);
  const RoboticsRef = useRef(null);
  const automationRef = useRef(null);
  // if (rocket.current && rocket.current.rotation.x === Number) {
  //   const result = (rocket.current.rotation.x += 0.01);

  //   useFrame((state, delta) => result);
  //   // useEffect(() => {
  //   //   GetUserActiveStatus({ activeState: setActiveStatus })
  //   // }, [])
  // }
  const particles = () => {
    const length = 10 * 10;
    const particles = new Float32Array(length * 3);
    for (let i = 0; i < length; i++) {
      let i3 = i * 3;
      particles[i3 + 0] = (i % 10) / 10;
      particles[i3 + 1] = i / 10 / 10;
    }
    return particles;
  };

  const listInnerRef = useRef();
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      console.log(entry);
      // if (entry.isIntersecting) {
      setIphoneScrollInView(entry.isIntersecting);
      if (entry.isIntersecting == true) {
        setIphoneScrollPages(8);
      } else {
        setIphoneScrollPages(0);
      }
      // }
      // if (entry.isIntersecting == false) {
      //   setIphoneScrollInView(false)
      // }
    });

    observer.observe(listInnerRef.current);
  }, []);

  const onScroll = () => {
    if (listInnerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
      if (scrollTop + clientHeight === scrollHeight) {
        console.log("half");
      }
    }
  };
  return (
    <div className=" snap-y snap-mandatory overflow-x-hidden  bg-[rgb(36,36,36)] flex-col flex w-full  h-screen overflow-scroll z-0 ">
      <section id="hero" className="w-full snap-center">
        <IntroNameComponent />
      </section>

      {/* if not on desk top dont show particle text */}
      <div className=" hidden md:block">{/* <ParticleText /> */}</div>
      <section id="about" className="w-full snap-center">
        <AboutMe />
      </section>

      {/* projects */}
      <section
        id={"react"}
        ref={reactRef}
        className=" flex-col my-[100px]  flex justify-center items-center"
      >
        <div className="h-screen snap-center text-center ">
          <h4 className="mb-2  text-[#a631f0] text-5xl font-bold">
            React & React Native
          </h4>
          <BasicProjectComponent
            className
            videosVertical={[
              "/portfolioImages/amaApp/RPReplay_Final1669607984.MP4",
            ]}
            videosHorizontal={[]}
            images={[
              "/portfolioImages/amaApp/IMG_2DCCE374DF2A-1.jpeg",
              "/portfolioImages/amaApp/Simulator Screen Shot - iPhone 8 Plus - 2022-05-18 at 19.10.11.png",
              "/portfolioImages/amaApp/RPReplay_Final1669607984.MP4",
              "/portfolioImages/amaApp/IMG_2DCCE374DF2A-1.jpeg",
              "/portfolioImages/amaApp/IMG_2DCCE374DF2A-1.jpeg",
              "/portfolioImages/amaApp/IMG_2DCCE374DF2A-1.jpeg",
              "/portfolioImages/amaApp/IMG_2DCCE374DF2A-1.jpeg",
              "/portfolioImages/amaApp/IMG_2DCCE374DF2A-1.jpeg",

              // "/galaxy.jpeg",
            ]}
            title={"AMA App"}
            description={
              " I created this app while working at AMA (American Medical Associates) as a software engineer. This apps purpose was to help streamline all processes of the AMA staff on the backend whether it was inventory management using a barcode scanner or allowing the managers to keep track of the money going in and out of the clinic. Users were also able to send messages set to do lists and keep track of their schedule. I created this app using React Native and Firebase."
            }
            listOfVideoIndexes={[2]}
            buttonText={"View Project"}
          />
        </div>
        <div className=" h-screen snap-center">
          <BasicProjectComponent
            videosVertical={[]}
            videosHorizontal={[]}
            images={[
              "/portfolioImages/amaWebsite/Screen Shot 2022-11-27 at 9.17.25 PM.png",
              "/portfolioImages/amaWebsite/Screen Shot 2022-11-27 at 9.18.22 PM.png",
              "/portfolioImages/amaWebsite/Screen Shot 2022-11-27 at 9.19.15 PM.png",
              // "/galaxy.jpeg",
            ]}
            title={"AMA Website"}
            description={
              "This react website was created in conjunction with the AMA app. The react website its purpose was to handle all of the back and processes that the app could not. Some of the features the website offered were sending text messages to patients after visit, allowing employees to apply for specific positions, allowed patients to fill out new patient packets, allowed the tracking and management of different departments within the organization, allowed for IT support tickets to be submitted and worked on, and allowed for the management of the inventory. I created this website using React, Next.JS, TailWind, and Firebase."
            }
            listOfVideoIndexes={[7]}
            buttonText={"View Project"}
          />
        </div>
        <div className="  flex items-center justify-center flex-col snap-y snap-mandatory snap-center snap-always  w-full h-[80vh]">
          <h3 className=" top-24 uppercase tracking-[20px] text-gray-500 text-2xl">
            FlowTeam
          </h3>
          {/* <IphoneScroll
            pages={iphoneScrollPages}
            enabled={iphoneScrollInView}
          /> */}
        </div>
        <div ref={listInnerRef} className=" h-[50px] w-full"></div>
        <div className=" w-[90%] snap-center">
          <p className=" text-xl text-[#e9e9e9]  mt-[250px] text-center ">
            Flow team is a mobile app that was created to help companies manage
            teams with ease. flow team has many features some of them are time
            tracking for employees using Geo location, the ability to create
            multiple teams and shared to do lists between them, for messaging
            capabilities similar to slack that allow for multiple channels and
            teams,and more. I created this app using React Native and Firebase .
          </p>
        </div>
      </section>

      <div
        id="robots"
        ref={RoboticsRef}
        className=" flex-col my-[100px] w-full flex justify-center items-center"
      >
        <section className="  flex justify-center items-center flex-col snap-center h-screen">
          <h4 className="mb-5 text-[#a631f0] text-5xl font-bold">
            Robotics & Research
          </h4>
          <BasicProjectComponent
            images={[
              "/portfolioImages/useFullRobot/IMG_0094.JPG",
              "/portfolioImages/useFullRobot/IMG_0093.JPG",

              // "/galaxy.jpeg",
            ]}
            title={"Useful Robot"}
            videosVertical={[]}
            videosHorizontal={["/portfolioImages/useFullRobot/IMG_0096.MOV"]}
            description={
              "This is a robot is research project that I built to learn SLAM (Simultaneous Localization and Mapping) and ROS 2 Foxy. In the future I will be adding an arm on top so it can interact with objects. These interactions will be assisted by an Intel real sense camera which is equipped with stereo depth cameras that allow for accurate measurement of distance. After obtaining the measurement it will perform inverse  kinematics to accurately interact with objects. The hosing of the robot was all designed and 3D printed by me. This robot runs on a Nvidia Jetson Xavier NX and a 12 V power supply."
            }
            listOfVideoIndexes={[0]}
            buttonText={"View Project"}
          />
        </section>
        <section className=" flex justify-center items-center flex-col snap-center h-screen">
          <BasicProjectComponent
            images={[]}
            videosHorizontal={["/portfolioImages/Crab Robot/IMG_0020.MOV"]}
            videosVertical={["/portfolioImages/Crab Robot/IMG_0017 2.MOV"]}
            title={"Crab Robot"}
            description={
              "The Crab was inspired by mini walking robots such as spot by Boston dynamics. The Crab was built using an  raspberry pi pico running MicroPython. Each arm in the robot has multiple degrees of freedom. This robot is still in the research phases as I am still trying to find out the proper inverse kinematics to counteract the offset weight balance. This robot has a solar powered battery packed and it's designed to run many hours it will be equipped with a camera and run tensor flow light for object Detection."
            }
            listOfVideoIndexes={[0, 1]}
            buttonText={"View Project"}
          />
        </section>
      </div>
      {/* <div ref={machineLearningRef} className=" flex-col my-[100px] w-full flex justify-center items-center">
          <h4 className="mb-20 text-[#a631f0] text-5xl font-bold">
            Machine learning
          </h4>
          <BasicProjectComponent
            images={[
              "/portfolioImages/useFullRobot/IMG_0074.MOV",
              "/portfolioImages/useFullRobot/IMG_0085.JPG",
              "/portfolioImages/useFullRobot/IMG_0086.JPG",

              // "/galaxy.jpeg",
            ]}
            title={"Useful Robot"}
            description={
              "This is a robot research project that I built to learn SLAM (Simultaneous Localization and Mapping) and ROS 2 Foxy. In the future I will be adding an arm on top so it can interact with objects. These interactions will be assisted by an Intel real sense camera which is equipped with stereo depth cameras that allow for accurate measurement of distance. After obtaining the measurement it will perform inverse  kinematics to accurately interact with objects. The hosing of the robot was all designed and 3D printed by me. This robot runs on a Nvidia Jetson Xavier NX and a 12 V power supply."
            }
            listOfVideoIndexes={[0]}
            buttonText={"View Project"}
          />
          <BasicProjectComponent
            images={[
              "/portfolioImages/useFullRobot/IMG_0085.JPG",
              "/portfolioImages/useFullRobot/IMG_0086.JPG",
              "/portfolioImages/useFullRobot/IMG_0074.MOV",
              // "/galaxy.jpeg",
            ]}
            title={"Crab Robot"}
            description={
              "This is a robot research project that I built to learn SLAM (Simultaneous Localization and Mapping) and ROS 2 Foxy. In the future I will be adding an arm on top so it can interact with objects. These interactions will be assisted by an Intel real sense camera which is equipped with stereo depth cameras that allow for accurate measurement of distance. After obtaining the measurement it will perform inverse  kinematics to accurately interact with objects. The hosing of the robot was all designed and 3D printed by me. This robot runs on a Nvidia Jetson Xavier NX and a 12 V power supply."
            }
            listOfVideoIndexes={[2]}
            buttonText={"View Project"}
          />
        </div> */}

      <section
        id="automation"
        ref={automationRef}
        className=" flex justify-center items-center flex-col snap-center h-screen"
      >
        <h4 className="mb-20 text-[#a631f0] text-5xl font-bold">Automation</h4>
        <BasicProjectComponent
          images={[]}
          title={"Fax Automation"}
          videosVertical={[]}
          videosHorizontal={[]}
          description={
            "At American Medical Associates we were experiencing a high number of faxes to the point where we didn't have enough staff to read those faxes. So I decided to make a program that uses OCR (optical character recognition) to read each facts individually and perform the tasks needed in order to send it to the providers. This was done using their EMR so I had to make a Python bot that would navigate the EMR and download the fax then read it and send a fax where it needed to go. "
          }
          listOfVideoIndexes={[]}
          buttonText={"View Project"}
        />
        <section className=" flex justify-center items-center flex-col snap-center h-screen">
          <BasicProjectComponent
            images={[]}
            videosVertical={[]}
            videosHorizontal={[]}
            title={"Email Automation"}
            description={
              "When assisting marketing and American Medical Associates I realized that we did not have a list of emails for an email campaign. Although we did have 15,000 patients there is no way to access all of their emails so I created a python bought that went through the EMR and pulled each email from the 15,000 patients and put it into a spreads so that we may run marketing campaigns using it."
            }
            listOfVideoIndexes={[]}
            buttonText={"View Project"}
          />
        </section>
      </section>
    </div>
  );
}

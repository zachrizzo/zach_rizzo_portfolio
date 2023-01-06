import React, { useEffect, useState, useRef, Suspense } from "react";
import BasicProjectComponent from "../components/BasicProjectComponent";
import MainButton from "../components/MainButton";
import ParticleText from "../components/Particletext";
// import IphoneScroll from "../components/threejsPhones/Three_IphoneScroll";
import { motion } from "framer-motion";
import IntroNameComponent from "../components/IntroNameComonent";
import AboutMe from "../components/AboutMe";
import { getImageAndVideos } from "../firebase";
export async function getStaticProps() {
  // var amaAppUrl = null;
  // var amaWebsiteUrl = null;
  // var flowTeamUrl = null;
  // var useFulRobotUrl = null;
  // var crabRobotUrl = null;

  // getImageAndVideos({
  //   setUrls: amaAppUrl,
  //   project: "amaApp",
  // });
  // getImageAndVideos({
  //   setUrls: amaWebsiteUrl,
  //   project: "amaWebsite",
  // });
  // getImageAndVideos({
  //   setUrls: flowTeamUrl,
  //   project: "flowTeam",
  // });
  // getImageAndVideos({
  //   setUrls: useFulRobotUrl,
  //   project: "useFulRobot",
  // });
  // getImageAndVideos({
  //   setUrls: crabRobotUrl,
  //   project: "crabRobot",
  // });
  return {
    props: {
      // amaAppUrl,
      // amaWebsiteUrl,
      // flowTeamUrl,
      // useFulRobotUrl,
      // crabRobotUrl,
    },
  };
}

export default function BasicPortfolioPage() {
  const [activeStatus, setActiveStatus] = useState(null);
  const [companyDbB, setCompanyDbB] = useState(null);
  const [iphoneScrollInView, setIphoneScrollInView] = useState(false);
  const [iphoneScrollPages, setIphoneScrollPages] = useState(0);
  const [amaAppUrl, setAmaAppUrl] = useState({});
  const [amaWebsiteUrl, setAmaWebsiteUrl] = useState(null);
  const [flowTeamUrl, setFlowTeamUrl] = useState(null);
  const [useFulRobotUrl, setUseFulRobotUrl] = useState(null);
  const [crabRobotUrl, setCrabRobotUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // get the images and videos from firebase
    getImageAndVideos({
      setUrls: setAmaAppUrl,
      project: "amaApp",
    });
    getImageAndVideos({
      setUrls: setAmaWebsiteUrl,
      project: "amaWebsite",
    });
    getImageAndVideos({
      setUrls: setFlowTeamUrl,
      project: "flowTeam",
    });
    getImageAndVideos({
      setUrls: setUseFulRobotUrl,
      project: "useFulRobot",
    });
    getImageAndVideos({
      setUrls: setCrabRobotUrl,
      project: "crabRobot",
    });
  }, []);

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
  // useEffect(() => {
  //   if (amaWebsiteUrl) {
  //     //make object map
  //     amaWebsiteUrl.map((url) => {
  //       console.log(url.url);
  //     });
  //   }
  //   // return (
  //   //   <div className="w-full flex flex-col justify-center items-center h-[45%]">
  //   //     <img className="rounded-3xl" alt="" src={url} />
  //   //   </div>
  //   // );
  // }, [amaWebsiteUrl]);

  // const listInnerRef = useRef();
  // useEffect(() => {
  //   const observer = new IntersectionObserver((entries) => {
  //     const entry = entries[0];
  //     console.log(entry);
  //     // if (entry.isIntersecting) {
  //     setIphoneScrollInView(entry.isIntersecting);
  //     if (entry.isIntersecting == true) {
  //       setIphoneScrollPages(8);
  //     } else {
  //       setIphoneScrollPages(0);
  //     }
  //     // }
  //     // if (entry.isIntersecting == false) {
  //     //   setIphoneScrollInView(false)
  //     // }
  //   });

  //   if (listInnerRef.current) {
  //     observer.observe(listInnerRef.current);
  //   }
  // }, []);

  // const onScroll = () => {
  //   if (listInnerRef.current) {
  //     const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
  //     if (scrollTop + clientHeight === scrollHeight) {
  //       console.log("half");
  //     }
  //   }
  // };
  const loadingFunction = () => {
    //create a spinner using tailwind
    if (loading) {
      return (
        <div className="flex items-center flex-col justify-center">
          <div className="h-20 w-20 animate-spin rounded-full border-b-4 border-[#0E19EE]"></div>
          <h1 className=" text-xl m-5">Loading...</h1>
        </div>
      );
    }
  };

  return (
    <Suspense fallback={loadingFunction()}>
      <div className="  overflow-x-hidden  bg-[rgb(36,36,36)]  w-full  h-screen z-0 ">
        <section id="hero" className="w-full snap-center">
          <IntroNameComponent />
        </section>

        {/* if not on desk top dont show particle text */}
        <div className=" hidden md:block">{/* <ParticleText /> */}</div>
        <div className="my-[50px] h-[70%] md:h-[70%]">
          <AboutMe />
        </div>

        {/* projects */}
        <section id={"react"} ref={reactRef} className="  text-center ">
          <h4 className="mb-2  text-[#a631f0] text-3xl md:text-5xl font-bold">
            React & React Native
          </h4>

          <BasicProjectComponent
            className
            videosVertical={[
              "/portfolioImages/amaApp/RPReplay_Final1669607984.MP4",
            ]}
            videosHorizontal={[]}
            projectLink={"https://github.com/zachrizzo/AMA_APP"}
            images={amaAppUrl}
            title={"AMA App"}
            description={
              " I created the AMA app while working at American Medical Associates as a software engineer. The purpose of this app was to help streamline all processes of the AMA staff on the backend whether it was inventory management, using a barcode scanner or allowing the managers to keep track of the money going in and out of the clinic. Users were also able to send messages, set to-do lists, and keep track of their schedules. I created this app using React Native and Firebase."
            }
            listOfVideoIndexes={[9]}
            buttonText={"View Project"}
            imageButtons={true}
            // displayImage={
            //   amaAppUrl
            //     ? amaAppUrl[0].map((url) => {
            //         return (
            //           <div className="w-full flex flex-col justify-center items-center h-[45%]">
            //             <img className="rounded-3xl" alt="" src={url} />
            //           </div>
            //         );
            //       })
            //     : null
            // }
          />

          <BasicProjectComponent
            videosVertical={[]}
            videosHorizontal={[]}
            images={amaWebsiteUrl}
            title={"AMA Website"}
            description={
              "This react website was created in conjunction with the AMA app. The  purpose of the react website was to handle all of the backend processes that the app could not. Some of the features the website offers are sending text messages to patients after visits, allowing employees to apply for specific positions, allowing patients to fill out new patient packets, allowing the tracking and management of different departments within the organization, allowing for IT support tickets to be submitted and worked on, and allowing for the management of inventory. I created this website using React, Next.JS, TailWind, and Firebase."
            }
            listOfVideoIndexes={[7]}
            buttonText={"View Project"}
            projectLink={"https://github.com/zachrizzo/AMA_Employee_Website"}
            imageButtons={true}
          />

          {/* <div
          
          className="  flex items-center justify-center flex-col snap-y snap-mandatory snap-center snap-always  w-full h-screen"
        >
          <h3 className=" top-24 uppercase tracking-[20px] text-gray-500 text-2xl">
            FlowTeam
          </h3>
          <div className=" w-full h-[30%]">
            <IphoneScroll
              pages={iphoneScrollPages}
              enabled={iphoneScrollInView}
            />
          </div>
        </div> */}
          {/* <div className=" h-[50px] mt-[50px] w-full"></div> */}
          <BasicProjectComponent
            videosVertical={[]}
            videosHorizontal={[]}
            images={flowTeamUrl}
            title={"Flow Team"}
            description={
              "Flow Team is a mobile app that was created to help companies manage teams with ease. Flow Team has many features some of them including time tracking for employees using Geo location, the ability to create multiple teams and shared to-do lists between them, messaging capabilities similar to Slack&#174; that allow for multiple channels and teams, and more. This app using React Native and Firebase."
            }
            listOfVideoIndexes={[8]}
            buttonText={"View Project"}
            projectLink={
              "https://github.com/zachrizzo/team_Flow_productiviity_app_v3"
            }
            imageButtons={true}
          />

          {/* <div className=" h-screen flex flex-col justify-center items-center w-full snap-center">
            <h3 className=" top-1 uppercase tracking-[20px] text-gray-500 text-2xl">
              FlowTeam
            </h3>
            <div
              // ref={listInnerRef}
              className=" flex justify-center items-center w-full md:h-[70%] h-[45%]"
            > */}
          {/* <IphoneScroll
                pages={iphoneScrollPages}
                enabled={iphoneScrollInView}
              /> */}
          {/* </div>
            <p className="md:text-lg md: mx-5 text-sm text-[#e9e9e9]  mt-[20px] text-center ">
              Flow Team is a mobile app that was created to help companies
              manage teams with ease. Flow Team has many features some of them
              including time tracking for employees using Geo location, the
              ability to create multiple teams and shared to-do lists between
              them, messaging capabilities similar to Slack&#174; that allow for
              multiple channels and teams, and more. This app using React Native
              and Firebase.
            </p>
            <div className=" mt-[20px]  mb-[10px]">
              <MainButton
                buttonText={"View Project"}
                onClick={() => {
                  //send the user to link in a new tab
                  window.open(
                    "https://github.com/zachrizzo/team_Flow_productiviity_app_v3",
                    "_blank"
                  );
                }}
              />
            </div>
          </div> */}
        </section>

        <section id={"robots"} ref={RoboticsRef} className=" text-center">
          <h4 className="mb-2 text-[#a631f0] text-3xl md:text-5xl font-bold">
            Robotics & Research
          </h4>
          <BasicProjectComponent
            images={useFulRobotUrl}
            title={"Useful Robot"}
            videosVertical={[]}
            videosHorizontal={[]}
            description={
              "This robot is a research project that I built to learn SLAM (Simultaneous Localization and Mapping) and ROS 2 Foxy. In the future, I will be adding an arm on top so it can interact with objects. These interactions will be assisted by an Intel Real Sense camera which is equipped with stereo depth cameras that allow for accurate measurement of distances. After obtaining the measurement it will perform inverse  kinematics to accurately interact with objects. I designed the robot housing and was able to bring it to life using a 3D printer. This robot runs an Nvidia Jetson Xavier NX and a 12 V power supply."
            }
            listOfVideoIndexes={[0]}
            projectLink={"https://github.com/zachrizzo/UsefulRobot"}
            buttonText={"View Project"}
            imageButtons={true}
          />

          <BasicProjectComponent
            images={crabRobotUrl}
            videosHorizontal={[]}
            videosVertical={[]}
            title={"Crab Robot"}
            description={
              "The Crab was inspired by many walking robots such as Spot by Boston Dynamics. The Crab was built using a Raspberry Pi Pico running MicroPython. Each arm in the robot has multiple degrees of freedom. This robot is still in the research phases as I am trying to find the proper inverse kinematics to counteract the offset weight balance. This robot has a solar powered battery pack and it's designed to run many hours. It will be equipped with a camera and run Tensorflow Light for object detection."
            }
            listOfVideoIndexes={[0, 1]}
            buttonText={"View Project"}
            imageButtons={true}
          />
        </section>

        {/*  */}
        {/*  */}
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
        {/*  */}
        {/*  */}
        {/*  */}

        <section
          id="automation"
          ref={automationRef}
          className=" text-center flex justify-center items-center flex-col snap-center mb-[50px]"
        >
          <h4 className="mb-20 text-[#a631f0] text-3xl md:text-5xl font-bold">
            Automation
          </h4>
          <BasicProjectComponent
            images={[]}
            title={"Fax Automation"}
            HIPPA={true}
            videosVertical={[]}
            videosHorizontal={[]}
            description={
              "At American Medical Associates we were experiencing a high number of faxes to the point where we didn't have enough staff to read them. As a solution, I created a program that uses OCR (Optical Character Recognition) to read each fax individually and perform the tasks needed in order to send it to the providers. By using their EMR , I developed a Python bot that would navigate the EMR, download the fax, read it, and send the fax where it needed to go."
            }
            listOfVideoIndexes={[]}
            projectLink={"https://github.com/zachrizzo/Read_ama_fax"}
            buttonText={"View Project"}
          />
        </section>
        <section className=" text-center flex justify-center items-center flex-col snap-center mb-[20px]">
          <BasicProjectComponent
            images={[]}
            videosVertical={[]}
            videosHorizontal={[]}
            HIPPA={true}
            title={"Email Automation"}
            description={
              "With 15,000 patients at American Medical Associates, creating an email campaign was nearly impossible with no way to access all of their email address. As a solution, I developed a Python bot that went through the EMR and pulled each email address from the 15,000 patients and put it into a spreadsheets using Numpy to enable marketing campaigns."
            }
            listOfVideoIndexes={[]}
            projectLink={"https://github.com/zachrizzo/Geat_allPatient_emails"}
            buttonText={"View Project"}
          />
        </section>
      </div>
    </Suspense>
  );
}

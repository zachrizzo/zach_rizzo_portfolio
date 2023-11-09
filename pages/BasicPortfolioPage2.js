import React, { useEffect, useState, useRef, Suspense } from "react";
import BasicProjectComponent from "../components/BasicProjectComponent";
// import MainButton from "../components/MainButton";
// import ParticleText from "../components/Particletext";
// import IphoneScroll from "../components/threejsPhones/Three_IphoneScroll";
import { motion } from "framer-motion";
import IntroNameComponent from "../components/IntroNameComonent";
import AboutMe from "../components/AboutMe";
import { getImageAndVideos, sendToDb } from "../firebase";
import BasicProjectComponent2 from "../components/BasicProjectComponent2";
import { Particles } from "../components/ParticlesNoise";
// import { useControls } from "leva";
import { Canvas } from "@react-three/fiber";
import { CameraShake, Html, OrbitControls } from "@react-three/drei";
import { Cursor, useTypewriter } from "react-simple-typewriter";
import { useRouter } from "next/router";
// import ThreeJsCarousel from "../components/ThreeJsCarousel";
import { proxy, useSnapshot } from "valtio";

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

const amaAppImages = [
  {
    url: "/amaApp/IMG_0571.PNG",
    aspectRatio: "portrait",
    video: false,
  },
  {
    url: "/amaApp/IMG_0572.PNG",
    aspectRatio: "portrait",
    video: false,
  },
  {
    url: "/amaApp/IMG_0573.PNG",
    aspectRatio: "portrait",
    video: true,
  },
  // {
  //   url: "/amaApp/Untitled.mov",
  //   aspectRatio: "portrait",
  //   video: true,
  // },
];

const amaWebImages = [
  {
    url: "../AMA website/Screenshot 2023-02-27 at 11.20.59 AM.png",
    aspectRatio: "landscape",
  },
  {
    url: "../AMA website/Screenshot 2023-02-27 at 11.21.56 AM.png",
    aspectRatio: "landscape",
  },

  {
    url: "../AMA website/Screenshot 2023-02-27 at 11.33.20 AM.png",
    aspectRatio: "landscape",
  },
  {
    url: "../AMA website/Screenshot 2023-02-28 at 11.37.59 AM.png",
    aspectRatio: "landscape",
  },

  {
    url: "../AMA website/Screenshot 2023-02-28 at 11.39.02 AM.png",
    aspectRatio: "landscape",
  },
];

const flowTeamImages = [
  {
    url: "/FlowTeam/Screens/messaging.png",
    aspectRatio: "portrait",
  },
  {
    url: "/FlowTeam/Screens/android feater graphic (1).png",
    aspectRatio: "landscape",
  },
  {
    url: "/FlowTeam/Screens/ToDoScreen.png",
    aspectRatio: "portrait",
  },
  {
    url: "/FlowTeam/Screens/IMG_0569.PNG",
    aspectRatio: "portrait",
  },
];

const websiteProxy = proxy({
  clicked: 0,
  urls: amaWebImages.map((image) => image.url),
  aspectRatio: amaWebImages.map((image) => image.aspectRatio),
});

const flowTeamProxy = proxy({
  clicked: 0,
  urls: flowTeamImages.map((image) => image.url),
  aspectRatio: flowTeamImages.map((image) => image.aspectRatio),
  // video: flowTeamImages.map((image) => image.video),
});

const amaAppProxy = proxy({
  clicked: 0,
  urls: amaAppImages.map((image) => image.url),
  aspectRatio: amaAppImages.map((image) => image.aspectRatio),
  video: amaAppImages.map((image) => image.video),
});

export default function BasicPortfolioPage() {
  const [activeStatus, setActiveStatus] = useState(null);
  const [companyDbB, setCompanyDbB] = useState(null);
  const [iphoneScrollInView, setIphoneScrollInView] = useState(false);
  const [iphoneScrollPages, setIphoneScrollPages] = useState(0);
  const [amaAppUrl, setAmaAppUrl] = useState({});
  const [amaWebsiteUrl, setAmaWebsiteUrl] = useState([]);
  const [flowTeamUrl, setFlowTeamUrl] = useState([]);
  const [useFulRobotUrl, setUseFulRobotUrl] = useState([]);
  const [crabRobotUrl, setCrabRobotUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lat, setLat] = useState(0);
  const [long, setLong] = useState(0);
  const [notifyDbOnClick, setNotifyDbOnClick] = useState(true);
  const [isPhone, setIsPhone] = useState(false);

  const router = useRouter();

  // const props = useControls({
  //   focus: { value: 4.25, min: 3, max: 7, step: 0.01 },
  //   speed: { value: 0.1, min: 0.1, max: 100, step: 0.1 },
  //   aperture: { value: 4.1, min: 1, max: 5.6, step: 0.1 },
  //   fov: { value: 44, min: 0, max: 200 },
  //   curl: { value: 0.33, min: 0.01, max: 0.5, step: 0.01 },
  // });
  const props = {
    focus: isPhone ? 9 : 4.77,
    speed: 0.1,
    aperture: 3.9,
    fov: 44,
    curl: 0.33,
  };

  // var websiteProxy = null;

  // useEffect(() => {
  //   if (amaWebsiteUrl.length != 0) {
  //     console.log("websiteProxy", amaWebsiteUrl);
  //     amaWebsiteUrl.map((url) => {
  //       console.log("url", url.url);

  //       websiteProxy = proxy({
  //         clicked: null,
  //         urls: url.url,
  //       });
  //     });
  //   }
  //   console.log("websiteProxy", websiteProxy);
  // }, [amaWebsiteUrl]);

  useEffect(() => {
    if (amaWebsiteUrl.length != 0) {
      // console.log("websiteProxy", websiteProxy);
      amaWebsiteUrl.map((url) => {
        // console.log("url", url.url);
      });
    }
  }, []);

  useEffect(() => {
    // get the images and videos from firebase
    getImageAndVideos({
      setUrls: setAmaAppUrl,
      project: "amaApp",
    });
    getImageAndVideos({
      setUrls: setAmaWebsiteUrl,
      project: "amaWebsite",
      // urlsState: webS,
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
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLat(position.coords.latitude);
      setLong(position.coords.longitude);
    });
  });
  useEffect(() => {
    if (notifyDbOnClick) {
      sendToDb({
        lat: lat,
        lng: long,
        project_button: "porfolio_page",
      });
    }
  }, []);

  useEffect(() => {
    // check if the user is on a phone
    if (window.innerWidth < 700) {
      setIsPhone(true);
    } else {
      setIsPhone(false);
    }
  });

  //if its a phone then  allow the user to scroll through the projects

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
        <div className="flex flex-col justify-center items-center h-screen w-screen">
          <div className="h-20 w-20 animate-spin rounded-full border-b-4 border-[#0E19EE]"></div>
          <h1 className=" text-xl m-5">Loading...</h1>
        </div>
      );
    }
  };

  return (
    <Suspense fallback={loadingFunction()}>
      {/*  the old gray color is rgb(36,36,36) */}
      <div className="  overflow-x-hidden  bg-[rgb(36,36,36)]  w-full  h-screen z-0 ">
        <Canvas
          className=" justify-center h-full items-center flex"
          camera={{ position: isPhone ? [0, 0, 10] : [0, 0, 5.5], fov: 25 }}
        >
          <OrbitControls
            makeDefault
            autoRotate
            autoRotateSpeed={0.5}
            zoomSpeed={0.1}
            enableZoom={false}
            enableRotate={isPhone ? false : true}
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
          <Html className=" w-full  h-full justify-center flex items-center">
            <section id="hero" className=" ">
              <IntroNameComponent
                NotifyDbOnClick={notifyDbOnClick}
                lat={lat}
                lng={long}
                router={router}
              />
            </section>
          </Html>

          <Particles {...props} />
        </Canvas>

        {/* if not on desk top dont show particle text */}
        <div className=" hidden md:block">{/* <ParticleText /> */}</div>
        <div id={"AboutMe"} className="my-[50px] h-[85%] md:h-[70%]">
          <AboutMe />
        </div>

        {/* projects */}
        <section id={"react"} ref={reactRef} className="  text-center ">
          <h4 className="mb-2  text-[#a631f0] text-3xl md:text-5xl font-bold">
            React & React Native
          </h4>

          <BasicProjectComponent2
            threeJsImageProxy={amaAppProxy}
            title={"AMA App"}
            description={
              "As a software engineer at American Medical Associates, I developed the AMA app with a mission to revolutionize the way the AMA staff operates. The app streamlines various backend processes such as inventory management, barcode scanning, and financial tracking for the clinic managers. Additionally, it offers a comprehensive platform for the users to communicate, set reminders, and manage their schedules seamlessly. I leveraged my expertise in React Native and Firebase to bring this innovative solution to life."
            }
            buttonText={"View Project"}
            projectLink={"https://github.com/zachrizzo/AMA_APP"}
            imageButtons={false}
            NotifyDbOnClick={notifyDbOnClick}
            lat={lat}
            lng={long}
          />

          <BasicProjectComponent2
            threeJsImageProxy={websiteProxy}
            title={"AMA Website"}
            description={
              "In collaboration with the AMA app, I developed a robust React-based website to handle the backend operations that the app could not. This website empowers employees and patients alike with a host of features, including post-visit text messaging, job application submission, new patient packet completion, department tracking and management, IT support ticket submission and resolution, and inventory management. I utilized the latest technologies such as React, Next.JS, TailWind, and Firebase to deliver a seamless and efficient user experience."
            }
            buttonText={"View Project"}
            projectLink={"https://github.com/zachrizzo/AMA_Employee_Website"}
            imageButtons={false}
            NotifyDbOnClick={notifyDbOnClick}
            lat={lat}
            lng={long}
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
          <BasicProjectComponent2
            title={"Flow Team"}
            threeJsImageProxy={flowTeamProxy}
            description={
              "Introducing Flow Team - the ultimate mobile solution for effortless team management. Designed with the modern workplace in mind, Flow Team offers a comprehensive suite of features to streamline your team's operations. From time tracking using Geo location to creating and sharing to-do lists between multiple teams, to messaging capabilities reminiscent of Slack, this app has everything you need to take your team's productivity to the next level. Built with cutting-edge technologies such as React Native and Firebase, Flow Team guarantees a seamless user experience that will keep your team organized, connected, and motivated."
            }
            buttonText={"View Project"}
            projectLink={
              "https://github.com/zachrizzo/team_Flow_productiviity_app_v3"
            }
            NotifyDbOnClick={notifyDbOnClick}
            lat={lat}
            lng={long}
          />
          {/* ////////////////// */}
          {/* <BasicProjectComponent
            videosVertical={[]}
            videosHorizontal={[]}
            images={flowTeamUrl}
            title={"Flow Team"}
            description={
              "Introducing Flow Team - the ultimate mobile solution for effortless team management. Designed with the modern workplace in mind, Flow Team offers a comprehensive suite of features to streamline your team's operations. From time tracking using Geo location to creating and sharing to-do lists between multiple teams, to messaging capabilities reminiscent of Slack, this app has everything you need to take your team's productivity to the next level. Built with cutting-edge technologies such as React Native and Firebase, Flow Team guarantees a seamless user experience that will keep your team organized, connected, and motivated."
            }
            listOfVideoIndexes={[8]}
            buttonText={"View Project"}
            projectLink={
              "https://github.com/zachrizzo/team_Flow_productiviity_app_v3"
            }
            imageButtons={true}
            NotifyDbOnClick={notifyDbOnClick}
            lat={lat}
            lng={long}
          /> */}

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

        {/* <section id={"robots"} ref={RoboticsRef} className=" text-center">
          <h4 className="mb-2 text-[#a631f0] text-3xl md:text-5xl font-bold">
            Robotics & Research
          </h4>
          <BasicProjectComponent
            images={useFulRobotUrl}
            title={"Useful Robot"}
            videosVertical={[]}
            videosHorizontal={[]}
            description={
              "I'm thrilled to introduce this research project - a highly advanced robot designed to master the intricacies of SLAM (Simultaneous Localization and Mapping) and ROS 2 Foxy. With a future addition of an arm, this robot will be capable of interacting with its environment in a meaningful way, aided by an Intel Real Sense camera equipped with stereo depth cameras for precise distance measurement. The robot leverages inverse kinematics algorithms to precisely interact with objects, delivering unparalleled accuracy and efficiency. The robot's housing was designed by me and brought to life with the help of a 3D printer, while its powerful brain - an Nvidia Jetson Xavier NX - is powered by a 12V power supply."
            }
            listOfVideoIndexes={[0]}
            projectLink={"https://github.com/zachrizzo/UsefulRobot"}
            buttonText={"View Project"}
            imageButtons={true}
            NotifyDbOnClick={notifyDbOnClick}
            lat={lat}
            lng={long}
          />

          <BasicProjectComponent
            images={crabRobotUrl}
            videosHorizontal={[]}
            videosVertical={[]}
            title={"Crab Robot"}
            description={
              "The Crab, a dynamic walking robot, its inspired by the likes of Spot from Boston Dynamics. Designed to push the boundaries of robotics, The Crab leverages the power of a Raspberry Pi Pico running MicroPython to bring its vision to life. With its multi-degree of freedom arms, The Crab is a testament to the art of engineering. Currently in the research phase, I am working tirelessly to perfect the inverse kinematics algorithms to counteract the offset weight balance, ensuring this robot will walk with grace and stability."
            }
            listOfVideoIndexes={[0, 1]}
            buttonText={"View Project"}
            imageButtons={true}
            NotifyDbOnClick={notifyDbOnClick}
            lat={lat}
            lng={long}
          />
        </section> */}

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
              "At American Medical Associates, we were faced with a mounting challenge - an overwhelming number of faxes that our staff could not keep up with. As a solution, I took the initiative to create a program that leverages OCR (Optical Character Recognition) technology to streamline the process. This program reads each fax individually and automates the necessary tasks to ensure that the faxes are sent to the appropriate providers. By utilizing their EMR, I developed a Python bot that is designed to navigate the system effortlessly, downloading and reading each fax before sending it on its way. This innovative solution has significantly reduced the burden on our staff and improved the overall efficiency of our operations."
            }
            listOfVideoIndexes={[]}
            projectLink={"https://github.com/zachrizzo/Read_ama_fax"}
            buttonText={"View Project"}
            NotifyDbOnClick={notifyDbOnClick}
            lat={lat}
            lng={long}
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
              "At American Medical Associates, with a patient base of 15,000, the task of creating an email campaign seemed daunting due to the lack of access to a comprehensive list of email addresses. However, I rose to the challenge and developed a Python bot that utilized the EMR to extract the email addresses of all 15,000 patients and consolidate them into a spreadsheet using Numpy. This streamlined solution has empowered us to conduct targeted marketing campaigns and engage with our patients in a more meaningful and personal way."
            }
            listOfVideoIndexes={[]}
            projectLink={"https://github.com/zachrizzo/Geat_allPatient_emails"}
            buttonText={"View Project"}
            NotifyDbOnClick={notifyDbOnClick}
            lat={lat}
            lng={long}
          />
        </section>
      </div>
    </Suspense>
  );
}

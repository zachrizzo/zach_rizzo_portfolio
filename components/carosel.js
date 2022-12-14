import { useState, useRef, useEffect } from "react";

// Data

const Carousel = ({ images, listOfVideoIndexes }) => {
  const maxScrollWidth = useRef(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const carousel = useRef(null);

  const movePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevState) => prevState - 1);
    }
  };

  const moveNext = () => {
    if (currentIndex < images.length - 1) {
      setCurrentIndex((prevState) => prevState + 1);
    }

    // if (
    //   carousel.current !== null &&
    //   carousel.current.offsetWidth * currentIndex <= maxScrollWidth.current
    // ) {
    //   setCurrentIndex((prevState) => prevState + 1);
    // }
  };

  const isDisabled = (direction) => {
    if (direction === "prev") {
      return currentIndex <= 0;
    }

    if (direction === "next" && carousel.current !== null) {
      return (
        carousel.current.offsetWidth * currentIndex >= maxScrollWidth.current
      );
    }

    return false;
  };

  useEffect(() => {
    if (carousel !== null && carousel.current !== null) {
      carousel.current.scrollLeft = carousel.current.offsetWidth * currentIndex;
    }
  }, [currentIndex]);

  useEffect(() => {
    maxScrollWidth.current = carousel.current
      ? carousel.current.scrollWidth - carousel.current.offsetWidth
      : 0;
  }, []);

  return (
    <div className=" rounded-3xl carousel my-5 flex-grow-0 flex justify-center item-center w-screen mx-5">
      <div className="relative w-[60%] overflow-hidden">
        <div className="flex justify-between absolute top left w-full h-full">
          <button
            onClick={movePrev}
            className="hover:bg-blue-900/75 text-white w-10 h-full text-center opacity-75 hover:opacity-100 disabled:opacity-25 disabled:cursor-not-allowed z-10 p-0 m-0 transition-all ease-in-out duration-300"
            // disabled={isDisabled("prev")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-20 -ml-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <span className="sr-only">Prev</span>
          </button>
          <button
            onClick={moveNext}
            className="hover:bg-blue-900/75 text-white w-10 h-full text-center opacity-75 hover:opacity-100 disabled:opacity-25 disabled:cursor-not-allowed z-10 p-0 m-0 transition-all ease-in-out duration-300"
            // disabled={isDisabled("next")}
          >
            <svg
              // xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-20 -ml-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
            <span className="sr-only">Next</span>
          </button>
        </div>
        <div
          ref={carousel}
          className="carousel-container relative flex gap-1 overflow-hidden scroll-smooth snap-x snap-mandatory touch-pan-x z-0"
        >
          {!images
            ? null
            : images.map((images, index) => {
                if (
                  images.metadata.contentType != "video/mp4" &&
                  images.metadata.contentType != "video/quicktime"
                ) {
                  return (
                    <div
                      key={index}
                      className="carousel-item text-center relative w-64 h-64 snap-start"
                    >
                      <a
                        //open image in new tab

                        href={images.url}
                        target="_blank"
                        className="h-full w-full aspect-square inline-flex  bg-origin-padding   bg-no-repeat z-0"
                        style={{
                          backgroundImage: `url(${images.url || ""})`,
                        }}
                      >
                        <img
                          src={images.url || ""}
                          alt={images.url}
                          className="w-full "
                        />
                      </a>
                      <a
                        href={images.url}
                        target="_blank"
                        className="h-full w-full aspect-square text-xs  absolute top-0 left-0 transition-opacity duration-300 opacity-0 hover:opacity-100 bg-blue-800/75 z-10"
                      >
                        <h3 className="text-white my-6  mx-auto text-xs">
                          {images.url}
                        </h3>
                      </a>
                    </div>
                  );
                } else {
                  return (
                    <div
                      key={index}
                      className="carousel-item text-center relative w-64 h-64 snap-start"
                    >
                      {/* q:how to open url in new tab
                       */}
                      <div
                        className=" text-xs h-full w-full aspect-square block bg-origin-padding bg-left-top bg-cover bg-no-repeat z-0"
                        style={{
                          backgroundImage: `url(${images.url || ""})`,
                        }}
                      >
                        <video
                          // src={images || ""}
                          // alt={images}
                          className="w-full aspect-square "
                          controls
                        >
                          <source src={images.url || ""} type="video/mp4" />
                        </video>
                      </div>
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
      </div>
    </div>
  );
};

export default Carousel;

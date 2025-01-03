import { useEffect, useState } from "react";
import { HiArrowSmLeft, HiArrowSmRight } from "react-icons/hi";
import { abanner } from "../../Assets";

const Images = [
  {
    image: abanner,
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione, iure.",
  },
  {
    image: abanner,
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione, iure.",
  },
  {
    image: abanner,
    text: "Banking has never been this easy, with the help of 360 Core Banking System one can record transactions with some clicks and for the calculating part",
  },
];

const Carousel = () => {
  const [currentImg, setCurrentImg] = useState(0);

  // Function to go to the next image
  const handleRight = () => {
    setCurrentImg((currentImg) => (currentImg + 1) % Images.length);
  };

  // Function to go to the previous image
  const handleLeft = () => {
    setCurrentImg(
      (currentImg) => (currentImg - 1 + Images.length) % Images.length
    );
  };

  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      handleRight(); // Move to the next image automatically
    }, 2000); // 3 seconds interval

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full ">
      <div className="relative flex items-center justify-center overflow-hidden">
        <img
          src={Images[currentImg].image}
          alt=""
          className="object-left-top w-full "
        />
        <p className="text-white text-center font-bold md:text-lg text-sm absolute md:top-[50%] w-[80%] flex justify-center items-center">
          {Images[currentImg].text}
        </p>
      </div>

      <div>
        <button
          className="absolute top-[50%] text-white p-1 rounded-xl px-1 opacity-[0.5] hover:text-cyan-600 transition-all delay-100 ease-in"
          onClick={handleLeft}
        >
          <HiArrowSmLeft className="text-4xl opacity-0" />
        </button>
        <button
          className="absolute top-[50%] right-0 text-white p-1 rounded-xl px-1 opacity-[0.5] hover:text-cyan-600 transition-all delay-100 ease-in"
          onClick={handleRight}
        >
          <HiArrowSmRight className="text-4xl opacity-0" />
        </button>
      </div>
      <div className="absolute right-[50%] bottom-2 flex justify-center items-center">
        {Images.map((_, index) => (
          <button
            key={index}
            className={`p-2 mx-1 rounded-full ${
              index === currentImg ? "bg-slate-950" : "bg-slate-400"
            }`}
            onClick={() => setCurrentImg(index)} // Allow manual navigation
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Carousel;

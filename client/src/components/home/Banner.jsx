import { joonBanner } from "../../Assets";

const Banner = () => {
  return (
    <div className="relative text-white ">
      <div className="">
        <img src={joonBanner} alt="" className=" lg:h-[265px] md:h-[270px] w-full h-[300px]" />
      </div>
      <div className="absolute lg:text-3xl text-xl text-justify top-3 xl:mx-[10rem] lg:mx-[3rem] md:mx-[2.5rem] mx-[1rem] my-[2rem] sm:w-[370px] md:w-[700px] lg:w-[900px]  xl:w-[1000px]">
        <p className="font-bold lg:text-3xl ">360 Quantum Cloud Banking</p>
        <hr className="border-2 md:w-[40px] w-[30px] border-red-600 lg:mb-[2rem] md:mb-[1rem] mb-[1.5rem]"></hr>
        <p className="md:mt-5 mt-3 text-[16px] md:text-xl lg:text-2xl leading-5 ">
          Cloud computing is the future of banking technology
        </p>
        <p className="mt-2 md:text-base sm:text-[12px] text-[13px] leading-4 text-slate-200">
          With 360 Quantum, you have the option to access our banking solutions
          via the cloud rather than installing in house. Cloud offers a
          scalable, manageable technology model that reduces IT hardware,
          maintenance and development costs. This in turn gives you the agility
          and flexibility to embrace new markets, new services and new channels,
          in line with consumer needs.
        </p>
      </div>
    </div>
  );
};

export default Banner;

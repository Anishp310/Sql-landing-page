import { abanner } from "../../Assets/index";

const Abanner = () => {
  return (
    <div className='relative md:h-[200px]  text-white overflow-hidden'>
      <img src={abanner} alt="Banner" className='object-left-top w-full' />
      
      <div className='absolute top-[30%]    md:text-4xl'>
        <div className='flex items-center'>
          <hr className='rotate-90 w-[80px] border-white border-1 ' />
          <div>
            <p className='xl:text-4xl lg:text-4xl md:text-3xl font-bold text-xl'>About Us</p>
            <p className='mt-2 text-[16px] md:text-xl lg:text-2xl'>Modernize your data landscape to monetize Data</p>
          </div>
      </div>
      </div>
    </div>
  );
};

export default Abanner;

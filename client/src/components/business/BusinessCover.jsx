import { abanner } from "../../Assets/index";

const BusinessCover = () => {
  return (
    <div className='relative md:h-[200px]  text-white overflow-hidden'>
      <img src={abanner} alt="Banner" className='object-left-top w-full' />

      <div className='absolute lg:top-[40%] xl:left-[20%] lg:left-[15%] md:top-[30%] left-[0%] top-[25%]  md:text-4xl 4k:left-[28%]'>
        <div className='flex items-center'>
          <hr className='rotate-90 w-[80px] border-white border-1 ' />
          <div>
            <p className='text-2xl font-semibold md:text-4xl'>For Business</p>
            <p className='mt-2 text-sm md:text-lg'>Grow your Business With</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BusinessCover



import { abanner } from "../../Assets/index";

const BusinessCover = () => {
  return (
    <div className='relative md:h-[200px]  text-white overflow-hidden'>
      <img src={abanner} alt="Banner" className='object-left-top w-full' />

      <div className='absolute lg:top-[40%] xl:left-[20%] lg:left-[15%] md:top-[30%] left-[0%] top-[25%]  md:text-4xl'>
        <div className='flex items-center'>
          <hr className='rotate-90 w-[80px] border-white border-1 ' />
          <div>
            <p className='xl:text-4xl lg:text-4xl md:text-3xl font-bold  text-xl'>For Business</p>
            <p className='mt-2 text-[16px] md:text-xl lg:text-2xl'>Grow your Business With</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BusinessCover



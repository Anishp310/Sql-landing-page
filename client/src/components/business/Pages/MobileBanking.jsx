import React from 'react'
import { abanner } from "../../../Assets/index";
import img4 from "../../../Assets/mobile-banking.jpg"

const MobileBanking = () => {
  return (
    <div>
      <div>
          <div className='relative md:h-[200px]  text-white overflow-hidden'>
                <img src={abanner} alt="Banner" className='object-left-top w-full' />

                <div className='absolute lg:top-[40%] xl:left-[20%] lg:left-[15%] md:top-[30%] left-[0%] top-[25%]  md:text-4xl'>
                  <div className='flex items-center'>
                    <hr className='rotate-90 w-[80px] border-white border-1 ' />
                    <div>
                      <p className='text-2xl font-semibold md:text-4xl'>For MobileBanking</p>
                      <p className='mt-2 text-sm md:text-lg'>Grow your Business With</p>
                    </div>
                  </div>
                </div>
              </div>
      </div>
      <div className='mb-6 xl:mx-[10rem] lg:mx-[3rem] md:mx-[2.5rem] mx-[1rem]'>
         <section className="mt-16 bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-3xl font-semibold text-gray-800 mb-6">Mobile Banking</h2>
                <div className="flex flex-col lg:flex-row gap-8">
                  <div className="lg:w-2/3">
                    <p className="text-lg text-gray-700">
                      Mobile banking offers users the convenience of managing their finances anytime, anywhere, through a secure mobile app. It enables quick and easy services like fund transfers, bill payments, mobile top-ups, and merchant transactions. Users can check account balances, view mini statements, and receive instant alerts for transactions. With 24/7 accessibility, mobile banking eliminates the need for branch visits, saving time and enhancing customer experience.
                    </p>
                  </div>
                  <div className="lg:w-1/3">
                    <img 
                      src={img4} 
                      alt="Mobile Banking" 
                      className="w-full h-64 object-cover rounded-lg shadow-lg" 
                    />
                  </div>
                </div>
              </section>
      </div>
    </div>
  )
}

export default MobileBanking
import React from 'react'
import { abanner } from "../../../Assets/index";
import img2 from "../../../Assets/360-core.jpg"

const CoreBankingSystem = () => {
  return (
    <div >
      <div>
         <div className='relative md:h-[200px]  text-white overflow-hidden'>
              <img src={abanner} alt="Banner" className='object-left-top w-full' />
        
              <div className='absolute lg:top-[40%] xl:left-[20%] lg:left-[15%] md:top-[30%] left-[0%] top-[25%]  md:text-4xl'>
                <div className='flex items-center'>
                  <hr className='rotate-90 w-[80px] border-white border-1 ' />
                  <div>
                    <p className='text-2xl font-semibold md:text-4xl'>For CoreBankingSystem</p>
                    <p className='mt-2 text-sm md:text-lg'>Grow your Business With</p>
                  </div>
                </div>
              </div>
            </div>
      </div>
      <div className='mb-6 xl:mx-[10rem] lg:mx-[3rem] md:mx-[2.5rem] mx-[1rem]'>
      <section className="mt-16 bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">360 Core Banking System</h2>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            <p className="text-lg text-gray-700">
              The 360 Core Banking System is a state-of-the-art platform designed to optimize the operations of cooperatives and financial institutions. It integrates essential banking functionalities, including savings, loans, payments, and reporting, into a seamless and user-friendly interface. This system enhances efficiency, reduces errors, and ensures compliance with regulatory standards, allowing cooperatives to scale their services and serve their members more effectively.
            </p>
          </div>
          <div className="lg:w-1/3">
            <img 
              src={img2} 
              alt="360 Core Banking" 
              className="w-full h-64 object-cover rounded-lg shadow-lg" 
            />
          </div>
        </div>
      </section>

      </div>
    </div>
  )
}

export default CoreBankingSystem
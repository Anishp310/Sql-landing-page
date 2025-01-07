import React from 'react'
import { abanner } from "../../../Assets/index";
import img3 from "../../../Assets/internet-banking.jpg"

const InternetBanking = () => {
  return (
    <div><div>
       <div className='relative md:h-[200px]  text-white overflow-hidden'>
            <img src={abanner} alt="Banner" className='object-left-top w-full' />
      
            <div className='absolute lg:top-[40%] xl:left-[20%] lg:left-[15%] md:top-[30%] left-[0%] top-[25%]  md:text-4xl'>
              <div className='flex items-center'>
                <hr className='rotate-90 w-[80px] border-white border-1 ' />
                <div>
                  <p className='text-2xl font-semibold md:text-4xl'>For InternetBanking</p>
                  <p className='mt-2 text-sm md:text-lg'>Grow your Business With</p>
                </div>
              </div>
            </div>
          </div>
      </div>
      <div className='xl:mx-[10rem] lg:mx-[3rem] md:mx-[2.5rem] mx-[1rem] mb-6'>
      <section className="mt-16 bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-3xl font-semibold text-gray-800 mb-6">Internet Banking</h2>
              <div className="flex flex-col lg:flex-row gap-8">
                <div className="lg:w-2/3">
                  <p className="text-lg text-gray-700">
                    Internet banking enables users to manage their finances conveniently through a secure online platform. It offers 24/7 access to essential banking services, including fund transfers, bill payments, account balance inquiries, and transaction history checks. With robust security measures like encryption and multi-factor authentication, internet banking ensures data protection and safe transactions. It eliminates the need for physical branch visits, saving time and effort.
                  </p>
                </div>
                <div className="lg:w-1/3">
                  <img 
                    src={img3} 
                    alt="Internet Banking" 
                    className="w-full h-64 object-cover rounded-lg shadow-lg" 
                  />
                </div>
              </div>
            </section>
      </div>
       
      </div>
  )
}

export default InternetBanking
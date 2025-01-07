import React from 'react'
import { abanner } from "../../../Assets/index";
import img6 from "../../../Assets/atm-services.jpg"

const Atm = () => {
  return (
    <div >
      <div>
         <div className='relative md:h-[200px]  text-white overflow-hidden'>
              <img src={abanner} alt="Banner" className='object-left-top w-full' />
        
              <div className='absolute lg:top-[40%] xl:left-[20%] lg:left-[15%] md:top-[30%] left-[0%] top-[25%]  md:text-4xl'>
                <div className='flex items-center'>
                  <hr className='rotate-90 w-[80px] border-white border-1 ' />
                  <div>
                    <p className='text-2xl font-semibold md:text-4xl'>For Atm</p>
                    <p className='mt-2 text-sm md:text-lg'>Grow your Business With</p>
                  </div>
                </div>
              </div>
            </div>
      </div>
      <div className='mb-6 xl:mx-[10rem] lg:mx-[3rem] md:mx-[2.5rem] mx-[1rem]'>
      <section className="mt-16 bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">ATM Services & Trading</h2>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            <p className="text-lg text-gray-700">
              ATMs provide 24/7 access to essential banking services, including cash withdrawals, deposits, fund transfers, and balance inquiries. These self-service terminals eliminate the need for branch visits, ensuring convenience and efficiency. With secure authentication, ATMs offer a reliable way to manage finances anytime, anywhere.
              <br />
              Jooneli Trading is a comprehensive accounting system designed for businesses. It provides retailers, restaurants, and general businesses with user-friendly tools to streamline accounting processes, ensuring accuracy and real-time insights into financial data. The system supports POS integration, inventory management, multi-currency transactions, and detailed reporting.
            </p>
          </div>
          <div className="lg:w-1/3">
            <img 
              src={img6} 
              alt="ATM & Trading" 
              className="w-full h-64 object-cover rounded-lg shadow-lg" 
            />
          </div>
        </div>
      </section>

      </div>
    </div>
  )
}

export default Atm
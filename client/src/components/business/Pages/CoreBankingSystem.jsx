import { abanner } from "../../../Assets/index";

const CoreBankingSystem = () => {
  return (
    <div>
      <div>
        <div className="relative md:h-[200px]  text-white overflow-hidden">
          <img src={abanner} alt="Banner" className="object-left-top w-full" />

          <div className="absolute lg:top-[40%] xl:left-[20%] lg:left-[15%] md:top-[30%] left-[0%] top-[25%]  md:text-4xl">
            <div className="flex items-center">
              <hr className="rotate-90 w-[80px] border-white border-1 " />
              <div>
                <p className="mt-2 text-sm md:text-lg">
                  Grow your Business With
                </p>
                <p className="text-2xl font-semibold md:text-4xl">
                  360 Core Banking System
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-[1600px] mx-auto">
      <div className="mb-6 xl:mx-[10rem] lg:mx-[3rem] md:mx-[2.5rem] mx-[1rem]">
        <section className="py-4 mt-1 bg-white md:py-8 md:mt-6">
          <h2 className="mb-2 text-lg font-semibold text-red-900 md:mb-6 lg:text-2xl md:text-xl">
            360 Core Banking Software : Empowering Financial Institutions
          </h2>
          <div className="text-sm text-justify md:text-base lg:text-lg">
            <p className="mb-2">
              {" "}
              The 360 Core Banking Software is Jooneli Inc’s flagship product,
              providing a comprehensive and scalable solution for banks and
              financial institutions. This system enables real-time banking
              operations, ensuring that all transactions and processes are
              handled seamlessly and efficiently. The software is designed to
              support a wide range of banking activities, including account
              management, fund transfers, loan processing, and financial
              reporting.{" "}
            </p>

            <p className="mb-2">
              One of the key features of the 360 Core Banking Software is its
              flexibility. The system is highly customizable, allowing banks to
              tailor the software to their specific needs. It supports multiple
              languages and currencies, making it suitable for banks operating
              in different regions. The software integrates advanced security
              features, such as multi-factor authentication, data encryption,
              and robust access controls, ensuring that sensitive financial data
              is protected.
            </p>
            <p className="mb-2">
              Additionally, the 360 Core Banking Software enhances operational
              efficiency by automating many routine tasks. This reduces human
              error, increases transaction speed, and helps banks provide better
              services to their customers. With integrated reporting and
              analytics capabilities, financial institutions can gain valuable
              insights into their operations, helping them make informed
              decisions and improve overall performance.
            </p>
          </div>
        </section>
      </div>
      </div>
      
    </div>
  );
};

export default CoreBankingSystem;

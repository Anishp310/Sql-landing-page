import { abanner } from "../../../Assets/index";

const InternetBanking = () => {
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
                  Internet Banking
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="xl:mx-[10rem] lg:mx-[3rem] md:mx-[2.5rem] mx-[1rem] mb-6">
        <section className="py-4 mt-1 bg-white md:py-8 md:mt-6">
          <h2 className="mb-2 text-xl font-semibold text-red-900 md:mb-6 lg:text-3xl md:text-2xl">
          Internet Banking - Banking at Your Fingertips
          </h2>
          <div className="text-sm text-justify text-gray-700 md:text-base lg:text-lg">           
              <p className="mb-2">
                Internet banking enables users to manage their finances
                conveniently through a secure online platform. It offers 24/7
                access to essential banking services, including fund transfers,
                bill payments, account balance inquiries, and transaction
                history checks. Businesses can manage payroll and vendor
                payments, while individuals can perform everyday banking tasks
                from anywhere.
              </p>
              <p className="mb-2">
                With robust security measures like encryption and multi-factor
                authentication, internet banking ensures data protection and
                safe transactions. It eliminates the need for physical branch
                visits, saving time and effort. By combining convenience,
                efficiency, and security, internet banking empowers users to
                stay in control of their finances anytime, anywhere.
              </p>           
          </div>
        </section>
      </div>
    </div>
  );
};

export default InternetBanking;

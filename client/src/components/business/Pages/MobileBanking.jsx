import { abanner } from "../../../Assets/index";

const MobileBanking = () => {
  return (
    <div>
      <div>
        <div className="relative md:h-[200px]  text-white overflow-hidden">
          <img src={abanner} alt="Banner" className="object-left-top w-full" />

          <div className="absolute lg:top-[40%] xl:left-[20%] lg:left-[15%] md:top-[30%] left-[0%] top-[25%]  md:text-4xl 4k:left-[28%] 2k:left-[29%] 5k:left-[32%]">
            <div className="flex items-center">
              <hr className="rotate-90 w-[80px] border-white border-1 " />
              <div>
                <p className="mt-2 text-sm md:text-lg">
                  Grow your Business With
                </p>
                <p className="text-2xl font-semibold md:text-4xl">
                  {" "}
                  Mobile Banking
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
            Mobile Banking - Banking on the Go
          </h2>
          <div className=" text-justify text-gray-700 md:text-base text-[13px]">
            <p className="mb-2">
              Mobile banking offers users the convenience of managing their
              finances anytime, anywhere, through a secure mobile app. It
              enables quick and easy services like fund transfers, bill
              payments, mobile top-ups, and merchant transactions. Users can
              check account balances, view mini statements, and receive instant
              alerts for transactions.{" "}
            </p>
            <p className="mb-2">
              With 24/7 accessibility, mobile banking eliminates the need for
              branch visits, saving time and enhancing customer experience.
              Advanced security features, including encryption and multi-factor
              authentication, ensure safe transactions. Mobile banking empowers
              users with flexibility, efficiency, and real-time control over
              their finances, making it a cornerstone of modern digital banking.
            </p>
          </div>
        </section>
      </div>
      </div>
     
    </div>
  );
};

export default MobileBanking;

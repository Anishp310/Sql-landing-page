import { abanner } from "../../../Assets/index";

const Atm = () => {
  return (
    <div>
      <div>
        <div className="relative md:h-[200px]  text-white overflow-hidden">
          <img src={abanner} alt="Banner" className="object-left-top w-full" />

          <div className="absolute lg:top-[40%] xl:left-[20%] lg:left-[15%] md:top-[30%] left-[0%] top-[25%] 4k:left-[28%] 2k:left-[29%] 5k:left-[32%]  md:text-4xl">
            <div className="flex items-center">
              <hr className="rotate-90 w-[80px] border-white border-1 " />
              <div>
                <p className="mt-2 text-sm md:text-lg">
                  Grow your Business With
                </p>
                <p className="text-2xl font-semibold md:text-4xl">
                  Atm Services
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
              ATM: Convenient Self-Service Banking
            </h2>
            <div className="text-sm text-justify text-gray-700 md:text-base lg:text-lg">
              <p className="mb-2">
                ATMs provide 24/7 access to essential banking services,
                including cash withdrawals, deposits, fund transfers, and
                balance inquiries. These self-service terminals eliminate the
                need for branch visits, ensuring convenience and efficiency.
                With secure authentication, ATMs offer a reliable way to manage
                finances anytime, anywhere.ATM services extend the ecosystem's
                reach, providing cash withdrawals, deposits, and other services
                anytime, anywhere.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Atm;

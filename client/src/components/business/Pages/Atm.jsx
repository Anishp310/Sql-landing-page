import { abanner } from "../../../Assets/index";

const Atm = () => {
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
                  Atm Services
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mb-6 xl:mx-[10rem] lg:mx-[3rem] md:mx-[2.5rem] mx-[1rem]">
        <section className="p-8 mt-6 bg-white ">
          <h2 className="mb-6 text-3xl font-semibold text-red-900">
            ATM: Convenient Self-Service Banking
          </h2>
          <div className="text-lg text-justify text-gray-700">
            <p className="mb-2">
              ATMs provide 24/7 access to essential banking services, including
              cash withdrawals, deposits, fund transfers, and balance inquiries.
              These self-service terminals eliminate the need for branch visits,
              ensuring convenience and efficiency. With secure authentication,
              ATMs offer a reliable way to manage finances anytime, anywhere.ATM
              services extend the ecosystem's reach, providing cash withdrawals,
              deposits, and other services anytime, anywhere.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Atm;

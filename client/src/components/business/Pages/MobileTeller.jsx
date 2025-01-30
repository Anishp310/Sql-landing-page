import { abanner } from "../../../Assets/index";

const MobileTeller = () => {
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
                  Mobile Teller
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-[1600px] mx-auto">
      <div className="mb-6 xl:mx-[10rem] lg:mx-[3rem] md:mx-[2.5rem] mx-[1rem]">
        <section className="py-4 mt-1 bg-white md:mt-6 md:py-8">
          <h2 className="mb-2 text-lg font-semibold text-red-900 md:mb-6 lg:text-2xl md:text-xl">
            Mobile Teller: Personalized Banking at Your Doorstep
          </h2>
          <div className="text-sm text-justify text-gray-700 md:text-base lg:text-lg">
            <p className="mb-2">
              Mobile Teller services bring the bank to the customer, offering a
              convenient and personalized banking experience. Equipped with
              advanced technology, mobile tellers can perform essential tasks
              such as account opening, cash deposits and withdrawals, check
              processing, and balance inquiries.
            </p>
            <p className="mb-2">
              Ideal for businesses and individuals, Mobile Teller eliminates the
              need for branch visits, saving time and effort. It enhances
              customer satisfaction by providing tailored services at the
              customer’s location. With secure systems and real-time
              connectivity to the bank’s core network, Mobile Teller ensures
              efficient and safe transactions, making it a valuable addition to
              modern banking ecosystems.
            </p>
          </div>
        </section>
      </div>
      </div>
      
    </div>
  );
};

export default MobileTeller;

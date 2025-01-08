import { abanner } from "../../Assets/index";

const Trading = () => {
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
                  Trading Services
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="mt-6 mb-6 xl:mx-[10rem] lg:mx-[3rem] md:mx-[2.5rem] mx-[1rem] ">
          <h1 className="mb-4 font-bold text-red-900 md:text-2xl lg:text-3xl">
            Jooneli Trading: A Comprehensive Accounting System for Businesses
          </h1>
          <p className="mb-4 text-lg text-gray-600">
            Jooneli Trading is a robust accounting system designed to meet the
            diverse financial management needs of retailers, shops, restaurants,
            and general businesses. Tailored to suit a wide range of industries,
            Jooneli Trading provides efficient, user-friendly tools that
            streamline accounting processes, ensuring accuracy and real-time
            insights into financial data.
          </p>

          <h2 className="mt-6 mb-3 font-semibold text-gray-800 md:text-xxl lg:text-2xl">
            For Retailers
          </h2>
          <p className="mb-4 text-gray-600 lg:text-lg md:text-base">
            Jooneli Trading offers point-of-sale (POS) integration, enabling
            seamless transactions and real-time inventory tracking. This feature
            simplifies sales, billing, and stock management while automatically
            updating financial records, making it easier to monitor profit
            margins and manage cash flow. Retailers can also generate detailed
            sales reports, helping them make informed business decisions.
          </p>

          <h2 className="mt-6 mb-3 font-semibold text-gray-800 md:text-xxl lg:text-2xl">
            For Restaurants
          </h2>
          <p className="mb-4 text-gray-600 lg:text-lg md:text-base">
            Jooneli Trading provides specialized features like order management,
            bill splitting, and tip tracking, which are essential for daily
            operations. The system integrates with the kitchen and front-end
            service, ensuring accurate invoicing and seamless communication.
            Additionally, it handles complex financial aspects, such as managing
            food costs, payroll, and vendor payments, all within a single
            platform.
          </p>

          <h2 className="mt-6 mb-3 font-semibold text-gray-800 md:text-xxl lg:text-2xl">
            For General Businesses
          </h2>
          <p className="mb-4 text-gray-600 lg:text-lg md:text-base">
            Jooneli Trading offers essential features such as journal entries,
            accounts payable and receivable, balance sheets, and profit-and-loss
            reports. The system supports multi-currency transactions, ideal for
            businesses with global operations. Users can automate invoicing and
            payment reminders, track expenses, and generate tax reports,
            ensuring compliance with local regulations.
          </p>

          <p className="mb-4 text-gray-600 lg:text-lg md:text-base">
            Jooneli Trading is designed for ease of use, with an intuitive
            interface that requires minimal training. The system ensures data
            security with encryption and regular backups, safeguarding sensitive
            financial information. Additionally, it supports cloud-based
            deployment, allowing business owners to access their financial data
            anytime, anywhere, ensuring full control over their operations.
          </p>

          <p className="text-gray-600 lg:text-lg md:text-base">
            Overall, Jooneli Trading provides a comprehensive, scalable solution
            that helps businesses manage their finances efficiently and
            effectively, fostering growth and financial stability.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Trading;

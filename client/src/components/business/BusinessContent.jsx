import BusinessImg from "../../Assets/Business_imgs.png";
import BusinessListComponent from "./Business_Link_List";

const BusinessContent = () => {
  return (
    <div>
      <div className="xl:mx-[10rem] lg:mx-[3rem] md:mx-[2.5rem] mx-[1rem]">
        <div className="flex flex-col items-center justify-center py-6 lg:py-10 md:py-6">
          <p className="text-xl font-bold lg::text-4xl lg:mb-[3rem] md:text-2xl md:mb-6 mb-4">
            <span className="font-extrabold text-red-900">Corporate</span>{" "}
            Digital Banking
          </p>
          <p className="mb-2 text-sm text-justify lg::text-lg md:text-base">
            360 Corporate Banking is a comprehensive solution suite built on an
            advanced architecture. The solution addresses the trade finance,
            lending, syndication, payments, origination, limits, collaterals,
            treasury, deposits, liquidity management, online banking and mobile
            banking requirements of corporate banks worldwide and enables them
            to deliver customized offerings to enterprise clients of all sizes.
          </p>
          <p className="text-sm text-justify lg:text-lg md:text-base">
            360 CBS has helped corporate banks around the world re-imagine their
            business with digital technologies to drive new revenue streams. The
            solution leverages emerging technologies such as block-chain and
            advanced analytics to offer impressive benefits to banks and their
            clients.
          </p>
         
        </div>
        <div className="flex items-center justify-center gap-5 text-sm font-bold md:text-center lg:my-[3rem] md:my-[1rem] ">
            <BusinessListComponent/>
        </div>
          
        <div className="mx-6 mt-5 text-center lg:mx-10 md:mx-8">
          <p className="mb-3 text-xl font-bold md:text-2xl lg:text-4xl">
            <span className="font-bold text-red-900">Grow your business</span>{" "}
            with Jooneli Trading
          </p>
          <p className="text-sm md:text-md">
            We empower businesses of all sizes and merchants all around the
            country with nobility of technology
          </p>
        </div>
        <div className="flex items-center justify-center w-full mt-5">
          <img src={BusinessImg} alt="" />
        </div>
      </div>
    </div>
  );
};

export default BusinessContent;

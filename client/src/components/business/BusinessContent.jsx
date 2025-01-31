import BusinessImg from "../../Assets/Business_imgs.png";
import BusinessListComponent from "./Business_Link_List";

const BusinessContent = () => {
  return (
    <div className="max-w-[1600px] mx-auto">
      <div className="xl:mx-[10rem] lg:mx-[3rem] md:mx-[2.5rem] mx-[1rem]">
        <div className="flex flex-col items-center justify-center py-6 lg:py-10 md:py-6">
          <p className="text-xl font-bold lg::text-4xl  md:text-2xl ">
            <span className="text-[16px] md:text-xl lg:text-2xl text-red-900">Corporate</span>{" "}
            Digital Banking
          </p>
          <p className="mt-4  text-justify md:text-base sm:text-[12px] text-[13px]">
            360 Corporate Banking is a comprehensive solution suite built on an
            advanced architecture. The solution addresses the trade finance,
            lending, syndication, payments, origination, limits, collaterals,
            treasury, deposits, liquidity management, online banking and mobile
            banking requirements of corporate banks worldwide and enables them
            to deliver customized offerings to enterprise clients of all sizes.
          </p>
          <p className=" text-justify md:text-base sm:text-[12px] text-[13px]">
            360 CBS has helped corporate banks around the world re-imagine their
            business with digital technologies to drive new revenue streams. The
            solution leverages emerging technologies such as block-chain and
            advanced analytics to offer impressive benefits to banks and their
            clients.
          </p>
         
        </div>
        <div className="flex  items-center justify-center gap-5 text-[16px] md:text-xl lg:text-2xl md:text-center ">
            <BusinessListComponent/>
        </div>
          
        <div className="mx-6 mt-8 text-center lg:mx-10 md:mx-8">
          <p className="mb-3 text-[16px] md:text-xl lg:text-2xl font-bold">
            <span className="text-[16px] md:text-xl lg:text-2xl text-red-900">Grow your business</span>{" "}
            with Jooneli Trading
          </p>
          <p className="md:text-base sm:text-[12px] text-[13px]">
            We empower businesses of all sizes and merchants all around the
            country with nobility of technology
          </p>
        </div>
        <div className="flex mt-8 items-center justify-center w-full ">
          <img src={BusinessImg} alt="" />
        </div>
      </div>
    </div>
  );
};

export default BusinessContent;

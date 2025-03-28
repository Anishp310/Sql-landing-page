import { useState } from "react";
import { CiBank } from "react-icons/ci";
import { GiTrade } from "react-icons/gi";
import { IoIosPhonePortrait } from "react-icons/io";
import { Link } from "react-router-dom";

// import { mobileBanking, onlineBanking, trader } from "../../Assets/index";

const Images = [
  {
    id: 1,
    image: <IoIosPhonePortrait className="text-4xl" />
    ,
    title: "Corporate Digital Banking",
    text: "",
    link:"/digital_banking",
    Content: [
      "360 Core Banking System",
      "Mobile Banking",
      "Tab Banking",
      "ATM",
      "Internet Banking",
    ],
  },
  {
    id: 2,
    image: <CiBank className="text-4xl" />,
    text: "Request and get 24/7 desired information.",
    title: "Mobile Banking",
    link:"/mobile_banking",
    Content: [
      "A/C to A/C fund transfer",
      "Mobile Topup (Pinless Recharge and Electronic Recharge Coupon)",
      "Bill Payment and Merchant Payment",
      "A/C balance inquiry / Mini Statement etc.",
    ],
  },
  {
    id: 3,
    image: <GiTrade className="text-4xl" />    ,
    text: "Jooneli Trading: Smart Accounting for Businesses",
    title: "Jooneli in Trading",
    link:"/trading",
    Content: [
      "Effortlessly record all your accounting transactions",
      "Track your inventory's position at different locations, transfer between warehouses and manage your product/ services.",
      "Upload pictures of documents and link them with transactions.",
      "Track your finance and taxes with accurate accounting and tax reports in real-time.",
      "Simplify productivity with digital tools right inside the application",
    ],
  },
];

const Container = () => {
  const [selected, setSelected] = useState(1);

  const handleClick = (id) => {
    setSelected(id);
  };
  const selectedItem = Images.find((item) => item.id === selected);

  return (
    <div className="max-w-[1600px] mx-auto">
     <div className="flex flex-col justify-center items-center  py-6 xl:mx-[10rem] lg:mx-[3rem] md:mx-[2.5rem] mx-[1rem]">
      {/* Header */}
      <div className="flex items-center justify-center text-center">
        <p className="text-xl font-bold text-red-800 md:text-2xl">For Business</p>
      </div>

      {/* Card Section */}
      <div className="grid grid-cols-3 mt-6 max-w-[500px]">
        {Images.map((item, index) => (
          <div
            onClick={() => handleClick(item.id)}
            key={index}
            className={`flex flex-col items-center justify-between p-2 max-w-[200px]  transition-all duration-200 ease-in-out cursor-pointer ${
              selected === item.id ? "text-rose-800" : "text-rose-800"
            }`}
          >
            {/* <img
              src={item.image}
              alt={item.title}
              className="object-cover w-12 h-12 bg-gray-200 rounded-full hover:opacity-60 "
            /> */}
            <div className="flex items-center justify-center object-cover w-12 h-12 rounded-full bg-gray-50 hover:opacity-60 ">
            {item.image}
            </div>
            <p className="mt-4 text-[10px] sm:text-sm font-medium text-center md:text-base h-[40px] flex justify-center hover:underline item-baseline ">
              {item.title}
            </p>
          </div>
        ))}
      </div>

      {/* Selected Content Section */}
      {selected && (
        <div className="w-full  md:mt-[4rem]  mt-[2rem] text-white border-b-2 rounded-b-lg shadow-lg bg-gray-50  sm:px-[3rem] sm:py-[2rem] px-[1rem] py-[1rem]">
          <h3 className="font-semibold sm:text-md text-slate-900 md:text-xl">
            {selectedItem.title}
          </h3>
          <hr className="border md:w-[80px] w-[50px] border-red-600  md:mb-[0.5rem]" />
          {/* Displaying the Text */}
          <p className="pb-4 text-sm text-slate-600 md:text-base">{selectedItem.text}</p>
          {selectedItem.Content.map((line, index) => (

          <ul key={index} className="px-4 list-disc list-inside sm:text-sm md:text-base text-slate-600 text-[10px]">
              <li >{line}</li>
          </ul>
            ))}

          <div className="mt-4">

            <Link to={selectedItem.link}>
            <p className="text-lg hover:text-red-700 text-slate-800">
              Read More <span className="text-2xl">+</span>
            </p>
            </Link>
          </div>
        </div>
      )}
    </div>
    </div>
   
  );
};

export default Container;

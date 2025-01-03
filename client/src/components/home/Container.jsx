import { useState } from "react";
import { mobileBanking, onlineBanking, trader } from "../../Assets/index";
import { IoIosPhonePortrait } from "react-icons/io";
import { CiBank } from "react-icons/ci";
import { GiTrade } from "react-icons/gi";

const Images = [
  {
    id: 1,
    image: <IoIosPhonePortrait className="text-4xl" />
    ,
    title: "Corporate Digital Banking",
    text: "",
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
    text: "Banking has never been this easy, with the help of 360 Core Banking System.",
    title: "Joonel in Trading",
    Content: [
      "Balance inquiry",
      "Deposit/Withdraw message",
      "Loan due date message",
      "Bulk message etc.",
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
    <>
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
            <div className="object-cover w-12 h-12 bg-gray-200 rounded-full hover:opacity-60  flex justify-center items-center ">
            {item.image}
            </div>
            <p className="mt-4 text-[10px] sm:text-sm font-medium text-center md:text-base h-[40px] flex items-center justify-center hover:underline ">
              {item.title}
            </p>
          </div>
        ))}
      </div>

      {/* Selected Content Section */}
      {selected && (
        <div className="w-full mt-4 text-white border-b-2 rounded-b-lg shadow-lg bg-gray-200 sm:px-[3rem] sm:py-[2rem] px-[1rem] py-[1rem]">
          <h3 className="font-semibold sm:text-md text-slate-900 md:text-xl">
            {selectedItem.title}
          </h3>
          <hr className="border md:w-[80px] w-[50px] border-red-600  md:mb-[0.5rem]" />
          {/* Displaying the Text */}
          <p className="pb-4 text-sm text-slate-600 md:text-base">{selectedItem.text}</p>
          <ul className="px-4 list-disc list-inside sm:text-sm md:text-base text-slate-600 text-[10px]">
            {selectedItem.Content.map((line, index) => (
              <li key={index}>{line}</li>
            ))}
          </ul>
          <div className="mt-4">
            <p className="text-lg hover:text-red-700 text-slate-800">
              Read More <span className="text-2xl">+</span>
            </p>
          </div>
        </div>
      )}
    </div>
    </>
   
  );
};

export default Container;

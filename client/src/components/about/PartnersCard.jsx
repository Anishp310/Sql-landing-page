// import React from "react";
// import { IoLogoLinkedin } from "react-icons/io5";
// import { team } from "../../Assets";

// // Fake Data for Partners
// const PartnersData = [
//   {
//     id: 1,
//     name: "John Doe",
//     position: "Manager",
//     image: team,
//     companyName: "TechCorp",

//   },
//   {
//     id: 2,
//     name: "Jane Smith",
//     position: "Director",
//     image: team,
//     companyName: "CreativeSolutions",
//   },
//   {
//     id: 3,
//     name: "Mark Johnson",
//     position: "CEO",
//     image: team,
//     companyName: "InnovateTech",
//   },
//   {
//     id: 4,
//     name: "Alice Williams",
//     position: "CTO",
//     image: team,
//     companyName: "VisionaryApps",
//   },
// ];

// const PartnersCard = () => {
//   return (
//     <>
//           <h1 className="mt-4 text-4xl text-center text-red-900">Board of Directors</h1>

//        <div className="flex flex-wrap justify-center max-w-screen-xl gap-8 p-8 mx-auto">
//       {PartnersData.map((partner) => (
//         <div
//           key={partner.id}
//           className="overflow-hidden transition-all duration-300 transform bg-white rounded-lg shadow-md w-72 hover:shadow-2xl hover:-translate-y-2"
//         >
//           {/* Image Container */}
//           <div>
//             <img
//               src={partner.image}
//               alt={partner.name}
//               className="object-cover w-full h-48"
//             />
//           </div>

//           {/* Card Content */}
//           <div className="flex flex-col items-center justify-center px-6 py-4 text-center">
//             <h3 className="text-xl font-semibold text-gray-800">{partner.name}</h3>
//             <p className="mt-1 text-sm text-gray-500">{partner.position}</p>
//             <p className="mt-2 text-sm italic text-gray-600">
//               {partner.companyName}
//             </p>
//             <IoLogoLinkedin className="mt-2 rounded-full size-8 " />
//           </div>
//           <div>
          
//           </div>
//         </div>
//       ))}
//     </div>
//     </>
 
//   );
// };  

// export default PartnersCard;

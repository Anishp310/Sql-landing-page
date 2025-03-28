import { IoLogoInstagram } from "react-icons/io";
import { IoLogoFacebook } from "react-icons/io";
import { IoLogoLinkedin } from "react-icons/io5";
import { girlteam } from "../../Assets";
import { team } from "../../Assets";

const ManagementData = [
  {
    id: 1,
    name: "Apar Thebe",
    position: "CEO",
    image: team,
    companyName: "Jooneli Inc.",
  },
  {
    id: 2,
    name: "Sapana Maharjan",
    position: "COO",
    image: girlteam,
    companyName: "Jooneli Inc.",
  },
  {
    id: 3,
    name: "Sajana Shrestha",
    position: "Business Development Head",
    image: girlteam,
    companyName: "Jooneli Inc.",
  },
  // {
  //   id: 4,
  //   name: "",
  //   position: "CTO",
  //   image: team,
  //   companyName: "Jooneli Inc.",
  // },
];

const LeadershipData = [
  {
    id: 1,
    name: "Apar Thebe",
    position: "Chairperson",
    image: team,
    companyName: "Jooneli Inc.",
  },
  {
    id: 2,
    name: "Sapana Maharjan",
    position: "Member",
    image: girlteam,
    companyName: "Jooneli Inc.",
  },
  {
    id: 3,
    name: "Anita Thapa",
    position: "Member",
    image: girlteam,
    companyName: "Jooneli Inc.",
  },
  // {
  //   id: 4,
  //   name: "",
  //   position: "CTO",
  //   image: team,
  //   companyName: "Jooneli Inc.",
  // },
];


const Leadership = () => {
  return (
    <div>
      <div>
        <h1 className="mt-4 text-[16px] md:text-xl lg:text-2xl text-center text-red-900">
        Board of Directors
        </h1>

        <div className="flex flex-wrap justify-center max-w-screen-xl gap-8 p-8 mx-auto">
          {LeadershipData.map((partner) => (
            <div
              key={partner.id}
              className="overflow-hidden transition-all duration-300 transform bg-white rounded-lg shadow-md w-72 hover:shadow-2xl hover:-translate-y-2"
            >
              {/* Image Container */}
              <div>
                <img
                  src={partner.image}
                  alt={partner.name}
                  className="object-cover w-full h-48"
                />
              </div>

              {/* Card Content */}
              <div className="flex flex-col items-center justify-center px-6 py-4 text-center">
                <h3 className="text-xl font-semibold text-gray-800">
                  {partner.name}
                </h3>
                <p className="mt-1 text-sm text-gray-500">{partner.position}</p>
                <p className="mt-2 text-sm italic text-gray-600">
                  {partner.companyName}
                </p>
                <div className="flex items-center justify-center gap-2">
                  <IoLogoLinkedin className="mt-2 rounded-full size-8 " />
                  <IoLogoFacebook className="mt-2 rounded-full size-8 " />
                  <IoLogoInstagram className="mt-2 rounded-full size-8 " />
                </div>
              </div>
              <div></div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h1 className="mt-4 text-[16px] md:text-xl lg:text-2xl text-center text-red-900">
          Management Team
        </h1>

        <div className="flex flex-wrap justify-center max-w-screen-xl gap-8 p-8 mx-auto">
          {ManagementData.map((partner) => (
            <div
              key={partner.id}
              className="overflow-hidden transition-all duration-300 transform bg-white rounded-lg shadow-md w-72 hover:shadow-2xl hover:-translate-y-2"
            >
              {/* Image Container */}
              <div>
                <img
                  src={partner.image}
                  alt={partner.name}
                  className="object-cover w-full h-48"
                />
              </div>

              {/* Card Content */}
              <div className="flex flex-col items-center justify-center px-6 py-4 text-center">
                <h3 className="text-xl font-semibold text-gray-800">
                  {partner.name}
                </h3>
                <p className="mt-1 text-sm text-gray-500">{partner.position}</p>
                <p className="mt-2 text-sm italic text-gray-600">
                  {partner.companyName}
                </p>
                <div className="flex items-center justify-center gap-2">
                  <IoLogoLinkedin className="mt-2 rounded-full size-8 " />
                  <IoLogoFacebook className="mt-2 rounded-full size-8 " />
                  <IoLogoInstagram className="mt-2 rounded-full size-8 " />
                </div>
              </div>
              <div></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Leadership;

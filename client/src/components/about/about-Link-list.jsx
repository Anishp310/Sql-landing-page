import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

const AboutList = [
  {
    id: 1,
    name: "The Company",
    link: "/about/the-Company",
    section: "the-company",
  },
  { id: 2, name: "Ecosystem", link: "/about/ecosystem", section: "ecosystem" },
  {
    id: 3,
    name: "Milestones",
    link: "/about/milestones",
    section: "milestones",
  },
  {
    id: 4,
    name: "Leadership",
    link: "/about/leadership",
    section: "leadership",
  },
  {
    id: 5,
    name: "Partnership",
    link: "/about/partnership",
    section: "partnership",
  },
];

const AboutListComponent = ({ onSectionChange }) => {
  return (
    <nav aria-label="About Sections ">
      <ul className="relative max-w-[1600px] mx-auto ">
        <div className="xl:mx-[10rem] lg:mx-[3rem] md:mx-[2.5rem] mx-[1rem] flex cursor-pointer gap-2  md:gap-x-6 lg:gap-x-8 ext-[16px] md:text-xl lg:text-2xl mt-2 ">
          {AboutList.map((item) => (
            <li key={item.id}>
              <NavLink
                to={item.link}
                onClick={() => onSectionChange(item.section)}
                className={({ isActive }) =>
                  `flex items-center rounded-md transition-colors ease-out duration-200 ext-[16px] md:text-xl lg:text-2xl
                ${
                  isActive
                    ? "text-orange-400 font-semibold"
                    : "text-rose-800 hover:text-orange-400"
                }`
                }
                aria-current={({ isActive }) => (isActive ? "page" : undefined)}
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </div>
      </ul>
      <hr className="mt-2 border-t border-gray-300" />
    </nav>
  );
};

// Default Props for fallback
AboutListComponent.defaultProps = {
  onSectionChange: () => {},
};

// PropTypes validation
AboutListComponent.propTypes = {
  onSectionChange: PropTypes.func.isRequired,
};

export default AboutListComponent;

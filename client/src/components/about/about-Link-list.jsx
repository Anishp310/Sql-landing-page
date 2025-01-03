import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

const AboutList = [
  { id: 1, name: "The Company", link: "/about/the-Company", section: "the-company" },
  { id: 2, name: "Ecosystem", link: "/about/ecosystem", section: "ecosystem" },
  { id: 3, name: "Milestones", link: "/about/milestones", section: "milestones" },
  { id: 4, name: "Leadership", link: "/about/leadership", section: "leadership" },
  { id: 5, name: "Partnership", link: "/about/partnership", section: "partnership" },
];

const AboutListComponent = ({ onSectionChange }) => {
  return (
    <nav aria-label="About Sections ">
      <ul className="relative flex text-[0.55rem] cursor-pointer  md:gap-x-6 lg:gap-x-8 md:text-sm lg:text-lg xl:mx-[10rem] lg:mx-[3rem] md:mx-[2.5rem]  mt-2 mx-[0.2rem]">
        {AboutList.map((item) => (
          <li key={item.id}>
            <NavLink
              to={item.link}
              onClick={() => onSectionChange(item.section)}
              className={({ isActive }) =>
                `flex items-center rounded-md px-2 py-1 transition-colors ease-out duration-200
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

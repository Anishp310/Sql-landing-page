import PropTypes from "prop-types";
import { NavLink, Outlet } from "react-router-dom";

const AboutList = [
  { id: 1, name: "360 Core Banking System", link: "/business/banking_system", section: "CoreBankingSystem" },
  { id: 2, name: "Internet Banking", link: "/business/internet_banking", section: "InternetBanking" },
  { id: 3, name: "Mobile Banking", link: "/business/mobile_banking", section: "MobileBanking" },
  { id: 4, name: "Tab Banking", link: "/business/tab_banking", section: "TabBanking" },
  { id: 5, name: "ATM", link: "/business/atm", section: "Atm" },
];

const BusinessListComponent = ({ onSectionChange }) => (
  <div>
    <ul className="relative md:flex md:flex-row xl:gap-6 lg:gap-2 gap-2 md:text-[0.8rem] xl:text-[1.5rem] lg:text-[1.3rem] cursor-pointer text-[0.7rem]">
      {AboutList.map((item) => (
        <li
          key={item.id}
          className="items-center justify-around px-0 py-0 m-1 ease-out rounded-md cursor-pointer md:text-black md:flex md:py-1 md:px-1 hover:text-orange-400 text-rose-800"
        >
          <NavLink
            to="/digital_banking"
            onClick={() => onSectionChange(item.section)}
            className={({ isActive }) =>
              isActive ? "md:text-black text-rose-800" : "text-rose-800"
            }
          >
            {item.name}
          </NavLink>
        </li>
      ))}
    </ul>
    <div>
      <Outlet />
    </div>
  </div>
);

BusinessListComponent.propTypes = {
  onSectionChange: PropTypes.func, // Make it optional
};
export default BusinessListComponent;

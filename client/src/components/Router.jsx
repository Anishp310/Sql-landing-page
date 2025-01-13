import About from "../pages/About";
import Admin from "../Admin/Admin";
import App from "../App";
import Atm from "./business/Pages/Atm";
import Brochurelist from "../Admin/Brochure/Brochurelist";
import Business from "../pages/Business";
import Career from "../pages/Career";
import Careerlist from "../Admin/Career/Careerlist";
import Company from "./about/Company";
import ContactList from "../Admin/Contact/ContactList";
import CoreBankingSystem from "./business/Pages/CoreBankingSystem";
import DemoList from "../Admin/demo/DemoList";
import Ecosystem from "./about/Ecosystem";
import ForgotPassword from "../Admin/ForgotPassword";
import GetinTouch from "../pages/GetinTouch";
import Home from "../pages/Home";
import Imagelist from "../Admin/images/Imagelist";
import InternetBanking from "./business/Pages/InternetBanking";
import Leadership from "./about/Leadership";
import Media from "../pages/allNews";
import Milestones from "./about/Milestones";
import MobileBanking from "./business/Pages/MobileBanking";
import MobileTeller from "./business/Pages/MobileTeller";
import NotFoundPage from "../pages/PageNotFound";
import Partnership from "./about/Partnership";
import Pricing from "../pages/Pricing";

import Register from "../Admin/Register";
import ResetPassword from "../Admin/ResetPassword";
import TableLists from "../Admin/TableLists";
import { createBrowserRouter } from "react-router-dom";
import DigitalBanking from "./home/DigitalBanking";
import Trading from "./home/Trading";
import PricingList1 from "../Admin/tradingPlan/PricingList1";
import PricingList from "../Admin/bankingPlan/PricingList";
import Blog from "./home/blog/Blog";
import BlogList from "../Admin/blog/BlogList";
import BlogDetail from "./home/blog/BlogDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    future: {
      v7_partialHydration: true,
      v7_skipActionErrorRevalidation: true,
    },
    children: [
      { index: true, element: <Home /> },
      {
        path: "about",
        element: <About />,
        children: [
          { path: "ecosystem", element: <Ecosystem /> },
          { path: "the-company", element: <Company /> },
          { path: "leadership", element: <Leadership /> },
          { path: "milestones", element: <Milestones /> },
          { path: "partnership", element: <Partnership /> },
        ],
      },
      {
        path: "business",
        element: <Business />,
        // children: [
        //   { path: "banking_system", element: <CoreBankingSystem /> },
        //   { path: "internet_banking", element: <InternetBanking /> },
        //   { path: "mobile_banking", element: <MobileBanking /> },
        //   { path: "tab_banking", element: <TabBanking /> },
        //   { path: "atm", element: <Atm /> },
        // ],
      },
      { path: "career", element: <Career /> },
      { path: "pricing", element: <Pricing /> },
      { path: "get-in-touch", element: <GetinTouch /> },
      { path: "media", element: <Media/> },
      { path: "digital_banking", element: <DigitalBanking/> },
      { path: "banking_system", element: <CoreBankingSystem /> },
      { path: "internet_banking", element: <InternetBanking /> },
      { path: "mobile_banking", element: <MobileBanking /> },
      { path: "mobile-teller", element: <MobileTeller /> },
      { path: "atm", element: <Atm /> },
      { path: "trading", element: <Trading /> },
      { path: "blog", element: <Blog />},
      { path: "blog/:id", element: <BlogDetail /> },

     
      


    ],
  },
  {
    path: "admin",
    element: <Admin />,
    children: [
      { index: true, element: <TableLists /> },
      { path: "brochure", element: <Brochurelist /> },
      { path: "demo", element: <DemoList /> },
      { path: "ContactList", element: <ContactList /> },
      { path: "Careerlist", element: <Careerlist /> },
      { path: "imagelist", element: <Imagelist /> },
      { path: "pricing-list", element: <PricingList /> },
      { path: "pricing-list1", element: <PricingList1 /> },
      { path: "bloglist", element: <BlogList /> },


    ],
  },
  { path: "/forgot-password", element: <ForgotPassword /> },
  { path: "/reset-password/:token", element: <ResetPassword /> },
  { path: "/register", element: <Register /> },
  { path: "*", element: <NotFoundPage /> },
]);

export default router;

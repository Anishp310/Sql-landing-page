import Abanner from "../components/about/Abanner";
import AboutListComponent from "../components/about/about-Link-list";
import Acontainer from "../components/about/Acontainer";
import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const About = () => {
  const [selectedSection, setSelectedSection] = useState(null); // Initially no section is selected
  const location = useLocation();
  const navigate = useNavigate();

  // Set the section based on the URL path
  useEffect(() => {
    const section = location.pathname.split("/about/")[1]; // Get section from the URL
    if (section) {
      setSelectedSection(section); // Set section based on the URL
    } else {
      setSelectedSection(null); // If no section, show default content
    }
  }, [location]);

  // Handle section change with programmatic redirect
  const handleSectionChange = (section) => {
    setSelectedSection(section);
    navigate(`/about/${section}`); // Navigate to the section URL
  };

  return (
    <div>
      <Abanner onClick={() => setSelectedSection(null)} />
      <AboutListComponent onSectionChange={handleSectionChange} />

      {/* Default content (Acontainer) */}
      {!selectedSection && <Acontainer />}

      {/* Render child routes using Outlet */}
      <Outlet />
    </div>
  );
};

export default About;

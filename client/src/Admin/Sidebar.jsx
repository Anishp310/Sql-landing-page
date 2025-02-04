import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="min-w-64 h-full p-4 text-white bg-gray-800">
      <h2 className="mb-4 text-2xl font-semibold text-center">Admin Dashboard</h2>
      <ul>
      <li>
          <Link to="/admin/" className="block px-4 py-2 rounded hover:bg-gray-600">News Lists</Link>
        </li>
        <li>
          <Link to="/admin/brochure" className="block px-4 py-2 rounded hover:bg-gray-600">Request Brochure</Link>
        </li>
        <li>
          <Link to="/admin/demo" className="block px-4 py-2 rounded hover:bg-gray-600">Request Demo</Link>
        </li>
        <li>
          <Link to="/admin/ContactList" className="block px-4 py-2 rounded hover:bg-gray-600">Contacts</Link>
        </li>
        <li>
          <Link to="/admin/Careerlist" className="block px-4 py-2 rounded hover:bg-gray-600">Career</Link>
        </li>
        <li>
          <Link to="/admin/imagelist" className="block px-4 py-2 rounded hover:bg-gray-600">Images</Link>
        </li>
        <li>
          <Link to="/admin/pricing-list" className="block px-4 py-2 rounded hover:bg-gray-600">Corporate Banking Plan</Link>
        </li>
        <li>
          <Link to="/admin/pricing-list1" className="block px-4 py-2 rounded hover:bg-gray-600">Trading Plan</Link>
        </li>
        <li>
          <Link to="/admin/bloglist" className="block px-4 py-2 rounded hover:bg-gray-600">Blogs</Link>
        </li>
        <li>
          <Link to="/admin/subscriptionlist" className="block px-4 py-2 rounded hover:bg-gray-600">Subscription Request</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;

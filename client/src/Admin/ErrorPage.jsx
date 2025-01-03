import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-2xl font-bold text-red-500">Unexpected Application Error</h1>
      <p className="mt-2 text-gray-600">No token found. Please log in again.</p>
      <Link to="/login" className="mt-4 text-blue-500 underline">
        Go to Login
      </Link>
    </div>
  );
};

export default ErrorPage;

const NotFoundPage = () => {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center p-8 bg-white rounded-lg shadow-lg w-full max-w-lg">
          <h1 className="text-4xl font-extrabold text-red-600 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">Page Not Found</h2>
          <p className="text-lg text-gray-500 mb-6">
            The page you're looking for does not exist. It might have been moved or deleted.
          </p>
          <a
            href="/"
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200"
          >
            Go Back to Home
          </a>
        </div>
      </div>
    );
  };
  
  export default NotFoundPage;
  
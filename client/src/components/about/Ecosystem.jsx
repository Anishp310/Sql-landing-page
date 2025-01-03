const Ecosystem = () => {
  return (
    <div className="xl:mx-[10rem] lg:mx-[3rem] md:mx-[2.5rem] mx-[1rem] md:mt-[2rem] mt-[1rem] space-y-8">
      {/* Unified Digital Banking Ecosystem Section */}
      <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
        <h2 className="text-center text-4xl font-extrabold text-red-900 mb-4">
          Unified Digital Banking Ecosystem
        </h2>
        <p className="text-gray-700 text-lg leading-relaxed">
          The modern banking ecosystem integrates various channels to provide seamless and efficient services to customers. At its core is the 
          <strong> 360 Core Banking System</strong>, enabling real-time operations and a unified customer experience across platforms.
        </p>
        <p className="mt-4 text-gray-700 text-lg leading-relaxed">
          Together, these components form a robust digital banking ecosystem, driving efficiency, customer convenience, and financial inclusion.
        </p>
      </div>

      {/* Banking Services Section */}
      <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
        <h2 className="text-center text-4xl font-extrabold text-red-900 mb-4">
          Banking Services
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold text-red-800 mb-2">SMS Banking</h3>
            <p className="text-gray-600">
              Instant alerts, balance inquiries, and quick transactions using simple text commands.
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold text-red-800 mb-2">Mobile Banking</h3>
            <p className="text-gray-600">
              24/7 access to account management, fund transfers, bill payments, and mobile top-ups.
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold text-red-800 mb-2">ATM Services</h3>
            <p className="text-gray-600">
              Secure cash withdrawals, deposits, and account inquiries anytime, anywhere.
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold text-red-800 mb-2">Tab Banking</h3>
            <p className="text-gray-600">
              Streamlines remote onboarding and KYC processes.
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm md:col-span-2">
            <h3 className="text-xl font-semibold text-red-800 mb-2">Mobile Teller</h3>
            <p className="text-gray-600">
              Enhances customer engagement through location-based banking services.
            </p>
          </div>
        </div>
      </div>

      {/* Key Features Section */}
      <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
        <h2 className="text-center text-4xl font-extrabold text-red-900 mb-4">
          Key Features
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold text-red-800 mb-2">Real-Time Processing</h3>
            <p className="text-gray-600">
              Handles concurrent transactions with minimal latency.
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold text-red-800 mb-2">Security</h3>
            <p className="text-gray-600">
              Employs advanced encryption, multi-factor authentication, and data integrity checks.
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold text-red-800 mb-2">Scalability</h3>
            <p className="text-gray-600">
              Bigtable architecture ensures effortless expansion as demands grow.
            </p>
          </div>
        </div>
      </div>

      {/* Closing Statement */}
      <p className="mt-8 text-center text-gray-600">
        This system establishes a strong foundation for seamless operations and future growth.
      </p>
    </div>
  );
};

export default Ecosystem;

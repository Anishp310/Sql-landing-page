const Ecosystem = () => {
  return (
    <div className="xl:mx-[10rem] lg:mx-[3rem] md:mx-[2.5rem] mx-[1rem] md:mt-[2rem] mt-[1rem] space-y-12">
      {/* Unified Digital Banking Ecosystem Section */}
      <section>
        <h2 className="text-center text-4xl font-extrabold text-red-900 mb-6">
          Unified Digital Banking Ecosystem
        </h2>
        <p className="text-gray-700 text-lg leading-relaxed">
          The modern banking ecosystem integrates various channels to provide seamless and efficient services to customers. At its core is the
          <strong> 360 Core Banking System</strong>, enabling real-time operations and a unified customer experience across platforms.
        </p>
        <p className="mt-4 text-gray-700 text-lg leading-relaxed">
          Together, these components form a robust digital banking ecosystem, driving efficiency, customer convenience, and financial inclusion.
        </p>
      </section>

      {/* Banking Services Section */}
      <section>
        <h2 className="text-center text-4xl font-extrabold text-red-900 mb-6">
          Banking Services
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { title: "SMS Banking", description: "Instant alerts, balance inquiries, and quick transactions using simple text commands." },
            { title: "Mobile Banking", description: "24/7 access to account management, fund transfers, bill payments, and mobile top-ups." },
            { title: "ATM Services", description: "Secure cash withdrawals, deposits, and account inquiries anytime, anywhere." },
            { title: "Tab Banking", description: "Streamlines remote onboarding and KYC processes." },
            { title: "Mobile Teller", description: "Enhances customer engagement through location-based banking services." },
          ].map((service, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              <h3 className="text-xl font-semibold text-red-800 mb-2">
                {service.title}
              </h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Key Features Section */}
      <section>
        <h2 className="text-center text-4xl font-extrabold text-red-900 mb-6">
          Key Features
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: "Real-Time Processing", description: "Handles concurrent transactions with minimal latency." },
            { title: "Security", description: "Employs advanced encryption, multi-factor authentication, and data integrity checks." },
            { title: "Scalability", description: "Bigtable architecture ensures effortless expansion as demands grow." },
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              <h3 className="text-xl font-semibold text-red-800 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Closing Statement */}
      <section className="text-center">
        <p className="mt-8 text-gray-600 text-lg">
          This system establishes a strong foundation for seamless operations and future growth.
        </p>
      </section>
    </div>
  );
};

export default Ecosystem;

const Ecosystem = () => {
  const features = [
    {
      id: 1,
      title: "Programming Framework",
      points: [
        "C# with .NET Core provides a reliable and high-performance framework.",
        "Cross-platform capabilities enable deployment across various environments, ensuring flexibility and scalability.",
      ],
    },
    {
      id: 2,
      title: "CubeProcess Bigtable Data",
      points: [
        "This database architecture is built for handling massive datasets with low latency, making it ideal for high-transaction banking environments.",
        "Distributed storage ensures horizontal scalability, while schema flexibility adapts to evolving data models.",
        "Real-time replication and consistency mechanisms ensure data reliability and system resilience.",
      ],
    },
  ];

  return (
    <div className="max-w-[1600px] mx-auto">
      <div className="xl:mx-[10rem] lg:mx-[3rem] md:mx-[2.5rem] mx-[1rem] md:mt-[2rem] mt-[1rem] space-y-12">
      {/* Unified Digital Banking Ecosystem Section */}
      <section>
        <div className="mb-2 text-lg font-semibold xl:mb-6 lg:mb-4 md:mb-4 md:text-xl lg:text-2xl">
          Unified Digital Banking Ecosystem
        </div>
        <p className="mb-4 text-sm leading-relaxed text-justify text-gray-700 lg:text-lg md:text-base">
          The modern banking ecosystem integrates various channels to provide
          seamless and efficient services to customers. At its core is the
          <strong className=""> 360 Core Banking System</strong>,
          enabling real-time operations and a unified customer experience across
          platforms.
        </p>
        <div className="">
          <p className="mb-4 text-sm leading-relaxed text-justify text-gray-700 lg:text-lg md:text-base">
            The Ecosystem seamlessly integrates:
          </p>
          <ul className="space-y-4 list-none ">
            <li className="text-sm leading-relaxed text-justify text-gray-700 lg:text-lg md:text-base">
              <strong className="">SMS Banking </strong> ensures
              accessibility through instant alerts, balance inquiries, and quick
              transactions using simple text commands.
            </li>
            <li className="text-sm leading-relaxed text-justify text-gray-700 lg:text-lg md:text-base">
              <strong className="">Mobile Banking</strong> offers
              24/7 account management, fund transfers, bill payments, and mobile
              top-ups, delivering unmatched convenience.
            </li>
            <li className="text-sm leading-relaxed text-justify text-gray-700 lg:text-lg md:text-base">
              <strong className="">ATM services</strong> extend the
              ecosystem's reach, providing cash withdrawals, deposits, and other
              services anytime, anywhere.
            </li>
            <li className="text-sm leading-relaxed text-justify text-gray-700 lg:text-lg md:text-base">
              <strong className="">Tab Banking </strong>streamlines
              onboarding and service delivery, enabling representatives to
              handle tasks like account openings or KYC processes remotely.
            </li>
            <li className="text-sm leading-relaxed text-justify text-gray-700 lg:text-lg md:text-base">
              <strong className="">Mobile Teller </strong>enhances
              customer engagement by bringing banking services directly to the
              user’s location, improving efficiency and satisfaction.
            </li>
          </ul>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-justify text-gray-700 lg:text-lg md:text-base">
          Together, these components form a robust digital banking ecosystem,
          driving efficiency, customer convenience, and financial inclusion.
        </p>
      </section>

      {/* Core Architecture Section */}
      <section>
        <div className="mb-2 text-lg font-semibold xl:mb-6 lg:mb-4 md:mb-4 md:text-xl lg:text-2xl">
          Designing a 360 Core Banking System with C# and CubeProcess Bigtable
          Data
        </div>

        <p className="mb-4 text-sm leading-relaxed text-justify text-gray-700 lg:text-lg md:text-base">
          The 360 Core Banking System designed with C# and powered by
          CubeProcess Bigtable Data offers a robust, scalable, and secure
          platform tailored to meet modern banking demands. This design focuses
          on real-time processing, high availability, and a seamlessly
          interconnected ecosystem to support diverse banking operations.
        </p>
        <h3 className="mb-4 font-semibold text-black text-md lg:text-xl md:text-lg">
          Core Architecture
        </h3>
        <div className="mb-2 space-y-8 ">
          {features.map((feature) => (
            <div key={feature.id}>
              <h4 className="mb-2 text-base font-bold text-black lg:text-xl md:text-lg">
                {feature.title}
              </h4>
              <ul className="space-y-2 list-none">
                {feature.points.map((point, index) => (
                  <li
                    key={index}
                    className="text-sm leading-relaxed text-gray-700 lg:text-lg md:text-base"
                  >
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
      <section className="mb-[2rem]">
        <div className="mb-2 text-lg font-semibold xl:mb-6 lg:mb-4 md:mb-4 md:text-xl lg:text-2xl">
        Key Features
        </div>
        <ul className="list-none lg:space-y-4">
          <li className="text-sm leading-relaxed text-gray-700 lg:text-lg md:text-base">
            <strong className=""> Real-Time Processing:</strong>{" "}
            Handles concurrent transactions with minimal latency.
          </li>
          <li className="text-sm leading-relaxed text-gray-700 lg:text-lg md:text-base">
            <strong className="">Security:</strong> Employs advanced
            encryption, multi-factor authentication, and data integrity checks.
          </li>
          <li className="text-sm leading-relaxed text-gray-700 lg:text-lg md:text-base">
            <strong className="">Scalability:</strong> Bigtable
            architecture ensures effortless expansion as demands grow.
          </li>
        </ul>
        <p className="mt-4 text-sm leading-relaxed text-justify text-gray-700 mb-[2rem] lg:text-lg md:text-base">
          This system establishes a strong ecosystem, delivering efficiency,
          innovation, and exceptional customer experiences.
        </p>
      </section>
    </div>
    </div>
    
  );
};

export default Ecosystem;

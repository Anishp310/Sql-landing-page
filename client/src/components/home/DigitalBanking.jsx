import React from 'react'; 
import img1 from "../../Assets/digital-banking.jpg"
import img2 from "../../Assets/360-core.jpg"
import img3 from "../../Assets/internet-banking.jpg"
import img4 from "../../Assets/mobile-banking.jpg"
import img5 from "../../Assets/tab-banking.jpg"
import img6 from "../../Assets/atm-services.jpg"

const DigitalBanking = () => {
  return (
    <div className="max-w-screen-xl mx-auto p-6">
      {/* Hero Section */}
      <section className="flex flex-col lg:flex-row items-center bg-red-500 text-white py-16 px-8 rounded-lg shadow-lg">
        <div className="lg:w-2/3">
          <h1 className="text-4xl font-semibold mb-4">Innovative Digital Banking Solutions</h1>
          <p className="text-lg">
            Explore the modern solutions that are transforming the way you bank and manage your finances.
          </p>
        </div>
        <div className="lg:w-1/3 mt-8 lg:mt-0">
          <img 
            src={img1} 
            alt="Digital Banking" 
            className="w-full h-64 object-cover rounded-lg shadow-lg" 
          />
        </div>
      </section>

      {/* Core Banking Section */}
      <section className="mt-16 bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">360 Core Banking System</h2>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            <p className="text-lg text-gray-700">
              The 360 Core Banking System is a state-of-the-art platform designed to optimize the operations of cooperatives and financial institutions. It integrates essential banking functionalities, including savings, loans, payments, and reporting, into a seamless and user-friendly interface. This system enhances efficiency, reduces errors, and ensures compliance with regulatory standards, allowing cooperatives to scale their services and serve their members more effectively.
            </p>
          </div>
          <div className="lg:w-1/3">
            <img 
              src={img2} 
              alt="360 Core Banking" 
              className="w-full h-64 object-cover rounded-lg shadow-lg" 
            />
          </div>
        </div>
      </section>

      {/* Internet Banking Section */}
      <section className="mt-16 bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Internet Banking</h2>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            <p className="text-lg text-gray-700">
              Internet banking enables users to manage their finances conveniently through a secure online platform. It offers 24/7 access to essential banking services, including fund transfers, bill payments, account balance inquiries, and transaction history checks. With robust security measures like encryption and multi-factor authentication, internet banking ensures data protection and safe transactions. It eliminates the need for physical branch visits, saving time and effort.
            </p>
          </div>
          <div className="lg:w-1/3">
            <img 
              src={img3} 
              alt="Internet Banking" 
              className="w-full h-64 object-cover rounded-lg shadow-lg" 
            />
          </div>
        </div>
      </section>

      {/* Mobile Banking Section */}
      <section className="mt-16 bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Mobile Banking</h2>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            <p className="text-lg text-gray-700">
              Mobile banking offers users the convenience of managing their finances anytime, anywhere, through a secure mobile app. It enables quick and easy services like fund transfers, bill payments, mobile top-ups, and merchant transactions. Users can check account balances, view mini statements, and receive instant alerts for transactions. With 24/7 accessibility, mobile banking eliminates the need for branch visits, saving time and enhancing customer experience.
            </p>
          </div>
          <div className="lg:w-1/3">
            <img 
              src={img4} 
              alt="Mobile Banking" 
              className="w-full h-64 object-cover rounded-lg shadow-lg" 
            />
          </div>
        </div>
      </section>

      {/* Tab Banking Section */}
      <section className="mt-16 bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Tab Banking</h2>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            <p className="text-lg text-gray-700">
              Tab Banking streamlines client onboarding and documentation processes by offering instant, paperless solutions, often at the customer’s premises. This system enhances operational efficiency by enabling financial institutions to serve customers directly at their location. It ensures quick and accurate account openings, KYC processes, and document collection, minimizing errors and improving the overall customer experience.
            </p>
          </div>
          <div className="lg:w-1/3">
            <img 
              src={img5} 
              alt="Tab Banking" 
              className="w-full h-64 object-cover rounded-lg shadow-lg" 
            />
          </div>
        </div>
      </section>

      {/* ATM Services & Trading Section */}
      <section className="mt-16 bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">ATM Services & Trading</h2>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            <p className="text-lg text-gray-700">
              ATMs provide 24/7 access to essential banking services, including cash withdrawals, deposits, fund transfers, and balance inquiries. These self-service terminals eliminate the need for branch visits, ensuring convenience and efficiency. With secure authentication, ATMs offer a reliable way to manage finances anytime, anywhere.
              <br />
              Jooneli Trading is a comprehensive accounting system designed for businesses. It provides retailers, restaurants, and general businesses with user-friendly tools to streamline accounting processes, ensuring accuracy and real-time insights into financial data. The system supports POS integration, inventory management, multi-currency transactions, and detailed reporting.
            </p>
          </div>
          <div className="lg:w-1/3">
            <img 
              src={img6} 
              alt="ATM & Trading" 
              className="w-full h-64 object-cover rounded-lg shadow-lg" 
            />
          </div>
        </div>
      </section>

    </div>
  );
};

export default DigitalBanking;

import { Link } from 'react-router-dom';

const ProjectSection = () => {
  return (
    <div className="min-h-screen bg-[#0a022b] text-white px-4 py-10 flex flex-col items-center">
      <h2 className="text-4xl font-bold text-center mb-12">
        <span className="text-purple-400">My</span> Projects
      </h2>

      <div className="w-full max-w-6xl flex flex-col gap-10">
        {/* TradeNest */}
        <div className="bg-[#1c1a35] rounded-2xl shadow-lg flex flex-col md:flex-row overflow-hidden">
          <img
            src="/images/tradenest.png"
            alt="TradeNest"
            className="w-full md:w-1/2 h-64 object-cover"
          />
          <div className="p-6 flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-bold mb-3">TradeNest</h3>
              <p className="text-gray-300">
                TradeNest is a modern B2B marketplace platform designed for
                seamless product trading, built with React, Node.js, and
                MongoDB.
              </p>
            </div>
            <div className="mt-6 flex gap-4 flex-wrap">
              <Link
                to="/project/tradenest"
                className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-full transition"
              >
                Details
              </Link>
              <a
                href="https://tradenest-33e74.firebaseapp.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-100 hover:bg-gray-200 text-black px-5 py-2 rounded-full transition"
              >
                Live Link
              </a>
            </div>
          </div>
        </div>

        {/* HotelHive */}
        <div className="bg-[#1c1a35] rounded-2xl shadow-lg flex flex-col md:flex-row overflow-hidden">
          <img
            src="/images/hotelhive.png"
            alt="HotelHive"
            className="w-full md:w-1/2 h-64 object-cover"
          />
          <div className="p-6 flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-bold mb-3">HotelHive</h3>
              <p className="text-gray-300">
                HotelHive is a full-stack hotel booking application that offers
                users advanced filtering, secure booking, and user-friendly UI.
              </p>
            </div>
            <div className="mt-6 flex gap-4 flex-wrap">
              <Link
                to="/project/hotelhive"
                className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-full transition"
              >
                Details
              </Link>
              <a
                href="https://hotel-hive-5f52f.web.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-100 hover:bg-gray-200 text-black px-5 py-2 rounded-full transition"
              >
                Live Link
              </a>
            </div>
          </div>
        </div>

        {/* VisaLand */}
        <div className="bg-[#1c1a35] rounded-2xl shadow-lg flex flex-col md:flex-row overflow-hidden">
          <img
            src="/images/visaland.png"
            alt="VisaLand"
            className="w-full md:w-1/2 h-64 object-cover"
          />
          <div className="p-6 flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-bold mb-3">VisaLand</h3>
              <p className="text-gray-300">
                VisaLand is a Visa Navigator Portal that simplifies checking
                requirements, applying, and tracking visa applications online.
              </p>
            </div>
            <div className="mt-6 flex gap-4 flex-wrap">
              <Link
                to="/project/visaland"
                className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-full transition"
              >
                Details
              </Link>
              <a
                href="https://visa-land.web.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-100 hover:bg-gray-200 text-black px-5 py-2 rounded-full transition"
              >
                Live Link
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectSection;

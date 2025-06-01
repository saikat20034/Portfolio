import { Link } from 'react-router-dom';

const HotelHiveDetails = () => {
  const images = ['/hotelhive1.png', '/hotelhive2.png', '/hotelhive3.png'];

  const technologies = [
    'React',
    'Node.js',
    'Express.js',
    'MongoDB',
    'Tailwind CSS',
    'JWT Auth',
    'Payment Gateway',
  ];

  return (
    <div className="min-h-screen bg-[#0a022b] text-white px-6 py-12">
      <div className="max-w-5xl mx-auto">
        {/* Title */}
        <h1 className="text-4xl font-bold mb-8 text-purple-400">HotelHive</h1>

        {/* Image Gallery */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
          {images.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`HotelHive ${i + 1}`}
              className="rounded-xl shadow-md object-cover h-64 w-full"
            />
          ))}
        </div>

        {/* Description */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">Project Overview</h2>
          <p className="text-gray-300 leading-relaxed">
            HotelHive is a hotel booking platform offering users a seamless
            experience to browse, book, and manage hotel reservations. Featuring
            user authentication, secure payment integration, dynamic search
            filters, and an admin dashboard for managing listings and bookings,
            HotelHive aims to provide convenience and reliability.
          </p>
        </div>

        {/* Technologies */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">Technologies Used</h2>
          <div className="flex flex-wrap gap-3">
            {technologies.map((tech, idx) => (
              <span
                key={idx}
                className="bg-purple-600 text-white px-4 py-1 rounded-full text-sm font-medium shadow-md"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 flex-wrap mt-8">
          <a
            href="https://github.com/yourusername/hotelhive-client"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-full transition text-white font-semibold"
          >
            Client Code
          </a>
          <a
            href="https://github.com/yourusername/hotelhive-server"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded-full transition text-white font-semibold"
          >
            Server Code
          </a>
          <a
            href="https://hotelhive.live"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-yellow-500 hover:bg-yellow-600 px-6 py-2 rounded-full transition text-black font-semibold"
          >
            Live Site
          </a>
          <Link
            to="/"
            className="bg-gray-700 hover:bg-gray-600 px-6 py-2 rounded-full transition text-white font-semibold"
          >
            ← Back to Projects
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HotelHiveDetails;

// components/TradeNestDetails.jsx
import { Link } from 'react-router-dom';

const TradeNestDetails = () => {
  const images = ['/tradenest1.png', '/tradenest2.png', '/tradenest3.png'];

  const technologies = [
    'React',
    'Node.js',
    'Express.js',
    'MongoDB',
    'Tailwind CSS',
    'JWT Auth',
    'Stripe Integration',
  ];

  return (
    <div className="min-h-screen bg-[#0a022b] text-white px-6 py-12">
      <div className="max-w-5xl mx-auto">
        {/* Title */}
        <h1 className="text-4xl font-bold mb-8 text-purple-400">TradeNest</h1>

        {/* Image Gallery */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
          {images.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`TradeNest ${i + 1}`}
              className="rounded-xl shadow-md object-cover h-64 w-full"
            />
          ))}
        </div>

        {/* Description */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">Project Overview</h2>
          <p className="text-gray-300 leading-relaxed">
            TradeNest is a modern B2B e-commerce marketplace platform designed
            to connect businesses for seamless product trading. It includes
            role-based access for admins, sellers, and buyers, complete order
            management, secure payment with Stripe, and real-time inventory
            control. The app focuses on usability, security, and
            high-performance APIs.
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
            href="https://github.com/yourusername/tradenest-client"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-full transition text-white font-semibold"
          >
            Client Code
          </a>
          <a
            href="https://github.com/yourusername/tradenest-server"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded-full transition text-white font-semibold"
          >
            Server Code
          </a>
          <a
            href="https://tradenest.live"
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

export default TradeNestDetails;

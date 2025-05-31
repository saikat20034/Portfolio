/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

function Project({ project, id, handleSkillDelete }) {
  const { user } = useAuth();
  const { bannerImage, title, description, links } = project;

  return (
    <div
      className={`flex gap-4 md:gap-8 m-3 items-center justify-center text-white mt-6 md:mt-10 p-4 md:p-6 rounded-3xl backdrop-blur-md bg-white/15 ${
        id % 2 === 0 ? 'flex-col md:flex-row-reverse' : 'flex-col md:flex-row'
      }`}
    >
      <div className="flex-1">
        <img
          src={bannerImage}
          className="w-[400px] md:w-full h-[200px] md:h-[300px] object-cover hover:scale-105 rounded-3xl ease-in-out duration-500"
          alt={title}
        />
      </div>
      <div className="flex-1">
        <div className="my-2 md:my-4">
          <h2 className="text-3xl md:text-4xl">
            Project:
            <span className="font-semibold md:font-bold">
              <span className="text-[#DC143C]">{title.charAt(0)}</span>
              {title.slice(1)}
            </span>
          </h2>
        </div>
        <div className="my-2 md:my-4">
          <p>
            {description.length > 200
              ? description.slice(0, 200) + '...'
              : description}
          </p>
        </div>
        <div className="flex gap-4 md:gap-5 items-center mb-2 md:mb-4">
          <a
            href={links.live}
            target="_blank"
            rel="noopener noreferrer"
            className="btn"
          >
            Live Site
          </a>
          <a
            href={links.client}
            target="_blank"
            rel="noopener noreferrer"
            className="btn"
          >
            Client
          </a>
          <a
            href={links.server}
            target="_blank"
            rel="noopener noreferrer"
            className="btn"
          >
            Server
          </a>
        </div>
        <div className="mt-3 md:mt-4 flex flex-wrap justify-between items-center">
          <div>
            <button className="viewMore learn-more border">
              <span className="circle" aria-hidden="true">
                <span className="icon arrow"></span>
              </span>
              <Link
                to={`/project-details/${project._id}`}
                className="button-text"
              >
                View Details
              </Link>
            </button>
          </div>
          {user && (
            <div className="flex gap-2">
              {/* Update Button */}
              <Link to={`update-project/${project._id}`}>
                <button className="bg-[#675C9C] text-white px-2 py-2 rounded-md hover:bg-[#443d69] focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm duration-300">
                  Update
                </button>
              </Link>

              {/* Delete Button */}
              <button
                onClick={() => handleSkillDelete(project?._id)}
                className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 text-sm duration-300"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Project;

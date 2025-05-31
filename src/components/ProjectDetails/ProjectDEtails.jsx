import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ImageCarousel from '../ImageCarousel/ImageCarousel';
import './ProjectDetails.css';
import { FaArrowLeft } from 'react-icons/fa';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [projectData, setProjectData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjectDetails = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://portfolio-server-sigma-mocha.vercel.app/project/${id}`
        );
        const data = await response.json();
        setProjectData(data);
      } catch (error) {
        console.error('Error fetching project details:', error);
        setProjectData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProjectDetails();
  }, [id]);
  console.log(projectData);
  if (loading) {
    return <LoadingSpinner />;
  }

  if (!projectData) {
    return (
      <div className="text-center my-10 text-red-500">
        Project details not found.
      </div>
    );
  }

  const {
    title,
    description,
    allImages,
    highlights,
    usedTechnologies,
    links,
    additionalFeatures,
  } = projectData;

  return (
    <div className="max-w-6xl mx-auto rounded-l-lg my-4 md:my-8">
      {title && (
        <div className="text-center my-4 md:my-6">
          <h2 className="text-3xl md:text-5xl">
            Project Title:{' '}
            <span className="font-semibold md:font-extrabold">
              <span className="text-[#DC143C]">{title.charAt(0)}</span>
              {title.slice(1)}
            </span>
          </h2>
        </div>
      )}

      {allImages && allImages.length > 0 && (
        <div>
          <ImageCarousel images={allImages} />
        </div>
      )}

      <div className='details'>
        {description && (
          <div className="mt-6">
            <p className="text-lg text-gray-700 leading-relaxed">
              <span className="font-bold text-lg">Description:</span>{' '}
              {description}
            </p>
          </div>
        )}
        {highlights && highlights.length > 0 && (
          <div className="mt-10">
            <h3 className="text-2xl font-bold text-gray-800">
              Project Highlights
            </h3>
            <ul className="list-disc pl-5 mt-3 space-y-2 text-gray-700">
              {highlights.map((highlight, index) => (
                <li key={index}>{highlight}</li>
              ))}
            </ul>
          </div>
        )}
        {usedTechnologies && usedTechnologies.length > 0 && (
          <div className="mt-10">
            <h3 className="text-2xl font-bold text-gray-800">
              Technologies Used
            </h3>
            <div className="flex flex-wrap gap-4 mt-4">
              {usedTechnologies.map((tech, index) => (
                <p
                  key={index}
                  className="bg-gray-200 px-6 py-3 rounded-lg shadow text-gray-700 hover:scale-105 duration-200 ease-in-out"
                >
                  {tech}
                </p>
              ))}
            </div>
          </div>
        )}
        {links && (
          <div className="mt-10">
            <h3 className="text-2xl font-bold text-gray-800">Project Links</h3>
            <div className="flex flex-col md:flex-row gap-4 mt-4">
              {links.liveDemo && (
                <button className="clientButton">
                  <span>
                    <a
                      href={links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Live Demo
                    </a>
                  </span>
                </button>
              )}
              {links.client && (
                <button className="clientButton">
                  <span>
                    <a
                      href={links.client}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Client Code
                    </a>
                  </span>
                </button>
              )}
              {links.server && (
                <button className="clientButton">
                  <span>
                    <a
                      href={links.server}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Server Code
                    </a>
                  </span>
                </button>
              )}
            </div>
          </div>
        )}
        {additionalFeatures && additionalFeatures.length > 0 && (
          <div className="mt-10">
            <h3 className="text-2xl font-bold text-gray-800">
              Additional Features
            </h3>
            <ul className="list-disc pl-5 mt-3 space-y-2 text-gray-700">
              {additionalFeatures.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
        )}
        <div className="flex justify-center mt-8">
          <button onClick={() => navigate(-1)} className="backButton">
            <FaArrowLeft className="svgIcon" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;

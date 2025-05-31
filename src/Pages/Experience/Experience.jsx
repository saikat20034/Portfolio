import { useState, useEffect } from 'react';
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import useAuth from './../../hooks/useAuth';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { FaLocationDot } from 'react-icons/fa6';
import './Experience.css';
const Experience = () => {
  const [experienceData, setExperienceData] = useState([]);
  const { user } = useAuth();
  const [refresh, setRefresh] = useState(false);
  // Fetch data from the JSON file
  useEffect(() => {
    (async () => {
      const response = await fetch(
        'https://portfolio-server-sigma-mocha.vercel.app/experience'
      );
      const data = await response.json();
      setExperienceData(data);
    })();
  }, [refresh]);
  // Separate active and inactive classes
  const activeExperiences = experienceData.filter(
    exp => exp.classType === 'active'
  );
  const inactiveExperiences = experienceData.filter(
    exp => exp.classType === 'inactive'
  );
  const handleExperienceDelete = id => {
    console.log(id, 'id');
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async result => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(
            `https://portfolio-server-sigma-mocha.vercel.app/experience/delete/${id}`,
            {
              method: 'DELETE',
            }
          );
          const data = await response.json();
          console.log(data, 'dat');
          if (data.deletedCount) {
            Swal.fire({
              title: 'Deleted!',
              text: 'Your Experience Data has been deleted.',
              icon: 'success',
            });
            setRefresh(prev => !prev);
          } else {
            Swal.fire({
              title: 'Error!',
              text: 'Failed to delete the Experience Data.',
              icon: 'error',
            });
          }
        } catch (error) {
          console.error('Error deleting skill:', error);
          Swal.fire({
            title: 'Error!',
            text: 'An error occurred while deleting the Experience Data.',
            icon: 'error',
          });
        }
      }
    });
  };
  if (!experienceData || experienceData.length === 0) {
    return <LoadingSpinner />;
  }
  return (
    <div className="max-w-6xl mx-4 md:mx-auto">
      <div className="text-center mb-4 md:mb-8">
        <h2 className="text-3xl md:text-4xl font-semibold md:font-bold">
          Work <span className="text-[#675C9C]">Experience</span>
        </h2>
      </div>
      <div>
        <VerticalTimeline>
          {/* Map through active experiences */}
          {activeExperiences.map((experience, index) => (
            <VerticalTimelineElement
              key={index}
              className="vertical-timeline-element--work hover:scale-105 duration-500"
              contentStyle={{ background: '#675C9C', color: 'bg-primary' }}
              contentArrowStyle={{ borderRight: '10px solid  #675C9C' }}
              date={experience.MergedDate}
              iconStyle={{ background: '#675C9C', color: '#FFF' }}
              icon={
                <img
                  className="flex justify-center items-center rounded-full w-full object-cover "
                  src={experience.CompanyLogo}
                  alt={experience.Role}
                />
              }
            >
              <h3 className="vertical-timeline-element-title text-2xl font-semibold text-secondary ">
                {experience.Role}
              </h3>
              <h3 className="vertical-timeline-element-subtitle text-secondary text-lg">
                {experience?.CompanyName}
              </h3>
              <h4 className="vertical-timeline-element-subtitle text-secondary flex items-center gap-1">
                <FaLocationDot size={14} />
                {experience.Location}
              </h4>
              <hr className="mt-2" />
              <p className="text-secondary mt-2">{experience.Description}</p>
              <div className="flex flex-wrap gap-2 text-secondary">
                {experience.Skills.map((skill, idx) => (
                  <p
                    key={idx}
                    className="bg-[#8476B3] px-4 py-1 rounded-lg text-xs font-extralight"
                  >
                    {skill}
                  </p>
                ))}
              </div>
              <div>
                {user && (
                  <div className="flex gap-2 mt-2">
                    {/* Update Button */}
                    <Link to={`update-experience/${experience._id}`}>
                      <button className="bg-[#090714] text-white px-4 py-2 rounded-md hover:bg-[#0c081f] focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm duration-300">
                        Update
                      </button>
                    </Link>

                    {/* Delete Button */}
                    <button
                      onClick={() => handleExperienceDelete(experience?._id)}
                      className="bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 text-sm duration-300"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </VerticalTimelineElement>
          ))}

          {/* Map through inactive experiences */}
          {inactiveExperiences.map((experience, index) => (
            <VerticalTimelineElement
              key={index}
              className="vertical-timeline-element--work hover:scale-105 duration-500"
              date={experience.MergedDate}
              iconStyle={{ background: '#675C9C', color: '#fff' }}
              icon={
                <img
                  className="flex justify-center items-center rounded-full w-full object-cover "
                  src={experience.CompanyLogo}
                  alt={experience.Role}
                />
              }
            >
              <h3 className="vertical-timeline-element-title text-2xl font-semibold">
                {experience.Role}
              </h3>
              <h3 className="vertical-timeline-element-subtitle text-lg ">
                {experience?.CompanyName}
              </h3>
              <h4 className="vertical-timeline-element-subtitle flex items-center gap-1">
                <FaLocationDot size={14} />
                {experience.Location}
              </h4>
              <hr className="mt-2 border-b border-primary" />
              <p>{experience.Description}</p>
              <div className="flex flex-wrap gap-2 text-primary">
                {experience.Skills.map((skill, idx) => (
                  <p
                    key={idx}
                    className="bg-[#C0C0C0] px-4 py-1 rounded-lg text-xs font-extralight"
                  >
                    {skill}
                  </p>
                ))}
              </div>
              <div>
                {user && (
                  <div className="flex gap-2 mt-2">
                    {/* Update Button */}
                    <Link to={`update-experience/${experience._id}`}>
                      <button className="bg-[#675C9C] text-white px-4 py-2 rounded-md hover:bg-[#443d69] focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm duration-300">
                        Update
                      </button>
                    </Link>

                    {/* Delete Button */}
                    <button
                      onClick={() => handleExperienceDelete(experience?._id)}
                      className="bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 text-sm duration-300"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </VerticalTimelineElement>
          ))}
        </VerticalTimeline>
      </div>
    </div>
  );
};

export default Experience;

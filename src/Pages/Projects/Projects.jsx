import { useEffect, useState } from 'react';
import Project from '../../components/Project/Project';
import './Projects.css';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    (async () => {
      const res = await fetch(
        'https://portfolio-server-sigma-mocha.vercel.app/projects'
      );
      const data = await res.json();
      const firstTwoProjects = data.slice(0, 2);
      setProjects(firstTwoProjects);
    })();
  }, [refresh]);
  const handleSkillDelete = id => {
    console.log(id);
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
            `https://portfolio-server-sigma-mocha.vercel.app/project/delete/${id}`,
            {
              method: 'DELETE',
            }
          );
          const data = await response.json();
          console.log(data, 'dat');
          if (data.deletedCount) {
            Swal.fire({
              title: 'Deleted!',
              text: 'Your Project has been deleted.',
              icon: 'success',
            });
            setRefresh(prev => !prev);
          } else {
            Swal.fire({
              title: 'Error!',
              text: 'Failed to delete the Project.',
              icon: 'error',
            });
          }
        } catch (error) {
          console.error('Error deleting skill:', error);
          Swal.fire({
            title: 'Error!',
            text: 'An error occurred while deleting the Project.',
            icon: 'error',
          });
        }
      }
    });
  };
  if (!projects || projects.length === 0) {
    return <LoadingSpinner />;
  }
  return (
    <div className="bg-primary py-8 md:py-12 mb-[1px] font-lexend">
      <div className="max-w-6xl mx-auto">
        <div className="text-center text-white">
          <span className="flex justify-center items-center gap-2 text-2xl">
            <img src="/src/assets/leftArrow.gif" className="w-12" alt="" />{' '}
            Projects
          </span>
          <h2 className="text-3xl md:text-4xl font-semibold md:font-bold">
            My <span className="text-[#675C9C] ">Latest Projects</span>
          </h2>
        </div>
        <div>
          {projects.map((project, index) => (
            <Project
              key={project._id}
              id={index + 1}
              project={project}
              handleSkillDelete={handleSkillDelete}
            />
          ))}
        </div>
        <div className="mt-6 md:mt-8 flex justify-center">
          <Link className="allProjectBtn flex justify-center" to="/view-all-projects">
            <span className="button-content flex items-center">View All Projects</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Projects;

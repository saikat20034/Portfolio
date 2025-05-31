import { useEffect, useState } from 'react';
import ResponsivePagination from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/classic.css';
import Skill from '../../components/Skill/Skill';
import './Skills.css';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import Swal from 'sweetalert2';
const Skills = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [skills, setSkills] = useState([]);
  const [refresh, setRefresh] = useState(true);
  const pagePerView = 6;

  useEffect(() => {
    (async () => {
      const response = await fetch(
        'https://portfolio-server-sigma-mocha.vercel.app/skills'
      );
      const data = await response.json();
      setSkills(data);
    })();
  }, [refresh]);

  const totalPages = Math.ceil(skills.length / pagePerView);
  const indexOfLastSkill = currentPage * pagePerView;
  const indexOfFirstSkill = indexOfLastSkill - pagePerView;
  const currentSkills = skills.slice(indexOfFirstSkill, indexOfLastSkill);

  function handlePageChange(page) {
    setCurrentPage(page);
  }
  const handleSkillDelete = id => {
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
            `https://portfolio-server-sigma-mocha.vercel.app/skill/delete/${id}`,
            {
              method: 'DELETE',
            }
          );
          const data = await response.json();
          console.log(data, 'dat');
          if (data.deletedCount) {
            Swal.fire({
              title: 'Deleted!',
              text: 'Your Skill has been deleted.',
              icon: 'success',
            });
            setRefresh(prev => !prev);
          } else {
            Swal.fire({
              title: 'Error!',
              text: 'Failed to delete the Skill.',
              icon: 'error',
            });
          }
        } catch (error) {
          console.error('Error deleting skill:', error);
          Swal.fire({
            title: 'Error!',
            text: 'An error occurred while deleting the skill.',
            icon: 'error',
          });
        }
      }
    });
  };
  if (!skills || skills.length === 0) {
    return <LoadingSpinner />;
  }
  return (
    <div className="bg-primary">
      <div className="max-w-6xl mx-auto py-8">
        <div className="text-center text-white">
          <span className="flex justify-center items-center gap-2 text-2xl">
            <img src="/src/assets/leftArrow.gif" className="w-12" alt="" />{' '}
            Skills
          </span>
          <h2 className="text-3xl md:text-4xl xl:text-5xl font-semibold md:font-bold">
            Tech <span className="text-[#675C9C]">Expertise</span>
          </h2>
        </div>
        <div className="cards grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 py-4 md:pt-6 mx-3 md:mx-0">
          {currentSkills.map((skill, index) => (
            <div
              className="card duration-500 cursor-pointer hover:scale-105"
              key={index}
            >
              <Skill skill={skill} handleSkillDelete={handleSkillDelete} />
            </div>
          ))}
        </div>
        <div className="mt-4 md:mt-8 mx-3 md:mx-0">
          <ResponsivePagination
            total={totalPages}
            current={currentPage}
            nextLabel="Next"
            previousLabel="Previous"
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default Skills;

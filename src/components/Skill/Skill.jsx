/* eslint-disable react/prop-types */
import { useState } from 'react';
import './Skill.css';
import SkillModal from '../Modal/SkillModal';
import useAuth from './../../hooks/useAuth';
import { Link } from 'react-router-dom';
function Skill({ skill, handleSkillDelete }) {
  const { user } = useAuth();
  let [isOpen, setIsOpen] = useState(false);

  return (
    <div className="grid grid-cols-7 gap-2 md:gap-3 text-secondary backdrop-blur-lg bg-[#695E9F]/50 items-center rounded-xl p-3 md:p-4">
      <div className="col-span-2">
        <img
          className="w-32 h-32 object-cover rounded-xl hover:scale-105 duration-300 animate-pulse"
          src={skill?.Image}
          alt=""
        />
      </div>
      <div className="col-span-5">
        <h2 className="text-xl font-semibold">
          <span className="text-[#DC143C] font-bold">
            {skill?.SkillTitle?.charAt(0)}
          </span>
          {skill?.SkillTitle?.slice(1)}
        </h2>

        <hr className="border-b border-[#675C9C]" />
        <p className="text-sm my-2">
          Description:{' '}
          {skill?.SkillDescription?.length > 50
            ? `${skill.SkillDescription.slice(0, 50)}...`
            : skill?.SkillDescription}
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => setIsOpen(true)}
            className="relative flex items-center px-4 py-2 text-xs overflow-hidden transition-all bg-[#675C9C] rounded-md group"
          >
            <span className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full bg-indigo-600 rounded-md group-hover:translate-x-0"></span>
            <span className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-white">
              See Details
            </span>
          </button>
          {user && (
            <div className="flex gap-2">
              {/* Update Button */}
              <Link to={`update-skill/${skill._id}`}>
                <button className="bg-[#675C9C] text-white px-2 py-2 rounded-md hover:bg-[#443d69] focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm duration-300">
                  Update
                </button>
              </Link>

              {/* Delete Button */}
              <button
                onClick={() => handleSkillDelete(skill?._id)}
                className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 text-sm duration-300"
              >
                Delete
              </button>
            </div>
          )}
        </div>

        <SkillModal skill={skill} isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
    </div>
  );
}

export default Skill;

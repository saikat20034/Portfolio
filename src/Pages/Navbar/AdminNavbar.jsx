/* eslint-disable react/prop-types */
import { FaHome, FaUser } from 'react-icons/fa';
import { IoLogOut } from 'react-icons/io5';
import { MdPermContactCalendar } from 'react-icons/md';
import { Link } from 'react-router-dom';

const AdminNavbar = ({ setIsOpen, isOpen, handleLogOut }) => {
  return (
    <div>
      <div className="absolute rounded-xl shadow-md w-[40vw] md:w-[12vw] bg-white  text-black overflow-hidden right-0 top-12 text-sm">
        <div className="flex flex-col cursor-pointer">
          <Link
            to="/add-skills"
            onClick={() => setIsOpen(!isOpen)}
            className="px-4 py-3 hover:bg-neutral-100 transition font-semibold flex items-center gap-2"
          >
            <FaHome />
            Add Skills
          </Link>
          <hr />
          <Link
            onClick={() => setIsOpen(!isOpen)}
            to="/add-experience"
            className=" px-4 py-3 hover:bg-neutral-100 transition font-semibold flex items-center gap-2"
          >
            <FaUser />
            Add Experience
          </Link>
          <hr />
          <Link
            onClick={() => setIsOpen(!isOpen)}
            to="/add-projects"
            className=" px-4 py-3 hover:bg-neutral-100 transition font-semibold flex items-center gap-2"
          >
            <MdPermContactCalendar />
            Add Projects
          </Link>
          <Link
            onClick={() => setIsOpen(!isOpen)}
            to="/add-blog"
            className=" px-4 py-3 hover:bg-neutral-100 transition font-semibold flex items-center gap-2"
          >
            <MdPermContactCalendar />
            Add Blogs
          </Link>
          <hr />
          <Link
            onClick={handleLogOut}
            className="px-4 py-3 hover:bg-neutral-100 transition font-semibold gap-2 flex items-center"
          >
            <IoLogOut />
            Logout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminNavbar;

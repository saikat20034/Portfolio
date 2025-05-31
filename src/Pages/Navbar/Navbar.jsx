import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-scroll';
import { GiHamburgerMenu } from 'react-icons/gi';
import { RxCross1 } from 'react-icons/rx';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import toast from 'react-hot-toast';
import { AiOutlineMenu } from 'react-icons/ai';
import avatarImg from '../../assets/placeholder.jpg';
import AdminNavbar from './AdminNavbar';

export default function Navbar() {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const location = useLocation();
  const [activeLink, setActiveLink] = useState('');
  const menuRef = useRef(null);
  const navItem = [
    'about',
    'skills',
    // 'experience',
    'projects',
    'blog',
    'contact',
  ];
  const closeMenu = () => setIsOpen2(false);
  useEffect(() => {
    const handleClickOutside = event => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        closeMenu();
      }
    };

    const handleScroll = () => {
      if (isOpen2) closeMenu();
    };

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('scroll', handleScroll);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isOpen2]);

  const handleLinkClick = link => {
    const currentPath = location.pathname;
    if (currentPath !== '/') {
      const data = (location.state = link);
      navigate('/');
      setActiveLink('');
      setActiveLink(data);
    } else {
      setActiveLink(link);
    }
  };
  const handleLogOut = () => {
    logOut();
    setIsOpen(!isOpen);
    toast.success('LogOut Successfully');
    navigate('/');
  };
  return (
    <nav className="bg-primary text-secondary font-manrope sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              to="home"
              smooth
              duration={500}
              spy
              offset={-70}
              onClick={() => handleLinkClick('home')}
            >
              <img
                className="w-32"
                src="https://i.postimg.cc/h4wZk4J2/Adobe-Express-file.png"
                alt="Logo"
              />
            </Link>
          </div>

          {/* Navbar Links */}
          <div className="hidden lg:flex flex-grow justify-center space-x-6">
            {navItem.map((item, index) => (
              <Link
                key={index}
                to={item}
                smooth
                duration={500}
                spy
                activeClass="text-white py-2 px-4 rounded border-b-2 border-secondary"
                className={`text-secondary capitalize hover:text-white py-2 px-4 rounded transition duration-500 ${
                  activeLink === `{item}` ? 'border-b-2 border-secondary' : ''
                }`}
                offset={-70}
                onClick={() => handleLinkClick(`${item}`)}
              >
                {item}
              </Link>
            ))}
          </div>

          {/* Hire Me Button */}
          <div className="hidden lg:flex items-center">
            {!user && (
              <Link to="/hire-me">
                <button className="button font-lexend">
                  Hire <span className="text-red-500">M</span>e
                </button>
              </Link>
            )}
            {/* Dropdown Menu */}
            {user && (
              <div className="relative">
                <div className="flex flex-row items-center gap-3">
                  {/* Dropdown btn */}
                  <div
                    onClick={() => setIsOpen(!isOpen)}
                    className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
                  >
                    <AiOutlineMenu />
                    <div className="hidden md:block">
                      {/* Avatar */}
                      <img
                        className="rounded-full"
                        referrerPolicy="no-referrer"
                        src={user && user.photoURL ? user.photoURL : avatarImg}
                        alt="profile"
                        height="30"
                        width="30"
                      />
                    </div>
                  </div>
                </div>
                {isOpen && (
                  <AdminNavbar
                    setIsOpen={setIsOpen}
                    isOpen={isOpen}
                    handleLogOut={handleLogOut}
                  />
                )}
              </div>
            )}
          </div>

          {/* Hamburger Menu */}
          <div className="lg:hidden flex items-center">
            {!user ? (
              <button
                type="button"
                className="text-secondary hover:text-white"
                onClick={() => setIsOpen2(!isOpen2)}
              >
                {isOpen2 ? (
                  <RxCross1 className="h-6 w-6" />
                ) : (
                  <GiHamburgerMenu className="h-6 w-6" />
                )}
              </button>
            ) : (
              <button
                type="button"
                className="text-secondary hover:text-white"
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? (
                  <RxCross1 className="h-6 w-6" />
                ) : (
                  <GiHamburgerMenu className="h-6 w-6" />
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className="lg:hidden">{isOpen && <AdminNavbar></AdminNavbar>}</div>
      <div
        className={`absolute top-16 left-0 mx-8 py-2 w-[calc(100%-64px)] rounded-md bg-[#111827] shadow-lg transition-all duration-300 z-50 ${
          isOpen2 ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div className="space-y-2 p-4">
          <ul className="space-y-2">
            <li>
              <Link
                to="home"
                smooth
                duration={500}
                spy
                activeClass="block text-[#1b1238] text-bold bg-secondary py-2 px-4 rounded-md transition duration-200"
                className="block  hover:text-white py-2 px-4 rounded-md transition duration-200 active:bg-[#1b1238] hover:bg-[#3d2689]"
                offset={-70}
                onClick={() => handleLinkClick('home')}
              >
                Home
              </Link>
            </li>
            {navItem.map((item, index) => (
              <li key={index}>
                <Link
                  to={item}
                  smooth
                  duration={500}
                  spy
                  activeClass="block text-[#1b1238] font-bold bg-secondary py-2 px-4 rounded-md transition duration-200"
                  className="block capitalize hover:text-white py-2 px-4 rounded-md transition duration-200 active:bg-[#1b1238] hover:bg-[#3d2689]"
                  offset={-70}
                  onClick={() => handleLinkClick(`${item}`)}
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}

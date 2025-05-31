import { Outlet } from 'react-router-dom';
import Navbar from '../Pages/Navbar/Navbar';
import Footer from '../Pages/Footer/Footer';
import './Root.css';
import { FaArrowUp } from 'react-icons/fa';

function Root() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
      <div className="fixed z-50 bottom-4 right-4">
        <button className="backToTop" onClick={scrollToTop}>
          <FaArrowUp className="svgIcon" />
        </button>
      </div>
    </div>
  );
}

export default Root;

/* eslint-disable react/prop-types */

import { FaArrowRightLong } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const BlogCard = ({ blog, handleBlogDelete }) => {
  const { user } = useAuth();
  const { Image, Title } = blog;
  return (
    <div className="max-w-lg mx-auto">
      <div className="bg-white shadow-md border border-gray-200 rounded-lg max-w-sm mb-5">
        <Link to="#">
          <img
            className="rounded-t-lg w-full h-52 object-cover"
            src={Image}
            alt={Title}
          />
        </Link>
        <div className="p-5">
          <Link to="#">
            <h5 className="text-gray-900 font-bold text-2xl tracking-tight mb-2">
              {Title?.length > 25 ? `${Title.slice(0, 25)}...` : Title}
            </h5>
          </Link>
          <p className="text-gray-500 text-sm mb-2">
            {blog?.CreatedAt
              ? new Date(blog.CreatedAt).toLocaleString()
              : 'Time not available'}
          </p>
          <p className="font-normal text-gray-700 mb-3">
            {blog?.Content?.length > 60
              ? `${blog.Content.slice(0, 60)}...`
              : blog?.Content}
          </p>
          <div
            to={`blog-details/${blog._id}`}
            className="flex gap-4 justify-between items-center"
          >
            <Link to={`blog-details/${blog._id}`}>
              <button className="flex items-center gap-1 button">
                <FaArrowRightLong />

                <div className="text-xs font-semibold">Read More</div>
              </button>
            </Link>
            {user && (
              <div className="flex gap-2 justify-between">
                {/* Update Button */}
                <Link to={`update-blog/${blog._id}`}>
                  <button className="bg-[#675C9C] text-white px-4 py-2 rounded-md hover:bg-[#443d69] focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm duration-300">
                    Update
                  </button>
                </Link>

                {/* Delete Button */}
                <button
                  onClick={() => handleBlogDelete(blog?._id)}
                  className="bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 text-sm duration-300"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;

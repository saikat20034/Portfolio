import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [allBlogs, setAllBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(
          `https://portfolio-server-sigma-mocha.vercel.app/blog/${id}`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch blog details');
        }
        const data = await response.json();
        setBlog(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  useEffect(() => {
    const fetchAllBlogs = async () => {
      try {
        const response = await fetch(
          'https://portfolio-server-sigma-mocha.vercel.app/blogs'
        );
        if (!response.ok) {
          throw new Error('Failed to fetch blogs list');
        }
        const data = await response.json();
        setAllBlogs(data);
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchAllBlogs();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl font-semibold text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto p-4 sm:p-6">
        <div className="bg-white rounded-lg shadow-md mb-10">
          <img
            src={blog.Image}
            alt={blog.Title}
            className="w-full h-64 sm:h-96 object-cover rounded-t-lg"
          />
          <div className="p-4 sm:p-6">
            <p className="text-blue-500 text-xs sm:text-sm font-medium uppercase">
              {blog.Category}
            </p>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mt-2">
              {blog.Title}
            </h1>
            <p className="text-gray-500 text-sm sm:text-base mt-2">
              Published on:{' '}
              {new Date(blog.CreatedAt).toLocaleDateString('en-US')}
            </p>
            <div className="text-gray-700 leading-relaxed text-sm sm:text-base mt-4 whitespace-pre-line">
              {blog.Content}
            </div>
          </div>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6">
          Explore Other Blogs
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {allBlogs.map(item => (
            <Link
              to={`/blog-details/${item._id}`}
              key={item._id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <img
                src={item.Image}
                alt={item.Title}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <p className="text-blue-500 text-xs font-medium uppercase">
                  {item.Category}
                </p>
                <h3 className="text-lg font-semibold text-gray-800 mt-1">
                  {item.Title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;

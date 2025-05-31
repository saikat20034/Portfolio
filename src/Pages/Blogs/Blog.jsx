import { useEffect, useState } from 'react';
import ResponsivePagination from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/classic.css';
import './Blog.css';
import BlogCard from '../../components/BlogCard/BlogCard';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import Swal from 'sweetalert2';
export default function Blog() {
  const pagePerView = 3;
  const [currentPage, setCurrentPage] = useState(1);
  const [blogPosts, setBlogPosts] = useState([]);
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    (async () => {
      const response = await fetch(
        'https://portfolio-server-sigma-mocha.vercel.app/blogs'
      );
      const data = await response.json();
      setBlogPosts(data);
    })();
  }, [refresh]);
  function handlePageChange(page) {
    setCurrentPage(page);
  }
  const totalPages = Math.ceil(blogPosts.length / pagePerView);
  const indexOfLastPost = currentPage * pagePerView;
  const indexOfFirstPost = indexOfLastPost - pagePerView;
  const currentPosts = blogPosts.slice(indexOfFirstPost, indexOfLastPost);

  const handleBlogDelete = id => {
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
            `https://portfolio-server-sigma-mocha.vercel.app/blog/delete/${id}`,
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
  if (!blogPosts || blogPosts.length === 0) {
    return <LoadingSpinner />;
  }

  return (
    <div className="max-w-6xl mx-auto py-8 md:my-12">
      <div className="text-center mb-4 md:mb-8">
        <h2 className="text-3xl md:text-4xl font-semibold md:font-bold">
          Blog <span className="text-[#675C9C] ">Corner</span>
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mx-3 md:mx-0">
        {currentPosts.map(blog => (
          <BlogCard
            key={blog?._id}
            blog={blog}
            handleBlogDelete={handleBlogDelete}
          />
        ))}
      </div>
      <div className="mt-4 md:mt-8 mx-3 md:mx-0">
        <ResponsivePagination
          total={totalPages}
          current={currentPage}
          nextLabel="Next"
          previousLabel="Previous"
          onPageChange={page => handlePageChange(page)}
        />
      </div>
    </div>
  );
}

import { createBrowserRouter } from 'react-router-dom';
import Root from '../Layout/Root';
import Home from '../Pages/Home/Home';
import Error from '../Pages/Error/Error';
import Login from '../Pages/Login/Login';
// import SignUp from '../Pages/SignUp/SignUp';
import AddSkills from '../Pages/Dashboard/AddSkills/AddSkills';
import AddExperience from '../Pages/Dashboard/AddExperience/AddExperience';
import UpdateSkills from '../Pages/Dashboard/AddSkills/UpdateSkills';
import UpdateExperience from '../Pages/Dashboard/AddExperience/UpdateExperience';
import AddProjects from '../Pages/Dashboard/AddProjects/AddProjects';

import UpdateProject from '../Pages/Dashboard/AddProjects/UpdateProject';
import AddBlog from '../Pages/Dashboard/AddBlog/AddBlog';
import UpdateBlog from '../Pages/Dashboard/AddBlog/UpdateBlog';
import PrivateRoute from './PrivateRoute';
import BlogDetails from '../components/BlogCard/BlogDetails';
import AllProjects from '../Pages/Projects/AllProjects';
import TradeNestDetails from '../components/TradeNest details/TradeNest';
import VisaLandDetails from '../components/VisaLand/VisaLand details';
import HotelHiveDetails from '../components/HotelHive/HotelHive details';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <Error />,
    children: [
      {
        path: '/',
        element: <Home />,
      },

      {
        path: '/sign-in',
        element: <Login />,
      },
      // {
      //   path: '/sign-up',
      //   element: <SignUp />,
      // },
      {
        path: '/add-skills',
        element: (
          <PrivateRoute>
            <AddSkills />
          </PrivateRoute>
        ),
      },
      {
        path: '/project/tradenest',
        element: <TradeNestDetails></TradeNestDetails>,
      },
      {
        path: '/project/visaland',
        element: <VisaLandDetails></VisaLandDetails>,
      },
      {
        path: '/project/hotelhive',
        element: <HotelHiveDetails></HotelHiveDetails>,
      },
      {
        path: '/update-skill/:id',
        element: (
          <PrivateRoute>
            <UpdateSkills />
          </PrivateRoute>
        ),
      },
      {
        path: '/add-experience',
        element: (
          <PrivateRoute>
            <AddExperience />
          </PrivateRoute>
        ),
      },
      {
        path: '/update-experience/:id',
        element: (
          <PrivateRoute>
            <UpdateExperience />
          </PrivateRoute>
        ),
      },
      {
        path: '/add-projects',
        element: (
          <PrivateRoute>
            <AddProjects />
          </PrivateRoute>
        ),
      },
      {
        path: '/view-all-projects',
        element: <AllProjects />,
      },
      {
        path: '/update-project/:id',
        element: (
          <PrivateRoute>
            <UpdateProject />
          </PrivateRoute>
        ),
      },
      {
        path: '/add-blog',
        element: (
          <PrivateRoute>
            <AddBlog />
          </PrivateRoute>
        ),
      },
      {
        path: '/update-blog/:id',
        element: (
          <PrivateRoute>
            <UpdateBlog />
          </PrivateRoute>
        ),
      },
      {
        path: '/blog-details/:id',
        element: <BlogDetails />,
      },
    ],
  },
]);

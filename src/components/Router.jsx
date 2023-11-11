import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import App from "../App";
import Blog from "./Blog.jsx";
import Home from "./Home.jsx";
import Login from "./Login.jsx";
import SignUp from "./SignUp.jsx";
import Users from "./Users.jsx";
import Profile from "./Profile.jsx";
import CreateBlog from "./CreateBlog.jsx";
import getIsAdmin from "./getAdmin";
import useBearStore from "./useBearStore";
import { useEffect } from "react";

const Router = () => {
  const { setIsLoggedIn, setIsAdmin } = useBearStore();

  useEffect(() => {
    const checkIfAdmin = async () => {
      const verified = await getIsAdmin();
      setIsAdmin(verified[0]);
      if (verified[0]) {
        setIsLoggedIn(verified[0]);
      } else {
        const token = localStorage.getItem("projectX");
        if (token) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      }
    };

    checkIfAdmin();
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        { path: "", element: <Navigate to="/home" /> },
        { path: "/home", element: <Home /> },
        { path: "/signup", element: <SignUp /> },
        { path: "/users", element: <Users /> },
        { path: "/profile/:id", element: <Profile /> },
        { path: "/create-blog", element: <CreateBlog /> },
        {
          path: "/login",
          element: <Login redirect={true} />,
        },
        { path: "/blog/:id", element: <Blog /> },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export { Router };

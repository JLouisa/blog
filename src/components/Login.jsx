import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import localHost from "./localHost";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useBearStore from "./useBearStore";

function Login({ link = "/home", redirect }) {
  const [theErrors, setTheErrors] = useState([]);
  const navigateTo = useNavigate();
  const { setIsLoggedIn, setIsAdmin, setUserID } = useBearStore();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const userData = { username, password };

    try {
      const response = await fetch(`${localHost}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      // Handle the response as needed
      if (response.ok) {
        // Successful login, redirect
        localStorage.setItem("projectX", data.projectX);
        setIsLoggedIn(true);
        setIsAdmin(data.user.isAdmin);
        setUserID(data.user.id);
        if (redirect) {
          navigateTo("/home"); // Redirect to the home after login
        }
      } else {
        const responseData = await response.json();
        if (responseData.data.errors) {
          setTheErrors(responseData.data.errors);
        } else {
          console.error("Unexpected response format:", responseData);
          setTheErrors(["Unexpected response format:", responseData.data.errors]);
        }
      }
    } catch (error) {
      console.error("Error during login:", error);
      // Handle the error, display a message, or redirect if necessary
      setTheErrors(["Error during login:", error]);
    }
  };

  return (
    <>
      {theErrors
        ? theErrors.map((error, index) => {
            return (
              <p key={error.msg || index} className="errors">
                {error.msg}
              </p>
            );
          })
        : null}
      <div>
        <form action={`${localHost}/login`} method="POST" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Username: </label>
            <br />
            <input type="text" name="username" id="username" required />
          </div>
          <div>
            <label htmlFor="password">Password: </label>
            <br />
            <input type="password" name="password" id="password" required />
          </div>
          <div>
            <button type="submit" className="btn">
              Login
            </button>
            <Link to={link}>
              <button type="button" className="btn">
                Cancel
              </button>
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}

Login.propTypes = {
  link: PropTypes.string,
  redirect: PropTypes.bool,
};

export default Login;

import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import localHost from "./localHost";

function SignUp() {
  const [theErrors, setTheErrors] = useState([]);
  const navigateTo = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const passwordConfirm = document.getElementById("passwordConfirm").value;

    const userData = { username, password, passwordConfirm };

    try {
      const response = await fetch(`${localHost}/v1/api/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      // Handle the response as needed
      if (response.ok) {
        await response.json();
        const redirect = true;
        // Successful sign-up, redirect
        if (redirect) {
          navigateTo("/login"); // Redirect to the home after sign-up
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
      console.error("Error during sign-up:", error);
      // Handle the error, display a message, or redirect if necessary
      setTheErrors(["Error during sign-up:", error]);
    }
  };

  return (
    <>
      {theErrors
        ? theErrors.map((error) => {
            return (
              <p key={error.msg} className="errors">
                {error.msg}
              </p>
            );
          })
        : null}
      <form action="/user" method="POST" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username: </label>
          <br />
          <input type="text" name="username" id="username" required={true} />
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <br />
          <input type="password" name="password" id="password" required={true} />
          <br />
          <label htmlFor="passwordConfirm">Confirm password: </label>
          <br />
          <input type="password" name="passwordConfirm" id="passwordConfirm" required={true} />
        </div>
        <div>
          <button type="submit" className="btn">
            Sign Up
          </button>
          <Link to={"/home"}>
            <button type="button" className="btn">
              Cancel
            </button>
          </Link>
        </div>
      </form>
    </>
  );
}

export default SignUp;

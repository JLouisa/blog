import { useState } from "react";
import BlogEditor from "./BlogEditor";
import localHost from "./localHost";
import { useNavigate } from "react-router-dom";

function CreateBlog() {
  const navigateTo = useNavigate();
  const [theErrors, setTheErrors] = useState([]);

  //   const [title, setTitle] = useState("");
  const submitHandler = async (data) => {
    event.preventDefault();
    const blogTitle = document.getElementById("title").value;
    const blogText = data;
    const userData = { blogTitle, blogText };

    try {
      const token = localStorage.getItem("projectX");
      const response = await fetch(`${localHost}/v1/api/blog`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(userData),
      });

      // Handle the response as needed
      if (response.ok) {
        const data = await response.json();
        const redirect = true;
        // Successful sign-up, redirect
        if (redirect) {
          const blog = data.data;
          navigateTo(`/blog/${blog._id}`); // Redirect to the home after sign-up
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
      console.error("Error during blog:", error);
      // Handle the error, display a message, or redirect if necessary
      setTheErrors(["Error during blog:", error]);
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
      <p>Create blogs</p>
      <form action="">
        <label htmlFor="title">Title: </label>
        <input type="text" name="title" id="title" placeholder="Your Title" />
      </form>
      <BlogEditor submitHandler={submitHandler} />
    </>
  );
}

export default CreateBlog;

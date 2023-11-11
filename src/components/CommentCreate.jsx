import { useState } from "react";
import PropTypes from "prop-types";
import Login from "./Login";
import localHost from "./localHost";
import { useNavigate } from "react-router-dom";
import useBearStore from "./useBearStore";

function CommentCreate({ blogID, comments }) {
  const navigateTo = useNavigate();
  const [theErrors, setTheErrors] = useState([]);
  const { isLoggedIn } = useBearStore();

  const [showCommentArea, setShowCommentArea] = useState(false);

  const showCommentHandler = () => {
    setShowCommentArea(!showCommentArea);
  };

  //   const [title, setTitle] = useState("");
  const submitHandler = async () => {
    event.preventDefault();
    const commentText = document.getElementById("commentText").value;
    const userData = { commentText };

    try {
      const token = localStorage.getItem("projectX");
      const response = await fetch(`${localHost}/v1/api/blog/${blogID}/comment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(userData),
      });

      // Handle the response as needed
      if (response.ok) {
        await response.json();
        const redirect = true;
        // Successful sign-up, redirect
        if (redirect) {
          navigateTo(`/blog/${blogID}`); // Redirect
          window.location.reload(true);
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
      console.error("Error during comment:", error);
      // Handle the error, display a message, or redirect if necessary
      setTheErrors(["Error during comment:", error]);
    }
  };

  if (showCommentArea === false) {
    return (
      <>
        <div>
          <button className="btn" onClick={showCommentHandler}>
            {comments.length === 0 ? "Be the first to comment!" : "Place a comment"}
          </button>
        </div>
      </>
    );
  }
  if (isLoggedIn === false) {
    return (
      <>
        <Login link={`/blog/${blogID}`} redirect={false} />
      </>
    );
  }
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
      <div>
        <form action="" method="POST" onSubmit={submitHandler}>
          <div>
            <label htmlFor="commentText">Place your Comments</label>
            <br />
            <textarea name="commentText" id="commentText" cols="70" rows="10" placeholder="Add a comment"></textarea>
          </div>
          <div>
            <input type="submit" value="Comment" className="btn" />
            <button className="btn" onClick={showCommentHandler}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

CommentCreate.propTypes = {
  blogID: PropTypes.string,
  comments: PropTypes.array,
};

export default CommentCreate;

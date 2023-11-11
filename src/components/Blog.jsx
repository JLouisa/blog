import { useEffect, useState } from "react";
import Comment from "./Comment";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import localHost from "./localHost";
import BlogContent from "./BlogContent";
import useBearStore from "./useBearStore";

function Blog() {
  const { id } = useParams();
  const [blog, setBlog] = useState(0);
  const [comments, setComments] = useState(0);
  const { isAdmin } = useBearStore();

  const getComments = async () => {
    try {
      const blogCommentsData = await fetch(`${localHost}/v1/api/blog/${id}/comments`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const blogComments = await blogCommentsData.json();
      setBlog(blogComments.data[0]);
      setComments(blogComments.data[1]);
    } catch (error) {
      // Log the error and handle it gracefully
      console.error("Error fetching comments:", error);
    }
  };

  useEffect(() => {
    getComments();
  }, []);

  if (blog === 0) return <div>Loading...</div>;

  const deleteBlog = async (id) => {
    try {
      await fetch(`${localHost}/v1/api/blog/${id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      // Log the error and handle it gracefully
      console.error("Error fetching comments:", error);
    }
    getComments();
  };

  const deleteComment = async (id) => {
    try {
      await fetch(`${localHost}/v1/api/comment/${id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      // Log the error and handle it gracefully
      console.error("Error fetching comments:", error);
    }
    getComments();
  };

  return (
    <>
      <section className="blog-post">
        <div className="deleteBlog">
          {isAdmin && (
            <button className="btn" onClick={() => deleteBlog(id)}>
              {blog[0].isHidden ? "Undelete Blog" : "Delete Blog"}
            </button>
          )}
        </div>
        <div className="blog-content">
          <h2>
            {blog[0].title}
            <span className="deleted">{blog[0].isHidden ? " (Deleted)" : ""}</span>
          </h2>
          <BlogContent content={blog[0].text} />
        </div>
        <div className="commentSection">
          <Comment id={id} comments={comments} deleteComment={deleteComment} />
        </div>
      </section>
    </>
  );
}

Blog.propTypes = {
  blog: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  isLogin: PropTypes.bool,
  setIsLogin: PropTypes.func,
};

export default Blog;

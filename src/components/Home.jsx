import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import localHost from "./localHost";
import useBearStore from "./useBearStore";

function Home() {
  const [blogs, setBlogs] = useState(0);
  const [showMore, setShowMore] = useState(5);
  const { isAdmin } = useBearStore();

  const blogLength = (title) => {
    let newTitle = title;
    if (newTitle.length > 300) {
      return (
        <>
          <p>{newTitle.substring(0, 300) + "..."}</p>
          <p>Show more ⌄</p>
        </>
      );
    }
    return newTitle;
  };

  useEffect(() => {
    const fetchApiBlogs = async () => {
      const response = await fetch(`${localHost}/v1/api/blogs`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        setBlogs(data.data);
      } else {
        throw new Error("API call failed");
      }
    };
    fetchApiBlogs();
  }, []);

  const theBlogs = (blogs) => {
    // Check if blogs is an array
    if (!Array.isArray(blogs)) {
      console.error("Blogs is not an array:", blogs);
      return null;
    }

    const visibleBlogs = blogs.slice(0, showMore);

    const renderBlog = (blog) => (
      <div key={blog._id} className="blogs">
        <Link to={"/blog/" + blog._id}>
          <p>
            {blog.title}
            <span className="deleted">{blog.isHidden ? " (Deleted)" : ""}</span>
          </p>
          <>{blogLength(blog.text)}</>
        </Link>
      </div>
    );

    return <>{visibleBlogs.map((blog) => (blog.isHidden === false || isAdmin === true ? renderBlog(blog) : null))}</>;
  };

  if (!Array.isArray(blogs) || blogs.length === 0) return <p>Loading Blogs...</p>;

  return (
    <section>
      <div>{theBlogs(blogs)}</div>
      {showMore < blogs.length && (
        <div
          className="showMore"
          onClick={() => {
            setShowMore(showMore + 5);
          }}
        >
          Show More
        </div>
      )}
    </section>
  );
}

export default Home;

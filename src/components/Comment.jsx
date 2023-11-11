import PropTypes from "prop-types";
import CommentCreate from "./CommentCreate";
import formattedDate from "./formattedDate";
import userProfile from "../assets/profile-user3.png";
import useBearStore from "./useBearStore";

function Comment({ id, comments, deleteComment }) {
  const { isAdmin } = useBearStore();
  if (comments === 0) return <div>Loading...</div>;

  const visibleComments = (comment) => {
    return (
      <div key={comment._id} className="comment">
        <img src={userProfile} className="commentProfile" />
        <p className="commentTitle">
          {comment.createdByUser.username} - {formattedDate(comment.createdDate)}
          <span className="deleted">{comment.isHidden ? " (Deleted)" : ""}</span>
        </p>
        <p className="commentText">{comment.text}</p>
        <div>
          {isAdmin && (
            <button className="btn" onClick={() => deleteComment(comment._id)}>
              {comment.isHidden ? "Undelete" : "Delete"}
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      <div>
        <CommentCreate blogID={id} comments={comments} />
      </div>
      {comments.map((comment) => {
        return (
          <div key={comment._id}>
            {comment.isHidden === false || isAdmin === true ? visibleComments(comment) : null}
          </div>
        );
      })}
    </>
  );
}

Comment.propTypes = {
  comments: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  id: PropTypes.string,
  deleteComment: PropTypes.func,
};

export default Comment;

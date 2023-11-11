import PropTypes from "prop-types";
import TextFormatter from "./TextFormatter";

const BlogContent = ({ content }) => {
  return <div>{TextFormatter(content)}</div>;
};

BlogContent.propTypes = {
  content: PropTypes.string,
};

export default BlogContent;

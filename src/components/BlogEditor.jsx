import { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import PropTypes from "prop-types";

function BlogEditor({ submitHandler }) {
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      submitHandler(editorRef.current.getContent());
    }
  };
  return (
    <>
      <Editor
        apiKey="7awh5ne6ps9yn6tecztoljjx5o2b7zfu75jpds5yznm6g8f0"
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue="<p>This is the initial content of the editor.</p>"
        init={{
          height: 500,
          menubar: false,
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "code",
            "help",
            "wordcount",
          ],
          toolbar:
            "undo redo | blocks | " +
            "bold italic forecolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help",
          content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
      />
      <button onClick={log} className="btn">
        Save Blog
      </button>
    </>
  );
}

BlogEditor.propTypes = {
  submitHandler: PropTypes.func,
};

export default BlogEditor;

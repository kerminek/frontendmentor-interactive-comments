import React from "react";

import "./comment.css";
import CommentTemplate from "../commentTemplate/CommentTemplate";

const Comment = ({ data }) => {
  return (
    <div className="commentContainer">
      <CommentTemplate data={data} />
      {data.replies.length > 0 && (
        <div className="thread">
          <div className="threadBar" />
          <div className="repliesContainer">
            {data.replies.map((reply, index) => (
              <CommentTemplate key={index} data={reply} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Comment;

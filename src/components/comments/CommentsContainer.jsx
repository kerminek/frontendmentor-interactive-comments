import React from "react";
import "./commentsContainer.css";
import Comment from "../comment/Comment";
import InputTemplate from "../inputTemplate/InputTemplate";
import { useSelector } from "react-redux";

const CommentsContainer = () => {
  const data = useSelector((state) => state.comments);
  return (
    <div className="wholeAppContainer">
      <div className="commentsContainer">
        {data.comments.map((comment, index) => (
          <Comment data={comment} key={index} />
        ))}
      </div>
      <div>
        <InputTemplate inputType={"send"} />
      </div>
    </div>
  );
};

export default CommentsContainer;

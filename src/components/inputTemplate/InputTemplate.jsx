import React, { useEffect, useRef, useState } from "react";
import "./inputTemplate.css";
import { useDispatch, useSelector } from "react-redux";
import { addComment, addReply } from "../../redux/commentsSlice";

const InputTemplate = ({ inputType, replyTo, threadId, setShowReply }) => {
  const data = useSelector((state) => state.comments);
  const dispatch = useDispatch();

  const currentUser = data.currentUser;
  const inputTypes = {
    reply: "REPLY",
    send: "SEND",
    update: "UPDATE",
  };
  const [inputVal, setInputVal] = useState();
  const inputRef = useRef();

  useEffect(() => {
    replyTo && inputRef.current.focus();
    // inputRef.current.setSelectionRange(inputRef.current.innerText.length, inputRef.current.innerText.length);
    // inputRef.current.setSelectionRange(inputRef.current.value.length, inputRef.current.value.length);
  }, []);

  const maxId = () => {
    let maxValue = 0;
    data.comments.map((comment) => {
      comment.replies.map((reply) => {
        reply.id > maxValue && (maxValue = reply.id);
      });
      comment.id > maxValue && (maxValue = comment.id);
    });
    return maxValue + 1;
  };

  const handleSend = () => {
    const toSend = {
      message: {
        id: maxId(),
        content: inputVal,
        createdAt: "Now",
        score: 0,
        user: currentUser,
        replies: [],
        replyingTo: replyTo,
      },
      threadId,
    };
    if (!threadId) {
      dispatch(addComment(toSend));
    } else {
      dispatch(addReply(toSend));
      setShowReply(false);
    }
    inputRef.current.innerText = "";
    setInputVal("");
  };

  return (
    <div className="inputTemplate">
      <img src={currentUser.image.png} alt="" />
      {/* <textarea
        name=""
        id=""
        placeholder={inputType === "send" ? "Add a comment..." : undefined}
        value={inputVal}
        onChange={(x) => setInputVal(x.currentTarget.value)}
        ref={inputRef}
      /> */}
      <div className="artificialTextareaContainer">
        <span
          className="textarea textareaPlaceholder"
          role="textbox"
          contentEditable
          ref={inputRef}
          onInput={(x) => {
            setInputVal(x.target.innerText);
          }}
        >
          {/* {inputVal} */}
        </span>
      </div>
      <button onClick={() => handleSend()}>{inputTypes[inputType]}</button>
    </div>
  );
};

export default InputTemplate;

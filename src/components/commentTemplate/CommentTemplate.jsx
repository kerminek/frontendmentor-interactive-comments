import React, { useEffect, useRef, useState } from "react";
import "./commentTemplate.css";
import { ReactComponent as ReplyIcon } from "../../images/icon-reply.svg";
import { ReactComponent as PlusIcon } from "../../images/icon-plus.svg";
import { ReactComponent as MinusIcon } from "../../images/icon-minus.svg";
import { ReactComponent as DeleteIcon } from "../../images/icon-delete.svg";
import { ReactComponent as EditIcon } from "../../images/icon-edit.svg";
import InputTemplate from "../inputTemplate/InputTemplate";
import { useDispatch, useSelector } from "react-redux";
import { addScore, deleteComment, updateComment } from "../../redux/commentsSlice";

const CommentTemplate = ({ data }) => {
  const dummyData = useSelector((state) => state.comments);
  const currentUser = dummyData.currentUser;
  const isItMe = currentUser.username === data.user.username;
  const [showReply, setShowReply] = useState(false);
  const [delCon, setDelCon] = useState(false);
  const [scoreClicked, setScoreClicked] = useState(0);
  const [openEdit, setOpenEdit] = useState(false);
  const [editContent, setEditContent] = useState(data.content);

  const dispatch = useDispatch();

  const textareaRef = useRef();

  useEffect(() => {
    if (openEdit) {
      textareaRef.current.focus();
      const range = new Range();
      range.setStart(textareaRef.current.firstChild, editContent.length);
      range.setEnd(textareaRef.current.firstChild, editContent.length);
      window.getSelection().removeAllRanges();
      document.getSelection().addRange(range);
      console.log(range);
    }
  }, [openEdit]);

  const handleDelete = () => {
    dispatch(deleteComment(data.id));
    setDelCon(false);
  };

  const handleScore = (value) => {
    dispatch(addScore({ id: data.id, value }));
  };

  const handleClickedScore = (value) => {
    if (value === scoreClicked) return;
    setScoreClicked((prev) => prev + value);
    handleScore(value);
  };

  const handleUpdate = () => {
    const toUpdate = {
      id: data.id,
      content: textareaRef.current.innerText,
    };
    dispatch(updateComment(toUpdate));
    setEditContent(textareaRef.current.innerText);
    setOpenEdit(false);
  };

  return (
    <>
      <div className="mainComment">
        <div className="testContainer">
          {!isItMe ? (
            <div
              className="replyButtonContainer"
              onClick={() => {
                setShowReply((prev) => !prev);
              }}
            >
              <ReplyIcon />
              <p>Reply</p>
            </div>
          ) : (
            <>
              <div className="myCommentContainer">
                <div className="myDeleteButton" onClick={() => setDelCon(true)}>
                  <DeleteIcon />
                  <p>Delete</p>
                </div>
                <div className="myEditButton" onClick={() => setOpenEdit((prev) => !prev)}>
                  <EditIcon />
                  <p>Edit</p>
                </div>
              </div>
              {delCon && (
                <div className="deleteQueryContainer">
                  <div className="deleteQueryBackground" onClick={() => setDelCon(false)} />
                  <div className="deleteQuery">
                    <h2>Delete comment</h2>
                    <p>
                      Are you sure you want to delete this comment? This wil remove the comment and can't be undone.
                    </p>
                    <div className="deleteQueryButtons">
                      <button className="deleteButtonNo" onClick={() => setDelCon(false)}>
                        NO, CANCEL
                      </button>
                      <button className="deleteButtonYes" onClick={() => handleDelete()}>
                        YES, DELETE
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
        <div className="scoreHolder">
          <div className="scoreContainer">
            <PlusIcon
              onClick={() => {
                handleClickedScore(1);
              }}
              className={scoreClicked === 1 ? "clickedScore" : undefined}
            />
            <p>{data.score}</p>
            <MinusIcon
              onClick={() => {
                handleClickedScore(-1);
              }}
              className={scoreClicked === -1 ? "clickedScore" : undefined}
            />
          </div>
        </div>
        <div className="rest">
          <div className="infoContainer">
            <div className="infoLeft">
              <img src={data.user.image.png} alt="" />
              <p className="username">{data.user.username}</p>
              {isItMe && <div className="you">you</div>}
              <p className="date">{data.createdAt}</p>
            </div>
          </div>
          <div className="textContainer">
            {!openEdit ? (
              <p>
                {data.replyingTo && <span className="usernameCall">@{data.replyingTo} </span>}
                {data.content}
              </p>
            ) : (
              <div className="updateContainer">
                <div className="artificialTextareaContainer">
                  <span className="textarea" role="textbox" contentEditable ref={textareaRef}>
                    {editContent}
                  </span>
                </div>
                <button onClick={() => handleUpdate()}>UPDATE</button>
              </div>
            )}
          </div>
        </div>
      </div>
      {showReply && (
        <InputTemplate
          inputType={"reply"}
          replyTo={data.user.username}
          threadId={data.id}
          setShowReply={setShowReply}
        />
      )}
    </>
  );
};

export default CommentTemplate;

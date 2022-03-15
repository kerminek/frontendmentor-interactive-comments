import { createSlice, current } from "@reduxjs/toolkit";
import data from "../data.json";

export const commentsSlice = createSlice({
  name: "Comments",
  initialState: data,
  reducers: {
    addComment: (state, action) => {
      state.comments.push(action.payload.message);
    },
    deleteComment: (state, action) => {
      state.comments.map((comment) => {
        (comment.id === action.payload &&
          (state.comments = state.comments.filter((item) => item.id !== action.payload))) ||
          (comment.replies = comment.replies.filter((reply) => reply.id !== action.payload));
      });
    },
    addReply: (state, action) => {
      const thread =
        state.comments.find((comment) => comment.id === action.payload.threadId) ||
        state.comments.find((comment) => comment.replies.some((item) => item.id === action.payload.threadId));

      thread.replies = [...thread.replies, action.payload.message];
    },
    addScore: (state, action) => {
      state.comments.map((comment) => {
        (comment.id === action.payload.id && (comment.score = comment.score + action.payload.value)) ||
          comment.replies.map(
            (reply) => reply.id === action.payload.id && (reply.score = reply.score + action.payload.value)
          );
      });
    },
    updateComment: (state, action) => {
      state.comments.map(
        (comment) =>
          (comment.id === action.payload.id && (comment.content = action.payload.content)) ||
          comment.replies.map((reply) => reply.id === action.payload.id && (reply.content = action.payload.content))
      );
    },
  },
});

export const { addComment, deleteComment, addReply, addScore, updateComment } = commentsSlice.actions;
export default commentsSlice.reducer;

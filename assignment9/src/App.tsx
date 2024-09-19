import React, { useState } from "react";
import "./App.scss";
import avatar from "./images/bozai.png";
import _ from "lodash";

// Helper function to format date as 'MM-DD HH:mm'
const formatDate = (isoDate: string): string => {
  const date = new Date(isoDate);
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${month}-${day} ${hours}:${minutes}`;
};

interface Comment {
  rpid: number;
  user: {
    uid: string;
    avatar: string;
    uname: string;
  };
  content: string;
  ctime: string; // Display time
  isoCtime?: string; // ISO format time for sorting (optional)
  like: number;
}

const defaultList: Comment[] = [
  {
    rpid: 3,
    user: {
      uid: "13258165",
      avatar: "",
      uname: "Jay Zhou",
    },
    content: "Nice, well done",
    ctime: "10-18 08:15",
    like: 88,
  },
  {
    rpid: 2,
    user: {
      uid: "36080105",
      avatar: "",
      uname: "Song Xu",
    },
    content: "I search for you thousands of times, from dawn till dusk.",
    ctime: "11-13 11:29",
    like: 88,
  },
  {
    rpid: 1,
    user: {
      uid: "30009257",
      avatar,
      uname: "John",
    },
    content:
      "I told my computer I needed a break... now it will not stop sending me vacation ads.",
    ctime: "10-19 09:00",
    like: 66,
  },
];

const user = {
  uid: "30009257",
  avatar,
  uname: "John",
};

const tabs = [
  { type: "hot", text: "Top" },
  { type: "newest", text: "Newest" },
];

const App = () => {
  const [commentList, setCommentList] = useState<Comment[]>(defaultList);
  const [newComment, setNewComment] = useState("");
  const [selectedTab, setSelectedTab] = useState("hot");

  const handlePostComment = () => {
    if (newComment.trim() === "") return;

    const currentISODate = new Date().toISOString();
    const formattedCtime = formatDate(currentISODate); // Format the date as 'MM-DD HH:mm'

    const newCommentData: Comment = {
      rpid: commentList.length + 1, // Increment ID
      user: { uid: user.uid, avatar: user.avatar, uname: user.uname },
      content: newComment,
      ctime: formattedCtime, // Store the formatted date for display
      isoCtime: currentISODate, // Keep the ISO date for sorting purposes
      like: 0, // Default likes to 0
    };

    setCommentList([newCommentData, ...commentList]); // Prepend the new comment
    setNewComment(""); // Reset input
  };

  const handleDeleteComment = (rpid: number) => {
    setCommentList(commentList.filter((comment) => comment.rpid !== rpid));
  };

  const sortedCommentList =
    selectedTab === "hot"
      ? _.sortBy(commentList, ["like"]).reverse() // Sort by likes for 'Top'
      : _.sortBy(commentList, [
          (comment) =>
            comment.isoCtime
              ? new Date(comment.isoCtime)
              : new Date(comment.ctime),
        ]).reverse(); // Sort by ISO time for 'Newest'

  return (
    <div className="app">
      {/* Nav Tab */}
      <div className="reply-navigation">
        <ul className="nav-bar">
          <li className="nav-title">
            <span className="nav-title-text">Comments</span>
            <span className="total-reply">{commentList.length}</span>
          </li>
          <li className="nav-sort">
            {tabs.map((tab) => (
              <span
                key={tab.type}
                className={`nav-item ${
                  selectedTab === tab.type ? "active" : ""
                }`}
                onClick={() => setSelectedTab(tab.type)}
              >
                {tab.text}
              </span>
            ))}
          </li>
        </ul>
      </div>

      <div className="reply-wrap">
        {/* Comment Input Box */}
        <div className="box-normal">
          <div className="reply-box-avatar">
            <div className="bili-avatar">
              <img
                className="bili-avatar-img"
                src={user.avatar}
                alt="Profile"
              />
            </div>
          </div>
          <div className="reply-box-wrap">
            <textarea
              className="reply-box-textarea"
              placeholder="Tell something..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <div className="reply-box-send" onClick={handlePostComment}>
              <div className="send-text">Post</div>
            </div>
          </div>
        </div>

        {/* Comment List */}
        <div className="reply-list">
          {sortedCommentList.map((comment) => (
            <div className="reply-item" key={comment.rpid}>
              <div className="content-wrap">
                <div className="user-info">
                  <div className="user-name">{comment.user.uname}</div>
                </div>
                <div className="root-reply">
                  <span className="reply-content">{comment.content}</span>
                  <div className="reply-info">
                    <span className="reply-time">{comment.ctime}</span>
                    <span className="reply-time">Like: {comment.like}</span>
                    {comment.user.uid === user.uid && (
                      <span
                        className="delete-btn"
                        onClick={() => handleDeleteComment(comment.rpid)}
                      >
                        Delete
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;

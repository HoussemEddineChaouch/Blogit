import React from "react";
import defaultImage from "../../assets/images/team-profile-placeholder.jpg";
import TimeAgo from "react-timeago";

function CommentHead({
  username = "Unknown username",
  commentDate = "00:00:00 PM",
  blogImage = defaultImage,
}) {
  return (
    <div className="flex items-center gap-2">
      <img
        src={blogImage}
        className="w-10 h-10 object-cover rounded-full border-4 border-transparent outline outline-1  outline-fontBaseColor"
        alt="user profile"
      />
      <div>
        <h1>{username}</h1>
        <h2 className="text-sm opacity-50">
          <TimeAgo date={commentDate} />
        </h2>
      </div>
    </div>
  );
}

export default CommentHead;

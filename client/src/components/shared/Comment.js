import CommentHead from "./CommentHead";

function Comment({ user, text, createdAt }) {
  return (
    <div className="border border-fontBaseColor p-4 rounded-xl mb-4">
      <CommentHead
        blogImage={user.avatarUrl}
        username={user.username}
        commentDate={createdAt}
      />
      <p className="text-sm max-w-[700px] mt-4">{text}</p>
    </div>
  );
}

export default Comment;

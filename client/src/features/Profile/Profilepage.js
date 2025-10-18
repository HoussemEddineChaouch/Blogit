import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import ProfileHeader from "../../components/shared/ProfileHeader";
import MainHeading from "../../components/shared/MainHeading";
import { FaFireAlt } from "react-icons/fa";
import { BsRocketTakeoff } from "react-icons/bs";
import { FaRegStarHalfStroke, FaBookOpen } from "react-icons/fa6";
import Card from "../../components/shared/Card";
import Blogpost from "../Blog/Blogpost";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../components/shared/Spinner";
import { getProfile } from "../../redux/slices/Auth/AuthThunks";
import {
  deleteBlog,
  getComments,
  toggleLike,
} from "../../redux/slices/Blogs/BlogThunks";
import { showToast } from "../../utils/toastHandler";
import Popup from "../../components/shared/Popup";
import { clearMessages } from "../../redux/slices/Auth/AuthSlice";
import { useNavigate } from "react-router-dom";

const cardData = [
  {
    id: 1,
    title: "Total Fires",
    subtitle: "In the last 30 days",
    cardIcon: FaFireAlt,
  },
  {
    id: 2,
    title: "Total Rocket",
    subtitle: "In the last 30 days",
    cardIcon: BsRocketTakeoff,
  },
  {
    id: 3,
    title: "Total Stars",
    subtitle: "In the last 30 days",
    cardIcon: FaRegStarHalfStroke,
  },
  {
    id: 4,
    title: "Total blogs",
    subtitle: "In the last 30 days",
    cardIcon: FaBookOpen,
  },
];

function Profilepage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [selectedBlogId, setSelectedBlogId] = useState(null);

  const { profile, isLoading, successMsg, errorMsg } = useSelector(
    (state) => state.auth
  );
  const { comments, isLoadingComment } = useSelector((state) => state.blog);

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  const handleSeeComments = (blogId) => dispatch(getComments(blogId));
  const handleLikeBlog = (blogId, typeLike) =>
    dispatch(toggleLike({ blogId, typeLike }));

  useEffect(() => {
    if (successMsg) showToast("success", successMsg);
    if (errorMsg) showToast("error", errorMsg);
    dispatch(clearMessages());
  }, [successMsg, errorMsg, dispatch]);

  if (isLoading || !profile.user) return <Spinner />;

  const handleDeleteRequest = (blogId) => {
    setSelectedBlogId(blogId);
    setOpen(true);
  };

  const confirmDeleteBlog = () => {
    if (selectedBlogId) {
      dispatch(deleteBlog(selectedBlogId));
      setOpen(false);
      setSelectedBlogId(null);
    }
  };

  const cancelDelete = () => {
    setOpen(false);
    setSelectedBlogId(null);
  };

  return (
    <div>
      <Popup
        isOpen={open}
        handleCancel={cancelDelete}
        handleConfirm={confirmDeleteBlog}
      />

      <ProfileHeader
        username={profile.user.username}
        joinedate={format(profile.user.createdAt, "yyyy-MM-dd")}
        countryCode={profile.user.countryCode}
        profileImage={profile.user.avatarUrl}
      />

      <MainHeading
        title="Explore your blogs"
        subtitle="Here are your latest blogs and interactions."
      />

      <div className="flex items-center gap-2 my-4">
        {cardData.map(({ id, title, subtitle, cardIcon }, index) => (
          <Card
            key={id}
            Icon={cardIcon}
            title={`${profile.listCount[index]} ${title}`}
            subtitle={subtitle}
          />
        ))}
      </div>

      {profile.user.blogs?.map(
        ({
          _id,
          title,
          content,
          image,
          firesCount,
          rocketCount,
          starCount,
        }) => (
          <Blogpost
            key={_id}
            blogId={_id}
            title={title}
            content={content}
            image={image}
            reach={[firesCount, rocketCount, starCount]}
            seeComments={() => handleSeeComments(_id)}
            handleLike={handleLikeBlog}
            isLoading={isLoadingComment}
            commentList={comments}
            onDeleteBlog={() => handleDeleteRequest(_id)}
            onUpdateBlog={() => navigate(`/update-blog/${_id}`)}
            inHome={false}
          />
        )
      )}
    </div>
  );
}

export default Profilepage;

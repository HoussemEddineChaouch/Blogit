import React from "react";
import TopBlogsList from "./TopBlogsList";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { topBloggers } from "../../redux/slices/Blogs/BlogThunks";

function TopBlogsConatiner() {
  const dispatch = useDispatch();
  const { isLoading, leaderboard } = useSelector((state) => state.blog);

  useEffect(() => {
    dispatch(topBloggers());
  }, [dispatch]);

  return (
    <TopBlogsList
      list={Array.isArray(leaderboard) ? leaderboard : []}
      isLoading={isLoading}
    />
  );
}

export default TopBlogsConatiner;

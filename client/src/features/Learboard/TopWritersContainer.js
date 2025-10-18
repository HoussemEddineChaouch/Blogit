import React, { useEffect } from "react";
import TopWritersList from "./TopWritersList";
import { useDispatch, useSelector } from "react-redux";
import { topBlogs } from "../../redux/slices/Blogs/BlogThunks";

function TopWritersContainer() {
  const dispatch = useDispatch();
  const { isLoading, leaderboard } = useSelector((state) => state.blog);

  useEffect(() => {
    dispatch(topBlogs());
  }, [dispatch]);

  return (
    <TopWritersList
      list={Array.isArray(leaderboard) ? leaderboard : []}
      isLoading={isLoading}
    />
  );
}

export default TopWritersContainer;

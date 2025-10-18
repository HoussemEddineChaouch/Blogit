import { Outlet } from "react-router-dom";
import BoardHeader from "../features/Learboard/BoardHeader";

function LeaderboardLayout() {
  return (
    <div className="mx-auto">
      <BoardHeader />
      <Outlet />
    </div>
  );
}

export default LeaderboardLayout;

import React from "react";
import Flag from "react-world-flags";
import EmptyInfo from "../../components/shared/EmptyInfo";
import Spinner from "../../components/shared/Spinner";
import defaultAvatar from "../../assets/images/team-profile-placeholder.jpg";

const theadList = [
  { id: 1, headName: "Rank" },
  { id: 2, headName: "Avatar" },
  { id: 3, headName: "Fullname" },
  { id: 4, headName: "Country" },
  { id: 5, headName: "Post Title" },
  { id: 6, headName: "Post Category" },
  { id: 7, headName: "Fires" },
  { id: 8, headName: "Rockets" },
  { id: 9, headName: "Stars" },
  { id: 10, headName: "Total" },
];

function TopWritersList({ list, isLoading }) {
  if (isLoading) return <Spinner />;
  if (list.length < 1)
    return (
      <EmptyInfo
        infoTitle="No Data Available"
        subInfo="There are currently no entries to display. Please check back later or add new items."
      />
    );

  let rowIndex = 0;
  return (
    <div className="w-full mt-4 rounded-2xl h-[300px] overflow-auto">
      <table className="w-full font-Cairo ">
        <thead className="sticky top-0">
          <tr className="bg-fontBaseColor text-baseColor">
            {theadList.map(({ id, headName }) => {
              return (
                <th className="py-4" key={`head-${id}`}>
                  {headName}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {list.map((user) => {
            const blogs = Array.isArray(user.blogs) ? user.blogs : [];
            return blogs.map((blog) => {
              rowIndex += 1;
              const { userDetails } = user;
              return (
                <tr
                  key={rowIndex}
                  className={`${
                    rowIndex % 2 === 0
                      ? "bg-secondaryColor text-fontBaseColor"
                      : "bg-baseColor"
                  }`}
                >
                  <td className="text-center py-4">{rowIndex}</td>
                  <td className="py-4 mx-auto">
                    <img
                      className="mx-auto w-6 h-6 rounded-full border-2 border-transparent outline outline-fontBaseColor"
                      src={
                        userDetails?.avatarUrl
                          ? userDetails?.avatarUrl.startsWith("http")
                            ? userDetails?.avatarUrl
                            : `http://localhost:5000/images/${userDetails?.avatarUrl}`
                          : defaultAvatar
                      }
                      alt={`${rowIndex}-avatar`}
                    />
                  </td>
                  <td className="py-4 text-center">
                    {userDetails?.fullName || "N/A"}
                  </td>
                  <td className="py-4">
                    <Flag
                      code={userDetails?.countryCode || ""}
                      fallback={<span>Unknown</span>}
                      className="w-6 mx-auto"
                    />
                  </td>
                  <td className="text-center py-4">{blog.title}</td>
                  <td className="text-center py-4">{blog.category}</td>
                  <td className="text-center py-4">{blog.firesCount}</td>
                  <td className="text-center py-4">{blog.rocketCount}</td>
                  <td className="text-center py-4">{blog.starCount}</td>
                  <td className="text-center py-4">{blog.totalReach}</td>
                </tr>
              );
            });
          })}
        </tbody>
      </table>
    </div>
  );
}

export default TopWritersList;

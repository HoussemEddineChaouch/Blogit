import Flag from "react-world-flags";
import EmptyInfo from "../../components/shared/EmptyInfo";
import Spinner from "../../components/shared/Spinner";
import defaultAvatar from "../../assets/images/team-profile-placeholder.jpg";

const theadList = [
  { id: 1, headName: "Rank" },
  { id: 2, headName: "Avatar" },
  { id: 3, headName: "Fullname" },
  { id: 4, headName: "Country" },
  { id: 5, headName: "Toatl Blogs" },
  { id: 6, headName: "Toatl Reach" },
];

function TopBlogsList({ list, isLoading }) {
  if (isLoading) return <Spinner />;
  if (!Array.isArray(list) || list.length === 0) {
    return (
      <EmptyInfo
        infoTitle="No Data Available"
        subInfo="There are currently no entries to display. Please check back later or add new items."
      />
    );
  }

  return (
    <div className="w-full mt-4 rounded-2xl h-[300px] overflow-auto">
      <table className="w-full font-Cairo ">
        <thead className="sticky top-0">
          <tr className="bg-fontBaseColor text-baseColor">
            {theadList.map(({ id, headName }) => {
              return (
                <th className="py-4" key={id}>
                  {headName}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {list.map((item, index) => {
            const {
              userDetails: { username, avatarUrl, countryCode },
              blogCount,
              totalReach,
            } = item;
            return (
              <tr
                key={index}
                className={`${
                  index % 2 === 0
                    ? "bg-secondaryColor text-fontBaseColor"
                    : "bg-baseColor"
                }`}
              >
                <td className="text-center py-4">{index + 1}</td>
                <td className="py-4 mx-auto">
                  <img
                    className=" mx-auto w-6 rounded-full border-2 border-transparent outline outline-fontBaseColor"
                    src={
                      avatarUrl
                        ? avatarUrl.startsWith("http")
                          ? avatarUrl
                          : `http://localhost:5000/images/${avatarUrl}`
                        : defaultAvatar
                    }
                    alt={`${index}-avatar`}
                  />
                </td>
                <td className="py-4 text-center">{username}</td>
                <td className="py-4">
                  <Flag code={countryCode} className="w-6 mx-auto" />
                </td>
                <td className="text-center py-4">{blogCount}</td>
                <td className="text-center py-4">{totalReach}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default TopBlogsList;

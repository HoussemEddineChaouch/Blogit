import defaultAvatar from "../../assets/images/team-profile-placeholder.jpg";
import blogTexture from "../../assets/images/cover.jpg";
import { IoIosSettings } from "react-icons/io";
import Flag from "react-world-flags";
import { getName } from "country-list";
import { useNavigate } from "react-router-dom";
function ProfileHeader({
  username = "Unknown user",
  profileImage,
  countryCode = "Unknown country",
  joinedate = "Unknown date",
}) {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/settings");
  };

  const avatarSrc = profileImage
  ? profileImage.startsWith("http")
    ? profileImage
    : `http://localhost:5000/images/${profileImage}`
  : defaultAvatar;


  return (
    <div
      className="font-Cairo relative w-[95vw]  h-72 md:h-72 mx-auto rounded-2xl bg-no-repeat bg-center bg-cover"
      style={{ backgroundImage: `url(${blogTexture})` }}
    >
      {/* Gradient overlay */}
      <div
        className="absolute inset-0 rounded-2xl z-0
                   bg-gradient-to-r 
                   from-fontBaseColor
                   to-headerColor/40"
      ></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-evenly h-full gap-4 md:gap-0 px-4 md:px-0">
        {/* Left: Name & Location */}
        <div className="text-baseColor text-center md:text-left">
          <h1 className="font-medium text-lg md:text-xl">{username}</h1>
          <h2 className="font-light flex items-center gap-2 mt-2  md:text-base">
            <Flag
              code={countryCode}
              fallback={<span>Unknown</span>}
              className="w-6 "
            />
            {getName(countryCode)}
          </h2>
        </div>

        {/* Center: Profile Image */}
        <div className="flex-shrink-0 relative">
          <img
            src={avatarSrc}
            className="w-36 h-36 md:w-[150px] md:h-[150px] rounded-full border-8 border-transparent outline outline-4 outline-baseColor object-cover"
            alt="User profile"
          />
          <IoIosSettings
            className="text-30 text-baseColor absolute top-0 -right-6 cursor-pointer"
            onClick={handleNavigate}
          />
        </div>

        {/* Right: Joined Info */}
        <div className="text-baseColor text-center md:text-right">
          <h1 className="font-medium text-lg md:text-xl">Joined Blogit</h1>
          <h2 className="font-light opacity-50 md:text-base">{joinedate}</h2>
        </div>
      </div>
    </div>
  );
}

export default ProfileHeader;

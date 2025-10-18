import { TbMoodEmpty } from "react-icons/tb";

function EmptyInfo({ infoTitle, subInfo }) {
  return (
    <div className="font-Cairo my-4 text-center space-y-2">
      <TbMoodEmpty className="text-fontBaseColor mx-auto text-35" />
      <h1 className="font-semibold text-fontBaseColor">{infoTitle}</h1>
      <h1 className="text-sm text-fontBaseColor/65">{subInfo}</h1>
    </div>
  );
}

export default EmptyInfo;

import React from "react";

function CardProfile({
  type,
  title = "Top writer",
  subtitle = "You're rank in this week last 30 days",
  rank = "0",
  iconUrl,
}) {
  const typeClass =
    type === "Topwriter"
      ? "bg-baseColor text-fontBaseColor"
      : "bg-fontBaseColor text-baseColor";

  return (
    <div
      className={`h-1/2 p-8 rounded-xl shadow-md ${typeClass} flex items-center justify-around`}
    >
      <div className="space-y-4">
        <div>
          <h1 className="font-bold text-3xl">{title}</h1>
          <h2 className="text-sm mt-2">{subtitle}</h2>
        </div>
        <h3 className="font-bold text-3xl">#{rank}</h3>
      </div>
      <img src={iconUrl} alt="iconUrl" className="object-cover w-28 h-28" />
    </div>
  );
}

export default CardProfile;

function Card({ title = "Unknown", subtitle = "Unknown", Icon }) {
  return (
    <div className="text-center text-fontBaseColor font-Cairo border border-fontBaseColor rounded-lg p-9 w-1/4 ">
      <Icon className="mx-auto text-[50px]" />
      <div className="mt-8 space-y-2">
        <h1 className="font-semibold">{title}</h1>
        <h2 className="text-fontBaseColor/80 text-sm">{subtitle}</h2>
      </div>
    </div>
  );
}

export default Card;

import { useState } from "react";
import { GrPowerReset } from "react-icons/gr";

const categoryList = [
  { id: 1, value: "technology", label: "Technology" },
  { id: 2, value: "travel", label: "Travel" },
  { id: 3, value: "food", label: "Food" },
  { id: 4, value: "lifestyle", label: "Lifestyle" },
  { id: 5, value: "education", label: "Education" },
  { id: 6, value: "health", label: "Health" },
  { id: 7, value: "finance", label: "Finance" },
  { id: 8, value: "sports", label: "Sports" },
  { id: 9, value: "entertainment", label: "Entertainment" },
  { id: 10, value: "science", label: "Science" },
];

function CategorySidebar({ onSubmit, onReset }) {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleSelect = (value) => {
    setSelectedCategory(value);
    onSubmit(value);
  };

  return (
    <div className="border border-fontBaseColor rounded-2xl w-80 min-h-[87vh]  sticky top-0 p-8 flex flex-col justify-between">
      <div className="space-y-2 text-fontBaseColor">
        <h1 className="font-bold text-2xl">Blogs Category</h1>
        <h2 className="text-sm opacity-50">
          Discover Our Blog Categories in Blogit
        </h2>
      </div>
      <div className="space-y-3">
        {categoryList.map(({ id, value, label }) => (
          <div key={id} className="flex items-center gap-2">
            <input
              type="checkbox"
              id={value}
              name="categories"
              value={value}
              checked={selectedCategory === value}
              onChange={() => handleSelect(value)}
              className="accent-fontBaseColor cursor-pointer w-5"
            />
            <label
              htmlFor={value}
              className="text-fontBaseColor cursor-pointer text-xl"
            >
              {label}
            </label>
          </div>
        ))}
      </div>
      <button
        onClick={() => {
          onReset();
          setSelectedCategory(null);
        }}
        className="w-full  py-3 px-4 flex items-center justify-center gap-4 bg-fontBaseColor rounded-full text-baseColor"
      >
        <GrPowerReset fontSize={20} /> Reset All
      </button>
    </div>
  );
}

export default CategorySidebar;

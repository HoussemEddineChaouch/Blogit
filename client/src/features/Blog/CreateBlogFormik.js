import * as Yup from "yup";

export const formInitialValues = {
  category: "",
  title: "",
  content: "",
  image: null,
  tags: [],
};

export const formValidationSchema = Yup.object({
  category: Yup.string().required("Please select a category"),
  title: Yup.string()
    .min(5, "Title must be at least 5 characters")
    .required("Title is required"),
  content: Yup.string()
    .min(20, "Content must be at least 20 characters")
    .required("Blog content is required"),
  image: Yup.mixed().required("Please upload an image"),
  tags: Yup.array()
    .of(Yup.string().min(2, "Tag must be at least 2 characters"))
    .min(1, "Please add at least one tag"),
});

export const categories = [
  { value: "technology", label: "Technology" },
  { value: "design", label: "Design" },
  { value: "development", label: "Web Development" },
  { value: "ai", label: "Artificial Intelligence" },
  { value: "science", label: "Science" },
  { value: "travel", label: "Travel" },
  { value: "lifestyle", label: "Lifestyle" },
  { value: "education", label: "Education" },
  { value: "business", label: "Business" },
];

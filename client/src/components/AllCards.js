import AppContext from "@/context/AppContext";
import { superfetch } from "@/libs/utils";
import { useContext, useEffect, useState } from "react";
import AllCardsList from "./AllCardsList";
import CardForm from "./CardForm";

const AllCards = () => {
  const { flashcards, fetchCards } = useContext(AppContext);
  const [edit, setEdit] = useState(null);

  useEffect(() => {
    if (edit) {
      const card = flashcards.find((card) => card.id === edit);
      setFormData({
        question: card.question,
        options1: card.options[0]?.text || "",
        options2: card.options[1]?.text || "",
        options3: card.options[2]?.text || "",
        options4: card.options[3]?.text || "",
        correctOption: "",
        heading: card.answer[0].heading,
        paragraph: card.answer[0].paragraph || "",
      });
    }
  }, [edit]);

  const [formData, setFormData] = useState({
    question: "",
    options1: "",
    options2: "",
    options3: "",
    options4: "",
    correctOption: "",
    heading: "",
    paragraph: "",
  });
  const [formError, setFormError] = useState(null);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const validate = (formData) => {
    const errors = {};
    if (!formData.question || formData.question.trim() === "") {
      errors.question = "Question is required";
    }
    if (!formData.heading || formData.heading.trim() === "") {
      errors.heading = "Heading is required";
    }
    if (
      formData.options.length !== 0 &&
      (!formData.correctOption || formData.correctOption.trim() === "")
    ) {
      errors.correctOption = "Correct option is required";
    }
    if (Object.values(errors).length > 0) {
      setFormError(errors);
      return false;
    }
    setFormError(null);
    return true;
  };
  const handleSubmit = async (e) => {
    const newFormData = {};
    newFormData.question = formData.question;
    newFormData.options = [];
    for (let i = 1; i <= 4; i++) {
      if (formData[`options${i}`] && formData[`options${i}`].trim() !== "") {
        newFormData.options.push({
          text: formData[`options${i}`],
          isCorrect: formData.correctOption === `options${i}` ? true : false,
        });
      }
    }
    newFormData.correctOption = formData.correctOption;
    newFormData.heading = formData.heading;
    newFormData.paragraph = formData.paragraph;
    e.preventDefault();
    if (!validate(newFormData)) {
      return;
    }
    try {
      const res = await superfetch(`flashcards/${edit}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newFormData),
      });
      if (res.ok) {
        alert("Flashcard Updated successfully");
        fetchCards();
        setEdit(null);
      } else {
        alert("Failed to add flashcard");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="md:p-2 md:m-2">
      {!edit ? (
        <AllCardsList setEdit={setEdit} />
      ) : (
        <div className="max-w-sm p-3 mx-auto mt-2">
          <CardForm
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            formError={formError}
            setEdit={setEdit}
          />
        </div>
      )}
    </div>
  );
};

export default AllCards;

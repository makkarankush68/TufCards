import AppContext from "@/context/AppContext";
import { superfetch } from "@/libs/utils";
import { useContext, useEffect, useState } from "react";

const AllCards = () => {
  const { flashcards, fetchCards } = useContext(AppContext);
  const [edit, setEdit] = useState(null);

  const handleDelete = async (id) => {
    try {
      const res = await superfetch(`flashcards/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const result = await res.json();
      fetchCards();
      console.log("Flashcard deleted:", result);
    } catch (error) {
      console.error("Error deleting flashcard:", error);
    }
  };

  useEffect(() => {
    if (edit) {
      const card = flashcards.find((card) => card.id === edit);
      console.log("Edit card:", card);
      setFormData({
        question: card.question,
        options1: card.options[0]?.text || "",
        options2: card.options[1]?.text || "",
        options3: card.options[2]?.text || "",
        options4: card.options[3]?.text || "",
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
    heading: "",
    paragraph: "",
  });
  const [formError, setFormError] = useState(null);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const validate = () => {
    const errors = {};
    if (!formData.question || formData.question.trim() === "") {
      errors.question = "Question is required";
    }
    if (!formData.heading || formData.heading.trim() === "") {
      errors.heading = "Heading is required";
    }
    if (Object.values(errors).length > 0) {
      setFormError(errors);
      return false;
    }
    setFormError(null);
    return true;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }
    const newFormData = {};
    newFormData.question = formData.question;
    newFormData.options = [];
    for (let i = 1; i <= 4; i++) {
      if (formData[`options${i}`] && formData[`options${i}`].trim() !== "") {
        newFormData.options.push({ text: formData[`options${i}`] });
      }
    }
    newFormData.heading = formData.heading;
    newFormData.paragraph = formData.paragraph;
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
      } else {
        alert("Failed to add flashcard");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-2 m-2">
      {!edit ? (
        flashcards &&
        flashcards.map((card, idx) => (
          <div key={card.id}>
            <div className="bg-gray-900 max-w-xl mx-auto p-2 m-2 rounded-lg shadow-lg shadow-slate-700">
              <div>
                <h2 className="text-white text-2xl">
                  {idx + 1}
                  {") "}
                  {card.question}
                </h2>
                <p className="text-white">Options : {card.options.length}</p>
                <p className="text-white">{card.heading}</p>
                {card.paragraph && (
                  <p className="text-white">{card.paragraph}</p>
                )}
              </div>
              <div className="flex w-full justify-end">
                <div className="flex items-end justify-end w-fit gap-2">
                  <button
                    onClick={() => setEdit(card.id)}
                    className="m-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(card.id)}
                    className="m-auto bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
          <label className="text-white flex flex-col">
            Question:
            <textarea
              type="text"
              value={formData.question}
              name="question"
              onChange={handleChange}
              className="bg-gray-700 rounded-md"
            />
          </label>
          {formError?.question && (
            <span className="text-red-500">{formError.question}</span>
          )}
          <label className="mt-2 text-white flex flex-col">
            Options (fill as much needed):
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                value={formData.options1}
                name="options1"
                onChange={handleChange}
                className="bg-gray-700 rounded-md"
              />
              <input
                type="text"
                value={formData.options2}
                name="options2"
                onChange={handleChange}
                className="bg-gray-700 rounded-md"
              />
              <input
                type="text"
                value={formData.options3}
                name="options3"
                onChange={handleChange}
                className="bg-gray-700 rounded-md"
              />
              <input
                type="text"
                value={formData.options4}
                name="options4"
                onChange={handleChange}
                className="bg-gray-700 rounded-md"
              />
            </div>
          </label>
          <br />
          <label className="text-white flex flex-col">
            Answer Heading:
            <textarea
              type="text"
              value={formData.heading}
              name="heading"
              onChange={handleChange}
              className="bg-gray-700 rounded-md"
            />
          </label>
          {formError?.heading && (
            <span className="text-red-500">{formError.heading}</span>
          )}
          <label className="text-white flex flex-col">
            Paragraph:
            <textarea
              type="text"
              value={formData.paragraph}
              name="paragraph"
              onChange={handleChange}
              className="bg-gray-700 rounded-md"
            />
          </label>
          <br />
          <div className="flex justify-around">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Edit Card
            </button>
            <button
              onClick={() => setEdit(null)}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AllCards;

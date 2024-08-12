import AdminContext from "@/context/AdminContext";
import { useContext } from "react";

const AddCard = () => {
  const { formData, handleChange, handleSubmit, formError } =
    useContext(AdminContext);

  return (
    <div className="bg-gray-900 max-w-sm mx-auto p-2 m-2 rounded-lg shadow-lg shadow-slate-700">
      <h2 className="text-white text-2xl text-center">Add Flashcard</h2>
      <form onSubmit={handleSubmit}>
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
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Card
        </button>
      </form>
    </div>
  );
};

export default AddCard;

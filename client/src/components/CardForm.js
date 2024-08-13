const CardForm = ({
  formData,
  handleChange,
  handleSubmit,
  formError,
  setEdit,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <label className="text-white flex flex-col">
        Question* :
        <textarea
          type="text"
          value={formData.question}
          name="question"
          onChange={handleChange}
          className={
            "bg-gray-700 rounded-md" +
            (formError?.question && " border border-red-500")
          }
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
      <label className="text-white flex flex-col">
        Correct Answer* :
        <select
          value={formData.correctOption}
          name="correctOption"
          onChange={handleChange}
          className={
            "bg-gray-700 rounded-md" +
            (formError?.correctOption && " border border-red-500")
          }
        >
          <option value="">Select correct answer</option>
          {formData.options1 && (
            <option value="options1">{formData.options1}</option>
          )}
          {formData.options2 && (
            <option value="options2">{formData.options2}</option>
          )}
          {formData.options3 && (
            <option value="options3">{formData.options3}</option>
          )}
          {formData.options4 && (
            <option value="options4">{formData.options4}</option>
          )}
        </select>
      </label>
      {formError?.correctOption && (
        <span className="text-red-500">{formError.correctOption}</span>
      )}
      <br />
      <label className="text-white flex flex-col">
        Answer Heading* :
        <textarea
          type="text"
          value={formData.heading}
          name="heading"
          onChange={handleChange}
          className={
            "bg-gray-700 rounded-md" +
            (formError?.heading && " border border-red-500")
          }
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
          maxLength={100}
          onChange={handleChange}
          className="bg-gray-700 rounded-md"
        />
      </label>
      <br />
      {!setEdit ? (
        <button
          type="submit"
          className="bg-blue-500 mx-auto w-fit hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Card
        </button>
      ) : (
        <div className="w-full flex flex-wrap justify-around gap-y-2">
          <button
            type="submit"
            className="bg-blue-500 mx-auto w-fit hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Update Card
          </button>
          <button
            onClick={() => setEdit(false)}
            className="bg-red-500 mx-auto w-fit hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Cancel
          </button>
        </div>
      )}
    </form>
  );
};

export default CardForm;

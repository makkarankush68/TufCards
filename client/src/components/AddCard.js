import AdminContext from "@/context/AdminContext";
import { useContext } from "react";
import CardForm from "./CardForm";

const AddCard = () => {
  const { formData, handleChange, handleSubmit, formError } =
    useContext(AdminContext);

  return (
    <div className="bg-gray-900 max-w-sm mx-auto md:p-4 max-md:p-2 md:m-4 rounded-lg shadow-lg shadow-slate-700">
      <h2 className="text-white text-2xl text-center">Add Flashcard</h2>
      <CardForm
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        formError={formError}
      />
    </div>
  );
};

export default AddCard;

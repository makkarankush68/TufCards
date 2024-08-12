import AppContext from "@/context/AppContext";
import { superfetch } from "@/libs/utils";
import { useContext } from "react";

const AllCardsList = ({ setEdit }) => {
  const { flashcards, fetchCards } = useContext(AppContext);

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
      console.log("Flashcard deleted successfully");
    } catch (error) {
      console.error("Error deleting flashcard:", error);
    }
  };
  if (!flashcards) return <h1 className="text-center">//Loading Cards//</h1>;
  return (
    flashcards &&
    flashcards.map((card, idx) => (
      <div key={card.id}>
        <div className="bg-gray-900 max-w-xl mx-auto p-3 md:m-2 rounded-lg shadow-lg shadow-slate-700 ">
          <div>
            <h2 className="text-white sm:text-2xl text-xl">
              {idx + 1}
              {") "}
              {card.question}
            </h2>
            <p className="text-white">Options : {card.options.length}</p>
            <p className="text-white">{card.heading}</p>
            {card.paragraph && <p className="text-white">{card.paragraph}</p>}
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
  );
};

export default AllCardsList;

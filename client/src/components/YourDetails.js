import AdminContext from "@/context/AdminContext";
import { useContext } from "react";

const YourDetails = () => {
  const { admin, logoutAdmin } = useContext(AdminContext);
  return (
    <div className="w-fit mx-auto p-4">
      <h1 className="text-xl font-bold">Your Details</h1>
      <p className="text-gray-200">ID: {admin?.id}</p>
      <p className="text-gray-200">Username: {admin?.username}</p>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 rounded"
        onClick={logoutAdmin}
      >
        Logout
      </button>
    </div>
  );
};

export default YourDetails;

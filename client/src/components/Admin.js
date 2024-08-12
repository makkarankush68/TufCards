import AdminContext from "@/context/AdminContext";
import TabBtn from "./TabBtn";
import { useContext } from "react";
import AllCards from "./AllCards";
import AddCard from "./AddCard";
import YourDetails from "./YourDetails";

const Admin = () => {
  const { activeTab } = useContext(AdminContext);

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl text-center">Welcome, Tuf Admin</h1>
      <div>
        <div className="flex w-screen justify-around">
          <TabBtn title="All Cards" index={0} />
          <TabBtn title="Add New Card" index={1} />
          <TabBtn title="Your details" index={2} />
        </div>
        <div className="w-fit m-auto">
          {activeTab === 0 && <AllCards />}
          {activeTab === 1 && <AddCard />}
          {activeTab === 2 && <YourDetails />}
        </div>
      </div>
    </div>
  );
};

export default Admin;

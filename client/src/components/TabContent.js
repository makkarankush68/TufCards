import AdminContext from "@/context/AdminContext";
import AddCard from "./AddCard";
import AllCards from "./AllCards";
import YourDetails from "./YourDetails";
import { useContext } from "react";

const TabContent = () => {
  const { activeTab } = useContext(AdminContext);
  return (
    <div>
      {activeTab === 0 && <AllCards />}
      {activeTab === 1 && <AddCard />}
      {activeTab === 2 && <YourDetails />}
    </div>
  );
};

export default TabContent;

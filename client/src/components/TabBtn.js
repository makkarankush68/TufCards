"use client";
import AdminContext, { AdminProvider } from "@/context/AdminContext";
import { useContext } from "react";

const TabBtn = ({ title, index }) => {
  const { activeTab, setActiveTab } = useContext(AdminContext);
  return (
    <button
      onClick={() => setActiveTab(index)}
      className={`text-xl border-b-2 ${
        activeTab === index ? "border-blue-400" : "border-transparent"
      } hover:bg-slate-600 p-2 m-2 rounded-sm px-8`}
    >
      {title}
    </button>
  );
};
export default TabBtn;

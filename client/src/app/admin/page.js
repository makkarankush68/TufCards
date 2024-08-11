"use client";
import Admin from "@/components/Admin";
import Login from "@/components/Login";
import AdminContext from "@/context/AdminContext";
import { useContext } from "react";

const page = () => {
  const { admin } = useContext(AdminContext);
  return admin ? <Admin /> : <Login />;
};

export default page;

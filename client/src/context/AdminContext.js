"use client";
import { createContext, useState } from "react";

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [admin, setAdmin] = useState(
    localStorage.getItem("admin")
      ? JSON.parse(localStorage.getItem("admin"))
      : null
  );
  const [activeTab, setActiveTab] = useState(0);

  const loginAdmin = async (formData) => {
    console.log(formData);
    const res = await fetch("http://localhost:3000/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    if (res.ok) {
      const json = await res.json();
      const { token, user } = json;
      localStorage.setItem("token", token);
      localStorage.setItem("admin", JSON.stringify(user));
      setAdmin(user);
      alert("Login successful");
    } else {
      alert("Login failed");
    }
  };

  const logoutAdmin = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setAdmin(null);
  };

  const contextData = {
    activeTab,
    setActiveTab,
    loginAdmin,
    logoutAdmin,
    admin,
  };
  return (
    <AdminContext.Provider value={contextData}>
      {children}
    </AdminContext.Provider>
  );
};

export default AdminContext;

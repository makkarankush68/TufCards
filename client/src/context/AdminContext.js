"use client";
import { superfetch } from "@/libs/utils";
import { createContext, useContext, useEffect, useState } from "react";
import AppContext from "./AppContext";

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [token, setToken] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const { fetchCards } = useContext(AppContext);

  useEffect(() => {
    setAdmin(
      localStorage.getItem("admin")
        ? JSON.parse(localStorage.getItem("admin"))
        : null
    );
    setToken(
      localStorage.getItem("token") ? localStorage.getItem("token") : null
    );
  }, []);

  const loginAdmin = async (formData) => {
    const res = await superfetch("admin/login", {
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
      setToken(token);
      alert("Login successful");
    } else {
      alert("Login failed");
    }
  };

  const logoutAdmin = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("admin");
    setAdmin(null);
    setToken(null);
  };

  // admin add card form data
  const [formData, setFormData] = useState({
    question: "",
    options1: "",
    options2: "",
    options3: "",
    options4: "",
    heading: "",
    paragraph: "",
  });
  const [formError, setFormError] = useState(null);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const validate = () => {
    const errors = {};
    if (!formData.question || formData.question.trim() === "") {
      errors.question = "Question is required";
    }
    if (!formData.heading || formData.heading.trim() === "") {
      errors.heading = "Heading is required";
    }
    if (Object.values(errors).length > 0) {
      setFormError(errors);
      return false;
    }
    setFormError(null);
    return true;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }
    const newFormData = {};
    newFormData.question = formData.question;
    newFormData.options = [];
    for (let i = 1; i <= 4; i++) {
      if (formData[`options${i}`] && formData[`options${i}`].trim() !== "") {
        newFormData.options.push({ text: formData[`options${i}`] });
      }
    }
    newFormData.heading = formData.heading;
    newFormData.paragraph = formData.paragraph;
    try {
      const res = await superfetch("flashcards", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newFormData),
      });
      if (res.ok) {
        alert("Flashcard added successfully");
        fetchCards();
      } else {
        alert("Failed to add flashcard");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const contextData = {
    activeTab,
    setActiveTab,
    loginAdmin,
    logoutAdmin,
    admin,
    token,
    formData,
    setFormData,
    handleChange,
    handleSubmit,
    formError
  };
  return (
    <AdminContext.Provider value={contextData}>
      {children}
    </AdminContext.Provider>
  );
};

export default AdminContext;

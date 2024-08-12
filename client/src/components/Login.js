import AdminContext from "@/context/AdminContext";
import { useContext, useState } from "react";

const Login = () => {
  const { loginAdmin } = useContext(AdminContext);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await loginAdmin(formData);
  };

  return (
    <div className="pt-10 flex items-center justify-center">
      <div className="p-8 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-gray-300 font-bold mb-2"
            >
              Username:
            </label>
            <input
              type="text"
              value={formData.username}
              placeholder="Enter your username"
              name="username"
              onChange={handleChange}
              className="border border-gray-300 rounded px-3 py-2 w-full bg-transparent"
            />
          </div>
          <div className="relative mb-4">
            <label
              htmlFor="password"
              className="block text-gray-300 font-bold mb-2"
            >
              Password:
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              className="border border-gray-300 rounded px-3 py-2 w-full bg-transparent"
            />
            <label
              htmlFor="showPassword"
              className="text-gray-300 absolute right-2 top-10"
            >
              {showPassword ? "Hide" : "Show"}
              <input
                hidden
                id="showPassword"
                type="checkbox"
                onChange={() => setShowPassword(!showPassword)}
                className="mt-2"
              />
            </label>
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

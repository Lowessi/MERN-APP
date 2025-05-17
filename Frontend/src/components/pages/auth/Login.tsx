import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../../context/AuthContext";
import { getProfile } from "../../../api/Profile";

const Login = () => {
  const navigate = useNavigate();
  const { setUser, setToken } = useContext(AuthContext) || {};

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const fetchProfile = async (data: any) => {
    if (!setUser || !setToken) {
      console.error("AuthContext is not available.");
      return;
    }

    try {
      const profile = await getProfile(data.user.id, data.token);
      console.log("Fetched profile:", profile);
      // navigate("/home");
    } catch (error: any) {
      console.error("Error fetching profile in Home.tsx:", error.message);
      // Show UI error, redirect, etc.
    }

    navigate("/edit-profile"); // Redirect to edit profile page
    // console.log("FUCK");
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("submit");

    if (!setUser || !setToken) {
      console.error("AuthContext is not available.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/userauth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Email: email,
          Password: password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Login failed");
        return;
      }

      // Save to localStorage and context
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);

      // setUser(data.user);
      // setToken(data.token);

      fetchProfile(data);

      toast.success("Login successful!");
      // navigate("/home");
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="bg-[#f3f4f6] min-h-screen flex justify-center items-center">
      <form
        onSubmit={onSubmit}
        className="shadow-md flex flex-col gap-5 p-8 rounded-lg bg-white w-full max-w-md"
      >
        <h1 className="text-3xl font-semibold text-green-600 text-center">
          Sign In
        </h1>

        <label htmlFor="email" className="flex flex-col w-full">
          Email
          <input
            id="email"
            name="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border h-12 p-3 rounded-lg mt-2 border-gray-300 focus:ring-2 focus:ring-green-500"
          />
        </label>

        <label htmlFor="password" className="flex flex-col w-full">
          Password
          <input
            id="password"
            name="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border h-12 p-3 rounded-lg mt-2 border-gray-300 focus:ring-2 focus:ring-green-500"
          />
        </label>

        <div className="text-sm text-center mt-2 text-gray-600">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-green-600 cursor-pointer hover:underline"
          >
            Sign Up
          </span>
        </div>

        <button
          type="submit"
          className="w-full p-3 rounded-lg bg-orange-600 text-white hover:bg-green-700 transition"
        >
          Sign In
        </button>
      </form>
    </div>
  );
};

export default Login;

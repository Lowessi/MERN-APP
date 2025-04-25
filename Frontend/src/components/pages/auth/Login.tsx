import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/userauth/signin", {
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

      if (res.ok) {
        // Save to localStorage
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.token);

        // Update context
        dispatch({
          type: "LOGIN",
          payload: {
            user: data.user,
            token: data.token,
          },
        });

        toast.success("Login successful!");

        if (data.user && data.user.profileCompleted) {
          navigate("/home");
        } else {
          navigate("/edit-profile");
        }
      } else {
        toast.error(data.error || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Something went wrong. Try again.");
    }
  };

  return (
    <div className="bg-[#f3f4f6] min-h-screen">
      <div className="flex justify-center items-center mt-10">
        <form
          onSubmit={onSubmit}
          className="shadow-md flex flex-col gap-5 items-center p-8 rounded-lg bg-white w-full max-w-md"
        >
          <h1 className="text-3xl font-semibold text-green-600">Sign In</h1>

          <label htmlFor="email" className="flex flex-col w-full">
            Email
            <input
              id="email"
              className="border h-12 p-3 rounded-lg w-full mt-2 border-gray-300 focus:ring-2 focus:ring-green-500"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>

          <label htmlFor="password" className="flex flex-col w-full">
            Password
            <input
              id="password"
              className="border h-12 p-3 rounded-lg w-full mt-2 border-gray-300 focus:ring-2 focus:ring-green-500"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>

          <p className="text-center mt-4 text-sm text-gray-600">
            Don't have an account?{" "}
            <span
              onClick={() => navigate("/register")}
              className="text-green-600 cursor-pointer hover:underline"
            >
              Sign Up
            </span>
          </p>

          <div className="flex gap-6 mt-4 w-full justify-center">
            <button
              type="submit"
              className="w-full md:w-md p-3 rounded-lg bg-green-600 text-white shadow-md hover:bg-green-700 transition"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

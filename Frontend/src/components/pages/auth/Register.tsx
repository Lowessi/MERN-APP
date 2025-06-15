import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const RENDER_URL = import.meta.env.RENDER_URL || "http://localhost:5000";

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const passwordStrengthRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&_])[A-Za-z\d@$!%*?#&_]{8,}$/;

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    if (!passwordStrengthRegex.test(password)) {
      toast.error(
        "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character."
      );
      return;
    }

    try {
      const res = await fetch(RENDER_URL + "/api/userauth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Email: email, Password: password }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Registered successfully!");
        navigate("/login");
      } else {
        if (data.error === "Email already in use") {
          toast.error("This email is already registered.");
        } else {
          toast.error(data.error || "Registration failed");
        }
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div
      className="min-h-screen relative bg-cover bg-center"
      style={{ backgroundImage: "url('/your-register-bg.jpg')" }}
    >
      <form
        onSubmit={handleSubmit}
        className="absolute top-8 right-8 shadow-md flex flex-col gap-5 items-center p-8 rounded-lg bg-white bg-opacity-90 w-full max-w-md"
      >
        <h1 className="text-3xl font-semibold text-green-600">Sign Up</h1>

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
          <small className="text-sm text-gray-500 mt-1">
            Must be at least 8 characters and include uppercase, lowercase,
            number, and special character.
          </small>
        </label>

        <label htmlFor="confirmPassword" className="flex flex-col w-full">
          Confirm Password
          <input
            id="confirmPassword"
            className="border h-12 p-3 rounded-lg w-full mt-2 border-gray-300 focus:ring-2 focus:ring-green-500"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>

        <p className="text-center mt-4 text-sm text-gray-600 w-full">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-green-600 cursor-pointer hover:underline"
          >
            Sign in
          </span>
        </p>

        <div className="flex gap-6 mt-4 w-full justify-center">
          <button
            type="submit"
            className="w-full md:w-md p-3 rounded-lg bg-green-600 text-white shadow-md hover:bg-green-700 transition"
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;

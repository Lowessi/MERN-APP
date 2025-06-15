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
    <div className="min-h-screen w-full bg-[#1E222B] flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="shadow-lg flex flex-col gap-5 items-center p-8 rounded-lg w-full max-w-md"
        style={{ backgroundColor: "#DED1B6" }}
      >
        <h1 className="text-3xl font-bold text-[#343941]">Sign Up</h1>

        <label htmlFor="email" className="flex flex-col w-full text-[#1E222B]">
          Email
          <input
            id="email"
            className="border h-12 p-3 rounded-lg w-full mt-2 border-[#343941] focus:ring-2 focus:ring-[#DED1B6]"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

        <label htmlFor="password" className="flex flex-col w-full text-[#1E222B]">
          Password
          <input
            id="password"
            className="border h-12 p-3 rounded-lg w-full mt-2 border-[#343941] focus:ring-2 focus:ring-[#DED1B6]"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <small className="text-sm text-[#948978] mt-1">
            Must be at least 8 characters and include uppercase, lowercase,
            number, and special character.
          </small>
        </label>

        <label htmlFor="confirmPassword" className="flex flex-col w-full text-[#1E222B]">
          Confirm Password
          <input
            id="confirmPassword"
            className="border h-12 p-3 rounded-lg w-full mt-2 border-[#343941] focus:ring-2 focus:ring-[#DED1B6]"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>

        <p className="text-center mt-4 text-sm text-[#948978] w-full">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-[#343941] cursor-pointer hover:underline"
          >
            Sign in
          </span>
        </p>

        <div className="flex gap-6 mt-4 w-full justify-center">
          <button
            type="submit"
            className="w-full md:w-md p-3 rounded-lg bg-[#1E222B] text-white shadow-md hover:bg-[#343941] transition"
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;

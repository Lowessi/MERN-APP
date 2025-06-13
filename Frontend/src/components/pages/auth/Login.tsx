import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../../context/AuthContext";
import { getProfile } from "../../../api/Profile";
import freelanceBg from "../../../Image/Freelance.jpg";

const RENDER_URL = import.meta.env.BASE_URL || "http://localhost:5000";

const Login = () => {
    const navigate = useNavigate();
    const auth = useContext(AuthContext);
    const setUser = auth?.setUser;
    const setToken = auth?.setToken;

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const fetchProfile = async (data: any) => {
        try {
            const profile = await getProfile(data.user.id, data.token);
            if (profile) {
                navigate("/home");
            } else {
                navigate("/edit-profile");
            }
        } catch (error: any) {
            console.error("Error fetching profile:", error.message);
            navigate("/edit-profile");
        }
    };

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!setUser || !setToken) {
            console.error("AuthContext is not available.");
            return;
        }

        try {
            const res = await fetch(RENDER_URL + "/api/userauth/signin", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ Email: email, Password: password }),
            });

            const data = await res.json();

            if (!res.ok) {
                toast.error(data.error || "Login failed");
                return;
            }

            localStorage.setItem("user", JSON.stringify(data.user));
            localStorage.setItem("token", data.token);

            setUser(data.user);
            setToken(data.token);

            await fetchProfile(data);
            toast.success("Login successful!");
        } catch (error) {
            console.error("Login error:", error);
            toast.error("Something went wrong. Please try again.");
        }
    };

    return (
        <div className="flex min-h-screen">
            {/* LEFT: Image */}
            <div className="w-1/2 hidden md:block">
                <img
                    src={freelanceBg}
                    alt="Freelance"
                    className="object-cover w-full h-full scale-75"
                />
            </div>

            {/* RIGHT: Login Form */}
            <div className="w-full md:w-1/2 flex justify-center items-center bg-gray-100 p-8">
                <form
                    onSubmit={onSubmit}
                    className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg"
                >
                    <h1 className="text-3xl font-semibold text-green-600 text-center mb-6">
                        Sign In
                    </h1>

                    <label htmlFor="email" className="block mb-4">
                        <span className="block mb-1">Email</span>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-500"
                        />
                    </label>

                    <label htmlFor="password" className="block mb-6">
                        <span className="block mb-1">Password</span>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-500"
                        />
                    </label>

                    <div className="text-sm text-center mb-4 text-gray-600">
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
                        className="w-full p-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                    >
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;

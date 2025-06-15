import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../../context/AuthContext";
import { getProfile } from "../../../api/Profile";

const RENDER_URL = import.meta.env.VITE_RENDER_URL || "http://localhost:5000";

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
        <div className="min-h-screen w-full bg-[#1E222B] flex items-center justify-center px-4">
            <form
                onSubmit={onSubmit}
                className="shadow-lg flex flex-col gap-5 items-center p-8 rounded-lg w-full max-w-md"
                style={{ backgroundColor: "#DED1B6" }}
            >
                <h1 className="text-3xl font-bold text-[#343941]">Sign In</h1>

                <label
                    htmlFor="email"
                    className="flex flex-col w-full text-[#1E222B]"
                >
                    Email
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="border h-12 p-3 rounded-lg w-full mt-2 border-[#343941] focus:ring-2 focus:ring-[#DED1B6]"
                    />
                </label>

                <label
                    htmlFor="password"
                    className="flex flex-col w-full text-[#1E222B]"
                >
                    Password
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="border h-12 p-3 rounded-lg w-full mt-2 border-[#343941] focus:ring-2 focus:ring-[#DED1B6]"
                    />
                </label>

                <p className="text-center mt-2 text-sm text-[#948978] w-full">
                    Don't have an account?{" "}
                    <span
                        onClick={() => navigate("/register")}
                        className="text-[#343941] cursor-pointer hover:underline"
                    >
                        Sign Up
                    </span>
                </p>

                <div className="flex gap-6 mt-4 w-full justify-center">
                    <button
                        type="submit"
                        className="w-full md:w-md p-3 rounded-lg bg-[#1E222B] text-white shadow-md hover:bg-[#343941] transition"
                    >
                        Sign In
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Login;

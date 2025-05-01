import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthContext";

const EditProfile = () => {
  const navigate = useNavigate();
  const { user, token } = useContext(AuthContext);

  const [name, setName] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  // Fetch existing profile data
  useEffect(() => {
    const fetchProfile = async () => {
      if (!token) {
        toast.error("No token found. Please log in.");
        return;
      }

      try {
        console.log("Fetching profile with token:", token);
        const res = await fetch(
          "http://localhost:5000/api/profile/getprofile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) {
          const error = await res.json();
          console.error("Error response from backend:", error);
          if (error?.error === "Invalid or expired token.") {
            toast.error("Session expired. Please log in again.");
            navigate("/login"); // Redirect to login if token is invalid or expired
            return;
          }
          throw new Error(error?.error || "Failed to fetch profile");
        }

        const data = await res.json();
        setName(data.name || "");
        setAddress(data.address || "");
      } catch (err) {
        console.error("Error fetching profile:", err);
        toast.error("Failed to fetch profile.");
      }
    };

    fetchProfile();
  }, [token, navigate]); // Add `navigate` to dependency array to avoid warning

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name || !address) {
      toast.error("Please provide both name and address.");
      return;
    }

    if (!token) {
      toast.error("You must be logged in to edit your profile.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/profile/editprofile",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ name, address }),
        }
      );

      if (response.ok) {
        toast.success("Profile updated successfully!");
        navigate("/home");
      } else {
        const error = await response.json();
        console.error("Error response from backend:", error);
        if (error?.error === "Invalid or expired token") {
          toast.error("Session expired. Please log in again.");
          navigate("/login"); // Redirect to login if token is invalid or expired
        } else {
          toast.error(error?.error || "Failed to update profile.");
        }
      }
    } catch (error) {
      console.error("Update error:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#f3f4f6] min-h-screen">
      <div className="flex justify-center items-center mt-10">
        <form
          onSubmit={handleSubmit}
          className="shadow-md flex flex-col gap-5 items-center p-8 rounded-lg bg-white w-full max-w-md"
        >
          <h1 className="text-3xl font-semibold text-green-600">
            Edit Profile
          </h1>

          <label htmlFor="name" className="flex flex-col w-full">
            Name
            <input
              id="name"
              className="border h-12 p-3 rounded-lg w-full mt-2 border-gray-300 focus:ring-2 focus:ring-green-500"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>

          <label htmlFor="address" className="flex flex-col w-full">
            Address
            <input
              id="address"
              className="border h-12 p-3 rounded-lg w-full mt-2 border-gray-300 focus:ring-2 focus:ring-green-500"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </label>

          <div className="flex gap-6 mt-4 w-full justify-center">
            <button
              type="submit"
              className="w-full md:w-md p-3 rounded-lg bg-green-600 text-white shadow-md hover:bg-green-700 transition"
              disabled={loading}
            >
              {loading ? "Updating..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;

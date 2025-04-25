import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthContext"; // Assuming you have this context for user data

const EditProfile = () => {
  const navigate = useNavigate();
  const { user, token } = useContext(AuthContext); // Assuming user and token are available in the context

  const [name, setName] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  // Fetch existing profile data if available
  useEffect(() => {
    if (user) {
      setName(user.name || ""); // Fills existing data if available
      setAddress(user.address || "");
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Ensure the fields are filled out
    if (!name || !address) {
      toast.error("Please provide both name and address.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/editprofile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Sending token for authentication
        },
        body: JSON.stringify({ name, address }), // Send the updated name and address
      });

      if (response.ok) {
        const data = await response.json(); // Parse the response as JSON
        toast.success("Profile updated successfully!");
        navigate("/home"); // Navigate to home on successful update
      } else {
        const errorMessage = await response.text(); // Get error text
        toast.error(errorMessage || "Failed to update profile.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile. Please try again.");
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

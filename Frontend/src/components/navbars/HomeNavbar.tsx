import { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const HomeNavbar = () => {
  const [initial, setInitial] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const auth = useContext(AuthContext);

  const signOut = auth?.signOut;

  // Load initial from user email
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user") || "{}");
    const email = userData?.email || "";
    const firstLetter = email.charAt(0).toUpperCase();
    setInitial(firstLetter);
  }, []);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !(dropdownRef.current as any).contains(event.target)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Logout function

  const handleSignOut = () => {
    if (signOut) signOut();
  };

  return (
    <div className="sticky top-0 z-50">
      <nav className="bg-white shadow-sm px-4 py-2 flex items-center justify-between ">
        {/* Left: Logo */}
        <div className="flex pl-20 items-center gap-4">
          <div className="text-green-700 text-2xl font-bold">Pablo Jobb</div>
        </div>

        {/* Center: Navigation */}
        <div className="hidden sm:flex items-center gap-8 text-sm text-gray-700">
          <Link to="/home" className="hover:text-black">
            Home
          </Link>
          <Link to="/freelancer" className="hover:text-black">
            Freelancer
          </Link>
          <span className="hover:text-black cursor-pointer">Notifications</span>
        </div>

        {/* Right: Avatar with Dropdown */}

        <div className="relative pr-20" ref={dropdownRef}>
          <div
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="w-8 h-8 bg-green-700 text-white rounded-full flex items-center justify-center font-bold cursor-pointer"
          >
            {initial || "?"}
          </div>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md py-2 z-50">
              <Link
                to="/profile-preview"
                className="block px-4 py-2 hover:bg-gray-100 text-sm text-gray-700"
              >
                View Profile
              </Link>
              <Link
                to="/edit-profile"
                className="block px-4 py-2 hover:bg-gray-100 text-sm text-gray-700"
              >
                Edit Profile
              </Link>
              <button
                onClick={handleSignOut}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-red-600"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default HomeNavbar;

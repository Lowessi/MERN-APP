import { useState } from "react";
import { Link } from "react-router-dom";

const HomeNavbar = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Search:", searchTerm);
  };

  return (
    <div className="sticky top-0 z-50">
      <nav className="bg-white shadow-sm px-4 py-2 flex items-center justify-between ">
        {/* Left: Logo & Search */}
        <div className="flex pl-20 items-center gap-4">
          {/* Logo */}
          <div className="text-green-700 text-2xl font-bold"> Pablo Jobb</div>

          {/* Search Bar */}
        </div>

        {/* Center: Navigation */}
        <div className="hidden sm:flex items-center gap-8 text-sm text-gray-700">
          <div className="flex flex-col items-center hover:text-black cursor-pointer">
            <Link className="p-2 rounded-[5px] hover:text-black" to="/home">
              Home
            </Link>
          </div>
          <div className="flex flex-col items-center hover:text-black cursor-pointer">
            <Link
              className="p-2 rounded-[5px] hover:text-black"
              to="/freelancer"
            >
              Freelancer
            </Link>
          </div>

          <div className="flex flex-col items-center hover:text-black cursor-pointer">
            <span>Messaging</span>
          </div>
          <div className="flex flex-col items-center hover:text-black cursor-pointer">
            <span>Notifications</span>
          </div>
        </div>

        {/* Right: User & Business */}
        <div className="flex items-center gap-4 pr-20 text-sm">
          <div className="w-8 h-8 bg-green-700 text-white rounded-full flex items-center justify-center font-bold cursor-pointer">
            PJ
          </div>
        </div>
      </nav>
    </div>
  );
};

export default HomeNavbar;

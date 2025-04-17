import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="py-3 border-b border-b-[#597445] bg-white shadow-md sticky top-0 z-50">
      <nav className="flex justify-between items-center max-w-7xl mx-auto">
        {/* Logo */}
        <div className="text-2xl font-semibold text-green-600">Pablo Job</div>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-10 items-center">
          <a
            href="#"
            className="text-[#597445] hover:text-[#4a6735] hover:underline"
          >
            Home
          </a>
          <a
            href="#"
            className="text-[#597445] hover:text-[#4a6735] hover:underline"
          >
            Jobs
          </a>
          <a
            href="#"
            className="text-[#597445] hover:text-[#4a6735] hover:underline"
          >
            Post a Job
          </a>
          <a
            href="#"
            className="text-[#597445] hover:text-[#4a6735] hover:underline"
          >
            Contact
          </a>
          <a
            href="#"
            className="text-[#597445] hover:text-[#4a6735] hover:underline"
          >
            About us
          </a>

          <section className="flex gap-5 pl-5">
            <button
              onClick={() => navigate("/register")}
              className="border border-[#597445] p-2 rounded-xl bg-green-600 text-white hover:bg-[#4a6735] transition"
            >
              Join now
            </button>
            <button
              onClick={() => navigate("/login")}
              className="border border-[#597445] p-2 rounded-xl text-[#597445] hover:bg-[#f0f8e0] transition"
            >
              Signin
            </button>
          </section>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-2xl text-[#597445]"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden mt-4 px-4 space-y-3">
          <a
            href="#"
            className="block text-[#597445] hover:text-[#4a6735] hover:underline"
          >
            Home
          </a>
          <a
            href="#"
            className="block text-[#597445] hover:text-[#4a6735] hover:underline"
          >
            Jobs
          </a>
          <a
            href="#"
            className="block text-[#597445] hover:text-[#4a6735] hover:underline"
          >
            Post a Job
          </a>
          <a
            href="#"
            className="block text-[#597445] hover:text-[#4a6735] hover:underline"
          >
            Contacts
          </a>
          <a
            href="#"
            className="block text-[#597445] hover:text-[#4a6735] hover:underline"
          >
            About us
          </a>

          <div className="pt-3 space-y-2">
            <button
              onClick={() => navigate("/register")}
              className="w-full border border-[#597445] p-2 rounded-xl bg-[#597445] text-white hover:bg-[#4a6735] transition"
            >
              Join now
            </button>
            <button
              onClick={() => navigate("/login")}
              className="w-full border border-[#597445] p-2 rounded-xl text-[#597445] hover:bg-[#f0f8e0] transition"
            >
              Signin
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;

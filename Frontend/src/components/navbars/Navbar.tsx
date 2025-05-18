import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="py-2 border-b border-b-[#597445] bg-white shadow-md sticky top-0 z-50">
      <nav className="flex justify-between items-center max-w-7xl mx-auto">
        {/* Logo */}
        <div className="text-2xl font-semibold text-green-700">
          <Link to="/">Pablo Job</Link>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-10 font-semibold items-center">
          <Link
            to="/"
            className="text-[#597445]  hover:text-black hover:underline"
          >
            Home
          </Link>
          <Link
            to="/login"
            className="text-[#597445]  hover:text-black hover:underline"
          >
            Jobs
          </Link>
          <Link
            to="/login"
            className="text-[#597445]  hover:text-black hover:underline"
          >
            Post a Job
          </Link>
          <Link
            to="/contact"
            className="text-[#597445] hover:text-black hover:underline"
          >
            Contact
          </Link>
          <Link
            to="/about"
            className="text-[#597445]  hover:text-black hover:underline"
          >
            About us
          </Link>

          <section className="flex gap-5 pl-5">
            <button
              onClick={() => navigate("/register")}
              className="border border-[#597445] p-2 rounded-xl bg-green-700 text-white hover:bg-[#4a6735] transition"
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
          <Link
            to="/"
            onClick={closeMenu}
            className="block text-[#597445] hover:text-black hover:underline"
          >
            Home
          </Link>
          <Link
            to="/login"
            onClick={closeMenu}
            className="block text-[#597445] hover:text-black hover:underline"
          >
            Jobs
          </Link>
          <Link
            to="/login"
            onClick={closeMenu}
            className="block text-[#597445] hover:text-black hover:underline"
          >
            Post a Job
          </Link>
          <Link
            to="/contact"
            onClick={closeMenu}
            className="block text-[#597445] hover:text-black hover:underline"
          >
            Contact
          </Link>
          <Link
            to="/about"
            onClick={closeMenu}
            className="block text-[#597445] hover:text-black hover:underline"
          >
            About us
          </Link>

          <div className="pt-3 space-y-2">
            <button
              onClick={() => {
                closeMenu();
                navigate("/register");
              }}
              className="w-full border border-[#597445] p-2 rounded-xl bg-[#597445] text-white hover:bg-[#4a6735] transition"
            >
              Join now
            </button>
            <button
              onClick={() => {
                closeMenu();
                navigate("/login");
              }}
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

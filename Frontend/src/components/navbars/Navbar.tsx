import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="py-2 border-b border-b-[#343941] bg-[#1E222B] shadow-md sticky top-0 z-50">
      <nav className="flex justify-between items-center max-w-7xl mx-auto px-4">
        {/* Logo */}
        <div className="text-2xl font-semibold text-[#DED1B6]">
          <Link to="/">Talent</Link>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-10 font-semibold items-center">
          <Link
            to="/"
            className="text-[#DED1B6] hover:text-[#948978] hover:underline"
          >
            Home
          </Link>
          <Link
            to="/login"
            className="text-[#DED1B6] hover:text-[#948978] hover:underline"
          >
            Jobs
          </Link>
          <Link
            to="/login"
            className="text-[#DED1B6] hover:text-[#948978] hover:underline"
          >
            Post a Job
          </Link>
          <Link
            to="/contact"
            className="text-[#DED1B6] hover:text-[#948978] hover:underline"
          >
            Contact
          </Link>
          <Link
            to="/about"
            className="text-[#DED1B6] hover:text-[#948978] hover:underline"
          >
            About us
          </Link>

          <section className="flex gap-5 pl-5">
            <button
              onClick={() => navigate("/register")}
              className="border border-[#DED1B6] px-4 py-2 rounded-xl bg-[#DED1B6] text-[#1E222B] font-medium hover:bg-[#948978] transition"
            >
              Join now
            </button>
            <button
              onClick={() => navigate("/login")}
              className="border border-[#DED1B6] px-4 py-2 rounded-xl text-[#DED1B6] font-medium hover:bg-[#343941] transition"
            >
              Signin
            </button>
          </section>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-2xl text-[#DED1B6]"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden mt-4 px-4 space-y-3 text-[#DED1B6]">
          <Link
            to="/"
            onClick={closeMenu}
            className="block hover:text-[#948978] hover:underline"
          >
            Home
          </Link>
          <Link
            to="/login"
            onClick={closeMenu}
            className="block hover:text-[#948978] hover:underline"
          >
            Jobs
          </Link>
          <Link
            to="/login"
            onClick={closeMenu}
            className="block hover:text-[#948978] hover:underline"
          >
            Post a Job
          </Link>
          <Link
            to="/contact"
            onClick={closeMenu}
            className="block hover:text-[#948978] hover:underline"
          >
            Contact
          </Link>
          <Link
            to="/about"
            onClick={closeMenu}
            className="block hover:text-[#948978] hover:underline"
          >
            About us
          </Link>

          <div className="pt-3 space-y-2">
            <button
              onClick={() => {
                closeMenu();
                navigate("/register");
              }}
              className="w-full border border-[#DED1B6] p-2 rounded-xl bg-[#DED1B6] text-[#1E222B] font-medium hover:bg-[#948978] transition"
            >
              Join now
            </button>
            <button
              onClick={() => {
                closeMenu();
                navigate("/login");
              }}
              className="w-full border border-[#DED1B6] p-2 rounded-xl text-[#DED1B6] font-medium hover:bg-[#343941] transition"
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

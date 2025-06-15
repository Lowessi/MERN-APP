import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <div className="sticky top-0 z-50">
      <nav className="flex justify-between items-center px-8 py-4 font-semibold bg-[#343941] text-[#DED1B6] shadow-sm">
        {/* Left: Logo */}
        <div className="pl-12">
          <h1 className="text-3xl font-bold">Talent</h1>
        </div>

        {/* Right: Links */}
        <section className="flex items-center gap-10 pr-12 text-base">
          <Link
            className="px-3 py-2 rounded-[5px] hover:text-[#948978] transition-colors duration-200"
            to="/"
          >
            Home
          </Link>
          <Link
            className="px-3 py-2 rounded-[5px] hover:text-[#948978] transition-colors duration-200"
            to="/contact"
          >
            Contact
          </Link>
          <Link
            className="px-3 py-2 rounded-[5px] hover:text-[#948978] transition-colors duration-200"
            to="/about"
          >
            About
          </Link>
        </section>
      </nav>
    </div>
  );
};

export default Nav;

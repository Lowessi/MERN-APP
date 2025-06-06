import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <div>
      <nav className="flex justify-between p-3 items-center font-semibold text-green-600 bg-[#f3f4f6] ">
        <div className="flex pl-50">
          <h1 className="text-[30px]">Talent</h1>
        </div>

        <section className="flex items-center gap-10 pr-30 text-md justify-between">
          <Link
            className="p-2 rounded-[5px] text-green-600 hover:text-black transition-colors duration-200"
            to="/"
          >
            Home
          </Link>
          <Link
            className="p-2 rounded-[5px] text-green-600 hover:text-black transition-colors duration-200"
            to="/contact"
          >
            Contact
          </Link>
          <Link
            className="p-2 rounded-[5px] text-green-600 hover:text-black transition-colors duration-200"
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

import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <div>
      <nav className="flex justify-between p-5 items-center bg-[#f3f4f6] ">
        <div className="flex pl-50">
          <h1 className="text-[30px]">PABLO JOB</h1>
        </div>

        <section className="flex items-center gap-10 pr-30 text-lg justify-between">
          <Link className="p-2 rounded-[5px] hover:text-black" to="/">
            Home
          </Link>
          <Link className="p-2 rounded-[5px] hover:text-black" to="/contact">
            Contact
          </Link>
          <Link className="p-2 rounded-[5px] hover:text-black" to="/about">
            About
          </Link>
        </section>
      </nav>
    </div>
  );
};

export default Nav;

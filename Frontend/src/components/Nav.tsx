import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <div>
      <nav className="flex justify-between p-5 items-center">
        <div className="flex pl-50">
          <h1 className="text-[30px]">PABLO JOB</h1>
        </div>

        <section className="flex items-center gap-10 pr-30 text-lg justify-between">
          <Link className="p-2 rounded-[5px] hover:text-black" to="/">
            Home
          </Link>
          <a className="p-2 rounded-[5px] hover:text-black" href="">
            Contacts
          </a>
          <a className="p-2 rounded-[5px]" href="">
            About
          </a>
        </section>
      </nav>
    </div>
  );
};

export default Nav;

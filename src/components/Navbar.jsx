import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-500 py-2 px-16  w-full top-0 z-50">
      <div className="flex items-center justify-between ">
        <Link to="/" className="w-14">
          <img src="../../public/logo.jpg" alt="Logo" className="w-full" />
        </Link>
        <ul className="flex space-x-4">
          <li>
            <Link to="/" className="text-white hover:text-blue-200">
              Home
            </Link>
          </li>
          <li>
            <Link to="/signin" className="text-white hover:text-blue-200">
              Sign In
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

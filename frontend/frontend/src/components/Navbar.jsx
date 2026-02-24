import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-gray-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link
            to={token ? "/dashboard" : "/login"}
            className="text-xl font-bold text-blue-400 tracking-wide"
          >
            WeatherApp
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8 font-semibold">
            {!token ? (
              <>
                <Link
                  to="/login"
                  className="hover:text-blue-400 transition duration-200"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="hover:text-blue-400 transition duration-200"
                >
                  Register
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/dashboard"
                  className="hover:text-blue-400 transition duration-200"
                >
                  Dashboard
                </Link>

                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 px-4 py-1 rounded-md transition duration-200"
                >
                  Logout
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-2xl focus:outline-none"
            >
              ☰
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-800 px-6 py-6">
          <div className="flex flex-col items-center space-y-5 text-center font-semibold">

            {!token ? (
              <>
                <Link
                  to="/login"
                  className="w-full pb-3 border-b border-white my-2 hover:text-blue-400 transition"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="w-full pb-3 border-b border-white my-2 hover:text-blue-400 transition"
                  onClick={() => setIsOpen(false)}
                >
                  Register
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/dashboard"
                  className="w-full pb-3 border-b border-white my-2 hover:text-blue-400 transition"
                  onClick={() => setIsOpen(false)}
                >
                  Dashboard
                </Link>

                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="w-full text-red-400 hover:text-red-500 cursor-pointer transition"
                >
                  Logout
                </button>
              </>
            )}

          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
import { useContext, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { AuthContext } from "../../AuthContext/AuthContext";

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const [showDashboard, setShowDashboard] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const toggleDashboard = () => {
    setShowDashboard((prev) => !prev);
  };

  const toggleMobileMenu = () => {
    setShowMobileMenu((prev) => !prev);
  };

  return (
    <header className="bg-gradient-to-r from-sky-700 to-sky-900 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-screen-xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo and Navigation */}
        <div className="flex items-center space-x-8">
          <Link
            to="/"
            className="text-3xl font-bold tracking-wider hover:text-cyan-300 transition-all duration-200"
          >
            CuroSoft
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex space-x-6">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-cyan-300 font-semibold"
                  : "hover:text-cyan-300 transition"
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/doctors"
              className={({ isActive }) =>
                isActive
                  ? "text-cyan-300 font-semibold"
                  : "hover:text-cyan-300 transition"
              }
            >
              Doctors
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive
                  ? "text-cyan-300 font-semibold"
                  : "hover:text-cyan-300 transition"
              }
            >
              About
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive
                  ? "text-cyan-300 font-semibold"
                  : "hover:text-cyan-300 transition"
              }
            >
              Contact Us
            </NavLink>
          </nav>
        </div>

        {/* Auth Section & Hamburger */}
        <div className="flex items-center space-x-6 relative">
          {/* Hamburger button - only on mobile */}
          <button
            className="lg:hidden text-white focus:outline-none"
            onClick={toggleMobileMenu}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          {/* Desktop Auth */}
          {user ? (
            <div className="hidden lg:flex items-center space-x-4">
              <p className="text-sm text-sky-200">
                Welcome, {user?.first_name || user?.email}
              </p>

              <button
                onClick={toggleDashboard}
                className="bg-sky-800 px-4 py-2 rounded-md hover:bg-sky-700 transition"
              >
                Dashboard
              </button>

              {showDashboard && (
                <div className="absolute right-0 top-14 w-56 bg-sky-700 rounded-md shadow-lg z-50">
                  {user.role === "DOCTOR" && (
                    <>
                      <Link
                        to="/profile/doctor"
                        className="block px-4 py-2 hover:bg-sky-600"
                        onClick={() => setShowDashboard(false)}
                      >
                        Profile
                      </Link>
                      <Link
                        to="/today/appointment"
                        className="block px-4 py-2 hover:bg-sky-600"
                        onClick={() => setShowDashboard(false)}
                      >
                        Appointments
                      </Link>
                      
                    </>
                  )}
                  {user.role === "PATIENT" && (
                    <>
                      <Link
                        to="/register/patient"
                        className="block px-4 py-2 hover:bg-sky-600"
                        onClick={() => setShowDashboard(false)}
                      >
                        Profile
                      </Link>
                      <Link
                        to="/patient/appointment"
                        className="block px-4 py-2 hover:bg-sky-600"
                        onClick={() => setShowDashboard(false)}
                      >
                        Appointment History
                      </Link>
                    </>
                  )}
                </div>
              )}

              <button
                onClick={logout}
                className="text-red-300 hover:text-red-500 transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="hidden lg:flex items-center space-x-4">
              <Link to="/login" className="hover:text-cyan-300 transition">
                Log in
              </Link>
              <span className="text-sky-300">|</span>
              <Link to="/register" className="hover:text-cyan-300 transition">
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Nav with Auth */}
      {showMobileMenu && (
        <div className="lg:hidden px-6 pb-4 space-y-3">
          <div className="flex flex-col space-y-2 border-b border-sky-600 pb-3">
            <NavLink
              to="/"
              className="hover:text-cyan-300 transition"
              onClick={() => setShowMobileMenu(false)}
            >
              Home
            </NavLink>
            <NavLink
              to="/doctors"
              className="hover:text-cyan-300 transition"
              onClick={() => setShowMobileMenu(false)}
            >
              Doctors
            </NavLink>
            <NavLink
              to="/about"
              className="hover:text-cyan-300 transition"
              onClick={() => setShowMobileMenu(false)}
            >
              About
            </NavLink>
            <NavLink
              to="/contact"
              className="hover:text-cyan-300 transition"
              onClick={() => setShowMobileMenu(false)}
            >
              Contact Us
            </NavLink>
          </div>

          {/* Mobile Auth */}
          <div className="flex flex-col space-y-2">
            {user ? (
              <>
                <p className="text-sm text-sky-200">
                  Welcome, {user?.first_name || user?.email}
                </p>
                {user.role === "DOCTOR" ? (
                  <>
                    <Link
                      to="/profile/doctor"
                      className="hover:text-cyan-300 transition"
                      onClick={() => setShowMobileMenu(false)}
                    >
                      Profile
                    </Link>
                    <Link
                      to="/today/appointment"
                      className="hover:text-cyan-300 transition"
                      onClick={() => setShowMobileMenu(false)}
                    >
                      Appointments
                    </Link>
                    
                  </>
                ) : (
                  <>
                    <Link
                      to="/register/patient"
                      className="hover:text-cyan-300 transition"
                      onClick={() => setShowMobileMenu(false)}
                    >
                      Profile
                    </Link>
                    <Link
                      to="/patient/appointment"
                      className="hover:text-cyan-300 transition"
                      onClick={() => setShowMobileMenu(false)}
                    >
                      Appointment History
                    </Link>
                  </>
                )}
                <button
                  onClick={() => {
                    logout();
                    setShowMobileMenu(false);
                  }}
                  className="text-red-300 hover:text-red-500 transition text-left"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="hover:text-cyan-300 transition"
                  onClick={() => setShowMobileMenu(false)}
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  className="hover:text-cyan-300 transition"
                  onClick={() => setShowMobileMenu(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;

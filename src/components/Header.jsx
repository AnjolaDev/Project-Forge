import { NavLink } from "react-router-dom";
const Header = () => {
  return (
    <header className="w-full bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-b border-gray-700 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0">
        
        {/* Logo */}
        <div className="flex items-center gap-3">

          <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 shadow-md">
            <span className="font-extrabold text-white text-lg">PT</span>
          </div>

          <h1 className="text-xl font-bold tracking-wide text-white">
            Project<span className="text-blue-400">Tracker</span>
          </h1>
        </div>

        {/* Navigation */}
        <nav className="flex items-center gap-8 text-sm font-medium">
            <NavLink 
            to="/dashboard"
            className={({ isActive }) =>
              `transition ${
                isActive
                  ? "text-blue-400 border-b-2 border-blue-400 pb-1"
                  : "text-gray-300 hover:text-white"
              }`
            }
            >
            Dashboard
          </NavLink>

          <NavLink 
          to="/projects"
          className={({ isActive }) =>
              `transition ${
                isActive
                  ? "text-blue-400 border-b-2 border-blue-400 pb-1"
                  : "text-gray-300 hover:text-white"
              }`
            }
          >
            Projects
          </NavLink>
        </nav>

      </div>
    </header>
  );
};

export default Header;
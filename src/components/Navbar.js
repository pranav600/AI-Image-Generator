import { useApp } from "../context/AppContext";
import SplitText from "./SplitText";
import { useState, useEffect } from "react";
import { FaMoon, FaSun, FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const { theme, toggleTheme, activeTab, setActiveTab } = useApp();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // After mounting, we can safely show the theme toggle
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { id: "generate", label: "Generate" },
    { id: "favorites", label: "Favorites" },
    { id: "history", label: "History" },
  ];

  return (
    <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="/" className="flex items-center">
            <SplitText
              text="AI Image Generator"
              className="text-xl sm:text-2xl font-semibold whitespace-nowrap dark:text-white text-left font-montserrat"
              delay={50}
              animationFrom={{
                opacity: 0,
                transform: "translate3d(-20px,0,0)",
              }}
              animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
              easing="easeOutCubic"
              threshold={0}
              rootMargin="0px"
            />
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <ul className="flex flex-row space-x-2 font-medium">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => handleTabClick(item.id)}
                    className={`block py-2 px-4 rounded-lg transition-all duration-200 ${
                      activeTab === item.id
                        ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                    }`}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
            {mounted && (
              <button
                onClick={toggleTheme}
                className="relative inline-flex h-8 w-14 items-center rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
                style={{
                  backgroundColor: theme === "dark" ? "#1e293b" : "#e5e7eb",
                }}
                aria-label={`Switch to ${
                  theme === "dark" ? "light" : "dark"
                } mode`}
                role="switch"
                aria-checked={theme === "dark"}
              >
                <span
                  className={`inline-block h-6 w-6 transform rounded-full bg-white shadow-lg transition-transform duration-300 flex items-center justify-center ${
                    theme === "dark" ? "translate-x-7" : "translate-x-1"
                  }`}
                >
                  {theme === "dark" ? (
                    <FaSun className="h-4 w-4 text-yellow-500" />
                  ) : (
                    <FaMoon className="h-4 w-4 text-gray-600" />
                  )}
                </span>
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            {mounted && (
              <button
                onClick={toggleTheme}
                className="relative inline-flex h-8 w-14 items-center rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
                style={{
                  backgroundColor: theme === "dark" ? "#1e293b" : "#e5e7eb",
                }}
                aria-label={`Switch to ${
                  theme === "dark" ? "light" : "dark"
                } mode`}
                role="switch"
                aria-checked={theme === "dark"}
              >
                <span
                  className={`inline-block h-6 w-6 transform rounded-full bg-white shadow-lg transition-transform duration-300 flex items-center justify-center ${
                    theme === "dark" ? "translate-x-7" : "translate-x-1"
                  }`}
                >
                  {theme === "dark" ? (
                    <FaSun className="h-4 w-4 text-yellow-500" />
                  ) : (
                    <FaMoon className="h-4 w-4 text-gray-600" />
                  )}
                </span>
              </button>
            )}
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-700 transition-colors duration-200"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <FaTimes className="w-6 h-6" />
              ) : (
                <FaBars className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
        } overflow-hidden bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-600`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleTabClick(item.id)}
              className={`block w-full text-left px-4 py-2 rounded-lg transition-all duration-200 ${
                activeTab === item.id
                  ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

import { useApp } from "../context/AppContext";
import SplitText from "./SplitText";
import { useState } from "react";

const Navbar = () => {
  const { theme, toggleTheme, activeTab, setActiveTab } = useApp();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
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
              <li>
                <button
                  onClick={() => handleTabClick("generate")}
                  className={`block py-2 px-3 rounded-lg transition-colors duration-200 ${
                    activeTab === "generate"
                      ? "text-blue-700 dark:text-blue-500"
                      : "text-gray-900 hover:text-blue-700 dark:text-white dark:hover:text-blue-500"
                  }`}
                >
                  Generate
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleTabClick("favorites")}
                  className={`block py-2 px-3 rounded-lg transition-colors duration-200 ${
                    activeTab === "favorites"
                      ? "text-blue-700 dark:text-blue-500"
                      : "text-gray-900 hover:text-blue-700 dark:text-white dark:hover:text-blue-500"
                  }`}
                >
                  Favorites
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleTabClick("history")}
                  className={`block py-2 px-3 rounded-lg transition-colors duration-200 ${
                    activeTab === "history"
                      ? "text-blue-700 dark:text-blue-500"
                      : "text-gray-900 hover:text-blue-700 dark:text-white dark:hover:text-blue-500"
                  }`}
                >
                  History
                </button>
              </li>
            </ul>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-700"
            >
              <svg
                data-toggle-icon="moon"
                className={`w-5 h-5 ${theme === "dark" ? "" : "hidden"}`}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 18 20"
              >
                <path d="M17.8 13.75a1 1 0 0 0-.859-.5A7.488 7.488 0 0 1 10.52 2a1 1 0 0 0 0-.969A1.035 1.035 0 0 0 9.687.5h-.113a9.5 9.5 0 1 0 8.222 14.247 1 1 0 0 0 .004-.997Z"></path>
              </svg>
              <svg
                data-toggle-icon="sun"
                className={`w-5 h-5 ${theme === "dark" ? "hidden" : ""}`}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 15a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0-11a1 1 0 0 0 1-1V1a1 1 0 0 0-2 0v2a1 1 0 0 0 1 1Zm0 12a1 1 0 0 0-1 1v2a1 1 0 1 0 2 0v-2a1 1 0 0 0-1-1ZM4.343 5.757a1 1 0 0 0 1.414-1.414L4.343 2.929a1 1 0 0 0-1.414 1.414l1.414 1.414Zm11.314 8.486a1 1 0 0 0-1.414 1.414l1.414 1.414a1 1 0 0 0 1.414-1.414l-1.414-1.414ZM4 10a1 1 0 0 0-1-1H1a1 1 0 0 0 0 2h2a1 1 0 0 0 1-1Zm15-1h-2a1 1 0 1 0 0 2h2a1 1 0 0 0 0-2ZM4.343 14.243l-1.414 1.414a1 1 0 1 0 1.414 1.414l1.414-1.414a1 1 0 0 0-1.414-1.414ZM14.95 6.05a1 1 0 0 0 .707-.293l1.414-1.414a1 1 0 1 0-1.414-1.414l-1.414 1.414a1 1 0 0 0 .707 1.707Z"></path>
              </svg>
              <span className="sr-only">Toggle dark/light mode</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-700"
            >
              <svg
                data-toggle-icon="moon"
                className={`w-5 h-5 ${theme === "dark" ? "" : "hidden"}`}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 18 20"
              >
                <path d="M17.8 13.75a1 1 0 0 0-.859-.5A7.488 7.488 0 0 1 10.52 2a1 1 0 0 0 0-.969A1.035 1.035 0 0 0 9.687.5h-.113a9.5 9.5 0 1 0 8.222 14.247 1 1 0 0 0 .004-.997Z"></path>
              </svg>
              <svg
                data-toggle-icon="sun"
                className={`w-5 h-5 ${theme === "dark" ? "hidden" : ""}`}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 15a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0-11a1 1 0 0 0 1-1V1a1 1 0 0 0-2 0v2a1 1 0 0 0 1 1Zm0 12a1 1 0 0 0-1 1v2a1 1 0 1 0 2 0v-2a1 1 0 0 0-1-1ZM4.343 5.757a1 1 0 0 0 1.414-1.414L4.343 2.929a1 1 0 0 0-1.414 1.414l1.414 1.414Zm11.314 8.486a1 1 0 0 0-1.414 1.414l1.414 1.414a1 1 0 0 0 1.414-1.414l-1.414-1.414ZM4 10a1 1 0 0 0-1-1H1a1 1 0 0 0 0 2h2a1 1 0 0 0 1-1Zm15-1h-2a1 1 0 1 0 0 2h2a1 1 0 0 0 0-2ZM4.343 14.243l-1.414 1.414a1 1 0 1 0 1.414 1.414l1.414-1.414a1 1 0 0 0-1.414-1.414ZM14.95 6.05a1 1 0 0 0 .707-.293l1.414-1.414a1 1 0 1 0-1.414-1.414l-1.414 1.414a1 1 0 0 0 .707 1.707Z"></path>
              </svg>
            </button>
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-lg text-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-700"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
        } overflow-hidden`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white dark:bg-gray-900">
          <button
            onClick={() => handleTabClick("generate")}
            className={`block w-full text-left px-3 py-2 rounded-lg transition-colors duration-200 ${
              activeTab === "generate"
                ? "text-blue-700 dark:text-blue-500 bg-gray-100 dark:bg-gray-800"
                : "text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
            }`}
          >
            Generate
          </button>
          <button
            onClick={() => handleTabClick("favorites")}
            className={`block w-full text-left px-3 py-2 rounded-lg transition-colors duration-200 ${
              activeTab === "favorites"
                ? "text-blue-700 dark:text-blue-500 bg-gray-100 dark:bg-gray-800"
                : "text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
            }`}
          >
            Favorites
          </button>
          <button
            onClick={() => handleTabClick("history")}
            className={`block w-full text-left px-3 py-2 rounded-lg transition-colors duration-200 ${
              activeTab === "history"
                ? "text-blue-700 dark:text-blue-500 bg-gray-100 dark:bg-gray-800"
                : "text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
            }`}
          >
            History
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

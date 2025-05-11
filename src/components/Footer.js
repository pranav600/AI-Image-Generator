import React from "react";
import { FaInstagram, FaFacebook, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-auto w-full">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-bold">Pranav Joshi</h3>
            <p className="text-gray-400">AI Image Generator</p>
          </div>

          <div className="flex space-x-6">
            <a
              href="https://instagram.com/pranavjoshitkd"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-500 transition-colors"
            >
              <FaInstagram size={24} />
            </a>
            <a
              href="https://facebook.com/pranavjoshitkd"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500 transition-colors"
            >
              <FaFacebook size={24} />
            </a>
            <a
              href="mailto:pranavjoshitkd@gmail.com"
              className="hover:text-red-500 transition-colors"
            >
              <FaEnvelope size={24} />
            </a>
          </div>
        </div>

        <div className="mt-6 text-center text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} Pranav Joshi. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

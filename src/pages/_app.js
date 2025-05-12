// import { AppProvider } from "@/context/AppContext";
// import "@/styles/globals.css";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
// import { useEffect } from "react";
// import { useApp } from "@/context/AppContext";

// function ThemeWrapper({ children }) {
//   const { theme } = useApp();

//   useEffect(() => {
//     // Remove existing theme classes
//     document.documentElement.classList.remove("light", "dark");
//     // Add the current theme class
//     document.documentElement.classList.add(theme);
//     // Update the meta theme-color
//     const metaThemeColor = document.querySelector('meta[name="theme-color"]');
//     if (metaThemeColor) {
//       metaThemeColor.setAttribute(
//         "content",
//         theme === "dark" ? "#0f172a" : "#ffffff"
//       );
//     }
//   }, [theme]);

//   return (
//     <div
//       className={`${theme} min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300`}
//     >
//       {children}
//     </div>
//   );
// }

// export default function App({ Component, pageProps }) {
//   return (
//     <AppProvider>
//       <ThemeWrapper>
//         <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
//           <Navbar />
//           <main className="flex-grow pt-16 bg-white dark:bg-gray-900">
//             <Component {...pageProps} />
//           </main>
//           <Footer />
//         </div>
//       </ThemeWrapper>
//     </AppProvider>
//   );
// }


import { AppProvider } from "@/context/AppContext";
import "@/styles/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function App({ Component, pageProps }) {
  return (
    <AppProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-16">
          <Component {...pageProps} />
        </main>
        <Footer />
      </div>
    </AppProvider>
  );
}
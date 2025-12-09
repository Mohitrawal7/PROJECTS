// import { useState } from "react";

// const Navbar = () => {
//   const [open, setOpen] = useState(false);

//   const links = ["home", "about", "skills", "projects", "certificates", "contact"];

//   return (
//     <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
//       <div className="max-w-6xl mx-auto px-6 h-[70px] flex items-center justify-between">

//         <a href="#home" className="text-2xl font-bold text-blue-600">
//           Mohit
//         </a>

//         {/* Desktop */}
//         <ul className="hidden md:flex gap-8 font-medium">
//           {links.map((link) => (
//             <li key={link}>
//               <a href={`#${link}`} className="capitalize hover:text-blue-600">
//                 {link}
//               </a>
//             </li>
//           ))}
//         </ul>

//         {/* Mobile */}
//         <button
//           className="md:hidden text-2xl"
//           onClick={() => setOpen(!open)}
//         >
//           ☰
//         </button>
//       </div>

//       {open && (
//         <div className="md:hidden bg-white shadow">
//           <ul className="flex flex-col items-center gap-6 py-6">
//             {links.map((link) => (
//               <li key={link}>
//                 <a
//                   href={`#${link}`}
//                   className="capitalize"
//                   onClick={() => setOpen(false)}
//                 >
//                   {link}
//                 </a>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;








import { useState, useEffect } from "react";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);

  const links = ["home", "about", "skills", "projects", "certificates", "contact"];

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      setDark(true);
    }
  }, []);

  const toggleTheme = () => {
    if (dark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
    setDark(!dark);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white dark:bg-gray-900 shadow-md transition-colors duration-500">
      <div className="max-w-6xl mx-auto px-6 h-[70px] flex items-center justify-between">
        {/* Logo */}
        <a href="#home" className="text-2xl font-bold text-blue-600">
          Mohit
        </a>

        {/* Desktop Links */}
        <ul className="hidden md:flex gap-8 font-medium text-gray-800 dark:text-gray-200">
          {links.map((link) => (
            <li key={link}>
              <a href={`#${link}`} className="capitalize hover:text-blue-500">
                {link}
              </a>
            </li>
          ))}
        </ul>

        {/* Icons */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="text-xl transition hover:scale-110"
          >
            {dark ? "☀️" : "🌙"}
          </button>

          <button
            className="md:hidden text-2xl text-gray-800 dark:text-gray-200"
            onClick={() => setOpen(!open)}
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white dark:bg-gray-900 shadow transition-colors duration-500">
          <ul className="flex flex-col items-center gap-6 py-6 text-gray-800 dark:text-gray-200">
            {links.map((link) => (
              <li key={link}>
                <a
                  href={`#${link}`}
                  className="capitalize"
                  onClick={() => setOpen(false)}
                >
                  {link}
                </a>
              </li>
            ))}
            <button onClick={toggleTheme} className="text-xl mt-4">
              {dark ? "☀️ Light Mode" : "🌙 Dark Mode"}
            </button>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

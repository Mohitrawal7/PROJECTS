import { useState } from "react";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const links = ["home", "about", "skills", "projects", "certificates", "contact"];

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="max-w-6xl mx-auto px-6 h-[70px] flex items-center justify-between">

        <a href="#home" className="text-2xl font-bold text-blue-600">
          Mohit
        </a>

        {/* Desktop */}
        <ul className="hidden md:flex gap-8 font-medium">
          {links.map((link) => (
            <li key={link}>
              <a href={`#${link}`} className="capitalize hover:text-blue-600">
                {link}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-white shadow">
          <ul className="flex flex-col items-center gap-6 py-6">
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
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

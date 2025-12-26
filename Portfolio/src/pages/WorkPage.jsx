import React, { useEffect } from "react";
import { motion } from "framer-motion";
import Footer from "../components/Footer";
import Contact from "../components/Contact";

const work = [
  {
    name: 'Frontend Project',
    icon: './assets/work-1.png',
    description: 'Web Design project showcasing responsive UI and interactive features.',
    link: '',
  },
  {
    name: 'Geo-Based App',
    icon: './assets/work-2.png',
    description: 'A mobile app using geolocation and map integrations.',
    link: '',
  },
  {
    name: 'Photography Site',
    icon: './assets/work-3.png',
    description: 'Portfolio site with gallery features and smooth navigation.',
    link: '',
  },
  {
    name: 'UI/UX Designing',
    icon: './assets/work-4.png',
    description: 'Project focusing on user interface and user experience design.',
    link: '',
  }
];

const WorkPage = () => {
  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
    localStorage.theme = document.documentElement.classList.contains("dark") ? "dark" : "light";
  };

  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Top blurred navbar */}
      <div className="fixed top-0 left-0 w-full z-50 px-[10%] py-4 flex justify-between items-center backdrop-blur-lg bg-white/50 dark:bg-gray-900/50 shadow-sm transition-colors duration-300">
        <a href="/">
          <img
            src="./assets/w5.png"
            alt="Logo"
            className="w-32 sm:w-40 cursor-pointer dark:hidden"
          />
          <img
            src="./assets/b5.png"
            alt="Logo"
            className="w-32 sm:w-40 cursor-pointer hidden dark:block"
          />
        </a>

        <button
          onClick={toggleTheme}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
        >
          <img
            src="./assets/moon_icon.png"
            alt="Dark mode"
            className="w-5 dark:hidden"
          />
          <img
            src="./assets/sun_icon.png"
            alt="Light mode"
            className="w-5 hidden dark:block"
          />
        </button>
      </div>

      <div className="pt-24">
        {/* Page Header */}
        <section className="px-[10%] py-20 text-center">
          <h1 className="text-5xl font-bold mb-4 text-gray-800 dark:text-white relative inline-block">
            My Latest Projects
            <span className="block w-24 h-1 bg-primary mx-auto mt-2 rounded-full"></span>
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed mt-4">
            Welcome to my portfolio! Explore a selection of projects that showcase my skills in front-end development, UI/UX design, and full-stack integration.
          </p>
        </section>

        {/* Projects Section */}
        <section className="px-[10%] py-16 flex flex-col gap-24">
          {work.map((project, index) => {
            const isEven = index % 2 === 0;
            return (
              <div
                key={project.name}
                className={`flex flex-col md:flex-row items-center gap-10 
                   ${isEven ? "md:flex-row" : "md:flex-row-reverse"}`}
              >
                {/* Image */}
                <motion.div
                  className="flex-1"
                  initial={{ x: isEven ? -150 : 150, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ type: "spring", stiffness: 60, damping: 20 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <img
                    src={project.icon}
                    alt={project.name}
                    className="w-64 h-64 md:w-72 md:h-72 mx-auto md:mx-0 rounded-lg shadow-lg dark:shadow-gray-700"
                  />
                </motion.div>

                {/* Text */}
                <motion.div
                  className="flex-1 text-center md:text-left"
                  initial={{ x: isEven ? 150 : -150, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ type: "spring", stiffness: 60, damping: 20, delay: 0.1 }}
                >
                  <h2 className="text-3xl font-semibold text-gray-800 dark:text-white mb-4">
                    {project.name}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                    {project.description}
                  </p>
                  {project.link && (
                    <a
                      href={project.link}
                      className="inline-flex items-center gap-2 mt-5 text-primary font-medium hover:underline"
                    >
                      Learn more
                      <img src="./assets/right-arrow.png" alt="" className="w-4" />
                    </a>
                  )}
                </motion.div>
              </div>
            );
          })}
        </section>

        {/* CTA Section */}
        <Contact />

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default WorkPage;

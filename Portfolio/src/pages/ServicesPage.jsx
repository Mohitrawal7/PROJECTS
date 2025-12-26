import React, { useEffect } from "react";
import { motion } from "framer-motion";
import Footer from "../components/Footer";
import Contact from "../components/Contact";

// Services data with SVG icons
const services = [
  {
    name: "Frontend Development",
    icon: "./assets/react.svg",
    description:
      "I build responsive and interactive web interfaces using React, Tailwind CSS, and modern JavaScript. Every project focuses on clean code, reusable components, accessibility, and smooth user experience across all devices.",
    
  },
  {
    name: "React SPA Development",
    icon: "./assets/react.svg",
    description:
      "I create single-page applications with React, handling routing, state management, and API integration. My focus is on building fast, maintainable, and dynamic apps that scale with your needs.",
    
  },
  {
    name: "Full-Stack Applications",
    icon: "./assets/fullstack.svg",
    description:
      "I develop complete web applications with frontend and backend integration. Features include authentication, dashboards, CRUD operations, and seamless communication between the client and server.",
   
  },
  {
    name: "Backend with Spring Boot",
    icon: "./assets/spring.svg",
    description:
      "I implement robust backend systems using Spring Boot, creating RESTful APIs, handling authentication, database operations, and ensuring high performance and scalability.",
    
  },
];

const ServicesPage = () => {
  // Theme toggle
  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
    localStorage.theme = document.documentElement.classList.contains("dark")
      ? "dark"
      : "light";
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
            My Services
            <span className="block w-24 h-1 bg-primary mx-auto mt-2 rounded-full"></span>
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed mt-4">
            I craft modern web applications using frontend frameworks like React,
            integrated with scalable backend solutions like Spring Boot. My focus
            is on building professional, clean, and maintainable projects.
          </p>
        </section>

        {/* Services Sections with scroll animations */}
        <section className="px-[10%] py-16 flex flex-col gap-24">
          {services.map((service, index) => {
            const isEven = index % 2 === 0;

            return (
              <div
                key={service.name}
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
                >
                  <img
                    src={service.icon}
                    alt={service.name}
                    className="w-24 h-24 mx-auto md:mx-0"
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
                    {service.name}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                    {service.description}
                  </p>
                 
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

export default ServicesPage;

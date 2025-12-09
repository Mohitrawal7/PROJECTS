// import Contact from "../components/Contact";
// import Skills from "../components/Skills";

// const Home = () => {
//   return (
//     <div className="bg-white text-gray-800">

//       {/* HERO */}
//       <section
//         id="home"
//         className="min-h-screen flex items-center justify-center pt-[80px] bg-gradient-to-br from-blue-50 to-white"
//       >
//         <div className="max-w-6xl w-full grid md:grid-cols-2 gap-12 px-6 items-center">

//           {/* LEFT TEXT */}
//           <div>
//             <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
//               Hi, I'm <span className="text-blue-600">Mohit Rawal</span>
//             </h1>

//             <p className="text-lg md:text-xl text-gray-600 mb-6">
//               Full-Stack Developer | React | Java | Tailwind | Spring Boot
//             </p>

//             <p className="text-gray-600 mb-8 leading-relaxed">
//               I design and build modern, responsive, and scalable web applications
//               with clean UI and efficient backend systems.
//             </p>

//             <div className="flex gap-4">
//               <a
//                 href="#projects"
//                 className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
//               >
//                 View Projects
//               </a>

//               <a
//                 href="/React-CV.pdf"
//                 className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-600 hover:text-white transition"
//               >
//                 Download CV
//               </a>
//             </div>
//           </div>

//           {/* RIGHT IMAGE / CARD */}
//           <div className="flex justify-center">
//             <div className="w-72 h-72 bg-blue-100 rounded-full flex items-center justify-center text-6xl font-bold text-blue-600 shadow-lg">
//               MR
//             </div>
//           </div>

//         </div>
//       </section>

//       {/* ABOUT */}
//       <section id="about" className="py-24 bg-white">
//         <div className="max-w-5xl mx-auto px-6 text-center">
//           <h2 className="text-3xl md:text-4xl font-bold mb-6 text-blue-600">
//             About Me
//           </h2>

//           <p className="text-gray-600 leading-relaxed max-w-3xl mx-auto">
//             I am a passionate Full-Stack Developer focused on building clean,
//             user-friendly and high-performance applications using modern
//             technologies like React, Java, Spring Boot and PostgreSQL.
//           </p>
//         </div>
//       </section>

//       {/* SKILLS */}
//      <Skills />

//       {/* PROJECTS */}
//       <section id="projects" className="py-24 bg-white">
//         <div className="max-w-6xl mx-auto px-6">
//           <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-blue-600">
//             Projects
//           </h2>

//           <div className="grid md:grid-cols-2 gap-10">

//             {/* PROJECT 1 */}
//             <div className="bg-gray-50 rounded-xl shadow p-6 hover:shadow-lg transition">
//               <h3 className="text-xl font-semibold mb-3">
//                 E-Commerce Full Stack App
//               </h3>
//               <p className="text-gray-600 mb-4">
//                 React + Java + Spring Boot + PostgreSQL shopping application.
//               </p>
//               <a
//                 href="https://ecommerce-five-sage-70.vercel.app/"
//                 target="_blank"
//                 className="text-blue-600 font-medium"
//               >
//                 Live Demo →
//               </a>
//             </div>

//             {/* PROJECT 2 */}
//             <div className="bg-gray-50 rounded-xl shadow p-6 hover:shadow-lg transition">
//               <h3 className="text-xl font-semibold mb-3">
//                 Recipe Management App
//               </h3>
//               <p className="text-gray-600 mb-4">
//                 Frontend React + Tailwind recipe CRUD app.
//               </p>
//               <a
//                 href="https://recipe-management-ten.vercel.app"
//                 target="_blank"
//                 className="text-blue-600 font-medium"
//               >
//                 Live Demo →
//               </a>
//             </div>

//           </div>
//         </div>
//       </section>

//       {/* CERTIFICATES */}
//       <section id="certificates" className="py-24 bg-gray-50">
//         <div className="max-w-5xl mx-auto px-6 text-center">
//           <h2 className="text-3xl md:text-4xl font-bold mb-10 text-blue-600">
//             Certificates
//           </h2>

//           <div className="grid sm:grid-cols-2 gap-8">
//             <div className="bg-white p-6 rounded-xl shadow">
//               React Developer Certificate – 2024
//             </div>

//             <div className="bg-white p-6 rounded-xl shadow">
//               Next.js Foundations – 2024
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* CONTACT */}
//     <Contact />

//     </div>
//   );
// };

// export default Home;





import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Skills from "../components/Skills";
import Contact from "../components/Contact";

const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } };

const Home = () => {
  return (
    <div className="bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-200 transition-colors duration-500">
      <Navbar />

      {/* HERO */}
      <motion.section
        id="home"
        className="min-h-screen flex items-center justify-center pt-20
                   bg-linear-to-br from-gray-100 dark:from-gray-900
                   to-white dark:to-black transition-colors duration-500"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
      >
        <div className="max-w-6xl w-full grid md:grid-cols-2 gap-12 px-6 items-center">
          <motion.div variants={fadeUp} transition={{ delay: 0.2 }}>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
              Hi, I'm <span className="text-blue-500 dark:text-blue-400">Mohit Rawal</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-400 mb-6">
              Full-Stack Developer | React | Java | Tailwind | Spring Boot
            </p>
            <p className="text-gray-700 dark:text-gray-400 mb-8 leading-relaxed">
              I design and build modern, responsive, and scalable web applications
              with clean UI and efficient backend systems.
            </p>
            <div className="flex gap-4">
              <a
                href="#projects"
                className="bg-blue-600 dark:bg-blue-500 text-white dark:text-white px-6 py-3 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 hover:scale-105 transition"
              >
                View Projects
              </a>
              <a
                href="/React-CV.pdf"
                className="border border-blue-600 text-blue-500 dark:text-blue-400 px-6 py-3 rounded-lg
                           hover:bg-blue-600 dark:hover:bg-blue-500 hover:text-white hover:scale-105 transition"
              >
                Download CV
              </a>
            </div>
          </motion.div>

          <motion.div
            className="flex justify-center"
            variants={fadeUp}
            transition={{ delay: 0.4 }}
          >
            <div className="w-72 h-72 bg-blue-500/20 dark:bg-blue-600/20 rounded-full flex items-center justify-center
                            text-6xl font-bold text-blue-500 dark:text-blue-400 shadow-xl transition-colors duration-500">
              MR
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* ABOUT */}
      <motion.section
        id="about"
        className="py-24 bg-gray-100 dark:bg-gray-900 transition-colors duration-500"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
      >
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-blue-500 dark:text-blue-400">
            About Me
          </h2>
          <p className="text-gray-700 dark:text-gray-400 leading-relaxed max-w-3xl mx-auto">
            I am a passionate Full-Stack Developer focused on building clean,
            user-friendly and high-performance applications using modern
            technologies like React, Java, Spring Boot and PostgreSQL.
          </p>
        </div>
      </motion.section>

      {/* SKILLS */}
      <Skills />

      {/* PROJECTS */}
      <motion.section
        id="projects"
        className="py-24 bg-gray-50 dark:bg-gray-950 transition-colors duration-500"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
      >
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-blue-500 dark:text-blue-400">
            Projects
          </h2>
          <div className="grid md:grid-cols-2 gap-10">
            <motion.div className="bg-gray-100 dark:bg-gray-900 rounded-xl shadow p-6 hover:shadow-xl transition"
                        whileHover={{ scale: 1.05 }}>
              <h3 className="text-xl font-semibold mb-3">E-Commerce Full Stack App</h3>
              <p className="text-gray-700 dark:text-gray-400 mb-4">
                React + Java + Spring Boot + PostgreSQL shopping application.
              </p>
              <a href="https://ecommerce-five-sage-70.vercel.app/" target="_blank"
                 className="text-blue-500 dark:text-blue-400 font-medium">
                Live Demo →
              </a>
            </motion.div>
            <motion.div className="bg-gray-100 dark:bg-gray-900 rounded-xl shadow p-6 hover:shadow-xl transition"
                        whileHover={{ scale: 1.05 }}>
              <h3 className="text-xl font-semibold mb-3">Recipe Management App</h3>
              <p className="text-gray-700 dark:text-gray-400 mb-4">
                Frontend React + Tailwind recipe CRUD app.
              </p>
              <a href="https://recipe-management-ten.vercel.app" target="_blank"
                 className="text-blue-500 dark:text-blue-400 font-medium">
                Live Demo →
              </a>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* CERTIFICATES */}
      <motion.section
        id="certificates"
        className="py-24 bg-gray-100 dark:bg-gray-900 transition-colors duration-500"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
      >
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-10 text-blue-500 dark:text-blue-400">Certificates</h2>
          <div className="grid sm:grid-cols-2 gap-8">
            <div className="bg-gray-50 dark:bg-gray-950 p-6 rounded-xl shadow">
              React Developer Certificate – 2024
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 p-6 rounded-xl shadow">
              Next.js Foundations – 2024
            </div>
          </div>
        </div>
      </motion.section>

      {/* CONTACT */}
      <Contact />
    </div>
  );
};

export default Home;





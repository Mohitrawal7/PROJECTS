import { motion } from "framer-motion";

const skills = [
  "React", "JavaScript", "Tailwind", "Java", "Spring Boot", "PostgreSQL",
  "Node.js", "MongoDB", "Git", "GitHub", "Docker", "REST APIs", "HTML", "CSS",
];

export default function Skills() {
  return (
    <section id="skills" className="py-24 bg-gray-50 dark:bg-gray-950 overflow-hidden transition-colors duration-500">
      <div className="max-w-6xl mx-auto px-6">
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-12 text-center text-blue-600"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Skills
        </motion.h2>

        <div className="relative w-full overflow-hidden">
          <motion.div
            className="flex gap-6 w-max"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              repeat: Infinity,
              duration: 20,
              ease: "linear",
            }}
          >
            {skills.map((skill, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-900 px-8 py-4 rounded-xl shadow-md font-semibold text-blue-600 dark:text-blue-400
                           hover:scale-110 transition-transform duration-300 cursor-pointer"
              >
                {skill}
              </div>
            ))}
            {skills.map((skill, index) => (
              <div
                key={`dup-${index}`}
                className="bg-white dark:bg-gray-900 px-8 py-4 rounded-xl shadow-md font-semibold text-blue-600 dark:text-blue-400
                           hover:scale-110 transition-transform duration-300 cursor-pointer"
              >
                {skill}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

import { motion } from "framer-motion";

export default function Contact() {
  return (
    <motion.section
      id="contact"
      className="py-24 bg-blue-600 text-white text-center transition-colors duration-500"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <motion.h2
        className="text-3xl md:text-4xl font-bold mb-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        viewport={{ once: true }}
      >
        Let’s Work Together
      </motion.h2>

      <motion.p
        className="mb-8 text-blue-100 max-w-xl mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        viewport={{ once: true }}
      >
        I'm open for internships, freelance and job opportunities.
      </motion.p>

      <motion.div
        className="flex justify-center gap-6"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        viewport={{ once: true }}
      >
        <a
          href="mailto:rawalmohit12@gmail.com"
          className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold shadow-md
                     hover:bg-blue-700 hover:text-white hover:scale-105 transition-all duration-300"
        >
          📧 Email Me
        </a>

        <a
          href="https://github.com/mohitrawal7"
          target="_blank"
          rel="noopener noreferrer"
          className="border border-white px-6 py-3 rounded-lg font-semibold
                     hover:bg-white hover:text-blue-600 hover:scale-105 transition-all duration-300"
        >
          💻 GitHub
        </a>
      </motion.div>
    </motion.section>
  );
}

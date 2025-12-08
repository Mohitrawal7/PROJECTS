import { useEffect } from "react";

const useReveal = (selector = ".reveal") => {
  useEffect(() => {
    const elements = document.querySelectorAll(selector);

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("opacity-100", "translate-y-0");
        }
      });
    }, { threshold: 0.15 });

    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);
};

export default useReveal;

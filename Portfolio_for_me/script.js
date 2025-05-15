document.addEventListener('DOMContentLoaded', () => {
    // Update current year in footer
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // Mobile navigation toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when a link is clicked
        document.querySelectorAll('.nav-menu a').forEach(navLink => {
            navLink.addEventListener('click', () => {
                if (navMenu.classList.contains('active')) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                }
            });
        });
    }

    // Optional: Smooth scroll for all anchor links with href starting with #
    // (CSS scroll-behavior: smooth already does this for modern browsers, but this is a JS fallback/enhancement)
    // document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    //     anchor.addEventListener('click', function (e) {
    //         e.preventDefault();
    //         const targetId = this.getAttribute('href');
    //         const targetElement = document.querySelector(targetId);
    //         if (targetElement) {
    //             // Adjusted for fixed navbar height if you have one
    //             const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 0;
    //             const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
    //             const offsetPosition = elementPosition - navbarHeight;

    //             window.scrollTo({
    //                 top: offsetPosition,
    //                 behavior: "smooth"
    //             });
    //         }
    //     });
    // });

    // Simple scroll reveal animation (optional, requires more setup or a library for complex effects)
    const sections = document.querySelectorAll('section');
    const options = {
        threshold: 0.1, // Trigger when 10% of the section is visible
        rootMargin: "0px 0px -50px 0px" // Adjust if needed
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
                // observer.unobserve(entry.target); // Uncomment if you want the animation to run only once
            }
        });
    }, options);

    sections.forEach(section => {
        section.style.opacity = "0"; // Initially hide sections
        section.style.transform = "translateY(20px)"; // Move them down a bit
        section.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
        observer.observe(section);
    });
});
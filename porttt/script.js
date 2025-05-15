document.addEventListener('DOMContentLoaded', () => {
    // ======== HAMBURGER MENU TOGGLE ========
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when a link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navMenu.classList.contains('active')) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                }
            });
        });
    }

    // ======== ACTIVE NAVIGATION LINK HIGHLIGHTING ON SCROLL ========
    const sections = document.querySelectorAll('.section'); // Use the general class for sections
    const navbarHeight = document.querySelector('.navbar').offsetHeight;

    function changeNavActiveState() {
        let index = sections.length;

        while (--index && window.scrollY + navbarHeight < sections[index].offsetTop) {}

        navLinks.forEach((link) => link.classList.remove('active'));
        // Ensure the link exists before trying to add 'active' class
        if (navLinks[index]) {
             // Check if the corresponding section ID matches the link's href
            const activeSectionId = sections[index].id;
            const activeNavLink = document.querySelector(`.nav-link[href="#${activeSectionId}"]`);
            if (activeNavLink) {
                activeNavLink.classList.add('active');
            }
        }
    }
    // Initial call in case the page loads on a section
    changeNavActiveState();
    window.addEventListener('scroll', changeNavActiveState);


    // ======== FOOTER: CURRENT YEAR & LAST UPDATED ========
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
    // For "Last Updated", you'd typically set this manually or via a build script.
    // If you want to dynamically set it to today (not typical for "last updated"):
    // const lastUpdatedDateSpan = document.getElementById('lastUpdatedDate');
    // if (lastUpdatedDateSpan) {
    //     lastUpdatedDateSpan.textContent = new Date().toLocaleDateString('en-US', {
    //         year: 'numeric', month: 'long', day: 'numeric'
    //     });
    // }


    // ======== SCROLL TO TOP BUTTON ========
    const scrollTopBtn = document.querySelector('.scroll-top-btn');
    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) { // Show button after scrolling 300px
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        });
        scrollTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ======== SIMPLE SCROLL REVEAL ANIMATION FOR SECTIONS ========
    const revealSections = document.querySelectorAll('.section.reveal'); // Target sections with 'reveal' class
    const revealOptions = {
        root: null, // relative to the viewport
        threshold: 0.15, // 15% of the item is visible
        rootMargin: "0px"
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Animate only once
            }
        });
    }, revealOptions);

    revealSections.forEach(section => {
        sectionObserver.observe(section);
    });


    // ======== EXPERIENCE SECTION: HIDE/SHOW "NO EXPERIENCE" NOTE ========
    const timeline = document.querySelector('.experience .timeline');
    const noExperienceNote = document.querySelector('.experience .no-experience');
    if (timeline && noExperienceNote) {
        // Check if there are any .timeline-item elements
        if (timeline.querySelectorAll('.timeline-item').length === 0) {
            noExperienceNote.style.display = 'block';
        }
    }
});

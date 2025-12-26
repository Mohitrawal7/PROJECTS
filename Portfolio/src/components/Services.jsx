export default function Services() {
  const services = [
    {
      name: "Frontend Web Development",
      icon: "./assets/web-icon.png",
      description:
        "I specialize in building modern, responsive, and user-friendly web interfaces using HTML, CSS, JavaScript, and React. My frontend development focuses on clean UI structure, reusable components, accessibility, and performance to ensure a smooth experience across all devices and screen sizes.",
     
    },
    {
      name: "React Application Development",
      icon: "./assets/react.svg",
      description:
        "I develop dynamic single-page applications using React, handling component architecture, routing, state management, and API integration. My goal is to create fast, interactive, and maintainable applications that scale well as the project grows.",
    
    },
    {
      name: "Full-Stack Web Applications",
      icon: "./assets/fullstack.svg",
      description:
        "I build complete full-stack web applications by combining modern frontend technologies with secure and scalable backend systems. This includes authentication, role-based access control, dashboards, CRUD operations, and seamless communication between frontend and backend.",
     
    },
    {
      name: "Backend Development with Spring Boot",
      icon: "./assets/spring.svg",
      description:
        "I create robust and secure backend systems using Spring Boot. This includes building RESTful APIs, handling authentication and authorization, database integration, business logic implementation, and ensuring efficient data flow between the server and frontend applications.",
    
    },
  ];

  return (
    <div id="services" className="w-full px-[12%] py-10 scroll-mt-20">
      <h4 className="text-center mb-2 text-lg font-Ovo">What I offer</h4>
      <h2 className="text-center text-5xl font-Ovo">My Services</h2>

      <p className="text-center max-w-3xl mx-auto mt-5 mb-12 font-Ovo">
        I am a web developer from Kanchanpur, Nepal, focused on building modern,
        scalable, and reliable web applications using frontend technologies like
        React and backend frameworks such as Spring Boot.
      </p>

      <div className="grid grid-cols-auto gap-6 my-10">
        {services.map((service) => (
          <div
            key={service.name}
            className="border border-gray-300 dark:border-white/30 rounded-lg px-8 py-12
                       hover:shadow-black cursor-pointer hover:bg-lightHover
                       hover:-translate-y-1 duration-500 dark:hover:bg-darkHover
                       dark:hover:shadow-white"
          >
            <img src={service.icon} alt="" className="w-10" />

            <h3 className="text-lg my-4 text-gray-700 dark:text-white">
              {service.name}
            </h3>

            <p className="text-sm text-gray-600 leading-6 dark:text-white/80">
              {service.description}
            </p>

           
          </div>
        
        ))}
      </div  >
      <a href='/services'
              className="flex items-center justify-center gap-2 text-sm mt-6 font-medium"
            >
              Learn more
              <img src="./assets/right-arrow.png" alt="" className="w-4" />
            </a>
    </div>
  );
}

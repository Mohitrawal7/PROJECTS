
import { useEffect, useState } from "react";

function useDarkMode() {
  const [isDark, setIsDark] = useState(
    document.documentElement.classList.contains("dark")
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return isDark;
}


export default function About() {

   const isDark = useDarkMode();
    console.log(isDark);

  const tools = [
  { name: "spring", variant: "original" },
  { name: "git", variant: "plain" },
  { name: "react", variant: "original" },
    { name: "javascript", variant: "plain" },
    { name: "html5", variant: "plain" },
    { name: "css3", variant: "plain" },
    { name: "tailwindcss", variant: "plain" },
    {name:"github", variant:"original" },
    { name: "npm", variant: "original-wordmark" },
    { name: "vscode", variant: "plain" },
    { name: "docker", variant: "plain" },
    { name: "postgresql", variant: "plain" },
    {name:"postman", variant:"plain" },
    {name:"supabase", variant:"plain" },
    {name:"vercel", variant:"original-wordmark" }

];


    const data = [
        {
            name: 'Languages',
            icon1: './assets/code-icon.png',
            icon2: './assets/code-icon-dark.png',
            description: 'HTML, CSS, JavaScript React Js, SpringBoot',
        },
        {
            name: 'Education',
            icon1: './assets/edu-icon.png',
            icon2: './assets/edu-icon-dark.png',
            description: 'Bsc in CSI from Far Western University',
        },
        {
            name: 'Projects',
            icon1: './assets/project-icon.png',
            icon2: './assets/project-icon-dark.png',
            description: 'Built more than 4 projects',
        },
    ];
    return (
        <div id="about" className="w-full px-[12%] py-10 scroll-mt-20">
            <h4 className="text-center mb-2 text-lg font-Ovo">Introduction</h4>
            <h2 className="text-center text-5xl font-Ovo">About me</h2>

            <div className="flex w-full flex-col lg:flex-row items-center gap-20 my-20">
                <div className="max-w-max mx-auto relative">
                    <img src='./assets/Pic.jpg' alt="" className="w-64 sm:w-80 rounded-3xl max-w-none" />

                    <div className="bg-white w-1/2 aspect-square absolute right-0 bottom-0 rounded-full translate-x-1/4 translate-y-1/3 shadow-[0_4px_55px_rgba(149,0,162,0.15)] flex items-center justify-center">
                        <img src="./assets/circular-text.png" alt="" className="w-full animate-spin_slow" />
                        <img src="./assets/coding.png" alt="" className="w-1/4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                    </div>
                </div>

                <div className="flex-1">
                    <p className="mb-10 max-w-2xl font-Ovo">I am an experienced Frontend Developer with over a decade of professional expertise in the field. Throughout my career, I have had the privilege of collaborating with prestigious organizations, contributing to their success and growth.</p>

                    <ul className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl">
                        {data.map((data) => (
                            <li key={data.name} className="border border-gray-300 dark:border-white/30 rounded-xl p-6 cursor-pointer hover:bg-lightHover hover:-translate-y-1 duration-500 hover:shadow-black dark:hover:shadow-white/80 dark:hover:bg-darkHover/50">
                                <img src={data.icon1} alt="" className="w-7 mt-3 dark:hidden" />
                                <img src={data.icon2} alt="" className="w-7 mt-3 hidden dark:block" />
                                <h3 className="my-4 font-semibold text-gray-700 dark:text-white">{data.name}</h3>
                                <p className="text-gray-600 text-sm dark:text-white/80">{data.description}</p>
                            </li>
                        ))}
                    </ul>
                    <h4 className="my-6 text-gray-700 font-Ovo dark:text-white/80">Tools i use</h4>

                     
       
           <div className="relative w-full overflow-hidden">
  
  {/* Left → Right */}
  <ul className="flex items-center flex-wrap  mb-16 gap-3 sm:gap-5 overflow-hidden  ">
    {[ ...tools].map((tool, index) => (
      <li
         key={`a-${index}`}
        className="flex-shrink-0 flex items-center justify-center w-10 sm:w-12 md:w-14 aspect-square border border-gray-300 dark:border-white/30 rounded-lg"
        >
        <i className={`devicon-${tool.name}-${tool.variant} ${isDark ? "" : "colored"} text-3xl sm:text-4xl md:text-5xl`} />
    </li>

    ))}
  </ul>

  {/* Right → Left */}
  {/* <ul className="absolute top-16 left-0 flex items-center overflow-hidden gap-2 sm:gap-3 animate-scrollReverse min-w-max">
  {[...tools, ...tools].map((tool, index) => (
    <li
      key={`b-${index}`}
      className="flex-shrink-0 flex items-center justify-center w-10 sm:w-12 md:w-14 aspect-square border border-gray-300 dark:border-white/30 rounded-lg"
    >
      <i className={`devicon-${tool.name}-${tool.variant} colored text-3xl sm:text-4xl md:text-5xl`} />
    </li>
  ))}
</ul> */}


</div>



                </div>

            </div>
        </div>
    )
}







// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
// import "./App.css";
// import { Link } from "react-router-dom";
// import data from "./data/lesson";

// function App() {
//   const [count, setCount] = useState(0);
//   // console.log(lessons);

//   return (
//     <>
//       <div className="mx-auto bg-gray-200 gap-4 md:p-10">
//         <img
//           src="/images/main.png"
//           className="w-36 mx-auto mb-4"
//           alt="German language learning interface with colorful vocabulary cards and lesson navigation"
//         />
//         <h1 className="md:text-7xl text-4xl pb-4 text-center  text-black font-bold">The German Project</h1>
      
//       </div>


// {/* /* new section  */}

// <div className="mx-auto bg-white gap-4 text-black md:px-64 px-10 py-10">

// <p className="text-black text-2xl" >Learning to speak German? Check out our free German lessons and our children's stories in German (Good for adults too!) We've also got reviews of German courses if you're ready to get serious. Enjoy!</p>

// <div className="md:flex justify-center items-center gap-4 mt-6">
// <div>
//   <h1 className="text-green-600 text-xl mb-2">German Children's Stories</h1>
//   <p>Fairy tales in German with English translations and slow, clear audio from a native German speaker.</p>
//    <button className="bg-blue-500 text-white px-4 py-2 rounded mt-2">
//     Read Stories</button> 
// </div>

// <div>
//   <h1 className="text-green-600 text-xl mb-2">German Children's Stories</h1>
//   <p>Fairy tales in German with English translations and slow, clear audio from a native German speaker.</p>
//    <button className="bg-blue-500 text-white px-4 py-2 rounded mt-2">
//     Read Stories</button> 
// </div>
// <div>
//   <h1 className="text-green-600 text-xl mb-2 ">German Children's Stories</h1>
//   <p>Fairy tales in German with English translations and slow, clear audio from a native German speaker.</p>
//    <p className="bg-blue-500 text-white px-4 py-2 rounded mt-2">
//     Read Stories</p> 
// </div>

// </div>

// </div>

// <div className="text-white bg-brown-700 lg:flex justify-center px-10  md:px-64   gap-4 mt-6">

// <div className=" p-4 rounded">
//   <p>Free German Lessons</p>
// {data.slice(0, 7).map((da) => (
//   <div className="mb-4">
//     <h2 className="text-xl font-bold mb-2">{da.title}</h2>
//     {/* <h3 className="text-xl mb-1">{lesson.contentTitle}</h3> */}
//     <p className="mb-2">{da.content}</p>
   
//   </div>
// ))}
// </div>

// <div className=" p-4 rounded">
  
// {data.slice(7, 15).map((da) => (
//   <div className="mb-4">
//     <h2 className="text-xl font-bold mb-2">{da.title}</h2>
//     {/* <h3 className="text-xl mb-1">{lesson.contentTitle}</h3> */}
//     <p className="mb-2">{da.content}</p>
   
//   </div>
// ))}
// </div>


// <div className=" p-4 rounded">
  
// {data.slice(0,2).map((da) => (
//   <div className="mb-4">
//     <h2 className="text-xl font-bold mb-2">{da.title}</h2>
//     {/* <h3 className="text-xl mb-1">{da.contentTitle}</h3> */}
//     <p className="mb-2">{da.content}</p>
   
//   </div>
// ))}
// </div>



// </div>


// <div className="mx-auto bg-black gap-4 text-gray-200 text-center p-10 ">
// <p className="hidden md:block">The German Project home | Free German lessons | German children's stories |"Learn German" online course reviews</p>
// <p>Privacy Policy | Affiliate disclosure | Contact us</p>
// <p>
// You'll probably also like: The French Experiment | The Italian Experiment | The Spanish ExperimentNEW! | The Fable Cottage</p>
// <p>
// ©2016 - 2026 TheGermanProject.com</p>
// </div>

// </>
//   );
// }

// export default App;




import { BrowserRouter, Routes, Route } from "react-router-dom";
import Lessons from "./pages/Lessons";
import LessonPage from "./pages/LessonPage";
import ReviewPage from "./pages/ReviewPage";
import StoryPage from "./pages/StoryPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Lessons />} />
        <Route path="/lessons/:lessonId" element={<LessonPage />} />
        <Route path="/review" element={<ReviewPage />} />
        <Route path="/story" element={<StoryPage />} />
        <Route path="*" element={<p className="p-6">Page not found</p>} />
      </Routes>
    </BrowserRouter>
  );
}

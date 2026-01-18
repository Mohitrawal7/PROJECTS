import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Link } from "react-router-dom";
import lessons from "./data/lesson";

function App() {
  const [count, setCount] = useState(0);
  console.log(lessons);

  return (
    <>
      <div className="mx-auto bg-gray-200 gap-4 p-10">
        <img
          src="/images/main.png"
          className="w-36 mx-auto mb-4"
          alt="German language learning interface with colorful vocabulary cards and lesson navigation"
        />
        <h1 className="text-7xl text-center  text-black font-bold">The German Project</h1>
      
      </div>
{/* /* new section  */}

<div className="mx-auto bg-white gap-4 text-black p-4">
<p className="text-black text-2xl" >Learning to speak German? Check out our free German lessons and our children's stories in German (Good for adults too!) We've also got reviews of German courses if you're ready to get serious. Enjoy!</p>

<div className="flex justify-center items-center gap-4 mt-6">
<div>
  <h1 className="text-green-600 text-xl mb-2">German Children's Stories</h1>
  <p>Fairy tales in German with English translations and slow, clear audio from a native German speaker.</p>
   <button className="bg-blue-500 text-white px-4 py-2 rounded mt-2">
    Read Stories</button> 
</div>
<div>
  <h1 className="text-green-600 text-xl mb-2">German Children's Stories</h1>
  <p>Fairy tales in German with English translations and slow, clear audio from a native German speaker.</p>
   <button className="bg-blue-500 text-white px-4 py-2 rounded mt-2">
    Read Stories</button> 
</div>
<div>
  <h1 className="text-green-600 text-xl mb-2 ">German Children's Stories</h1>
  <p>Fairy tales in German with English translations and slow, clear audio from a native German speaker.</p>
   <p className="bg-blue-500 text-white px-4 py-2 rounded mt-2">
    Read Stories</p> 
</div>

</div>

</div>

<div className="text-white bg-brown-700 flex justify-center items-center px-20   gap-4 mt-6">

<div className=" p-4 rounded">
  <p>Free German Lessons</p>
{lessons.map((lesson) => (
  <div key={lesson.id} className="mb-4">
    <h2 className="text-xl font-bold mb-2">Lesson 1:{lesson.contentTitle}</h2>
    {/* <h3 className="text-xl mb-1">{lesson.contentTitle}</h3> */}
    <p className="mb-2">{lesson.subTitle}</p>
   
  </div>
))}
</div>

<div className=" p-4 rounded">
  
{lessons.map((lesson) => (
  <div key={lesson.id} className="mb-4">
    <h2 className="text-xl font-bold mb-2">{lesson.title}:{lesson.contentTitle}</h2>
    {/* <h3 className="text-xl mb-1">{lesson.contentTitle}</h3> */}
    <p className="mb-2">{lesson.subTitle}</p>
   
  </div>
))}
</div>


<div className=" p-4 rounded">
  
{lessons.map((lesson) => (
  <div key={lesson.id} className="mb-4">
    <h2 className="text-2xl font-bold mb-2">{lesson.title}</h2>
    <h3 className="text-xl mb-1">{lesson.contentTitle}</h3>
    <p className="mb-2">{lesson.subTitle}</p>
   
  </div>
))}
</div>



</div>


<div className="mx-auto bg-black gap-4 text-gray-200 text-center p-10 ">
<p>The German Project home | Free German lessons | German children's stories |"Learn German" online course reviews</p>
<p>Privacy Policy | Affiliate disclosure | Contact us</p>
<p>
You'll probably also like: The French Experiment | The Italian Experiment | The Spanish ExperimentNEW! | The Fable Cottage</p>
<p>
©2016 - 2026 TheGermanProject.com</p>
</div>

</>
  );
}

export default App;

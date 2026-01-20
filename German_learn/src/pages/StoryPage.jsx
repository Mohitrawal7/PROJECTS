import { useState } from "react";
import stories from "../data/stories";

export default function StoryPage() {
  const [showEnglish, setShowEnglish] = useState({});

  const toggle = (storyId, index) => {
    const key = `${storyId}-${index}`;
    setShowEnglish((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="p-0 space-y-8">
      {stories.map((story) => (
        <div key={story.id}>
         
         <div className="mb-6 p-20 flex flex-col items-center justify-center text-white bg-green-400 rounded">

          <h1 className="text-5xl  font-bold mb-4">{story.title}</h1>
          <h2 className="text-3xl mb-4">{story.subtitle}</h2>

</div>
          {story.parts.map((part, index) => {
            const key = `${story.id}-${index}`;

            return (
              <div key={key} className=" p-4 mb-0">
                {/* German */}
                <p className="whitespace-pre-line mb-3 text-xl ">
                  {part.german}
                </p>

                {/* Button */}
                <button
                  onClick={() => toggle(story.id, index)}
                  className="px-3 py-1 bg-gray-100 text-green-500 rounded"
                >
                  {/* 
                   */}
                   TRANSLATE?
                </button>

                {/* English */}
                {showEnglish[key] && (
                  <p className="whitespace-pre-line mt-6 text-zinc-500">
                    {part.english}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

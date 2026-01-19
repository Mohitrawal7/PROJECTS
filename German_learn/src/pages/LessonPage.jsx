import { useParams } from "react-router-dom";
import lessons from "../data/context";
import { useState } from "react";
import LessonTable from "../components/LessonTable";
import LessonCard from "../components/LessonCard";

export default function LessonPage() {
  const { lessonId } = useParams();
  const [selectedId, SetId] = useState("");
  const lesson = lessons.find(l => l.id === lessonId);

  if (!lesson) {
    return <p className="p-6">Lesson not found</p>;
  }

  return (
<div className="flex justify-center">

<div className="flex-col mt-10 ml-64 ">
 {lessons.map((lesson) => (
          <LessonCard key={lesson.id} onClick={() => SetId(lesson.id)} lesson={lesson} />
        ))}
</div>



    <div className="max-w-4xl mx-auto p-6">
      {/* HEADER */}
      <h1 className="text-3xl font-bold mb-2">{lesson.title}</h1>
      <p className="text-gray-600 mb-6">{lesson.subtitle}</p>

      {/* CONTENT SECTIONS */}
      {lesson.content?.map((section, i) => (
        <section key={i} className="mb-6">
          <h2 className="text-xl font-semibold mb-2">
            {section.sectionTitle}
          </h2>
          <p>{section.text}</p>
        </section>
      ))}

      {/* MAIN TABLE */}
      {lesson.tableData && (
        <LessonTable table={lesson.tableData} />
      )}

      {/* GRAMMAR BLOCKS */}
      {lesson.grammar?.map((g, i) => (
        <div key={i} className="mt-8">
          <h2 className="text-xl font-semibold mb-2">
            {g.title}
          </h2>
          <LessonTable table={g.table} />
        </div>
      ))}

      {/* EXAMPLES */}
      {lesson.examples && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-2">Examples</h2>
          {lesson.examples.map((ex, i) => (
            <p key={i}>
              <strong>{ex.german}</strong> — {ex.english}
            </p>
          ))}
        </div>
      )}

      {/* NOTES */}
      {lesson.notes && (
        <ul className="mt-6 list-disc pl-6">
          {lesson.notes.map((note, i) => (
            <li key={i}>{note}</li>
          ))}
        </ul>
      )}
    </div>



</div>
  );
}

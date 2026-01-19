import lessons from "../data/context";

const LessonDetail = ({ lessonId }) => {
  const lesson = lessons.find(l => l.id === lessonId);

  if (!lesson) return <p>Lesson not found</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <h1 className="text-3xl font-bold mb-2">{lesson.title}</h1>
      <p className="text-gray-600 mb-6">{lesson.subtitle}</p>

      {/* CONTENT SECTIONS */}
      {lesson.content && lesson.content.map((section, i) => (
        <section key={i} className="mb-6">
          <h2 className="text-xl font-semibold mb-2">
            {section.sectionTitle}
          </h2>
          <p>{section.text}</p>
        </section>
      ))}

      {/* TABLE */}
      {lesson.tableData && (
        <LessonTable table={lesson.tableData} />
      )}

      {/* GRAMMAR BLOCKS */}
      {lesson.grammar && lesson.grammar.map((g, i) => (
        <div key={i} className="mt-8">
          <h2 className="text-xl font-semibold mb-2">{g.title}</h2>
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
  );
}

export default LessonDetail;
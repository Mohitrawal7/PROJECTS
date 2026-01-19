import { Link } from "react-router-dom";

const LessonCard = ({ lesson }) => {
  return (
    <div className=" transition">
      
      <div className="p-4">
        <h2 className="text-xl font-semibold">{lesson.title}</h2>
        <p className="text-gray-600 text-sm mb-3">
          {lesson.subtitle}
        </p>

        <Link
          to={`/lessons/${lesson.id}`}
          className="text-blue-600 font-medium"
        >
          View Lesson →
        </Link>
      </div>
    </div>
  );
}

export default LessonCard;
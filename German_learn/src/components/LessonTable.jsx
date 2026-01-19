



const LessonTable = ({ table }) =>   {
  return (
    <div className="overflow-x-auto mt-6">
      <table className="w-full border-collapse border">
        <thead className="bg-gray-100">
          <tr>
            {table.columns.map((col) => (
              <th key={col} className="border px-3 py-2 text-left">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td key={j} className="border px-3 py-2">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LessonTable;
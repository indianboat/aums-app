import React from 'react';

const Table = ({ data, selectedRows, onRowSelect }) => {
  return (
    <table className="min-w-full overflow-auto">
      <thead>
        <tr className='text-left'>
          <th>Select</th>
          <th>Subject Name</th>
          <th>Subject Code</th>
          <th>Subject Type</th>
          <th>Credits</th>
          {/* Add more column headers as needed */}
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr
            key={row.id}
            className={selectedRows.includes(row.id) ? 'bg-blue-100 dark:bg-neutral-700 p-3 cursor-pointer select-none' : 'p-3 cursor-pointer select-none'}
            onClick={() => onRowSelect(row.id)}
          >
            <td>
              <input
                type="checkbox"
                checked={selectedRows.includes(row.id)}
                onChange={() => onRowSelect(row)}
                onClick={(e) => e.stopPropagation()} // Prevent checkbox click from propagating to the row
              />
            </td>
            <td>{row.subjectName}</td>
            <td>{row.subjectCode}</td>
            <td>{row.subjectType}</td>
            <td>{row.credits}</td>
            {/* Render more table cells for additional columns */}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;

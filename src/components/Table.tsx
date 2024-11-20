// Define types for columns and rows
import type { TableComponentProps } from '@types';

export const Table = ({ columns, rows }: TableComponentProps) => (
  <div style={{ overflowX: 'auto', margin: '20px 0' }}>
    <table
      style={{
        borderCollapse: 'collapse',
        width: '100%',
        border: '1px solid #ddd'
      }}
    >
      <thead style={{ backgroundColor: '#f4f4f4' }}>
        <tr>
          {columns?.map((column, index) => (
            <th
              key={index}
              style={{
                border: '1px solid black',
                textAlign: column?.align || 'left',
                padding: '8px'
              }}
            >
              {column?.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows?.map((row, rowIndex) => (
          <tr key={rowIndex} style={{ borderBottom: '1px solid black' }}>
            {columns?.map((column, colIndex) => (
              <td
                key={colIndex}
                style={{
                  border: '1px solid black',
                  padding: '8px',
                  textAlign: column?.align || 'left'
                }}
              >
                {row[column?.accessor] || '-'}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

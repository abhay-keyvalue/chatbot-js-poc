// Define types for columns and rows
interface Column {
  header: string;
  accessor: string;
  align?: 'left' | 'center' | 'right'; // Optional alignment for column
}

interface Row {
  [key: string]: string; // Flexible keys with ReactNode as value for rich content
}

interface TableComponentProps {
  columns: Column[];
  rows: Row[];
}

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

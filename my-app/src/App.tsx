import React, { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import * as XLSX from 'xlsx'

function App() {
  const [data, setData] = useState<any[]>([])
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement> | any) => {
    const reader = new FileReader()
    if (e.target && e.target?.files) {
      reader.readAsBinaryString(e.target.files[0])
      reader.onload = e => {
        if (e.target) {
          const data = e.target.result
          const workbook = XLSX.read(data, { type: 'binary' })
          const sheetName = workbook.SheetNames[0]
          const sheet = workbook.Sheets[sheetName]
          const parsedData = XLSX.utils.sheet_to_json(sheet)
          setData(parsedData)
        }
      }
    }
  }

  return (
    <div className="App">
      <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
      {data.length > 0 &&
        !Object.keys(data[0])
          .map(key => key.toLowerCase())
          .includes('year') && <p>There is a no column called "year"</p>}
      {data.length > 0 && (
        <table className="table">
          <thead>
            <tr>
              {Object.keys(data[0]).map(key => (
                <th key={key}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                {Object.values(row).map((value: any, index: number) => (
                  <td key={index}>{String(value)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default App

import React, { useState, useEffect } from 'react'

function App() {

  const [backendData, setBackendData] = useState([{}])

  useEffect( ()=>{
    const fetchData = async () => {
      const data = await fetch('/api/all')
      const jsonData = await data.json()
      setBackendData(jsonData)
    }
    fetchData()
  }, [])

  return (
      <div>
        {(typeof backendData.memos === 'undefined')?(
          <p>Loading</p>
        ):(
          backendData.memos.map((memo) => {
            return <p>{memo.text}</p>
          })
        )}
    </div>
  )
}

export default App

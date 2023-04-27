import React, { useState, useEffect } from 'react'

function App() {

  const [backendData, setBackendData] = useState([{}])

  useEffect( ()=>{
    const fetchData = async () => {
      const data = await fetch('/api')
      const jsonData = await data.json()
      setBackendData(jsonData)
    }
    fetchData()
  }, [])

  return (
      <div>
        {(typeof backendData.users === 'undefined')?(
          <p>Loading</p>
        ):(
          backendData.users.map((user) => {
            return <p>{user.name}</p>
          })
        )}
    </div>
  )
}

export default App

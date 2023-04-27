import React, { useState, useEffect } from 'react'

function App() {

  const [backendData, setBackendData] = useState([{}])

  useEffect( ()=>{
    const fetchData = async () => {
      const data = await fetch('/api')
      console.log(data)
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
          backendData.users.map((user, i)=>
          (<p key = {i}>{user}</p>))
        )}
    </div>
  )
}

export default App

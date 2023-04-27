import React, { useState, useEffect } from 'react'


function App() {

  const [backendData, setBackendData] = useState([{}])
  const [memo, setMemo] = useState("")

  useEffect( ()=>{
    const fetchData = async () => {
      const data = await fetch('/api/all')
      const jsonData = await data.json()
      setBackendData(jsonData)
    }
    fetchData()
  }, [])

  const submitHandler = async (e) =>{
    e.preventDefault()
    const url = "/api/create";
    const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify({
        text: memo
      }),
    };
    const response = await fetch(url, options)
    console.log(response)
    const fetchData = async () =>{
      const data = await fetch('/api/all')
      const jsonData = await data.json()
      setBackendData(jsonData)
    }
    await fetchData()
  }

  const memoHandler = (e) =>{
    e.preventDefault()
    setMemo(e.target.value)
  }

  const handleDelete = async (e, id) =>{
    e.preventDefault()
    await fetch(`/api/delete/${id}`, {
      method: "DELETE"
    })
    const fetchData = async () =>{
      const data = await fetch('/api/all')
      const jsonData = await data.json()
      setBackendData(jsonData)
    }
    await fetchData()
  }

  return (
      <div>
        <form onSubmit={submitHandler}>
          <input type="text" value={memo} onChange={memoHandler}></input>
          <button type="submit">Add Memo</button>
        </form>
        <div>
        {(typeof backendData.memos === 'undefined')?(
          <p>Loading</p>
        ):(
          backendData.memos.map((memo) => {
            return <div><p id={memo._id}>{memo.text}</p>
            <button onClick={ async(e)=> await handleDelete(e, memo._id)}>X</button>
            </div>
          })
        )}
        </div>
    </div>
  )
}

export default App

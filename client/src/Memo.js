import React, { useState } from 'react'
const Memo = (props) =>{
    const id = props.id

    

    const [edit, setEdit] = useState(false)
    const [memo, setMemo] = useState(props.memo)

    const handleEdit = async() => {
        const url = `api/update/${id}`;
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
        await fetch(url, options)
        const reload = props.reload
        reload()
    }

        return (!edit)? (<div><p>{props.memo}</p><button onClick={()=>{
            setEdit(true)
        }}>EDIT</button></div>):
        ( <div><input onChange = {(e)=>{setMemo(e.target.value)}}value = {memo} /><button onClick={async()=>{
            await handleEdit()
            setEdit(false)
        }}>SAVE</button></div>)
    
}

export default Memo
import React, { useEffect } from 'react'

function Temp({name}) {
    useEffect(()=>{
        console.log("componenet is redered")
    },[])
  return (
    <>
    <div>temp</div>
    <h1>{name}</h1>
    </>
  )
}

export default Temp
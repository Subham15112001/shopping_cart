import React, { useEffect, useState } from 'react'

function Tempko({name}) {
   const [holdData,setholdData] = useState([]);
   const [isrender,setisrender] = useState(false)
   let i = 0;
    useEffect( ()=>{
        const  tempF = async () => {
         await fetch(`https://jsonplaceholder.typicode.com/users`).then(async (val)=>{
            val =  await val.json()
            console.log(val)
            setholdData(val)
         })
         
        }
      tempF();

    },[])
    if(holdData.length !== 0){
        return (
            <>
            <div>Tempko</div>
            <h1>{name}</h1>
            ({holdData.length !== 0}&&{holdData.map((val)=>{
               // console.log(val)
               i++;
                return (<>
                    <h2 key={val.id}>{val.name}</h2>
                </>)
            })})
            </>
        
          )
    }
 
}

export default Tempko
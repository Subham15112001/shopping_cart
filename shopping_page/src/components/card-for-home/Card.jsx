import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { NavLink,useNavigate } from "react-router-dom";
import {set_category} from "../../features/cart/cartSclice"

function Card({text="",link=""}) {

    const dispatch = useDispatch();
    
    function handleClick(){
        dispatch(set_category(text));
    }

    return (
        
<NavLink to={link} 
         className="flex w-screen h-48 flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
         onClick={(e)=>{
            handleClick();
         }}
>
    <img className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" src="/docs/images/blog/image-4.jpg" alt=""/>
    <div className="flex flex-row justify-between items-center p-4 leading-normal w-1/2 h-full">
        <h5 className=" p-0 mr-5 ml-0 w-full flex-1 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{text}</h5>
        <p className=" w-full m-5 flex-1 font-normal text-gray-700 dark:text-gray-400">{`Click to shop in ${text} store `}</p>
    </div>
</NavLink>

    )
}

export default Card
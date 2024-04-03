import React, { useEffect } from 'react'
import { useDispatch,useSelector } from "react-redux";
import Card from '../components/card-for-home/Card'
import {v4 as uuidv4} from 'uuid';
import {delete_category} from "../features/cart/cartSclice"
function Home() {
  let categories = useSelector((store)=> store.cart.all_categories);
  const dispatch = useDispatch();
  return (
    <>
      <div className='grid grid-cols-2 gap-3 m-2 p-4'>
       {categories.map((value)=>{
        let link = `/${value}`;
       return ( <div key={uuidv4()}><Card text={value} link={link}/></div>  )
      })} 
      </div>
    </>
  )
}

export default Home
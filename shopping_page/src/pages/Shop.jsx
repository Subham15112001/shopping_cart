import React, { useEffect } from 'react'
import { useParams } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { get_products } from "../features/cart/cartSclice";
import Card from '../components/card-for-shop/Card';
function Shop() {

  const dispatch = useDispatch();
  const {shop} = useParams();
  useEffect(()=>{
    dispatch(get_products(shop));
  },[])
 

  const products = useSelector((store)=>store.cart.products)
  console.log(products)
  return (products) && (
    <div className='grid grid-cols-2 m-4'>
      {products.map((value) => {
        return (
          <div key={value.id}>
            <Card image={value.image} title={value.title} price={value.price} id={value.id} category={value.category}/>
          </div>
        )
      })}
    </div>
  )
}

export default Shop
import React, { useEffect } from 'react'
import Card from '../components/card-for-product/Card'
import { useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux';
import { get_product } from "../features/cart/cartSclice";

function Product() {
  const {id,shop} = useParams();
  let data = {};
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(get_product(id));
  },[])
  data = useSelector((store)=> store?.cart?.product);
  console.log(data)
  return (data != {})&&(
    <div>
       <Card title={data.title} 
             description={data.description} 
             image={data.image}
             category={data.category}
             price={data.price}
         />
    </div>
  )
}

export default Product
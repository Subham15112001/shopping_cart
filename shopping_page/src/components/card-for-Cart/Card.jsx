import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { removeItem, increaseSize, decreaseSize, updateTotalAmount, addItem ,clearData} from "../../features/shop/shopSlice";
import { v4 as uuniq } from "uuid";
import service from '../../appwrite/config'
import { get_product } from "../../features/cart/cartSclice";


function Card() {

  const dispatch = useDispatch();
  const userData = useSelector((store) => store.user.userData)
  const status = useSelector((store) => store.user.status)
  const user_id = useSelector((store) => store.user.userData?.$id); //user id
  let cart_data = useSelector((store) => store.shop.items);       // cart that is selected
  const total_amount = useSelector((store) => store.shop.total_amount) // total amount of cart
  const cart_item = useSelector((store) => store.cart.product);      //cart item that is called using api
  
  const total_size = cart_data.length;
  let map = new Set();

  useEffect(() => {
    if (user_id) {
     
      service.getCart(user_id).then((value) => {
        const documents = value.documents;
        console.log(documents);
        
        // Use Promise.all to handle asynchronous fetch operations
      
        Promise.all(
          documents.map(async (item) => {
            let current_item = await fetch(`https://fakestoreapi.com/products/${item.item_id}`);
            current_item = await current_item.json();
            return { ...current_item, size: parseInt(item?.quantity) };
          })
        ).then((items) => {
          items.forEach((item) => {
            if(map.has(item.id) === false){
            dispatch(addItem(item));
            }
            map.add(item.id);
          });
          dispatch(updateTotalAmount());
        });
      });
    }
   
    return () =>{
      
       dispatch(clearData());
       map.clear();
    }
  }, [])
    
    function call_removeItem(id) {
      dispatch(removeItem(id));
       
      if(status){
        const user_id = userData.$id;
        const item_id = id;
        service.deleteCart({user_id,item_id})
      }
      dispatch(updateTotalAmount());
    }

    function call_increaseSize(id,size){
      dispatch(increaseSize(id));

      if(status){
        const user_id = userData.$id;
        const item_id = id;
        size++;
        const quantity = `${size}`;
        service.updateCart({user_id,item_id,quantity})
      }

      dispatch(updateTotalAmount());
    }

    function call_decreaseSize(id,size){
      
     if(size === 1){
      dispatch(removeItem(id))

      if(status){
        const user_id = userData.$id;
        const item_id = id;
        service.deleteCart({user_id,item_id})
      }

     }else{
      dispatch(decreaseSize(id))
      if(status){
        const user_id = userData.$id;
        const item_id = id;
        size--;
        const quantity = `${size}`;
        service.updateCart({user_id,item_id,quantity})
      }
     }
      dispatch(updateTotalAmount());
    }
    
    return (
        <>
         <div className="font-[sans-serif]">
      <div className="grid lg:grid-cols-3">
        <div className="lg:col-span-2 p-10 bg-white overflow-x-auto">
          <div className="flex border-b pb-4">
            <h2 className="text-2xl font-extrabold text-[#333] flex-1" key={uuniq()}>Shopping Cart</h2>
            <h3 className="text-xl font-extrabold text-[#333]" key={uuniq()}>{total_size} Items</h3>
          </div>
          <div>
            <table className="mt-6 w-full border-collapse divide-y">
              <thead className="whitespace-nowrap text-left"  key={uuniq()}>
                <tr>
                  <th className="text-base text-[#333] p-4" key={uuniq()}>Description</th>
                  <th className="text-base text-[#333] p-4" key={uuniq()}>Quantity</th>
                  <th className="text-base text-[#333] p-4" key={uuniq()}>Price</th>
                </tr>
              </thead>

              
              <tbody className="whitespace-nowrap divide-y" key={uuniq()}>
               
               {cart_data.map((value)=>{
                return (
                  <>
                  <tr key={uuniq()}>
                  <td className="py-6 px-4" key={uuniq()}>
                    <div className="flex items-center gap-6 w-max">
                      <div className="h-30 w-10 shrink-0">
                        <img src={`${value.image}`} className="w-full h-full object-contain" />
                      </div>
                      <div>
                        <p className="text-md font-bold text-[#333]">{value.title}</p>
                        <button type="button" className="mt-4 font-semibold text-red-400 text-sm" onClick={()=>{
                          call_removeItem(value.id);
                        }}>
                          Remove
                        </button>
                      </div>
                    </div>
                  </td>
                  <td className="py-6 px-4" key={uuniq()}>
                    <div className="flex divide-x border w-max" key={uuniq()}>
                      <button type="button" className="bg-gray-100 px-4 py-2 font-semibold" onClick={()=>{
                        call_decreaseSize(value.id,value.size);
                      }}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-3 fill-current" viewBox="0 0 124 124">
                          <path d="M112 50H12C5.4 50 0 55.4 0 62s5.4 12 12 12h100c6.6 0 12-5.4 12-12s-5.4-12-12-12z" data-original="#000000"></path>
                        </svg>
                      </button>


                      <button type="button" className="bg-transparent px-4 py-2 font-semibold text-[#333] text-md">
                        {value.size}
                      </button>


                      <button type="button" className="bg-gray-800 text-white px-4 py-2 font-semibold" onClick={()=>{
                        call_increaseSize(value.id,value.size);
                      }}>

                        <svg xmlns="http://www.w3.org/2000/svg" className="w-3 fill-current" viewBox="0 0 42 42">
                          <path d="M37.059 16H26V4.941C26 2.224 23.718 0 21 0s-5 2.224-5 4.941V16H4.941C2.224 16 0 18.282 0 21s2.224 5 4.941 5H16v11.059C16 39.776 18.282 42 21 42s5-2.224 5-4.941V26h11.059C39.776 26 42 23.718 42 21s-2.224-5-4.941-5z" data-original="#000000"></path>
                        </svg>

                      </button>
                    </div>
                  </td>
                  <td className="py-6 px-4" key={uuniq()}>
                    <h4 className="text-md font-bold text-[#333]">${value.price}</h4>
                  </td>
                </tr>
                  </>
                )
               })}
                
              </tbody>
            </table>
          </div>
        </div>
        <div className="bg-gray-50 p-10">
          <h3 className="text-xl font-extrabold text-[#333] border-b pb-4">Order Summary</h3>
          <ul className="text-[#333] divide-y mt-6">
            <li className="flex flex-wrap gap-4 text-md py-4 font-bold" key={uuniq()}>Total <span className="ml-auto">${total_amount}</span></li>
          </ul>
          <button type="button" className="mt-6 text-md px-6 py-2.5 w-full bg-blue-600 hover:bg-blue-700 text-white rounded">Check
            out</button>
        </div>
      </div>
    </div>
        </>
    )
}

export default Card
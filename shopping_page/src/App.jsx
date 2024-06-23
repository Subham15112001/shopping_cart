
import { useEffect, useState } from 'react'
import authService from "./appwrite/auth";
import service from "./appwrite/config";
import { useDispatch,useSelector } from 'react-redux'
import { get_products,get_product,get_all_categories } from "./features/cart/cartSclice";
import { Header } from './components/index';
import { Outlet } from 'react-router-dom';
import { login,logout } from "./features/user/userSlice";
import { updateTotalAmount ,addItem,clearData} from "./features/shop/shopSlice";
import Tempko from './components/Tempko';
function App() {

  const dispatch = useDispatch();
  let map = new Set();

  useEffect(()=>{

     dispatch(get_all_categories());

     authService.getCurrentUser()
     .then((userData) => {
       if (userData) {
         dispatch(login(userData))
         return userData.$id;
       } else {
         dispatch(logout())
         return null;
       }
     })
     .then((user_id)=>{
     
      if(user_id){

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
             if (map.has(item.id) === false) {
               dispatch(addItem(item));
             }
             map.add(item.id);
           });
           dispatch(updateTotalAmount());
         });
       });
      }
     })


    return () => {

      dispatch(clearData());
      map.clear();
    }

  }, [])

  return (
    <>
      <div className='box-border min-h-screen w-screen  bg-gradient-to-r from-purple-600 to-blue-600 '>
      <div className='w-full '>
        <Header />
        {/* <Tempko
          name={"hello"}
        /> */}
        <main className='flex-grow'>
        <Outlet />
        </main>
      </div>
      </div>
    </>
  )
}

export default App

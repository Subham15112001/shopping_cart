
import { useEffect } from 'react'
import './App.css'
import { useDispatch } from 'react-redux'
import { get_products,get_product,get_all_categories } from "./features/cart/cartSclice";
import { Header } from './components/index';
import { Outlet } from 'react-router-dom';
function App() {

  const dispatch = useDispatch();
  useEffect(()=>{
     dispatch(get_all_categories());
  },[])
 
  return (
    <>
      <div className='box-border min-h-screen w-screen  bg-gradient-to-r from-purple-600 to-blue-600 '>
      <div className='w-full '>
        <Header />
        <main className='flex-grow'>
        <Outlet />
        </main>
      </div>
      </div>
    </>
  )
}

export default App

import React from 'react'
import { useDispatch,useSelector } from "react-redux";
import { addItem, updateTotalAmount } from "../../features/shop/shopSlice";
import { login,logout } from "../../features/user/userSlice";
import service from "../../appwrite/config";

function Card({title="ghis dff df",
              description="Easy upgrade for faster boot up, shutdown, application load and response (As compared to 5400 RPM SATA 2.5” hard drive; Based on published specifications and internal benchmarking tests using PCMark vantage scores) Boosts burst write performance, making it ideal for typical PC workloads The perfect balance of performance and reliability Read/write speeds of up to 535MB/s/450MB/s (Based on internal testing; Performance may vary depending upon drive capacity, host device, OS and application.)",
              image="https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg",
              category="sfdf",
              price="123",
              id=1,
            }) {
  
  const dispatch = useDispatch();
  const items = useSelector((store) => store.shop.items);
  const userStatus = useSelector((store) => store.user.status);
  const userData = useSelector((store) => store.user.userData);

  async function addToCart(){
    const item = {
      id,
      description,
      image,
      category,
      price,
      title,
      size:1,
    }
    
   //dont want duplicates
    for(let i = 0;i<items.length;i++){
      if(items[i].id == id){
        alert("already added")
        return;
      }
    }
    alert("added")

    dispatch(addItem(item))
    dispatch(updateTotalAmount());

    if(userStatus == true){

      const user_id = userData.$id;
      const item_id = `${id}`;
      const quantity = `1`;

      const upload = await service.createCart({user_id,item_id,quantity})
      
    }
  }
  return (
    <>
        <section className="py-12 sm:py-16" id={id}> 
  <div className="container mx-auto px-4">
   

    <div className="lg:col-gap-12 xl:col-gap-16 mt-8 grid grid-cols-1 gap-12 lg:mt-12 lg:grid-cols-5 lg:gap-16">
      <div className="lg:col-span-3 lg:row-end-1">
        <div className="lg:flex lg:items-start">
          <div className="lg:order-2 lg:ml-5">
            <div className="max-w-xl overflow-hidden rounded-lg">
              <img className="h-full w-full max-w-full object-cover" src={image} alt="image" />
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-2 lg:row-span-2 lg:row-end-2">
        <h1 className="sm: text-2xl font-bold text-gray-900 sm:text-3xl">{title}</h1>

      
        <div className="mt-10 flex flex-col items-center justify-between space-y-4 border-t border-b py-4 sm:flex-row sm:space-y-0 mr-5">
          <div className="flex items-end">
            <h1 className="text-3xl font-bold">${price}</h1>
          </div>

          <button type="button" 
                  className="inline-flex items-center justify-center rounded-md border-2 border-transparent 
                           bg-gray-900 bg-none px-12 py-3 text-center text-base font-bold text-white 
                           transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800"
                  onClick={addToCart}>
            <svg xmlns="http://www.w3.org/2000/svg" className="shrink-0 mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            Add to cart
          </button>
        </div>

        <ul className="mt-8 space-y-2">
          <li className="flex items-center text-left text-sm font-medium text-gray-600">
            <svg className="mr-2 block h-5 w-5 align-middle text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" className=""></path>
            </svg>
            Free shipping worldwide
          </li>

          <li className="flex items-center text-left text-sm font-medium text-gray-600">
            <svg className="mr-2 block h-5 w-5 align-middle text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" className=""></path>
            </svg>
            Cancel Anytime
          </li>
        </ul>
      </div>

      <div className="lg:col-span-3">
        <div className="border-b border-gray-300">
          <nav className="flex gap-4">
            <a href="#" title="" className=" border-b-2 border-gray-900 py-4 text-xl font-medium text-gray-900 hover:border-gray-400 hover:text-gray-800"> Description </a>
          </nav>
        </div>

        <div className="mt-8 flow-root sm:mt-12 ">
          <h1 className="text-3xl font-bold">Delivered To Your Door</h1>
          <p className="mt-4">{description}</p>
        </div>
      </div>
    </div>
  </div>
</section>

    </>
  )
}

export default Card
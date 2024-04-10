import React, { useEffect, useMemo } from 'react'
import { NavLink,useNavigate,Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { selectCategory } from "../features/shop/shopSlice";
import { v4 as uuidv4 } from "uuid";
function Header() {

    let userStatus = useSelector((store) => store.user.status);
    //userStatus = true;
  
    const navbar = [
        {
            name: "Home",
            slug: "/",
            active: true,
            id: uuidv4(),
        },
        {
            name: "Cart",
            slug: "/cart",
            active: true,
            id: uuidv4(),
        },
        {
            name: "Login",
            slug: "/login",
            active: !userStatus,
            id: uuidv4(),
        },
        {
            name: "Logout",
            slug: "/logout",
            active: userStatus,
            id: uuidv4(),
        },
        {
            name: "Signup",
            slug: "/signup",
            active: !userStatus,
            id: uuidv4(),
        },
    ];
    
  return (
      <>
          <nav className="bg-white dark:bg-gray-900  w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
              <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                  <a href="https://flowbite.com/" className="flex items-center space-x-3 rtl:space-x-reverse">
                      <img src="https://img.icons8.com/ios-filled/50/github.png" className="h-8" alt="github" />
                      <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Shop</span>
                  </a>

                  <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1 flex-" id="navbar-sticky">
                      <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                          {navbar.map((value) => {
                            return  value.active && (
                                (<li key={value.id}>
                                      <NavLink to={`${value.slug}`}
                                          className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                                          style={({ isActive }) => {
                                              return isActive ? { color: 'white' } : {};
                                          }}
                                      >
                                          {value.name}
                                      </NavLink>
                                  </li>)
                            )                                                                                  
                          })}
                          
                      </ul>
                  </div>
              </div>
          </nav>
      </>
  )
}

export default Header
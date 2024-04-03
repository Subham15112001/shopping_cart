import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {store} from './store/store.js'
import {Provider } from "react-redux";
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import { Cart,Home,Login,Logout,Product,Shop, Signup } from "./pages/index.js";

const router = createBrowserRouter([
  {
    path:"/",
    element:<App/>,
    children:[
      {
        path:"/",
        element:<Home/>,
      },
      {
        path:'/login',
        element:<Login/>,
      },
      {
        path:'/:shop',
        element:<Shop/>
      },
      {
        path:'/:shop/:id',
        element:<Product/>
      },
      {
        path:'/logout',
        element:<Logout/>
      },
      {
        path:'/signup',
        element:<Signup/>
      },
      {
        path:'/cart',
        element:<Cart/>
      },
    ]
  }
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <Provider store = {store}>
  <RouterProvider router={router}/>
  </Provider>
  </React.StrictMode>,
)

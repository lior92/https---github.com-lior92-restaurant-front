import './app.css'
import axios from "axios";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
  Routes,
} from "react-router-dom";
import React, { createContext, useEffect, useState } from "react";
import HomePage from './components/Home Page/HomePage';
import Menu from './components/Menu/Menu';
import OrderOnline from './components/Order online/OrderOnline';
import BookTable from './components/Book Table/BookTable';
import Contact from './components/Contact/Contact';
import Cart from './components/Cart/Cart'
import NavBar from './Nav Bar/NabBar'
import Footer from './Footer/Footer'



export const myContext = createContext();

function App() {
  //Global state
  const [schedules, setSchedules] = useState([]);

//Cart 
const [cart,setCart]=useState([])
//Cart Status
const [cartStatus,setCartStatus]=useState(false)

    //UseEffect

    useEffect(()=>{

      //axios get request
  
      axios.get("https://restaurant-server-nqis.onrender.com/schedule/get_schedule").
      then((response)=>{
        setSchedules(response.data.schedules[0])
      })
      .catch((error)=>{
        console.log(error)
      })
  
    },[])
  


  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="*" element={
        <React.Fragment>
          <NavBar/>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/menu" element={<Menu/>} />
            <Route path="/order_online" element={<OrderOnline/>} />
            <Route path="/book_table" element={<BookTable/>} />
            <Route path="/contact" element={<Contact/>} />
            <Route path="/cart" element={<Cart/>} />
          </Routes>
          <Footer/>
        </React.Fragment>
      }/>
    )
  )



  return (
    <div className='app'>
      <myContext.Provider
        value={{
          schedules,
          setSchedules,
          cart,
          setCart,
          setCartStatus,
          cartStatus
        }}
      >
        <RouterProvider router={router} />
      </myContext.Provider>
    </div>
  );
}


export default App

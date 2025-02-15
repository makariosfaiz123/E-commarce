import React, { useContext, useState } from "react";
import style from "./Navbar.module.css";
import logo from "../../assets/freshcart-logo.svg";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import { CartContext } from "../../Context/CartContext";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  let { userLogin, setuserLogin } = useContext(UserContext);
  let { CountItems } = useContext(CartContext);
  let navigate = useNavigate();
  

  function signout() {
    localStorage.removeItem("userToken");
    setuserLogin(null);
    navigate("/login");
  }
  return (
    <>
      


<nav className="bg-slate-100 fixed top-0 left-0 right-0 border-gray-200 z-10">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4 relative">
        
        
        <Link
              to=""
              className="flex items-center space-x-3 rtl:space-x-reverse"
            >
              <img
                src={logo}
                width={"120px"}
                className="h-8"
                alt="Flowbite Logo"
              />
            </Link>

       
        {userLogin != null ?(<><div className="hidden md:flex space-x-6 absolute left-1/2 -translate-x-1/2">
          <Link to="/" className="text-gray-600 hover:text-[#0aad0a]">Home</Link>
          <Link className="text-gray-600 hover:text-[#0aad0a]" to="cart">  Cart</Link>
            <Link className="text-gray-600 hover:text-[#0aad0a]" to="wishlist">  Wish List</Link>
            <Link className="text-gray-600 hover:text-[#0aad0a]" to="products">  Products</Link>
            <Link className="text-gray-600 hover:text-[#0aad0a]" to="categories"> Categories </Link>
            <Link className="text-gray-600 hover:text-[#0aad0a]" to="brands"> Brands </Link>
        </div></>):null}

        
        <div className="hidden md:flex">
        <ul className="flex gap-4">
              {userLogin != null ? (<>
                <li>
                  <Link  to={"cart"} className="text-xl fa-solid fa-cart-shopping fs-3 relative">
                    <span   className="absolute top-[-10px] right-[-10px] size-4 text-xs bg-[#4fa74f]
                     text-white rounded-full flex items-center justify-center">{CountItems}</span >
                     </Link>
                     </li>
                <li>
                  <span onClick={signout}>signout</span>
                </li></>

              )   : (
                <>
                  <li>
                    <Link to="login">Login</Link>
                  </li>
                  <li>
                    <Link to="register">Register</Link>
                  </li>
                </>
              )}
            </ul>
        </div>

        
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden cursor-pointer inline-flex items-center justify-center p-2 w-10 h-10 text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
        >
          <span className="sr-only">Open main menu</span>
          <svg className="w-5 h-5" aria-hidden="true" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
          </svg>
        </button>

        
        <div className={`${isMenuOpen ? "block" : "hidden"} absolute top-full left-0 w-full bg-gray-50 border-t border-gray-200 md:hidden transition-all duration-500`}>
        {userLogin != null ?   (<><ul className="flex flex-col items-start font-medium py-4 space-y-2 pl-4">
            <li><Link to="" className="block py-2 px-3 text-gray-900 hover:bg-gray-100">Home</Link></li>
            <li><Link className="block py-2 px-3 text-gray-600 hover:bg-gray-100" to="cart">  Cart</Link></li>
            <li><Link className="block py-2 px-3 text-gray-600 hover:bg-gray-100" to="wishlist">  Wish List</Link></li>
            <li><Link className="block py-2 px-3 text-gray-600 hover:bg-gray-100" to="products">  Products</Link></li>
            <li><Link className="block py-2 px-3 text-gray-600 hover:bg-gray-100" to="categories"> Categories </Link></li>
            <li><Link className="block py-2 px-3 text-gray-600 hover:bg-gray-100" to="brands"> Brands </Link></li>
          </ul></>):null}
          
          <div className="flex justify-center py-4">
          <ul className="flex gap-4">
              {userLogin != null ? (<>
                <li>
                  <Link  to={"cart"} className=" fa-solid fa-cart-shopping fs-3 relative">
                    <span   className="absolute top-[-10px] right-[-10px] size-4 text-xs bg-[#4fa74f]
                     text-white rounded-full flex items-center justify-center">{CountItems}</span >
                     </Link>
                     </li>
                <li>
                  <span className="cursor-pointer" onClick={signout}>signout</span>
                </li></>

              )   : (
                <>
                  <li>
                    <Link  to="login">Login</Link>
                  </li>
                  <li>
                    <Link to="register">Register</Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
    </>
  );
}

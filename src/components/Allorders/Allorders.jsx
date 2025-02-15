import React, { useEffect, useState } from 'react'
import style from "./Allorders.module.css"
import axios from 'axios'
export default function Allorders() {
const [Orders, setOrders] = useState(null)

function getAllOrders(){
  axios.get(`https://ecommerce.routemisr.com/api/v1/orders/`)
  .then((res)=>{
    setOrders(res.data.data[0])
    console.log(res.data.data);
    console.log(res.data.data[0]);
    console.log();
    
    
  })
  .catch((err)=>err)
}


useEffect(()=>{
  getAllOrders()
},[])










  return (
    <>
      <div className=" bg-gray-100 py-20">
      <h1 className="mb-10 text-center text-3xl font-bold">My Orders</h1>
     
        <div className="mx-auto  justify-center px-6 md:flex md:space-x-6 xl:px-0">
          <div className="rounded-lg md:w-2/3">
            {Orders?.cartItems.map((order) => (
              <div
              key={order._id}
                className="justify-between mb-6 rounded-lg bg-white p-6
                     shadow-md sm:flex sm:justify-start"
              >
                <img
                  src={order.product.imageCover}
                  alt="order-image"
                  className="w-full rounded-lg sm:w-40"
                />
                <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                  <div className="mt-5 sm:mt-0">
                    <h2 className="text-lg font-bold text-gray-900">
                      {order.product.title}
                    </h2>
                    <p className="mt-1 text-sm text-gray-700">
                      {order.price} EGP
                    </p>
                  </div>
                  <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                    <div className="flex items-center border-gray-100">
                      <h2 className="text-[#0aad0a] text-xl">count: {order.count}</h2>
                    </div>
                    
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
      </div>
    </>
  );
}

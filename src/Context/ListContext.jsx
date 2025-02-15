import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let ListContext = createContext();

export default function ListContextProvider(props) {
  let headers = { token: localStorage.getItem("userToken") };

  function addProductToList(productId) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,{ productId: productId },{ headers }
      )
      .then((res) => res)
      .catch((err) => err);
  }

  function getLoggedUserList() {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/wishlist`,{ headers })
      .then((res) =>  res)
      .catch((err) => err);
  }

  
  function deleteListProduct(productId) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
        headers,
      })
      .then((res) => res)
      .catch((err) => err);
  }
  

  useEffect(()=>{
    getLoggedUserList()
  },[]);

  return (
    <ListContext.Provider
      value={{
        addProductToList,
        getLoggedUserList,
        deleteListProduct,
        
        
      }}
    >
      {props.children}
    </ListContext.Provider>
  );
}

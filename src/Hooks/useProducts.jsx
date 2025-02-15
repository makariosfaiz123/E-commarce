import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

export default function useProducts() {
  function getProducts() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
  }
  let productInfo = useQuery({
    queryKey: ["recantProducts"],
    queryFn: getProducts,
    staleTime: 7000,
    // gcTime:1000,
    // retry:3000,
    // retryDelay:6000,
    // refetchInterval:30000,
    // refetchIntervalInBackground:true,
    // refetchOnWindowFocus:true,
  });

  return productInfo;
}

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'

export default function useBrands() {

    function getBrands() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/brands`);
      }
      let brandInfo = useQuery({
        queryKey: ["allbrands"],
        queryFn: getBrands,
      });



  return brandInfo;
}

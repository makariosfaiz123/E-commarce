import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { CartContext } from "../../Context/CartContext";

export default function Checkout() {
  let { checkout, cartId } = useContext(CartContext);

  let Formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    onSubmit: () =>
      handleCheckout(cartId, `${window.location.origin}`),
  });

  async function handleCheckout(cartId, url) {
    let { data } = await checkout(cartId, url, Formik.values);
    console.log(data.session.url);
    window.location.href = data.session.url;
  }
  return (
    <>
      <div className="mx-auto sm:w-3/4 md:w-1/2 my-5 bg-light shadow-xl p-10 bg-[#f8f9fa]  rounded-2xl">
        <h2 className="text-2xl font-bold text-center my-4 text-[#0aad0a]">
          CheckOut now
        </h2>
        <form onSubmit={Formik.handleSubmit} className="max-w-md mx-auto">
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="details"
              value={Formik.values.details}
              onChange={Formik.handleChange}
              onBlur={Formik.handleBlur}
              id="details"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300
             appearance-none focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="details"
              className="peer-focus:font-medium left-0 absolute text-sm text-gray-500 duration-300 transform -translate-y-6
             scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto
              peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100
               peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Enter Your details
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="tel"
              name="phone"
              value={Formik.values.phone}
              onChange={Formik.handleChange}
              onBlur={Formik.handleBlur}
              id="phone"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300
             appearance-none focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="phone"
              className="peer-focus:font-medium left-0 absolute text-sm text-gray-500 duration-300 transform -translate-y-6
             scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto
              peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100
               peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Enter Your phone
            </label>
            {Formik.errors.phone && Formik.touched.phone ? (
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50"
                role="alert"
              >
                <span className="font-medium">{Formik.errors.phone}</span>
              </div>
            ) : null}
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="city"
              value={Formik.values.city}
              onChange={Formik.handleChange}
              onBlur={Formik.handleBlur}
              id="city"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300
             appearance-none focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="city"
              className="peer-focus:font-medium left-0 absolute text-sm text-gray-500 duration-300 transform -translate-y-6
             scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto
              peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100
               peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Enter Your city
            </label>
            {Formik.errors.city && Formik.touched.city ? (
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50"
                role="alert"
              >
                <span className="font-medium">{Formik.errors.city}</span>
              </div>
            ) : null}
          </div>

          <div className="flex gap-4 items-center">
            <button type="submit" className="btn my-3">
              Checkout
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

import React, { useContext, useState } from "react";
import style from "./Login.module.css";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";

export default function Login() {
  let { userLogin, setuserLogin } = useContext(UserContext);

  const [ApiError, setApiError] = useState("");
  const [isLoading, setisLoading] = useState(false);
  let navigate = useNavigate();

  function handleLogin(valuas) {
    setisLoading(true);
    axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, valuas)
      .then((res) => {
        setisLoading(false);
        if (res.data.message == "success") {
          localStorage.setItem("userToken", res.data.token);
          navigate("/");
          setuserLogin(res.data.token);
        }
      })
      .catch((res) => {
        console.log(res.response.data.message);
        setApiError(res.response.data.message);
        setisLoading(false);
      });
  }

  let myValidation = yup.object().shape({
    email: yup.string().email("not valid email").required("email is required"),
    password: yup
      .string()
      .required("password is required")
      .min(6, "password min length 6"),
  });

  let Formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: myValidation,

    onSubmit: handleLogin,
  });

  return (
    <>
      {ApiError ? (
        <div className="w-1/2 mx-auto bg-red-600 text-white font-bold rounded-xl p-5">
          {ApiError}
        </div>
      ) : null}
        <div className="mx-auto sm:w-3/4 md:w-1/2  my-5 bg-light shadow-xl p-10 bg-[#f8f9fa]  rounded-2xl">
<h2 className="text-2xl font-bold text-center my-4 text-[#0aad0a]">
        Login now
      </h2>
      <form onSubmit={Formik.handleSubmit} className="max-w-md mx-auto">
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="email"
            name="email"
            value={Formik.values.email}
            onChange={Formik.handleChange}
            onBlur={Formik.handleBlur}
            id="email"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300
             appearance-none focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="email"
            className="peer-focus:font-medium left-0 absolute text-sm text-gray-500 duration-300 transform -translate-y-6
             scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto
              peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100
               peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter Your Email
          </label>
          {Formik.errors.email && Formik.touched.email ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50"
              role="alert"
            >
              <span className="font-medium">{Formik.errors.email}</span>
            </div>
          ) : null}
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="password"
            name="password"
            value={Formik.values.password}
            onChange={Formik.handleChange}
            onBlur={Formik.handleBlur}
            id="password"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300
             appearance-none focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="password"
            className="peer-focus:font-medium left-0 absolute text-sm text-gray-500 duration-300 transform -translate-y-6
             scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto
              peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100
               peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter Your Password
          </label>
          {Formik.errors.password && Formik.touched.password ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50"
              role="alert"
            >
              <span className="font-medium">{Formik.errors.password}</span>
            </div>
          ) : null}
        </div>

        <div className="">
            
            <Link className=" text-[#0aad0a] hover:underline hover:text-[#0aad0a] " to={"/forgotpassword"}>
            FogotPassword?
            </Link>
         
          <button
            type="submit"
            className="btn my-3"
          >
            {isLoading ? <i className="fas fa-spinner fa-spin"></i> : "Login"}
          </button>
          <span className=" text-gray-500">
          New to FreshCart?{" "}
            <Link className="text-[#0aad0a] hover:underline hover:text-[#0aad0a] " to={"/register"}>
            Signup now!!
            </Link>
          </span>
        </div>
      </form>
        </div>
      
    </>
  );
}





















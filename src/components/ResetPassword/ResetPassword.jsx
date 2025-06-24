import React from "react";

import * as yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function ResetPassword() {
  let navigate = useNavigate();

  
  const email = localStorage.getItem("userEmail");
if (!email) {
  toast.error("No email found. Please request reset code again.");
  navigate("/forgotpassword");
  return;
}

  function handleResetPassword(values) {
    axios
      .put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`, {
        email: email, 
        newPassword: values.newPassword,
      })
      .then((res) => {
        if (res.data.token) {
          toast.success("Password Reset Successfully!", {
            position: "top-right",
            style: {
              background: "#4fa74f",
              padding: "16px",
              color: "white",
            },
          });
          localStorage.removeItem("userEmail");
          navigate("/login"); 
        }
      })
      .catch((err) => {
        toast.error(err.response?.data?.message || "Error", {
          position: "top-right",
          style: {
            background: "red",
            padding: "16px",
            color: "white",
          },
        });
        console.log(err);
      });
  }

 
  let myValidation = yup.object({
      newPassword: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
  });

  let formik = useFormik({
    initialValues: {
      newPassword: "",
    },
    validationSchema :myValidation,
    onSubmit: handleResetPassword,
  });

  return (
    <div className="mx-auto sm:w-3/4 md:w-1/2 my-5 bg-light shadow-xl p-10 bg-[#f8f9fa]  rounded-2xl">
      <h2 className="text-2xl font-bold text-center my-4 text-[#0aad0a]">
        Reset Your Password
      </h2>
      <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto">
        <div className="relative z-0 w-full mb-5 group">
  <input
    type="email"
    name="email"
    id="email"
    value={email}
    readOnly
    className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-gray-100 border-0 border-b-2 border-gray-300
     appearance-none focus:outline-none focus:ring-0 focus:border-gray-400 peer cursor-not-allowed"
    placeholder=" "
  />
  <label
    htmlFor="email"
    className="peer-focus:font-medium left-0 absolute text-sm text-gray-500 duration-300 transform -translate-y-6
     scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto
      peer-focus:text-gray-400 peer-placeholder-shown:scale-100
       peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
  >
    Email
  </label>
</div>

        <div className="relative z-0 w-full mb-5 group">
          <input
            type="password"
            name="newPassword"
            id="newPassword"
            value={formik.values.newPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300
             appearance-none focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="newPassword"
            className="peer-focus:font-medium left-0 absolute text-sm text-gray-500 duration-300 transform -translate-y-6
             scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto
              peer-focus:text-emerald-600 peer-placeholder-shown:scale-100
               peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            New Password
          </label>
          {formik.errors.newPassword && formik.touched.newPassword && (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50"
              role="alert"
            >
              <span className="font-medium">{formik.errors.newPassword}</span>
            </div>
          )}
        </div>

        <button type="submit" className="btn my-3">
          Reset Password
        </button>
      </form>
    </div>
  );
}

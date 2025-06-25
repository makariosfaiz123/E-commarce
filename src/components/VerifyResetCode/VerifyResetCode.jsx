import React from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function VerifyResetCode() {
  let navigate = useNavigate();

  function handleVerifyCode(valuas) {
    axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`, {
        resetCode: valuas.resetCode.toString(), 
      })
      .then((res) => {
        console.log(res);

        if (res.data.status == "Success") {
          navigate("/ResetPassword");
          toast.success("Code Verified Successfully!", {
            position: "top-right",
            style: {
              background: "#4fa74f",
              padding: "16px",
              color: "white",
            },
          });
        }
      })
      .catch((res) => {
        toast.error(res.message, {
          position: "top-right",
          style: {
            background: "red",
            padding: "16px",
            color: "white",
          },
        });

        console.log(res);
      });
  }

  let myValidation = yup.object().shape({
    resetCode: yup
      .string()
      .required()
      .matches(/^[0-9]{6}||[0-9]{5}$/, "phone not valid"),
  });

  let Formik = useFormik({
    initialValues: {
      resetCode: "",
    },
    validationSchema: myValidation,
    onSubmit: handleVerifyCode,
  });

  return (
    <>
      <div className="mx-auto sm:w-3/4 md:w-1/2 my-5 bg-light shadow-xl p-10 bg-[#f8f9fa]  rounded-2xl">
        <h2 className="text-2xl font-bold text-center my-4 text-[#0aad0a]">
          Account Recovery
        </h2>
        <form onSubmit={Formik.handleSubmit} className="max-w-md mx-auto">
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="resetCode"
              value={Formik.values.resetCode}
              onChange={Formik.handleChange}
              onBlur={Formik.handleBlur}
              id="resetCode"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300
             appearance-none focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="resetCode"
              className="peer-focus:font-medium left-0 absolute text-sm text-gray-500 duration-300 transform -translate-y-6
             scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto
              peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100
               peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Reset Code:
            </label>
            {Formik.errors.resetCode && Formik.touched.resetCode ? (
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50"
                role="alert"
              >
                <span className="font-medium">{Formik.errors.resetCode}</span>
              </div>
            ) : null}
          </div>

          <div className="flex gap-4 items-center">
            <button type="submit" className="btn my-3">
              Send Reset Code
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

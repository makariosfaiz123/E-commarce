import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import Products from "./components/Products/Products";
import Cart from "./components/Cart/Cart";
import Brands from "./components/Brands/Brands";
import Categories from "./components/Categories/Categories";
import Login from "./components/Login/Login";
import Notfound from "./components/Notfound/Notfound";
import Register from "./components/Register/Register";
import CounterContextProvider from "./Context/CounterContext";
import UserContextProvider from "./Context/UserContext";
import ProtectedRouter from "./components/ProtectedRouter/ProtectedRouter";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import CartContextProvider from "./Context/CartContext";
import { Toaster } from "react-hot-toast";
import Chechout from "./components/Chechout/Chechout";
import Allorders from "./components/Allorders/Allorders";
import Wishlist from "./components/Wishlist/Wishlist";
import ListContextProvider from "./Context/ListContext";
import ForgotPass from "./components/ForgotPass/ForgotPass";
import VerifyResetCode from "./components/VerifyResetCode/VerifyResetCode";
import ResetPassword from "./components/ResetPassword/ResetPassword";

let query = new QueryClient();

let x = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRouter>
            {" "}
            <Home />
          </ProtectedRouter>
        ),
      },
      {
        path: "products",
        element: (
          <ProtectedRouter>
            {" "}
            <Products />
          </ProtectedRouter>
        ),
      },
      {
        path: "cart",
        element: (
          <ProtectedRouter>
            <Cart />{" "}
          </ProtectedRouter>
        ),
      },
      {
        path: "brands",
        element: (
          <ProtectedRouter>
            <Brands />{" "}
          </ProtectedRouter>
        ),
      },
      {
        path: "checkout",
        element: (
          <ProtectedRouter>
            <Chechout />{" "}
          </ProtectedRouter>
        ),
      },
      {
        path: "allorders",
        element: (
          <ProtectedRouter>
            <Allorders />{" "}
          </ProtectedRouter>
        ),
      },
      {
        path: "wishlist",
        element: (
          <ProtectedRouter>
            <Wishlist />{" "}
          </ProtectedRouter>
        ),
      },
      {
        path: "productdetails/:id/:category",
        element: (
          <ProtectedRouter>
            <ProductDetails />{" "}
          </ProtectedRouter>
        ),
      },
      {
        path: "categories",
        element: (
          <ProtectedRouter>
            {" "}
            <Categories />
          </ProtectedRouter>
        ),
      },
      { path: "login", element: <Login /> },
      { path: "forgotpassword", element: <ForgotPass /> },
      { path: "verifyresetcode", element: <VerifyResetCode /> },
      { path: "ResetPassword", element: <ResetPassword /> },
      { path: "register", element: <Register /> },
      { path: "*", element: <Notfound /> },
    ],
  },
]);
function App() {
  return (
    <>
      <UserContextProvider>
        <CounterContextProvider>
          <QueryClientProvider client={query}>
            <CartContextProvider>
              <ListContextProvider>
                <RouterProvider router={x}></RouterProvider>
                <Toaster />
              </ListContextProvider>
            </CartContextProvider>
            <ReactQueryDevtools />
          </QueryClientProvider>
        </CounterContextProvider>
      </UserContextProvider>
    </>
  );
}

export default App;

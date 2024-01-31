import React from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MainPage, loader as mainLoader } from './pages/main';
import { NotFound } from './pages/not-found';
import { CartPage } from './pages/cart';
import { Layout } from './components/layout';
import { ProductPage, loader as productLoader, } from './pages/product';

const router = createBrowserRouter([
  {
    path: "*",
    element: <NotFound />,
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <MainPage />,
        loader: mainLoader,
      },
      {
        path: "/cart",
        element: <CartPage />,
      },
      {
        path: "/:productId",
        element: <ProductPage />,
        loader: productLoader,
        errorElement: <NotFound />
      },
    ]
  },
]);

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <RouterProvider router={router} />
      </header>
    </div>
  )
}

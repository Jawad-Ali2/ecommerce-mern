import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ProductForm from "../pages/admin/AddProduct";
import Cart from "../pages/shop/Cart";
import ProductList from "../pages/admin/ProductList";
import { RootLayout } from "../main";
import Orders from "../pages/shop/Orders";
import ProductDetails from "../pages/shop/ProductDetails";
import AddProduct from "../pages/admin/AddProduct";
import EditProduct from "../pages/admin/EditProduct";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <App />,
      },
      {
        path: "/products",
        // element to be decide
        children: [
          {
            path: ":id",
            element: <ProductDetails />,
          },
        ],
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/orders",
        element: <Orders />,
      },
      {
        path: "/admin",
        children: [
          {
            path: "products",
            element: <ProductList />,
          },
          {
            path: "add-product",
            element: <AddProduct />,
          },
          {
            path: "edit-product",
            children: [
              {
                path: ":id",
                element: <EditProduct />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

export default router;

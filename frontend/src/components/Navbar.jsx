import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header className="w-[100%] h-[3.5rem] flex items-center bg-yellow-700  px-[1.5rem]">
      <nav className="height-[100%]">
        <ul className="flex items-center ">
          <li className="text-white ml-[1rem]">
            <Link to="/">Shop</Link>
          </li>
          <li className="text-white ml-[1rem]">
            <Link to="/products">Products</Link>
          </li>
          <li className="text-white ml-[1rem]">
            <Link to="/cart">Cart</Link>
          </li>
          <li className="text-white ml-[1rem]">
            <Link to="/orders">Orders</Link>
          </li>
          <li className="text-white ml-[1rem]">
            <Link to="/admin/add-product">Add Product</Link>
          </li>
          <li className="text-white ml-[1rem]">
            <Link to="/admin/products">Admin Product</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;

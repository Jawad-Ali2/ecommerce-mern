import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookie from "js-cookie";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  // useEffect(() => {
  //   async function getData() {
  //     try {
  //       const response = await fetch("http://localhost:8000/home", {
  //         credentials: "include",
  //       });

  //       if (response.ok) {
  //         const items = await response.json();
  //         // setIsAuthenticated(items.isLoggedIn);
  //         login();
  //       }
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }

  //   getData();
  // }, []);

  async function handleLogout(e) {
    e.preventDefault();

    const response = await fetch("http://localhost:8000/logout", {
      method: "POST",
      credentials: "include",
    });

    if (response.ok) {
      // setIsAuthenticated(false);
      logout();
      navigate("/login");
    }
  }

  console.log(isAuthenticated);

  return (
    <header className="w-[100%] h-[3.5rem] bg-yellow-700 px-[1.5rem]">
      <nav className="h-[100%] flex justify-between items-center">
        <ul className="flex items-center">
          <li className="text-white ml-[1rem]">
            <Link to="/">Shop</Link>
          </li>
          <li className="text-white ml-[1rem]">
            <Link to="/products">Products</Link>
          </li>
          {isAuthenticated && (
            <>
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
            </>
          )}
        </ul>
        <ul className="flex">
          {!isAuthenticated ? (
            <>
              <li className="text-white ml-[1rem]">
                <Link to="/login">Login</Link>
              </li>
              <li className="text-white ml-[1rem]">
                <Link to="/signup">SignUp</Link>
              </li>
            </>
          ) : (
            <li className="text-white ml-[1rem]">
              <button onClick={handleLogout}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getCartItems();
  }, []);

  async function getCartItems() {
    try {
      const response = await fetch(`http://localhost:8000/cart`);
      if (response.ok) {
        const result = await response.json();
        setCartItems(result);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDelete(id, productPrice) {
    try {
      const response = await fetch(`http://localhost:8000/delete-item/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          price: productPrice,
        }),
      });
      if (response.ok) {
        getCartItems();
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handlePostOrder() {
    try {
      const response = await fetch("http://localhost:8000/add-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });
      if (response.ok) {
        navigate("/orders");
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <section className="flex items-center py-16 bg-gray-50 font-poppins dark:bg-gray-800 ">
      <div className="justify-center flex-1 max-w-4xl px-6 py-6 mx-auto bg-gray-100 rounded-md shadow-md dark:border-gray-900 dark:bg-gray-900 lg:py-10 lg:px-10">
        <div className="max-w-4xl mx-auto mb-10">
          <h2 className="mb-4 text-xl font-medium dark:text-gray-400">
            Your Cart:
          </h2>
          {cartItems.map((item) => {
            return (
              <div
                key={item._id}
                className="p-10 mb-8 bg-white rounded-md shadow dark:bg-gray-800 sm:flex sm:items-center xl:py-5 xl:px-12"
              >
                <Link to={`/products/${item._id}`} className="mr-6 md:mr-12">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className=" w-full lg:w-[80px] h-[200px] lg:h-[80px]  object-cover  mx-auto mb-6 sm:mb-0 "
                  />
                </Link>
                <div>
                  <Link
                    className="inline-block mb-1 text-lg font-medium hover:underline dark:text-gray-400"
                    to={`/products/${item._id}`}
                  >
                    {item.title}
                  </Link>
                  <div className="flex flex-wrap">
                    <p className="text-sm font-medium dark:text-gray-400">
                      <span>Qty:</span>
                      <span className="ml-2 text-gray-400">
                        {item.quantity}
                      </span>
                    </p>
                  </div>
                  <button
                    onClick={() => handleDelete(item._id, item.price)}
                    className="p-2 my-4 bg-blue-700 text-white rounded-md"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="max-w-4xl mx-auto ">
          <h2 className="mb-4 text-xl font-medium dark:text-gray-400 ">
            Order Details:
          </h2>
          <div className="grid grid-cols-1 gap-8 mb-10 lg:grid-cols-3">
            <div className="relative flex items-center justify-between px-10 py-3 font-medium leading-8 bg-white bg-opacity-50 rounded-md shadow dark:text-gray-400 dark:bg-gray-800">
              <div className="absolute right-0 flex items-center justify-center bg-blue-500 rounded-md w-14 h-14 dark:bg-gray-600">
                <div className="flex items-center justify-center text-lg font-bold text-blue-500 bg-gray-100 rounded-full dark:text-gray-300 dark:bg-gray-700 w-11 h-11">
                  {cartItems.length}
                </div>
              </div>
              <span className="mr-16">Products</span>
            </div>
            <div className="flex items-center justify-between px-10 py-3 font-medium leading-8 bg-white rounded-md shadow dark:text-gray-400 dark:bg-gray-800 font-heading">
              <span>Total</span>
              <span className="flex items-center text-blue-500 dark:text-blue-400">
                <span className="ml-3 mr-1 text-sm">Rs.</span>
                <span className="text-xl">7,000</span>
              </span>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-4 ">
            <Link to={"/"}>
              <button className="w-full px-6 py-3 text-blue-500 border border-blue-500 rounded-md md:w-auto hover:text-gray-100 hover:bg-blue-600 dark:border-gray-800 dark:hover:bg-gray-800 dark:text-gray-300">
                Go back shopping
              </button>
            </Link>
            <button
              onClick={handlePostOrder}
              className="w-full px-6 py-3 text-gray-100 bg-blue-500 rounded-md md:w-auto dark:text-gray-300 hover:bg-blue-600 dark:hover:bg-gray-800 dark:bg-gray-700"
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

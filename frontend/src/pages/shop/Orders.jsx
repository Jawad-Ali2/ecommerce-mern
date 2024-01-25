import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await fetch("http://localhost:8000/orders");

        if (response.ok) {
          const result = await response.json();
          setOrders(result);
        }
      } catch (err) {
        console.log(err);
      }
    }
    fetchOrders();
  }, []);

  return (
    <section className="flex items-center py-16 bg-gray-50 font-poppins dark:bg-gray-800 ">
      <div className="justify-center flex-1 max-w-4xl px-6 py-6 mx-auto bg-gray-100 rounded-md shadow-md dark:border-gray-900 dark:bg-gray-900 lg:py-10 lg:px-10">
        <div className="mb-16 text-center">
          <h1 className="mb-6 text-2xl font-semibold leading-7 tracking-wide text-gray-700 lg:text-4xl dark:text-gray-300 lg:leading-9">
            Thank you for your Order, John!
            {orders.title}
          </h1>
          {/* <p className="text-lg text-gray-500 dark:text-gray-400">
            your order number is: 012736373737
          </p> */}
        </div>
        <div className="max-w-4xl mx-auto mb-10">
          <h2 className="mb-4 text-xl font-medium dark:text-gray-400">
            What you ordered:
          </h2>
          {orders.map((order) => {
            return (
              <div key={order._id}>
                <p className="text-lg mr-4 font-medium dark:text-gray-400">
                  <span>Order# </span>
                  <span className="ml-2 text-gray-400">{order._id}</span>
                </p>
                {order.products.map((product) => {
                  return (
                    <div
                      key={product.product._id}
                      className="p-10 mb-8 bg-white rounded-md shadow dark:bg-gray-800 sm:flex sm:items-center xl:py-5 xl:px-12"
                    >
                      <Link
                        to={`http:localhost://product/${product.product._id}`}
                        className="mr-6 md:mr-12"
                      >
                        <img
                          src={product.product.imageUrl}
                          alt={product.product.title}
                          className=" w-full lg:w-[80px] h-[200px] lg:h-[80px]  object-cover  mx-auto mb-6 sm:mb-0 "
                        />
                      </Link>
                      <div>
                        <Link
                          className="inline-block mb-1 text-lg font-medium hover:underline dark:text-gray-400"
                          to={`http:localhost://product/${product.product.id}`}
                        >
                          {product.product.title}
                        </Link>
                        <div className="flex flex-wrap">
                          <p className="text-sm mr-4 font-medium dark:text-gray-400">
                            <span>Qty:</span>
                            <span className="ml-2 text-gray-400">
                              {product.quantity}
                            </span>
                          </p>
                          <p className="text-sm mr-4 font-medium dark:text-gray-400">
                            <span>Price:</span>
                            <span className="ml-2 text-gray-400">
                              $ {product.product.price}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
        <div className="max-w-4xl mx-auto ">
          <h2 className="mb-4 text-xl font-medium dark:text-gray-400 ">
            Order Details:
          </h2>
          <div className="grid grid-cols-1 gap-8 mb-10 lg:grid-cols-3">
            <div className="flex items-center justify-between px-10 py-3 font-medium leading-8 bg-white bg-opacity-50 rounded-md shadow dark:text-gray-400 dark:bg-gray-800 font-heading">
              <span>Shipping</span>
              <span className="flex items-center">
                <span className="ml-3 mr-1 text-sm">Rs.</span>
                <span className="text-xl">4,000</span>
              </span>
            </div>
            <div className="relative flex items-center justify-between px-10 py-3 font-medium leading-8 bg-white bg-opacity-50 rounded-md shadow dark:text-gray-400 dark:bg-gray-800">
              <div className="absolute right-0 flex items-center justify-center bg-blue-500 rounded-md w-14 h-14 dark:bg-gray-600">
                <div className="flex items-center justify-center text-lg font-bold text-blue-500 bg-gray-100 rounded-full dark:text-gray-300 dark:bg-gray-700 w-11 h-11">
                  2
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
            <button className="w-full px-6 py-3 text-blue-500 border border-blue-500 rounded-md md:w-auto hover:text-gray-100 hover:bg-blue-600 dark:border-gray-800 dark:hover:bg-gray-800 dark:text-gray-300">
              Go back shopping
            </button>
            <button className="w-full px-6 py-3 text-gray-100 bg-blue-500 rounded-md md:w-auto dark:text-gray-300 hover:bg-blue-600 dark:hover:bg-gray-800 dark:bg-gray-700">
              Download Invoice
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

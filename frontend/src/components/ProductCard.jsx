import { Link, useNavigate } from "react-router-dom";

export default function ProductCard({
  item,
  isAdmin = false,
  handleDelete = () => {}, // Optional function
}) {
  const navigate = useNavigate();

  async function handleAddToCart(e) {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },

        body: JSON.stringify({
          product: item,
        }),
      });
      if (response.ok) {
        navigate("/cart");
      } else {
        console.error("Error adding in the cart");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <Link to={`/products/${item.id}`}>
        <img
          className="rounded-t-lg"
          src={
            item.imageUrl
              ? item.imageUrl
              : "https://images.pexels.com/photos/279906/pexels-photo-279906.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          }
          alt={item.title}
          // https://images.pexels.com/photos/279906/pexels-photo-279906.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1
        />
      </Link>
      <div className="p-5">
        <Link className="flex justify-between" to="#">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {item.title}
          </h5>
          <p className="text-white text-3xl">${item.price}</p>
        </Link>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {item.description}
        </p>
        {!isAdmin ? (
          <div className="flex justify-between gap-[2rem] ">
            <button
              onClick={handleAddToCart}
              className="px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Add to cart
            </button>
            <Link
              to={`/products/${item.id}`}
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Details
              <svg
                className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </Link>
          </div>
        ) : (
          <div className="flex justify-between gap-[2rem] ">
            <Link
              to={`/admin/edit-product/${item.id}`}
              className=" inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Edit
            </Link>
            <button
              onClick={() => handleDelete(item.id)}
              className="px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

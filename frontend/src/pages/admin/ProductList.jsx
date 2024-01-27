import { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard";
import Cookie from "js-cookie";
import { useNavigate } from "react-router-dom";

export default function ProductList() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    try {
      const response = await fetch("http://localhost:8000/admin/products", {
        credentials: "include",
      });

      if (response.ok) {
        const items = await response.json();
        setData(items);
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function handleDelete(id) {
    try {
      const response = await fetch(
        `http://localhost:8000/admin/delete-product/${id}`,
        {
          credentials: "include",
          method: "DELETE",
          headers: {
            "CSRF-TOKEN": Cookie.get("CSRF-TOKEN"),
          },
        }
      );
      if (response.ok) {
        const result = await response.json();
        setData(result);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <h1 className="m-[3rem] text-5xl font-bold">Shop</h1>
      <ul className="flex items-stretch justify-center flex-wrap gap-3">
        {data.map((item, index) => {
          return (
            <ProductCard
              key={index}
              item={item}
              isAdmin={true}
              handleDelete={handleDelete}
            />
          );
        })}
      </ul>
    </>
  );
}

import { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard";

export default function ProductList() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    try {
      const response = await fetch("http://localhost:8000/admin/products");
      const items = await response.json();
      setData(items);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleDelete(id) {
    try {
      const response = await fetch(
        `http://localhost:8000/admin/delete-product/${id}`,
        {
          method: "DELETE",
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

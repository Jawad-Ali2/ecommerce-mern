import { useState, useEffect } from "react";
import ProductCard from "./components/ProductCard";

function AdminProducts() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    try {
      const response = await fetch("http://localhost:8000/admin/products");
      const items = await response.json();
      console.log(items);
      setData(items);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <h1 className="m-[3rem] text-5xl font-bold">Shop</h1>
      <ul className="flex items-center justify-center flex-wrap gap-3">
        {data.map((item, index) => {
          return <ProductCard key={index} item={item} />;
        })}
      </ul>
    </>
  );
}

export default AdminProducts;

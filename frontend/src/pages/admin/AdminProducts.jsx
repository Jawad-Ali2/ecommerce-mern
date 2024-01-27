import { useState, useEffect } from "react";
import ProductCard from "./components/ProductCard";
import { useNavigate } from "react-router-dom";

function AdminProducts() {
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
        console.log("ldkjgad");
        const items = await response.json();
        setData(items);
      } else {
        console.log("ldkgjsjdgkdj");
        navigate("/login");
      }
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

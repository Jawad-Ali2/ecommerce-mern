import { useState, useEffect, useContext } from "react";
import ProductCard from "./components/ProductCard";
import { AuthContext } from "./context/AuthContext";

function App() {
  const [data, setData] = useState([]);
  const { setIsAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    async function getData() {
      try {
        const response = await fetch("http://localhost:8000/home", {
          credentials: "include",
        });

        if (response.ok) {
          const items = await response.json();
          setData(items.products);
          setIsAuthenticated(items.isLoggedIn);
        }
      } catch (error) {
        console.error(error);
      }
    }

    getData();
  }, []);

  return (
    <>
      <h1 className="m-[3rem] text-5xl font-bold">Shop</h1>
      <ul className="flex items-stretch justify-center flex-wrap gap-3">
        {data.map((item, index) => {
          return <ProductCard key={index} item={item} />;
        })}
      </ul>
    </>
  );
}

export default App;

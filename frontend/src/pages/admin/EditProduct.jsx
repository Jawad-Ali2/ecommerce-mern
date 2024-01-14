import { useParams } from "react-router-dom";
import ProductForm from "../../components/ProductForm";
import { useEffect, useState } from "react";

export default function EditProduct() {
  const [product, setProduct] = useState({});
  const params = useParams();

  useEffect(() => {
    fetchProductData();
  }, []);

  async function fetchProductData() {
    try {
      const response = await fetch(
        `http://localhost:8000/admin/edit-product/${params.id}`
      );
      const result = await response.json();
      setProduct(result);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      {Object.keys(product).length > 0 && (
        <ProductForm isEdit={true} product={product} />
      )}
    </>
  );
}

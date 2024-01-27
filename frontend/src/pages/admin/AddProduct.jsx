import { useContext, useEffect } from "react";
import ProductForm from "../../components/ProductForm";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

function AddProduct() {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  });

  return (
    <>
      <ProductForm isEdit={false} />
    </>
  );
}

export default AddProduct;

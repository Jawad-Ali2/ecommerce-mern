import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function ProductForm({ isEdit = false, product = {} }) {
  const [title, setTitle] = useState(() => product.title);
  const [image, setImage] = useState(() => product.imageUrl);
  const [price, setPrice] = useState(() => product.price);
  const [description, setDescription] = useState(() => product.description);
  const navigate = useNavigate();
  const params = useParams();

  async function handleAddSubmit(e) {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/admin/add-product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: crypto.randomUUID(),
          title: title,
          imageUrl: image,
          description: description,
          price: price,
        }),
      });
      if (response.ok) {
        navigate("/");
      } else {
        console.error("Error submitting data");
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function handleEditSubmit(e) {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/admin/edit-product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: params.id,
          title: title,
          image: image,
          price: price,
          description: description,
        }),
      });
      if (response.ok) {
        navigate("/admin/products");
      } else {
        console.error("Error updating product");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <h1 className="m-[3rem] text-5xl font-bold">
        {isEdit ? "Edit Product" : "Add Product"}
      </h1>
      <form
        className="text-center"
        onSubmit={isEdit ? handleEditSubmit : handleAddSubmit}
      >
        <div>
          <label htmlFor="title">Title</label>
          <input
            className="border-black border-2 border-solid rounded-md p-2 m-3"
            type="text"
            name="title"
            id="title"
            defaultValue={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="imageUrl">Image URL</label>
          <input
            className="border-black border-2 border-solid rounded-md p-2 m-3"
            type="text"
            name="imageUrl"
            id="imageUrl"
            defaultValue={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="price">Price</label>
          <input
            className="border-black border-2 border-solid rounded-md p-2 m-3"
            type="number"
            name="price"
            id="price"
            defaultValue={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="descripition">Description</label>
          <textarea
            name="description"
            id="description"
            cols="30"
            rows="5"
            defaultValue={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <button className="rounded-md p-2 bg-blue-200" type="submit">
          {isEdit ? "Edit" : "Add"}
        </button>
      </form>
    </>
  );
}

export default ProductForm;

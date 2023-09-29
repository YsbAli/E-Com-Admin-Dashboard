import { useState } from "react";
import { toast } from "react-toastify";

function UpdateProduct() {
  const [title, setTitle] = useState();
  const [price, setPrice] = useState();
  const [category, setCategory] = useState();
  const [company, setComapy] = useState();

  const [error, setError] = useState(false);
  //
  const UpdateProduct = async (e) => {
    e.preventDefault();
    if (!title || !price || !category || !company) {
      setError(true);
      return false;
    }

    const product = await fetch("http://localhost:5002/add-Product", {
      method: "post",
      body: JSON.stringify({ title, price, category, company }),
      headers: {
        "Content-type": "application/json",
      },
    });
    const productdata = await product.json();
    console.log(productdata);

    toast.success("Product Added...", {
      position: toast.POSITION.TOP_CENTER,
    });
    setTitle("");
    setPrice("");
    setCategory("");
    setComapy("");
  };

  return (
    <div className="main">
      <h1>Update Products</h1>
      <input
        onChange={(e) => setTitle(e.target.value)}
        className="input-box"
        type="text"
        value={title}
        placeholder="Enter Product title"
      />

      {error && !title && (
        <span className="input-invallid">Enter valid title</span>
      )}
      <input
        onChange={(e) => setPrice(e.target.value)}
        className="input-box"
        type="text"
        value={price}
        placeholder="Enter Product Price"
      />
      {error && !price && (
        <span className="input-invallid">Enter valid Price</span>
      )}

      <input
        onChange={(e) => setCategory(e.target.value)}
        className="input-box"
        type="text"
        value={category}
        placeholder="Enter Product Category"
      />
      {error && !category && (
        <span className="input-invallid">Enter valid Category</span>
      )}

      <input
        onChange={(e) => setComapy(e.target.value)}
        className="input-box"
        type="text"
        value={company}
        placeholder="Enter Product Company"
      />
      {error && !company && (
        <span className="input-invallid">Enter valid Company</span>
      )}

      <button onClick={UpdateProduct} className="btn">
        Update Product
      </button>
    </div>
  );
}

export default UpdateProduct;

import { useState } from "react";
import { toast } from "react-toastify";

function AddProduct() {
  const [title, setTitle] = useState();
  const [price, setPrice] = useState();
  const [category, setCategory] = useState();
  const [company, setComapy] = useState();

  //
  const AddProduct = async (e) => {
    e.preventDefault();
    // console.log(title, price, category, company);
    const user_id = JSON.parse(localStorage.getItem("usersdata"))._id
    // console.log(user_id)
    const product = await fetch("http://localhost:5002/addproducts", {
      method: "post",
      body: JSON.stringify({ title, price, category, company }),
      headers: {
        "Content-type": "application/json",
      },
    });
    const productdata = await product.json();
    console.log(productdata);
    setTitle(""); 
    setPrice("");
    setCategory("");
    setComapy("");
    toast.success("Product Added...", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  return (
    <div className="main">
      <h1>Add Products</h1>
      <input
        onChange={(e) => setTitle(e.target.value)}
        className="input-box"
        type="text"
        value={title}
        placeholder="Enter Product title"
      />
      <input
        onChange={(e) => setPrice(e.target.value)}
        className="input-box"
        type="text"
        value={price}
        placeholder="Enter Product Price"
      />
      <input
        onChange={(e) => setCategory(e.target.value)}
        className="input-box"
        type="text"
        value={category}
        placeholder="Enter Product Category"
      />
      <input
        onChange={(e) => setComapy(e.target.value)}
        className="input-box"
        type="text"
        value={company}
        placeholder="Enter Product Company"
      />
      <button onClick={AddProduct} className="btn">
        ADD Product
      </button>
    </div>
  );
}

export default AddProduct;

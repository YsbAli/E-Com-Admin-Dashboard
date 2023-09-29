import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function UpdateProduct() {
  const [title, setTitle] = useState();
  const [price, setPrice] = useState();
  const [category, setCategory] = useState();
  const [company, setCompany] = useState();
  const [error, setError] = useState(false);

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    GetProductDetails();
  }, []);

  //getting the product details from api and prefill to the update form
  const GetProductDetails = async () => {
    const data = await fetch(`http://localhost:5002/api/products/${params.id}`);
    const productdata = await data.json();
    setTitle(productdata.title);
    setPrice(productdata.price);
    setCategory(productdata.category);
    setCompany(productdata.company);
  };

  const UpdateProduct = async () => {
    // console.log({ title, price, category, company });

    const data = await fetch(`http://localhost:5002/api/update-product/${params.id}`, {
      method: "PATCH",
      body: JSON.stringify({ title, price, category, company }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const updatedata = await data.json();
    console.log(updatedata);
    navigate("/");
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
        onChange={(e) => setCompany(e.target.value)}
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

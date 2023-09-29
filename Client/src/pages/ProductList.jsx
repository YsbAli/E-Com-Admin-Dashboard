import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {Link} from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    GetAllProducts();
  }, []);

  const GetAllProducts = async () => {
    const data = await fetch("http://localhost:5002/all-Products");
    const allproducts = await data.json();
    setProducts(allproducts);
  };

  // console.log(products);

  const DeleteProduct = async (id) => {
    const item = await fetch(`http://localhost:5002/product/${id}`, {
      method: "delete",
    });
    const result = await item.json();
    toast.success("Product Deleted !", {
      position: toast.POSITION.TOP_CENTER,
    });
    if (result) {
      GetAllProducts();
    }
  };

  return (
    <>
      <div className="product-list">
        <h1>Product List</h1>
        <ul>
          <li>S No.</li>
          <li>Title</li>
          <li>Price</li>
          <li>Category</li>
          <li>Company</li>
          <li>Operations</li>
        </ul>
        {products.map((item, i) => (
          <ul key={i}>
            <li>{i + 1}</li>
            <li>{item.title}</li>
            <li>{item.price}</li>
            <li>{item.category}</li>
            <li>{item.company}</li>
            <li>
              <button onClick={() => DeleteProduct(item._id)} className="">
                Delete
              </button>
              <Link to={`/update-products/${item._id}`}>
                <button>Update</button>
              </Link>
            </li>
          </ul>
        ))}
      </div>
    </>
  );
};

export default ProductList;

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    GetAllProducts();
  }, []);

  //get all products
  const GetAllProducts = async () => {
    const data = await fetch("http://localhost:5002/api/products", {
      headers: {
        authorization : JSON.parse(localStorage.getItem("AuthToken")),
      },
    });
    const allproducts = await data.json();
    setProducts(allproducts);
  };

  //delete products
  const DeleteProduct = async (id) => {
    const item = await fetch(`http://localhost:5002/api/delete-product/${id}`, {
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

  //search product
  const HandleSearch = async (e) => {
    // console.log(e.target.value);
    const key = e.target.value;
    if (key) {
      const search = await fetch(`http://localhost:5002/api/search/${key}`);
      const searchdata = await search.json();
      if (searchdata) {
        setProducts(searchdata);
      }
    } else {
      GetAllProducts();
    }
  };

  return (
    <>
      <div className="product-list">
        <h1>Product List</h1>
        <input
          type="text"
          className="search-box"
          placeholder="Search Product"
          onChange={HandleSearch}
        />
        <ul>
          <li>S No.</li>
          <li>Title</li>
          <li>Price</li>
          <li>Category</li>
          <li>Company</li>
          <li>Operations</li>
        </ul>
        {products.length > 0 ? (
          products.map((item, i) => (
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
          ))
        ) : (
          <h1>No Result Found !</h1>
        )}
      </div>
    </>
  );
};

export default ProductList;

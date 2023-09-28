import { useEffect, useState } from "react";

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

  console.log(products);
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
        </ul>
        {products.map((item, i) => (
          <ul key={i}>
            <li>{i + 1}</li>
            <li>{item.title}</li>
            <li>{item.price}</li>
            <li>{item.category}</li>
            <li>{item.company}</li>
          </ul>
        ))}

        {/* <table  className="product-list">
        <tr>
          <th>S. No</th>
          <th>Title</th>
          <th>Price</th>
          <th>Catetory</th>
          <th>Company</th>
        </tr>
        {products.map((item, i) => (
          <tr key={i}>
            <td>{i + 1}</td>
            <td>{item.title}</td>
            <td>{item.price}</td>
            <td>{item.category}</td>
            <td>{item.company}</td>
          </tr>
        ))}
      </table> */}
      </div>
    </>
  );
};

export default ProductList;

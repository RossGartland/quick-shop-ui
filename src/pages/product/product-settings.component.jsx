import React from "react";
import { Link, useLocation } from "react-router-dom";
import EditProduct from "../../components/products/edit-product/edit-product.component";
import OnSale from "../../components/products/edit-product/on-sale.component";

function ProductSettings() {
  const location = useLocation();
  const { storeID, product } = location.state;

  console.log(product);
  return (
    <div className="container">
      <h1>Product Settings for {product.name}</h1>
      <hr />
      <EditProduct storeID={storeID} product={product} />
      <hr />
      <OnSale product={product} />
    </div>
  );
}
export default ProductSettings;

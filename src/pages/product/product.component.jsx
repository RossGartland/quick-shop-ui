import React, { useEffect, useState } from "react";
import AuthService from "../../services/auth.service";
import productService from "../../services/product.service";
import { useLocation } from "react-router-dom";

function Product() {
  const currentUser = AuthService.getCurrentUser();
  const [userDetails, setUserDetails] = useState([]);
  const [productItem, setProductItem] = useState([]);
  const location = useLocation();
  const { productID } = location.state;

  useEffect(() => {
    if (currentUser !== null) {
      productService
        .getProduct(productID)
        .then((productItem) => setProductItem(productItem))
        .catch((error) => {});
    }
  }, []);
  return (
    <div>
      <div>
        <div className="jumbotron jumbotron-fluid bg-white">
          <div className="container bg-white">
            <div className="align-center p-3">
              <img
                src="https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg"
                alt="Card cap"
                className="mr-3 mt-3 align-cente"
              />
              <div className="">
                <h3 className="display-5">{productItem.name}</h3>
                <p className="lead">{productItem.description}</p>
                <p className="lead">£{productItem.price}</p>
                <p className="lead">In stock: {productItem.volume}</p>
                <button type="button" className="btn btn-warning">
                  Add to basket
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Product;

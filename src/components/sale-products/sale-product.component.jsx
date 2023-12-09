import React from "react";
import { Link } from "react-router-dom";

function SaleProduct(props) {
  return (
    <div className="card">
      <img src={props.image} className="card-img-top" alt="..." height={200} />
      <div className="card-body">
        <h5 className="card-title">
          {props.brandName} {props.name}
        </h5>
        <div style={{ backgroundColor: "yellow", width: "50%" }}>
          <p className="font-weight-bold">
            Was £{props.price} <br />
            Now £{props.salePrice}
          </p>
        </div>
        <Link
          to={"/stores/" + props.storeID}
          state={{
            storeID: props.storeID,
          }}
        >
          <button className="btn btn-warning" role="button">
            View {">"}
          </button>
        </Link>
      </div>
    </div>
  );
}
export default SaleProduct;

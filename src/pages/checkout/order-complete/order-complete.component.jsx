import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import orderService from "../../../services/order.service";
function OrderComplete() {
  const location = useLocation();
  const { orderData } = location.state;

  //   useEffect(() => {}, []);
  console.log(orderData);
  return (
    <div className="vh-100 d-flex justify-content-center align-items-center">
      <div className="col-md-4">
        <div
          className=""
          style={{ border: "1px solid rgb(244, 135, 111)" }}
        ></div>
        <div className="card  bg-white shadow p-5">
          <div className="mb-4 text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="text-success bi bi-check-circle"
              width={"75"}
              height={"75"}
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
              <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z" />
            </svg>
          </div>
          <div className="text-center">
            <h1>Order Complete!</h1>
            <p>
              Your chosen store is busy preparing your order. Please keep a note
              of the following details.
            </p>
            <div>
              <p>
                Order ID:
                <small className="text-muted"> {orderData.orderID}</small>
              </p>
              <p>
                Total Item Cost:
                <small className="text-muted"> {orderData.totalItemCost}</small>
              </p>
              <p>
                Is Delivery:
                <small className="text-muted"> {orderData.isDelivery}</small>
              </p>
              <p>
                Delivery Fee:
                <small className="text-muted"> {orderData.deliveryFee}</small>
              </p>
              <p>
                Total Cost:
                <small className="text-muted"> {orderData.totalCost}</small>
              </p>
            </div>
            <button className="btn btn-outline-success">Back Home</button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default OrderComplete;

import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import orderService from "../../services/order.service";

function CustomerOrder(props) {
  const location = useLocation();
  const { myOrder } = location.state;

  return (
    <div className="container">
      <h1>Order details</h1>
      <br />
      <div className="card">
        <div className="card-body">
          <p>
            OrderID:
            <small className="text-muted"> {myOrder.orderID}</small>
          </p>
          <p>
            customerID
            <small className="text-muted"> {myOrder.customerID}</small>
          </p>
          <p>
            Status:
            <small className="text-muted"> {myOrder.status}</small>
          </p>
          <p>
            Service
            <small className="text-muted">
              {" "}
              {myOrder.isDelivery ? "Delivery" : "Collection"}
            </small>
          </p>
          <p>
            Delivery Fee (If Applicable)
            <small className="text-muted"> £{myOrder.deliveryFee}</small>
          </p>
          <p>
            Number of Items
            <small className="text-muted"> {myOrder.items.length}</small>
          </p>
          <p>
            Total Item Cost
            <small className="text-muted"> £{myOrder.totalItemCost}</small>
          </p>
          <p>
            Total Cost
            <small className="text-muted"> £{myOrder.totalCost}</small>
          </p>
        </div>
      </div>
      <h2>Items in this order:</h2>
      {myOrder.items.map((item, index) => {
        return (
          <React.Fragment>
            <div className="container">
              <div className="row">
                <div className="col-xl-12">
                  <div className="card mb-3 card-body">
                    <div className="row align-items-center">
                      <div className="col">
                        <div className="overflow-hidden flex-nowrap">
                          <h6 className="mb-1">
                            <a href="#!" className="text-reset">
                              <p>
                                Item ID
                                <small className="text-muted">
                                  {" "}
                                  {item.itemID}
                                </small>
                              </p>
                            </a>
                          </h6>
                          <span className="text-muted d-block mb-2 small">
                            {item.name}
                          </span>
                          <div className="row align-items-center">
                            <div className="col-12">
                              <div className="row align-items-center g-0">
                                <div className="col-auto">
                                  <small className="me-2">
                                    QTY: {item.qty}
                                  </small>
                                </div>
                                <div className="col"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
}
export default CustomerOrder;

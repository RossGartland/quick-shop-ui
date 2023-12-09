import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import orderService from "../../../services/order.service";
import StatusButtons from "./status-buttons/status-buttons.component";

function StoreOrder(props) {
  const [order, setOrder] = useState([]);
  const location = useLocation();
  const { orderID } = location.state;

  useEffect(() => {
    orderService
      .getOrder(orderID)
      .then((order) => setOrder(order))
      .catch((error) => {});
  }, []);
  console.log(order);

  return (
    <div className="container">
      <br />
      <div className="card">
        <StatusButtons orderID={orderID} orderStatus={order.status} />
        <div className="card-body">
          <p>
            Status:
            <small className="text-muted"> {order.status}</small>
          </p>
          <p>
            OrderID:
            <small className="text-muted"> {order.orderID}</small>
          </p>
          <p>
            customerID
            <small className="text-muted"> {order.customerID}</small>
          </p>
          <p>
            Total Cost
            <small className="text-muted"> {order.totalCost}</small>
          </p>
        </div>
      </div>
    </div>
  );
}
export default StoreOrder;

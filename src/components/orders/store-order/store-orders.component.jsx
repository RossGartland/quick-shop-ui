import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import orderService from "../../../services/order.service";

function StoreOrders(props) {
  const [orders, setOrders] = useState([]);
  const location = useLocation();
  const { storeID } = location.state;

  useEffect(() => {
    orderService
      .getAllStoreOrders(storeID)
      .then((orders) => setOrders(orders))
      .catch((error) => {});
  }, []);
  console.log(orders);
  return (
    <div className="container">
      <br />
      <h1>Showing orders for your store:</h1>
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Order ID</th>
            <th scope="col">Customer ID</th>
            <th scope="col">Fulfillment</th>
            <th scope="col">Total Cost</th>
            <th scope="col">Status</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {orders.map((item, index) => {
            return (
              <React.Fragment>
                <tr>
                  <th scope="row">{item.orderID}</th>
                  <td>{item.customerID}</td>
                  <td>{item.isDelivery ? "Delivery" : "Collection"}</td>
                  <td>£{item.totalCost}</td>
                  <td>{item.status}</td>
                  <td>
                    {" "}
                    <Link
                      type="button"
                      className="btn btn-primary"
                      to={"/mystores/" + storeID + "/orders/" + item.orderID}
                      state={{ orderID: item.orderID }}
                    >
                      View
                    </Link>
                  </td>
                </tr>
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
export default StoreOrders;

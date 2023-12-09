import React, { useEffect, useState } from "react";
import orderService from "../../services/order.service";
import { Link } from "react-router-dom";
function CustomerOrders(props) {
  const { currentUser } = props;

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    orderService
      .getAllCustomerOrders(currentUser.id)
      .then((orders) => setOrders(orders))
      .catch((error) => {});
  }, []);

  return (
    <div>
      <h2>Your Orders:</h2>
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Order ID</th>
            <th scope="col">Number of items</th>
            <th scope="col">Total Item Cost</th>
            <th scope="col">Service</th>
            <th scope="col">Delivery Fee (IA)</th>
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
                  <td>{item.items.length}</td>
                  <td>£{item.totalItemCost}</td>
                  <td>{item.isDelivery ? "Delivery" : "Collection"}</td>
                  <td>£{item.deliveryFee}</td>
                  <td>£{item.totalCost}</td>
                  <td>{item.status}</td>
                  <td>
                    {" "}
                    <Link
                      type="button"
                      className="btn btn-primary"
                      to={
                        "/customer/" +
                        item.customerID +
                        "/orders/" +
                        item.orderID
                      }
                      state={{ myOrder: item }}
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

export default CustomerOrders;

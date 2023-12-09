import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import orderService from "../../../../services/order.service";

function StatusButtons(props) {
  const { orderID, orderStatus } = props;
  const [orderStat, setOrderStat] = useState(orderStatus);

  const onClickStatus = (status) => {
    orderService.changeOrderStatus(orderID, status).then(() => {
      alert(JSON.stringify("Status has been updated to " + status));
      window.location.reload();
    });
  };

  return (
    <div className="btn-toolbar" role="group" aria-label="Basic example">
      <button
        type="button"
        className="btn btn-danger m-1"
        onClick={() => onClickStatus("CANCELLED")}
      >
        Cancelled
      </button>
      <button
        type="button disabled"
        className="btn btn-secondary m-1"
        onClick={() => onClickStatus("SUBMITTED")}
      >
        Submitted
      </button>
      <button
        type="button"
        className="btn btn-warning m-1"
        onClick={() => onClickStatus("PREPARING")}
      >
        Preparing
      </button>
      <button
        type="button"
        className="btn btn-info m-1"
        onClick={() => onClickStatus("OUT_FOR_DELIVERY")}
      >
        Out for delivery
      </button>
      <button
        type="button"
        className="btn btn-primary m-1"
        onClick={() => onClickStatus("DELIVERED")}
      >
        Delivered
      </button>
      <button
        type="button"
        className="btn btn-info m-1"
        onClick={() => onClickStatus("READY_FOR_COLLECTION")}
      >
        Ready for collection
      </button>
      <button
        type="button"
        className="btn btn-primary m-1"
        onClick={() => onClickStatus("COLLECTED")}
      >
        Collected
      </button>
      <button
        type="button"
        className="btn btn-success m-1"
        onClick={() => onClickStatus("COMPLETE")}
      >
        Complete
      </button>
    </div>
  );
}
export default StatusButtons;

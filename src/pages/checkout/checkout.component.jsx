import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import AuthService from "../../services/auth.service";
import { useLocation } from "react-router-dom";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import "./checkout.style.css";
import orderService from "../../services/order.service";
import { useNavigate } from "react-router-dom";
import RadioDelivery from "../../components/payment/radio-options/radio-delivery.component";
import RadioCollection from "../../components/payment/radio-options/radio-collection.component";

function Checkout(props) {
  const currentUser = AuthService.getCurrentUser();
  const location = useLocation();
  const { basketItems, storeID, locationData, deliveryFee } = location.state;
  const [radioOptions, setRadioOptions] = useState("delivery");

  const totalItemCost = basketItems.reduce((a, c) => a + c.price * c.qty, 0);
  const totalDiscount = basketItems.reduce(
    (a, c) => a + (c.price - (c.salePrice ?? c.price)) * c.qty,
    0
  );

  const [totalCost, setTotalCost] = useState(totalItemCost - totalDiscount);

  const [deliveryAddress, setDeliveryAddress] = useState("");

  const [newDeliveryAddress, setNewDeliveryAddress] = useState(deliveryAddress);

  const handleChange = (event) => {
    setDeliveryAddress(event.target.value);
  };

  let navigate = useNavigate();

  useEffect(() => {
    if (radioOptions === "delivery") {
      setTotalCost(totalItemCost - totalDiscount + deliveryFee);
    } else if (radioOptions === "collection") {
      setTotalCost(totalItemCost - totalDiscount);
    }
    setNewDeliveryAddress(deliveryAddress);
  }, [radioOptions, totalCost, deliveryAddress]);

  const radioHandler = (event) => {
    setRadioOptions(event.target.value);
  };

  const onOrder = () => {
    let isDelivery, isCollection;
    if (radioOptions === "delivery") {
      isDelivery = true;
      isCollection = false;
    } else {
      isDelivery = false;
      isCollection = true;
    }

    const order = {
      customerID: currentUser.id,
      customerEmail: currentUser.email,
      storeID: storeID,
      totalItemCost: totalItemCost,
      totalDiscount: totalDiscount,
      isDelivery: isDelivery,
      isCollection: isCollection,
      deliveryFee: deliveryFee,
      deliveryAddress: newDeliveryAddress,
      totalCost: totalCost,
      items: basketItems,
      customerLat: locationData.lat,
      customerLng: locationData.lng,
    };
    console.log(order);
    orderService.submitOrder(order).then((res) => {
      console.log(res);
      navigate("/order-complete", { state: { orderData: res } });
    });
  };

  return (
    <div className="container-fluid p-3 col-sm-6">
      <div className="card justify-content-center checkout-card">
        <div className="checkout-heading">
          <h2>Checkout</h2>
          <p>Please review order details and complete payment.</p>
        </div>
        <hr />
        <h3>Order Summary:</h3>
        <ul className="list-group border-0">
          {basketItems.map((item) => (
            <li className="list-group-item" key={item.productID}>
              {item.name}: x{item.qty}
              <div className="row">
                <a className="border">
                  <AddIcon />
                </a>
                <a className="border">
                  <RemoveIcon />
                </a>
              </div>
            </li>
          ))}
        </ul>
        <hr />
        <p>Please choose collection or delivery for your order.</p>
        <form onChange={radioHandler}>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="flexRadioDefault"
              value={"collection"}
              id="flexRadioDefault1"
              onChange={(e) => {}}
            />
            <label className="form-check-label" for="flexRadioDefault1">
              Collection
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="flexRadioDefault"
              value={"delivery"}
              id="flexRadioDefault2"
              onChange={(e) => {}}
              checked={radioOptions === "delivery"}
            />
            <label className="form-check-label" for="flexRadioDefault2">
              Delivery {"(+£"}
              {deliveryFee}
              {")"}
            </label>
          </div>
        </form>
        <div>
          {radioOptions === "collection" ? (
            <div>
              <RadioCollection />
            </div>
          ) : (
            <>
              <RadioDelivery />
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id="deliveryAddress"
                  name="deliveryAddress"
                  placeholder="Delivery Address"
                  onChange={handleChange}
                  value={deliveryAddress}
                />
              </div>
            </>
          )}
        </div>
        <hr />
        <div className="checkout-total">
          <h5>
            Total Item Cost:{" "}
            <small className="text-muted">£ {totalItemCost.toFixed(2)}</small>
          </h5>
          <h5>
            Total Discount:{" "}
            <small className="text-muted">£ {totalDiscount.toFixed(2)}</small>
          </h5>
          <hr />
          <h3>
            Order Total:{" "}
            <small className="text-muted">£ {totalCost.toFixed(2)}</small>
          </h3>
        </div>
        <div className="container-flex">
          <div className="justify-content-between">
            <PayPalScriptProvider
              options={{
                "client-id":
                  "AWqGuIbdH4cCru43mwvgwBEDt65XWG-tU2IRvSrySqMpka7cWC0S5Qgrai6DBzuU6e9piQ89yvL4L2Cy",
                currency: "GBP",
              }}
            >
              <PayPalButtons
                forceReRender={[totalCost]}
                createOrder={(data, actions) => {
                  return actions.order.create({
                    purchase_units: [
                      {
                        amount: {
                          value: totalCost,
                        },
                      },
                    ],
                  });
                }}
                onApprove={async (data, actions) => {
                  const details = await actions.order.capture();
                  onOrder();
                }}
              />
            </PayPalScriptProvider>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Checkout;

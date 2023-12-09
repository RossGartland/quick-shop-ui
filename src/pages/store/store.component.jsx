import React, { useEffect, useState } from "react";
import AuthService from "../../services/auth.service";
import storeService from "../../services/store.service";
import { Link, useLocation } from "react-router-dom";
import ProductList from "../../components/products/product-list/product-list.component";
import "./store.style.css";
import Basket from "../../components/basket/basket.component";
import { set } from "react-hook-form";
import Moment from "react-moment";
import "moment-timezone";
import PaginatedItems from "../../components/products/product-list/product-list.component";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import StoreReviews from "../reviews/store-reviews.component";
import Rating from "@mui/material/Rating";

function Store() {
  const [stores, setStore] = useState([]);
  const currentUser = AuthService.getCurrentUser();
  const location = useLocation();
  const { storeID, locationData } = location.state;
  const [tradingHours, setTradingHours] = useState([]);
  const [basketItems, setBasketItems] = useState([]);

  useEffect(() => {
    storeService
      .getStoreByID(storeID)
      .then((stores) => setStore(stores))
      .catch((error) => {});
    storeService
      .getStoreTradingHours(storeID)
      .then((tradingHours) => setTradingHours(tradingHours))
      .catch((error) => {});
  }, []);

  const onAddItem = (item) => {
    console.log(item);
    const exist = basketItems.find((x) => x.productID === item.productID);
    if (exist) {
      setBasketItems(
        basketItems.map((x) =>
          x.productID === item.productID ? { ...exist, qty: exist.qty + 1 } : x
        )
      );
    } else {
      setBasketItems([...basketItems, { ...item, qty: 1 }]);
      console.log(basketItems);
    }
  };

  const onRemoveItem = (item) => {
    const exist = basketItems.find((x) => x.productID === item.productID);
    if (exist.qty === 1) {
      setBasketItems(basketItems.filter((x) => x.productID !== item.productID));
    } else {
      setBasketItems(
        basketItems.map((x) =>
          x.productID === item.productID ? { ...exist, qty: exist.qty - 1 } : x
        )
      );
    }
  };

  console.log(tradingHours);
  return (
    <div>
      <div>
        <React.Fragment>
          <div className="jumbotron jumbotron-fluid bg-dark">
            <div className="jumbotron-background">
              <img src={stores.storeImagePath} className="blur " />
            </div>

            <div className="container text-white">
              <h1 className="display-4">{stores.storeName}</h1>
              <div>
                <Rating
                  name="read-only"
                  value={stores.storeRating}
                  precision={0.5}
                  max={5}
                  readOnly
                />
                <br />
                <Popup
                  contentStyle={{ width: "400px" }}
                  trigger={
                    <a className="link-warning"> View or Add a Review</a>
                  }
                  position="right center"
                  modal
                  nested
                >
                  <StoreReviews storeName={stores.storeName} />
                </Popup>
              </div>
              <br />
              <div className="row">
                <div>
                  <p className="mb-0">Address:</p>
                </div>
                <div className="col-sm-9">
                  <p className="text-muted mb-0">{stores.address}</p>
                </div>
              </div>
              <div className="row">
                <div>
                  <p className="mb-0">Phone Number:</p>
                </div>
                <div className="col-sm-9">
                  <p className="text-muted mb-0">{stores.phoneNumber}</p>
                </div>
              </div>
              <div className="row">
                <div>
                  <p className="mb-0">Email Address:</p>
                </div>
                <div className="col-sm-9">
                  <p className="text-muted mb-0">{stores.emailAddress}</p>
                </div>
              </div>
              <div className="row">
                <div>
                  <p className="mb-0">Created on:</p>
                </div>
                <div className="col-sm-9">
                  <p className="text-muted mb-0">
                    {" "}
                    <Moment format="DD/MM/YYYY">{stores.crtdTimeStamp}</Moment>
                  </p>
                </div>
              </div>
              <div className="row">
                <div>
                  <p className="mb-0">Delivery Fee:</p>
                </div>
                <div className="col-sm-9">
                  <p className="text-muted mb-0">£{stores.deliveryFee}</p>
                </div>
              </div>
              <div className="row">
                <div className="widget-boxed">
                  <div className="widget-boxed-header">
                    <p className="mb-0">Opening Hours:</p>
                  </div>
                  <div className="widget-boxed-body">
                    <div className="side-list">
                      <ul>
                        {tradingHours.map((item, index) => {
                          return (
                            <div>
                              <li key={index}>
                                {item.weekday}:
                                <span>
                                  {item.startHour} - {item.endHour}
                                </span>
                              </li>
                            </div>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container-fluid ">
            <div className="row justify-content-center p-0">
              <ProductList
                onAddItem={onAddItem}
                storeID={storeID}
                itemsPerPage={4}
              />
            </div>
          </div>
        </React.Fragment>
      </div>
      <div className="myBasket">
        <Basket
          onAddItem={onAddItem}
          onRemoveItem={onRemoveItem}
          items={basketItems}
          storeID={storeID}
          locationData={locationData}
          deliveryFee={stores.deliveryFee}
        />
      </div>
    </div>
  );
}
export default Store;

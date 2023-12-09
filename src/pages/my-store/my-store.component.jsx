import React, { useEffect, useState } from "react";
import AuthService from "../../services/auth.service";
import storeService from "../../services/store.service";
import { Link, useLocation, useNavigate } from "react-router-dom";
import MyProductList from "../../components/products/product-list/my-product-list.component";
import Moment from "react-moment";
import "moment-timezone";
import "./my-store.style.css";
import StoreStats from "../store-stats/store-stats.component";

function MyStore() {
  const [showOwner, setShowOwner] = useState(false);
  const [stores, setStore] = useState([]);
  const currentUser = AuthService.getCurrentUser();
  const location = useLocation();
  const { storeID } = location.state;
  const [tradingHours, setTradingHours] = useState([]);

  useEffect(() => {
    if (currentUser !== null) {
      setShowOwner(currentUser.roles.includes("ROLE_STORE_OWNER"));
      storeService
        .getStoreByID(storeID)
        .then((stores) => setStore(stores))
        .catch((error) => {});
      storeService
        .getStoreTradingHours(storeID)
        .then((tradingHours) => setTradingHours(tradingHours))
        .catch((error) => {});
    }
  }, []);

  return (
    <div>
      <div>
        {showOwner ? (
          <React.Fragment>
            <div className="jumbotron jumbotron-fluid bg-dark">
              <div className="jumbotron-background">
                <img src={stores.storeImagePath} className="blur " />
              </div>

              <div className="container text-white">
                <h1 className="display-4">{stores.storeName}</h1>
                <p className="lead">{stores.description}</p>
                <hr className="my-4" />
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
                      <Moment format="DD/MM/YYYY">
                        {stores.crtdTimeStamp}
                      </Moment>
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
            <div className="container">
              <Link
                type="button"
                className="btn btn-warning m-2"
                to={"/mystores/" + storeID + "/add-product"}
                state={{ storeID: storeID }}
              >
                Add product
              </Link>
              <Link
                to={"/mystores/" + storeID + "/edit"}
                state={{
                  storeID: storeID,
                  store: stores,
                  tradingHours: tradingHours,
                }}
                className="btn btn-warning m-2"
              >
                Edit Store
              </Link>
              <Link
                type="button"
                className="btn btn-warning m-2"
                to={"/mystores/" + storeID + "/orders"}
                state={{ storeID: storeID }}
              >
                View Orders
              </Link>
              <StoreStats storeID={storeID} />
              <br />
              <MyProductList storeID={storeID} />
            </div>
          </React.Fragment>
        ) : (
          <div>
            <h1>ERROR: You must be a store owner to view this page.</h1>
          </div>
        )}
      </div>
    </div>
  );
}
export default MyStore;

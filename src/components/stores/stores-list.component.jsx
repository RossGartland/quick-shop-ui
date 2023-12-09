import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import storeService from "../../services/store.service";
import SaleProductsBanner from "../sale-products/sale-products-banner.component";
import "./stores-list.style.css";
import Rating from "@mui/material/Rating";

function StoresList(props) {
  const [storeList, setStoreList] = useState([]);
  // const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    storeService
      .searchStoresByMap(props.locationData)
      .then((storeList) => setStoreList(storeList));
  }, [props.locationData]);

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 ">
          <ul className="list-group">
            {storeList.length > 0 ? (
              <React.Fragment>
                <div className="dropdown mt-3">
                  <div
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButton"
                  >
                    <a className="dropdown-item" href="#">
                      Groceries
                    </a>
                    <a className="dropdown-item" href="#">
                      Clothing
                    </a>
                    <a className="dropdown-item" href="#">
                      Fruit and veg
                    </a>
                  </div>
                </div>
                {storeList.map((item, index) => {
                  return (
                    <div className="d-sm-flex justify-content-between my-4 pb-4 border-bottom">
                      <div className="media d-block d-sm-flex text-center text-sm-left">
                        <a className="cart-item-thumb mx-auto mr-sm-4" href="#">
                          <img
                            src={item.storeImagePath}
                            alt="Product"
                            style={{ opacity: item.active ? 1.0 : 0.5 }}
                          />
                        </a>
                        <div className="media-body pt-3">
                          <h3 className="product-card-title font-weight-semibold border-0 pb-0">
                            <a href="#">{item.storeName}</a>
                          </h3>
                          <div className="font-size-sm">
                            <span className="text-muted mr-2">
                              {item.address}
                            </span>
                          </div>
                          <div className="font-size-sm">
                            <span className="text-muted mr-2">
                              Delivery Fee: £{item.deliveryFee}
                            </span>
                          </div>
                          <div className="font-size-sm">
                            <Rating
                              name="read-only"
                              value={item.storeRating}
                              readOnly
                            />
                            <br />
                          </div>
                        </div>
                      </div>
                      <div className="pt-sm-0 pl-sm-3 mx-auto mx-sm-0 pt-lg-5 mx-lg-5 text-center text-sm-left">
                        {item.active === true ? (
                          <Link
                            to={"/stores/" + item.storeID}
                            state={{
                              storeID: item.storeID,
                              locationData: props.locationData,
                            }}
                          >
                            <button className="btn btn-warning" role="button">
                              View {">"}
                            </button>
                          </Link>
                        ) : (
                          <p>
                            This store in currently unavailable. Please check
                            back later.
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
                <div>
                  <h2>Some Selected Offers From Your Local Stores:</h2>
                  <SaleProductsBanner storeList={storeList} />
                </div>
              </React.Fragment>
            ) : (
              <div className="alert alert-danger m-1" role="alert">
                Sorry, there are no nearby stores.
              </div>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
export default StoresList;

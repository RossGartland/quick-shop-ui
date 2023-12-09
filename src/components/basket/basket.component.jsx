import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import AuthService from "../../services/auth.service";

function Basket(props) {
  const currentUser = AuthService.getCurrentUser();
  const { items, onAddItem, onRemoveItem, storeID, locationData, deliveryFee } =
    props;

  const totalOriginalPrice = items.reduce((a, c) => a + c.price * c.qty, 0); //Price before discount is applied.
  const totalDiscount = items.reduce(
    (a, c) => a + (c.price - (c.salePrice ?? c.price)) * c.qty,
    0
  );
  const totalPrice = totalOriginalPrice - totalDiscount;

  return (
    <div className="card col-xs-6 h-25">
      {currentUser != null ? (
        <React.Fragment>
          <div id="accordion pt-6">
            <div className="card">
              <div className="card-header" id="headingOne">
                <h5 className="mb-0">
                  <button
                    className="btn"
                    data-toggle="collapse"
                    data-target="#collapseOne"
                    aria-expanded="false"
                    aria-controls="collapseOne"
                    style={{ display: "contents" }}
                  >
                    <h3>
                      Order Total:{" "}
                      <small className="text-muted">
                        £ {totalPrice.toFixed(2)}
                      </small>
                    </h3>
                    <h6>Click here to expand</h6>
                  </button>
                </h5>
                <div
                  id="collapseOne"
                  className="accordion-collapse collapse in"
                  aria-labelledby="headingOne"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    <div>
                      <Link
                        className="btn btn-primary w-100"
                        to={"/checkout"}
                        state={{
                          basketItems: items,
                          storeID: storeID,
                          locationData: locationData,
                          deliveryFee: deliveryFee,
                        }}
                      >
                        Checkout
                      </Link>
                    </div>
                    <div>
                      {items.length === 0 && <div>Basket is empty </div>}
                      <ul className="list-group list-group-flush">
                        {items.map((item) => (
                          <li className="list-group-item" key={item.productID}>
                            {item.name}: x{item.qty}
                            <div className="row">
                              <a
                                onClick={() => onAddItem(item)}
                                className="border"
                              >
                                <AddIcon />
                              </a>
                              <a
                                onClick={() => onRemoveItem(item)}
                                className="border"
                              >
                                <RemoveIcon />
                              </a>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </React.Fragment>
      ) : (
        <div className="alert alert-danger" role="alert">
          Please login to submit an order.
        </div>
      )}
    </div>
  );
}
export default Basket;

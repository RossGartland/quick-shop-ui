import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserDetails from "../../components/user/user-details/user-details.component";
import AuthService from "../../services/auth.service";
import storeService from "../../services/store.service";
import "./my-stores.style.css";
function MyStores() {
  const [showOwner, setShowOwner] = useState(false);
  const [storesList, setStoresList] = useState([]);
  const currentUser = AuthService.getCurrentUser();

  useEffect(() => {
    if (currentUser !== null) {
      setShowOwner(currentUser.roles.includes("ROLE_STORE_OWNER"));
      storeService
        .getStoresBelongingToOwner(currentUser.id)
        .then((storesList) => setStoresList(storesList))
        .catch((error) => {});
    }
  }, []);
  console.log(currentUser);
  return (
    <div>
      {showOwner ? (
        <div className="container">
          <h1 className="text-center mt-2">My Stores</h1>
          <div className="row justify-content-center">
            <button type="button" className="btn btn-primary m-1">
              Add Store
            </button>
          </div>
          <hr />
          <div className="row row-cols-3">
            {storesList.map((item, index) => {
              return (
                <div className="card" key={item.storeID}>
                  <img
                    className="card-img-top store-image-card"
                    src={item.storeImagePath}
                    alt="Card  cap"
                  ></img>
                  <div className="card-body">
                    <h5 className="card-title">{item.storeName}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">
                      {item.address}
                    </h6>
                    <Link
                      to={"/mystores/" + item.storeID}
                      state={{ storeID: item.storeID }}
                    >
                      Visit
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div>
          <h1>ERROR: You must be a store owner to view this page.</h1>
        </div>
      )}
    </div>
  );
}
export default MyStores;

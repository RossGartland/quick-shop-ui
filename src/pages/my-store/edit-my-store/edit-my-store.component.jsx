import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import EditTradingHours from "../../../components/store-settings/trading-hours/edit-trading-hours.component";
import EditGeneralDetails from "../../../components/store-settings/trading-hours/edit-general-details.component";
import storeService from "../../../services/store.service";
import AddTradingHours from "../add-trading-hours.component";

function EditStore(props) {
  const location = useLocation();
  let navigate = useNavigate();
  const { storeID, store, tradingHours } = location.state;

  console.log(store);

  const deleteStore = (storeID) => {
    storeService.deleteStore(storeID);
    alert(JSON.stringify("Store deleted."));
    navigate("/mystores");
  };

  const setStatus = (storeID) => {
    storeService.toggleStoreActiveStatus(storeID).then((response) => {
      console.log(response);
      alert(JSON.stringify(response));
    });
  };

  return (
    <div className="container">
      <h1>Store details and settings</h1>
      <hr />
      <h2>General</h2>
      <div>
        <EditGeneralDetails storeID={storeID} store={store} />
      </div>
      <div>
        <hr />
        <h2>Trading Hours</h2>
        {tradingHours.length > 0 ? (
          <EditTradingHours storeID={storeID} tradingHours={tradingHours} />
        ) : (
          <AddTradingHours storeID={storeID} />
        )}
      </div>
      <div>
        <hr />
        <h2>Danger Zone</h2>
        <div>
          <button
            type="button"
            className="btn btn-primary btn-md m-1"
            onClick={() => setStatus(storeID)}
          >
            Set Status
          </button>
        </div>
        <button
          type="button"
          className="btn btn-danger btn-lg m-1"
          onClick={() => deleteStore(storeID)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
export default EditStore;

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { MapContainer, useMap, TileLayer, Marker } from "react-leaflet";
import storeService from "../../../services/store.service";
function EditGeneralDetails(props) {
  const { storeID, store } = props;
  const { register, handleSubmit } = useForm();
  const [myMarker, setMyMarker] = useState({
    lat: store.latitude,
    lng: store.longitude,
  });
  const GetCoordinates = () => {
    const map = useMap();

    useEffect(() => {
      if (!map) return;

      map.on("click", (e) => {
        setMyMarker(e.latlng);
        console.log(myMarker.lat);
        console.log(myMarker.lng);
      });
    }, [map]);

    return null;
  };

  const onSubmit = (data) => {
    const storeData = {
      storeID: storeID,
      storeName: data.storeName,
      phoneNumber: data.storePhoneNumber,
      emailAddress: data.storeEmailAddress,
      address: data.storeAddress,
      latitude: myMarker.lat,
      longitude: myMarker.lng,
      deliveryFee: parseFloat(data.deliveryFee),
    };
    console.log(storeData);
    storeService
      .editStoreDetails(storeID, storeData)
      .then(() => {
        alert(JSON.stringify("Submitted"));
        // window.location.reload();
      })
      .catch((e) => {
        // console.log(e);
        alert(JSON.stringify(e.data));
      });
  };

  //   console.log(orders);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
        <label for="storeName">Store Name</label>
        <input
          type="text"
          defaultValue={store.storeName}
          className="form-control"
          id="storeName"
          aria-describedby="storeNameHelp"
          {...register("storeName", { required: true })}
        />
      </div>
      <div className="form-group">
        <label for="emailAddress">Email Address</label>
        <input
          type="text"
          className="form-control"
          defaultValue={store.emailAddress}
          id="emailAddress"
          aria-describedby="emailAddressHelp"
          placeholder="Email Address"
          {...register("storeEmailAddress", { required: true })}
        />
      </div>
      <div className="form-group">
        <label for="Address">Address</label>
        <input
          type="text"
          className="form-control"
          defaultValue={store.address}
          id="address"
          aria-describedby="addressHelp"
          placeholder="address"
          {...register("storeAddress", { required: true })}
        />
      </div>
      <div className="form-group">
        <label for="phoneNumber">Phone Number</label>
        <input
          type="text"
          className="form-control"
          defaultValue={store.phoneNumber}
          id="phoneNumber"
          aria-describedby="phoneNumberHelp"
          placeholder="Phone Number"
          {...register("storePhoneNumber", { required: true })}
        />
      </div>
      <div className="form-group">
        <label for="deliveryFee">Delivery Fee</label>
        <input
          type="text"
          className="form-control"
          defaultValue={store.deliveryFee}
          id="deliveryFee"
          aria-describedby="deliveryFeeHelp"
          placeholder="Delivery Fee"
          {...register("deliveryFee", { required: true })}
        />
      </div>
      <div className="form-group">
        <label>Location</label>
        <MapContainer center={myMarker} zoom={10} scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a 
           href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={myMarker} />
          <GetCoordinates />
        </MapContainer>
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
}
export default EditGeneralDetails;

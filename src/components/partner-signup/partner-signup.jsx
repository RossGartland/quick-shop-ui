import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import authService from "../../services/auth.service";
import storeService from "../../services/store.service";
import { MapContainer, useMap, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";

function PartnerSignUp(props) {
  const [myMarker, setMyMarker] = useState({ lat: 54.3, lng: -6.25 });
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

  const currentUser = authService.getCurrentUser();
  const { register, handleSubmit } = useForm();
  const [userDetails, setUserDetails] = useState([]);

  const onSubmit = (data) => {
    const storeData = {
      address: data.storeAddress,
      emailAddress: data.storeEmailAddress,
      phoneNumber: data.storePhoneNumber,
      storeName: data.storeName,
      latitude: myMarker.lat,
      longitude: myMarker.lng,
      deliveryFee: parseFloat(data.deliveryFee),
      owners: [
        {
          owners: currentUser.id,
          forename: props.forename,
          surname: props.surname,
          phoneNumber: data.storePhoneNumber,
          emailAddress: props.emailAddress,
          address: data.storeAddress,
          accountRef: currentUser.id,
        },
      ],
    };

    storeService
      .addStore(data.fileUpload, storeData)
      .then(() => {
        alert(JSON.stringify("Submitted"));
        // window.location.reload();
      })
      .catch((e) => {
        // console.log(e);
        alert(JSON.stringify(e.data));
      });
  };

  return (
    <div className="container col-md-3 col-md-offset-3">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <input
            type="storeName"
            className="form-control"
            id="storeName"
            placeholder="Store Name"
            {...register("storeName", { required: true })}
          />
        </div>
        <div className="form-group">
          <input
            type="storeAddress"
            className="form-control"
            id="storeAddress"
            placeholder="Store Address"
            {...register("storeAddress", { required: true })}
          />
        </div>
        <div className="form-group">
          <input
            type="storeEmailAddress"
            className="form-control"
            id="storeEmailAddress"
            placeholder="Store Email Address"
            {...register("storeEmailAddress", { required: true })}
          />
        </div>
        <div className="form-group">
          <input
            type="storePhoneNumber"
            className="form-control"
            id="storePhoneNumber"
            placeholder="Store Phone Number"
            {...register("storePhoneNumber", { required: true })}
          />
        </div>
        <div className="form-group">
          <input
            type="deliveryFee"
            className="form-control"
            id="deliveryFee"
            placeholder="Delivery Fee"
            {...register("deliveryFee", { required: true })}
          />
        </div>
        <div className="form-group">
          <div className="mb-3">
            <label for="formFile" className="form-label">
              Select an image to represent your store.
            </label>
            <input
              type="file"
              className="form-control"
              id="formFile"
              {...register("fileUpload", { required: true })}
            />
          </div>
        </div>

        <MapContainer center={myMarker} zoom={10} scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a 
           href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={myMarker} />
          <GetCoordinates />
        </MapContainer>
        <input type="submit" value="Submit" className="btn btn-primary mt-1" />
      </form>
    </div>
  );
}
export default PartnerSignUp;

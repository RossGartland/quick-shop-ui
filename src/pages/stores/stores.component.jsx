import React, { useEffect, useState } from "react";
import { MapContainer, useMap, TileLayer, Marker } from "react-leaflet";
import SaleProductsBanner from "../../components/sale-products/sale-products-banner.component";
import StoresList from "../../components/stores/stores-list.component";
import "./stores.style.css";

function Stores(props) {
  const [myMarker, setMyMarker] = useState({ lat: 54.3, lng: -6.3 });
  const [storeList, setStoreList] = useState([]);
  let locationData = {};

  const GetCoordinates = () => {
    const map = useMap();

    useEffect(() => {
      if (!map) return;

      map.on("click", (e) => {
        setMyMarker(e.latlng);
      });
    }, [map]);

    return null;
  };

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-xs-6">
          <MapContainer
            center={myMarker}
            zoom={10}
            scrollWheelZoom={false}
            className="search-stores-map"
          >
            <TileLayer
              attribution='&copy; <a 
           href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={myMarker} />
            <GetCoordinates />
          </MapContainer>
        </div>
        <div className="col-xs-6">
          {locationData !== null ? (
            <StoresList locationData={myMarker} />
          ) : (
            <div className="alert alert-danger" role="alert">
              Please select a location on the map.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default Stores;

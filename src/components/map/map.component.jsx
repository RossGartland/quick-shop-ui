import React, { useEffect, useState } from "react";
import useNavigator from "react-browser-navigator";
import "./map.style.css";
import {
  MapContainer,
  TileLayer,
  useMapEvents,
  Marker,
  Popup,
} from "react-leaflet";
function MyMap(props) {
  let { getCurrentPosition } = useNavigator();
  return (
    <div>
      <div className="leaflet-container">
        {getCurrentPosition != null && (
          <MapContainer
            center={[
              getCurrentPosition?.coords.latitude,
              getCurrentPosition?.coords.longitude,
            ]}
            zoom={13}
            scrollWheelZoom={false}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker
              position={[
                getCurrentPosition?.coords.latitude,
                getCurrentPosition?.coords.longitude,
              ]}
            >
              <Popup>Your location</Popup>
            </Marker>
          </MapContainer>
        )}
      </div>
    </div>
  );
}
export default MyMap;

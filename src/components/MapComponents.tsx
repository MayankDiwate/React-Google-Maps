import * as L from "leaflet";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet/dist/leaflet.css";
import React from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";

interface MapProps {
  origin: L.LatLng; // Origin coordinates [lat, lng]
  destination: L.LatLng; // Destination coordinates [lat, lng]
  stops: L.LatLng[]; // Stops coordinates [lat, lng]
  mapRef: React.MutableRefObject<L.Map | null>; // Map reference
}

const MapComponent: React.FC<MapProps> = ({
  origin,
  stops,
  destination,
  mapRef,
}) => {
  const BASE_URL = "https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png";
  const center = {
    lat: 19.228825,
    lng: 72.987609,
  };

  return (
    <MapContainer
      center={center}
      zoom={10}
      style={{ height: "400px", width: "100%", padding: "p-2" }}
      ref={mapRef}
      id="map"
    >
      <TileLayer
        url={`${BASE_URL}?key=${import.meta.env.VITE_MAPTILER_API_KEY}`}
      />

      {stops.map((stop, i) => (
        <Marker key={i} position={stop} />
      ))}

      <Marker position={origin} />
      <Marker position={destination} />
    </MapContainer>
  );
};

export default MapComponent;

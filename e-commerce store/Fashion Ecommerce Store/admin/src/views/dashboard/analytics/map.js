import React, { useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"; // Changed from 'Map' to 'MapContainer'
import L from "leaflet";

import "leaflet/dist/leaflet.css";
import osm from "./osm-providers";
import cities from "./cities.json";

import locationIcon from "../../../assets/images/location.png";

const markerIcon = new L.Icon({
    iconUrl: locationIcon,
    iconSize: [40, 40],
    iconAnchor: [17, 46],
    popupAnchor: [0, -46],
});

const MarkersMap = () => {
    const [center, setCenter] = useState({ lat: 23.084622, lng: 80.248357 });
    const ZOOM_LEVEL = 5;
    const mapRef = useRef();

    return (
        <>
            <div className="row">
                <div className="col text-center">
                    <div className="col">
                        <MapContainer center={center} zoom={ZOOM_LEVEL} ref={mapRef}>
                            <TileLayer
                                url={osm.maptiler.url}
                                attribution={osm.maptiler.attribution}
                            />

                            {cities.map((city, idx) => (
                                <Marker
                                    position={[city.lat, city.lng]}
                                    icon={markerIcon}
                                    key={idx}
                                >
                                    <Popup>
                                        <b>
                                            {city.city}, {city.country}, {city.population}
                                        </b>
                                    </Popup>
                                </Marker>
                            ))}
                        </MapContainer>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MarkersMap;

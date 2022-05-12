import { MarkGeocodeEventHandlerFn, MarkGeocodeEvent } from "leaflet-control-geocoder/dist/control";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from "react-leaflet";
import { useState, useEffect } from "react";
import L from "leaflet";
import Geocoder, { geocoders } from "leaflet-control-geocoder";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";

export interface Position {
  coords: [number, number],
  desc?: string,
  icon?: L.Icon<L.IconOptions> | L.DivIcon
}

export interface MapParams {
  center: [number, number],
  initialZoom: number,
  marks?: Position[],
  searchable?: boolean,
  onSearch?: MarkGeocodeEventHandlerFn,
  clickable?: boolean,
  onClick?: (x: L.LatLng) => void
}

const Map = (props: Readonly<MapParams>) => {
  let count = 0;

  return (
    <MapContainer center={props.center} zoom={props.initialZoom}>
      <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {props.searchable ? <GeocoderMenu onSearch={props.onSearch} /> : ""}
      {props.clickable ? <ClickHandler onClick={props.onClick} /> : ""}
      {props.marks ? props.marks.map(pos => (
        <Marker key={count++} position={pos.coords} icon={pos.icon}>
          {pos.desc ? <Popup>{pos.desc}</Popup> : ""}
        </Marker>
      )) : ""}
    </MapContainer>
  );
};

interface ClickParams {
  onClick?: (x: L.LatLng) => void
}

interface GeocodeParams {
  onSearch?: MarkGeocodeEventHandlerFn
}

const ClickHandler = (props: Readonly<ClickParams>) => {
  const [position, setPosition] = useState<L.LatLng | null>(null);

  useMapEvents({
    click(e) {
      setPosition(e.latlng);
    }
  });

  if (position && props.onClick) {
    props.onClick(position);
  }

  return null;
};

const GeocoderMenu = (props: Readonly<GeocodeParams>) => {
  const map = useMap();

  useEffect(() => {
    const geocoder = new Geocoder({
      query: "",
      placeholder: "Szukaj...",
      defaultMarkGeocode: false,
      geocoder: new geocoders.Nominatim({
        geocodingQueryParams: {
          "viewbox": "14.07,49.02,24.02,54.85"
        }
      })
    });

    const search = (e: MarkGeocodeEvent) => {
      map.flyTo(e.geocode.center, map.getZoom());
    };

    geocoder.on("markgeocode", props.onSearch ? props.onSearch : search);
    geocoder.addTo(map);

    return () => {
      geocoder.remove();
    };
  }, [map, props.onSearch]);

  return null;
};

export default Map;

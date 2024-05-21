import React, { useEffect } from "react";
import mapboxgl, { Map } from "mapbox-gl"; // Import mapbox-gl types and Map interface
import "../../asset/mapbox-gl.css";
import Base64 from "../../@type/Base64";

interface Position {
  dientich: string;
  donvi: string;
  email: string;
  giatri: string;
  giaytophaply: string;
  id: string;
  latitude: number;
  longitude: number;
  mota: string;
  name: string;
  ngaydang: string;
  nguoiduoclienhe: string;
  noithat: string;
  sodienthoai: string;
  sophongngu: string;
  sotang: string;
  tieude: string;
}

interface MapComponentProps {
  pos: Position[];
}

const YOUR_ACCESS_TOKEN = "pk.eyJ1IjoidGh1YW5zb24iLCJhIjoiY2x2OWdtbWhlMDhzczJqcnE3YW9xYWQ0eCJ9.ouFu7M49A0ak3Tg6zyzTfg";

const MapComponent: React.FC<MapComponentProps> = ({ pos }) => {
  useEffect(() => {
    mapboxgl.accessToken = YOUR_ACCESS_TOKEN;

    const initializeMap = () => {
      const map: Map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/navigation-night-v1",
        center: [106.689167912355, 10.81980177292643],
        zoom: 9,
      });

      map.addControl(new mapboxgl.NavigationControl());
      map.addControl(
        new mapboxgl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true,
          },
          trackUserLocation: true,
          showUserHeading: true,
        })
      );
      map.scrollZoom.disable();

      pos.forEach((item) => {
        if (item.latitude && item.longitude) {
          const popupContent = `<h2>${item.tieude}</h2><a href='/chi-tiet-bai-dang/${Base64.encode(Base64.encode(item.id))}'>Xem chi tiết</a>`;
          const popup = new mapboxgl.Popup().setHTML(popupContent);
          new mapboxgl.Marker({color: 'orange'})
            .setLngLat([item.longitude, item.latitude])
            .setPopup(popup)
            .addTo(map);
        }
      });

      return map;
    };

    const map = initializeMap();

    return () => {
      map.remove();
    };
  }, [pos]);

  return <div id="map" style={{ width: "100%", height: "600px" }} />;
};

export default MapComponent;

// import React, { useEffect } from "react";
// // import mapboxgl from "mapbox-gl";
// import axios from "axios";
// import '../../asset/mapbox-gl.css';
// import mapboxgl from '../../asset/mapbox-gl.js';
// // require("https://api.mapbox.com/mapbox-gl-js/v3.3.0/mapbox-gl.css");
// const MapComponent = () => {
//   const pos = [
//     { id: 1, address: "12 Nguyễn Văn Bảo, Phường 4, Quận Gò Vấp" },
//     { id: 2, address: "52 Nguyễn Văn Bảo, phường 4, Quận gò vấp" },
//   ];
//   let posLL = Array();
//   useEffect(() => {
//     pos.map((item) => {
//       axios.get(
//         `https://api.mapbox.com/geocoding/v5/mapbox.places/${item.address}.json?access_token=pk.eyJ1IjoidGh1YW5zb24iLCJhIjoiY2x2OWdtbWhlMDhzczJqcnE3YW9xYWQ0eCJ9.ouFu7M49A0ak3Tg6zyzTfg`
//       ).then((response) => {
//         console.log(response.data);
//         posLL.push({...item, lat: response.data.features[0].center[0], long: response.data.features[0].center[1]});
//       })
//       // console.log(res);
//     });
//     console.table(posLL);
//     mapboxgl.accessToken =
//       "pk.eyJ1IjoidGh1YW5zb24iLCJhIjoiY2x2OWdtbWhlMDhzczJqcnE3YW9xYWQ0eCJ9.ouFu7M49A0ak3Tg6zyzTfg";
//     const map = new mapboxgl.Map({
//       container: "map",
//       style: "mapbox://styles/mapbox/navigation-night-v1",
//       zoom: 9,
//     });
//     // Add navigation control
//     map.addControl(new mapboxgl.NavigationControl());

//     map.scrollZoom.disable();

//     map.on("style.load", () => {
//       map.setFog({});
//     });

//     // Get user's current position and set map center and marker
//     if ("geolocation" in navigator) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const { longitude, latitude } = position.coords;
//           map.setCenter([longitude, latitude]);
//           const m = new mapboxgl.Marker().setLngLat([longitude, latitude]);
//           map.appendChild(m);
//         },
//         (error) => {
//           console.error("Error getting current position:", error);
//           // If error occurs, default to a center position (Ho Chi Minh City, for example)
//           map.setCenter([106.689167912355, 10.81980177292643]);
//         }
//       );
//     } else {
//       console.error("Geolocation is not supported by this browser.");
//       // If geolocation is not supported, default to a center position
//       map.setCenter([106.689167912355, 10.81980177292643]);
//     }
//     // posLL.map((item) => {
//     //   let Marker = new mapboxgl.Marker();
//     //   Marker.setLngLat([item.lat, item.long]).addTo(map);
//     // })
//     // Variables for globe spinning
//     const secondsPerRevolution = 240;
//     const maxSpinZoom = 5;
//     const slowSpinZoom = 3;
//     let userInteracting = false;
//     const spinEnabled = true;

//     function spinGlobe() {
//       const zoom = map.getZoom();
//       if (spinEnabled && !userInteracting && zoom < maxSpinZoom) {
//         let distancePerSecond = 360 / secondsPerRevolution;
//         if (zoom > slowSpinZoom) {
//           const zoomDif = (maxSpinZoom - zoom) / (maxSpinZoom - slowSpinZoom);
//           distancePerSecond *= zoomDif;
//         }
//         const center = map.getCenter();
//         center.lng -= distancePerSecond;
//         map.easeTo({ center, duration: 1000, easing: (n: any) => n });
//       }
//     }

//     map.on("mousedown", () => {
//       userInteracting = true;
//     });
//     map.on("dragstart", () => {
//       userInteracting = true;
//     });

//     map.on("moveend", () => {
//       spinGlobe();
//     });

//     // Initial call to start spinning
//     spinGlobe();

//     // Cleanup function
//     return () => {
//       map.remove();
//     };
//   }, []); // Empty dependency array ensures useEffect runs only once on mount

//   return <div id="map" />;
// };

// export default MapComponent;

import React, { useEffect, useState } from "react";
import axios from "axios";
import mapboxgl, { Map } from "mapbox-gl"; // Import mapbox-gl types and Map interface

import "../../asset/mapbox-gl.css";

interface Position {
  id: number;
  address: string;
  lat?: number;
  long?: number;
}

const YOUR_ACCESS_TOKEN =
  "pk.eyJ1IjoidGh1YW5zb24iLCJhIjoiY2x2OWdtbWhlMDhzczJqcnE3YW9xYWQ0eCJ9.ouFu7M49A0ak3Tg6zyzTfg";
const MapComponent: React.FC = () => {
  const [posLL, setPosLL] = useState<Position[]>([]);
const pos: Position[] = [
      { id: 1, address: "167 Nguyễn Văn Bảo, Phường 4, Quận Gò Vấp" },
      { id: 2, address: "51 Nguyễn Văn Bảo, phường 4, Quận gò vấp" },
    ];
  useEffect(() => {
    

    const fetchData = async () => {
      const responses = await Promise.all(
        pos.map(async (item) => {
          try {
            const response = await axios.get<any>(
              `https://api.mapbox.com/geocoding/v5/mapbox.places/${item.address}.json?access_token=${YOUR_ACCESS_TOKEN}`
            );
            const { features } = response.data;
            if (features && features.length > 0) {
              const { center } = features[0];
              return { ...item, lat: center[1], long: center[0] } as Position;
            } else {
              return undefined; // Return undefined if geocoding fails
            }
          } catch (error) {
            console.error("Error fetching geocoding data:", error);
            return undefined; // Return undefined if error occurs
          }
        })
      );

      // Filter out undefined values and cast to Position[]
      const validPositions: Position[] = responses.filter(
        (res) => !!res
      ) as Position[];
      setPosLL(validPositions);
    };

    fetchData();

    mapboxgl.accessToken = YOUR_ACCESS_TOKEN;
    const map: Map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/navigation-night-v1",
      center: [106.689167912355, 10.81980177292643],
      zoom: 9,
    });

    map.addControl(new mapboxgl.NavigationControl());
    map.scrollZoom.disable();

    posLL.forEach((item) => {
      if (item.lat && item.long) {
        console.log(item);
        
        new mapboxgl.Marker().setLngLat([item.long, item.lat]).addTo(map);
      }
    });

    return () => {
      map.remove();
    };
  }, []);

  return <div id="map" style={{ width: "100%", height: "400px" }} />;
};

export default MapComponent;

import React, { useEffect } from "react";
import mapboxgl from "mapbox-gl"; // Import mapbox-gl types and Map interface
import "../../@type/mapbox-gl.css";
import "../../@type/mapbox-gl-draw.css";
import Base64 from "../../@type/Base64";
import "./map.css";
import MapboxDraw from "../../@type/mapbox-gl-draw";
import { Grid } from "@mui/material";
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

const YOUR_ACCESS_TOKEN =
  "pk.eyJ1IjoidGh1YW5zb24iLCJhIjoiY2x2OWdtbWhlMDhzczJqcnE3YW9xYWQ0eCJ9.ouFu7M49A0ak3Tg6zyzTfg";

const MapComponent: React.FC<MapComponentProps> = ({ pos }) => {
  useEffect(() => {
    mapboxgl.accessToken = YOUR_ACCESS_TOKEN;

    const initializeMap = () => {
      const map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/streets-v12",
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
          const popupContent = `<h2>${
            item.tieude
          }</h2><a href='/chi-tiet-bai-dang/${Base64.encode(
            Base64.encode(item.id)
          )}'>Xem chi tiết</a>`;
          const popup = new mapboxgl.Popup().setHTML(popupContent);
          new mapboxgl.Marker({ color: "orange" })
            .setLngLat([item.longitude, item.latitude])
            .setPopup(popup)
            .addTo(map);
        }
      });
      const draw = new MapboxDraw({
        // Instead of showing all the draw tools, show only the line string and delete tools
        displayControlsDefault: false,
        controls: {
          line_string: true,
          trash: true,
        },
        // Set the draw mode to draw LineStrings by default
        defaultMode: "draw_line_string",
        styles: [
          // Set the line style for the user-input coordinates
          {
            id: "gl-draw-line",
            type: "line",
            filter: [
              "all",
              ["==", "$type", "LineString"],
              ["!=", "mode", "static"],
            ],
            layout: {
              "line-cap": "round",
              "line-join": "round",
            },
            paint: {
              "line-color": "#438EE4",
              "line-dasharray": [0.2, 2],
              "line-width": 2,
              "line-opacity": 0.7,
            },
          },
          // Style the vertex point halos
          {
            id: "gl-draw-polygon-and-line-vertex-halo-active",
            type: "circle",
            filter: [
              "all",
              ["==", "meta", "vertex"],
              ["==", "$type", "Point"],
              ["!=", "mode", "static"],
            ],
            paint: {
              "circle-radius": 12,
              "circle-color": "#FFF",
            },
          },
          // Style the vertex points
          {
            id: "gl-draw-polygon-and-line-vertex-active",
            type: "circle",
            filter: [
              "all",
              ["==", "meta", "vertex"],
              ["==", "$type", "Point"],
              ["!=", "mode", "static"],
            ],
            paint: {
              "circle-radius": 8,
              "circle-color": "#438EE4",
            },
          },
        ],
      });

      // Add the draw tool to the map
      map.addControl(draw);
      map.on("draw.create", updateRoute);
      map.on("draw.update", updateRoute);
      map.on("draw.delete", removeRoute);
      function updateRoute() {
        removeRoute(); // Overwrite any existing layers

        const profile = "driving"; // Set the profile

        // Get the coordinates
        const data = draw.getAll();
        const lastFeature = data.features.length - 1;
        const coords = data.features[lastFeature].geometry.coordinates;
        // Format the coordinates
        const newCoords = coords.join(";");
        // Set the radius for each coordinate pair to 25 meters
        const radius = coords.map(() => 25);
        getMatch(newCoords, radius, profile);
      }

      // Make a Map Matching request
      async function getMatch(coordinates: any, radius: any, profile: any) {
        // Separate the radiuses with semicolons
        const radiuses = radius.join(";");
        // Create the query
        const query = await fetch(
          `https://api.mapbox.com/matching/v5/mapbox/${profile}/${coordinates}?geometries=geojson&radiuses=${radiuses}&steps=true&access_token=${mapboxgl.accessToken}`,
          { method: "GET" }
        );
        const response = await query.json();
        // Handle errors
        if (response.code !== "Ok") {
          alert(
            `${response.code} - ${response.message}.\n\nFor more information: https://docs.mapbox.com/api/navigation/map-matching/#map-matching-api-errors`
          );
          return;
        }
        const coords = response.matchings[0].geometry;
        // Draw the route on the map
        addRoute(coords);
        getInstructions(response.matchings[0]);
      }

      function getInstructions(data: any) {
        // Target the sidebar to add the instructions
        const directions = document.getElementById("directions");
        if (!directions) {
          return;
        }
        let tripDirections = "";
        // Output the instructions for each step of each leg in the response object
        for (const leg of data.legs) {
          const steps = leg.steps;
          for (const step of steps) {
            tripDirections += `<li>${step.maneuver.instruction}</li>`;
          }
        }
        directions.innerHTML = `<p><strong>Trip duration: ${Math.floor(
          data.duration / 60
        )} min.</strong></p><ol>${tripDirections}</ol>`;
      }

      // Draw the Map Matching route as a new layer on the map
      function addRoute(coords: any) {
        // If a route is already loaded, remove it
        if (map.getSource("route")) {
          map.removeLayer("route");
          map.removeSource("route");
        } else {
          map.addLayer({
            id: "route",
            type: "line",
            source: {
              type: "geojson",
              data: {
                type: "Feature",
                properties: {},
                geometry: coords,
              },
            },
            layout: {
              "line-join": "round",
              "line-cap": "round",
            },
            paint: {
              "line-color": "#03AA46",
              "line-width": 8,
              "line-opacity": 0.8,
            },
          });
        }
      }

      // If the user clicks the delete draw button, remove the layer if it exists
      function removeRoute() {
        if (!map.getSource("route")) return;
        map.removeLayer("route");
        map.removeSource("route");
      }
      return map;
    };

    const map = initializeMap();

    return () => {
      map.remove();
    };
  }, [pos]);

  return (
    <>
      <Grid container>
        <Grid item xs={9}>
          <div id="map" style={{ width: "100%", height: "800px" }} />
        </Grid>
        <Grid item xs={3}>
          <div
            className="info-box"
            style={
              {
                // position: "absolute",
                // margin: "20px",
                // width: "25%",
                // top: 0,
                // bottom: "20px",
                // padding: "20px",
                // backgroundColor: "#fff",
                overflowY: "scroll"
              }
            }
          ><div>Direction: </div>
            <div id="directions" />
          </div>
        </Grid>
      </Grid>
    </>
    // <div>hello</div>
  );
};

export default MapComponent;

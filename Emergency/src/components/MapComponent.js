// import React, { useState, useEffect } from "react";
// import maplibregl from "maplibre-gl";
// import "maplibre-gl/dist/maplibre-gl.css";

// // Example emergency points data
// const emergencyPoints = [
//   { type: 'hospital', coordinates: [-73.935242, 40.730610], name: 'Hospital Name' },
//   { type: 'fire_station', coordinates: [139.691711, 35.689487], name: 'Fire Station Name' },
//   { type: 'police_station', coordinates: [-0.127758, 51.507351], name: 'Police Station Name' },
//   // Add more points as needed
// ];


// const MapComponent = () => {
//   const [map, setMap] = useState(null);

//   useEffect(() => {
 
    
//     if (map) return; // initialize map only once

//     const initializeMap = ({ setMap, maplibregl }) => {
//       const mapInstance = new maplibregl.Map({
//         container: "map-container",
//         style: "https://api.olamaps.io/tiles/vector/v1/styles/default-light-standard/style.json",
//         center: [0, 0],
//         zoom: 1,
//         transformRequest: (url, resourceType) => {
//           const separator = url.includes('?') ? '&' : '?';
//           url = `${url}${separator}api_key=H35SaHynAJJ1VIsL3viRtPBhiysCVuFtjoX0yutE`;
//           return { url, resourceType };
//         }
//       });

//       mapInstance.on("load", () => {
//         setMap(mapInstance);
//         mapInstance.resize();

//         // Add emergency points to the map
//         emergencyPoints.forEach(point => {
//           new maplibregl.Marker({ color: getColorForType(point.type) })
//             .setLngLat(point.coordinates)
//             .setPopup(new maplibregl.Popup({ offset: 25 }).setText(point.name))
//             .addTo(mapInstance);
//         });
//       });
//     };

//     if (!map) initializeMap({ setMap, maplibregl });
//   }, [map]);

//   const getColorForType = (type) => {
//     switch (type) {
//       case 'hospital':
//         return 'red';
//       case 'fire_station':
//         return 'orange';
//       case 'police_station':
//         return 'blue';
//       default:
//         return 'black';
//     }
//   };

//   return <div id="map-container" style={{ width: "100vw", height: "100vh" }} />;
// };

// export default MapComponent;
import React, { useState, useEffect } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

const MapComponent = () => {
  const [map, setMap] = useState(null);
  const [policeStations, setPoliceStations] = useState([]);

  useEffect(() => {
    const fetchPoliceStations = async () => {
      const location = "12.931316595874005,77.61649243443775";
      const response = await fetch(`https://api.olamaps.io/places/v1/autocomplete?input=police%20station&origin=${location}&location=${location}&api_key=H35SaHynAJJ1VIsL3viRtPBhiysCVuFtjoX0yutE`, {
        method: 'GET',
        headers: {
          'accept': 'application/json'
        }
      });
      const data = await response.json();
      console.log("API Response: ", data);
      
      if (data && data.predictions) {
        const stations = data.predictions.map(prediction => ({
          type: 'police_station',
          coordinates: [parseFloat(prediction.geometry.location.lng), parseFloat(prediction.geometry.location.lat)],
          name: prediction.description
        }));
        setPoliceStations(stations);
      }
    };

    fetchPoliceStations();
  }, []);

  useEffect(() => {
    if (!map) {
      const initializeMap = () => {
        const mapInstance = new maplibregl.Map({
          container: "map-container",
          style: "https://api.olamaps.io/tiles/vector/v1/styles/default-light-standard/style.json",
          center: [0, 0],
          // center: [77.61649243443775, 12.931316595874005],
          zoom: 12,
          transformRequest: (url, resourceType) => {
            const separator = url.includes('?') ? '&' : '?';
            url = `${url}${separator}api_key=H35SaHynAJJ1VIsL3viRtPBhiysCVuFtjoX0yutE`;
            return { url, resourceType };
          }
        });

        mapInstance.on("load", () => {
          setMap(mapInstance);
          mapInstance.resize();

          // Add police station points to the map
          policeStations.forEach(point => {
            new maplibregl.Marker({ color: getColorForType(point.type) })
              .setLngLat(point.coordinates)
              .setPopup(new maplibregl.Popup({ offset: 25 }).setText(point.name))
              .addTo(mapInstance);
          });
        });
      };

      initializeMap();
    }
  }, [map, policeStations]);

  const getColorForType = (type) => {
    switch (type) {
      case 'hospital':
        return 'red';
      case 'fire_station':
        return 'orange';
      case 'police_station':
        return 'blue';
      default:
        return 'black';
    }
  };

  return <div id="map-container" style={{ width: "100vw", height: "100vh" }} />;
};

export default MapComponent;

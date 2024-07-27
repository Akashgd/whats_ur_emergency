import React, { useState, useEffect } from 'react';

const LocationTracker = () => {
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
    speed: null,
    heading: null,
    altitude: null,
    error: null  // Added error state to handle location errors
  });

  const handlePosition = (position) => {
    const { latitude, longitude, altitude, heading, speed } = position.coords;
    setLocation({
      latitude,
      longitude,
      altitude,
      heading,
      speed,
      error: null  // Reset error state on successful location update
    });
  };

  const handleError = (error) => {
    console.error('Error getting location:', error);
    setLocation({
      latitude: null,
      longitude: null,
      altitude: null,
      heading: null,
      speed: null,
      error: error.message  // Set error message for display
    });
  };

  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(handlePosition, handleError, {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    });

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(handlePosition, handleError, {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    });
  };

  return (
    <div>
      <h2>Location Tracker</h2>
      <button onClick={getLocation}>Get Location</button>
      {location.error && <p>Error: {location.error}</p>}
      {location.latitude && location.longitude && (
        <div>
          <p>Latitude: {location.latitude}</p>
          <p>Longitude: {location.longitude}</p>
          {/* <p>Altitude: {location.altitude}</p>
          <p>Heading: {location.heading}</p>
          <p>Speed: {location.speed}</p> */}
        </div>
      )}
    </div>
  );
};

export default LocationTracker;

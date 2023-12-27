import React, { useEffect, useState } from 'react';

 const AllDistances = ( {restaurants} ) => {
  const [distance, setDistance] = useState(null);

  useEffect(() => {
    if ('geolocation' in navigator  && restaurants && restaurants.coordinates.length > 0) {
      // Array to store all distance promises
      const distancePromises = restaurants.map(rest =>
        new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(
            position => {
              const userLatitude = position.coords.latitude;
              const userLongitude = position.coords.longitude;
              const calculatedDistance = calculateDistance(
                userLatitude,
                userLongitude,
                rest.coordinates.lat,
                rest.coordinates.lon
              );
              resolve(calculatedDistance);
            },
            error => {
              reject(error);
            }
          );
        })
      );
        
      // Calculate distances for all coordinates and get the shortest distance
      Promise.all(distancePromises)
        .then(distances => {
          const shortestDistance = Math.min(...distances);
          setDistance(shortestDistance);
        })
        .catch(error => {
          console.error('Error getting user location:', error);
        });
    }
    else{
        setDistance(null)
    }
  }, [restaurants]);

  function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth's radius in kilometers
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers
    return distance;
  }

  return distance
    
  
};

export default AllDistances;

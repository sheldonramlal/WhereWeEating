import React, { useEffect, useState } from 'react';

const Distance = ({ coordinates }) => {
  const [distance, setDistance] = useState(null);

  useEffect(() => {
    if ('geolocation' in navigator  && coordinates && coordinates.length > 0) {
      // Array to store all distance promises
      const distancePromises = coordinates.map(coord =>
        new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(
            position => {
              const userLatitude = position.coords.latitude;
              const userLongitude = position.coords.longitude;
              const calculatedDistance = calculateDistance(
                userLatitude,
                userLongitude,
                coord.lat,
                coord.lon
              );
              resolve(calculatedDistance);
            },
            error => {
              reject(error);
            }
          );
        })
      );
        console.log(distancePromises);
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
  }, [coordinates]);

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

  return (
  <div className='flex items-center font-poppins'>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 inline-block">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
    </svg>

    {distance !== null ? `${distance.toFixed(2)} km` : '-'}
  </div>
  )
};

export default Distance;

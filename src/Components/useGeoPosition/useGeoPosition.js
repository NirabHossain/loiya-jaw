import axios from 'axios';
import { useState, useEffect } from 'react';
const useGeoPosition = (key, address) => {
  const [position, setPosition] = useState({ lat: null, lng: null });
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchLatandLng = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${key}`);
      console.log(res);
      const result = res.data.results[0].geometry.location;

      if (result.lat !== null && result.lng !== null) {
        setPosition({ lat: result.lat, lng: result.lng })
      }
      else {
        setError(true);
      }
      setLoading(false);
    }
    catch (error) {
      setLoading(false);
      setError(true);
      console.log(error.message, address);
    }
  }


  useEffect(() => {
    fetchLatandLng();
  }, [address, key])

  return [position, loading, error]
}

export default useGeoPosition;

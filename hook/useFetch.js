import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetch = (endpoint, query) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const options = {
    method: 'GET',
    url: `https://jsearch.p.rapidapi.com/${endpoint}`,
    params: {
      ...query,
    },
    headers: {
      'X-RapidAPI-Key': '99bd5995e1msh28f2f153a58ed82p16c360jsne13e05649100',
      'X-RapidAPI-Host': 'jsearch.p.rapidapi.com',
    },
  };

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const response = await axios.request(options);

      setData(response.data.data);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      alert('There is an error fetching data');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refresh = () => {
    setIsLoading(true);
    fetchData();
  };

  return { data, isLoading, error, refresh };
};

export default useFetch;

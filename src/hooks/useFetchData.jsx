import { useState, useEffect } from "react";

const useFetchData = (fetchFunction, params) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await fetchFunction(params);
        setData(fetchedData);
      } catch (error) {
        setError(error);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [fetchFunction, params]);

  return { data, isLoading, error };
};

export default useFetchData;

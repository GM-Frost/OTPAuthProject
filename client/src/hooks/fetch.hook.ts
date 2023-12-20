import axios from "axios";
import { useEffect, useState } from "react";

/** SERVER DOMAIN - BASE URL */
axios.defaults.baseURL = import.meta.env.VITE_REACT_APP_DOMAIN;

/** CUSTOM HOOKS */
export default function useFetch(query: any) {
  const [getData, setData] = useState({
    isLoading: false,
    apiData: undefined,
    status: null,
    serverError: null,
  });

  useEffect(() => {
    if (!query) return;

    const fetchData = async () => {
      try {
        setData((prev) => ({ ...prev, isLoading: true }));

        const response = await axios.get(`/api/${query}`);

        setData((prev) => ({
          ...prev,
          isLoading: false,
          apiData: response.data,
          status: response.status,
        }));
      } catch (error) {
        setData((prev) => ({ ...prev, isLoading: false, serverError: error }));
      }
    };
    fetchData();
  }, [query]);

  return [getData, setData];
}

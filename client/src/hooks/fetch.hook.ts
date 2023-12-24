import axios from "axios";
import { useEffect, useState } from "react";
import { getUsernameFromToken } from "../helper/helper";

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
    const fetchData = async () => {
      try {
        setData((prev) => ({ ...prev, isLoading: true }));

        const { username } = !query ? await getUsernameFromToken() : "";

        const { data, status } = !query
          ? await axios.get(`/api/user/${username}`)
          : await axios.get(`/api/${query}`);

        setData((prev) => ({
          ...prev,
          isLoading: false,
          apiData: data,
          status,
        }));
      } catch (error) {
        setData((prev) => ({ ...prev, isLoading: false, serverError: error }));
      }
    };
    fetchData();
  }, [query]);

  return [getData, setData];
}

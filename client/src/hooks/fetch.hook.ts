import axios from "axios";
import { useEffect, useState } from "react";
import { getUsernameFromToken } from "../helper/helper";

interface IFetchData {
  isLoading: boolean;
  apiData?: any; // Replace with the actual type of apiData
  status: number | null;
  serverError: Error | null;
}

/** SERVER DOMAIN - BASE URL */
axios.defaults.baseURL = import.meta.env.VITE_REACT_APP_DOMAIN as string;

/** CUSTOM HOOKS */
export default function useFetch(
  query?: string | null
): [IFetchData, React.Dispatch<React.SetStateAction<IFetchData>>] {
  const [getData, setData] = useState<IFetchData>({
    isLoading: false,
    apiData: undefined,
    status: null,
    serverError: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setData((prev) => ({ ...prev, isLoading: true }));

        const { username }: any = !query ? await getUsernameFromToken() : "";

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
        setData((prev) => ({
          ...prev,
          isLoading: false,
          serverError: error as Error,
        }));
      }
    };
    fetchData();
  }, [query]);

  return [getData, setData];
}

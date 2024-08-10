import { useCallback, useState } from "react";
import axiosInstance from "@services/axiosInstance";

const useLocationsApi = () => {
  const [locations, setLocations] = useState([]);
  const [location, setLocation] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [isFetching, setIsFetching] = useState(false);

  const fetchLocations = useCallback(async ({ page, search, filters }) => {
    setIsFetching(true);
    try {
      // Construct the query string based on parameters
      let query = `location?page=${page}`;
      if (search) query += `&name=${search}`;
      if (filters) {
        const { type, dimension } = filters;
        if (type) query += `&type=${type}`;
        if (dimension) query += `&dimension=${dimension}`;
      }

      const response = await axiosInstance.get(`/${query}`);
      const { data } = response;
      setLocations(data.results);
      setTotalPages(data.info.pages);
    } catch (err) {
      setLocations([]);
      setTotalPages(1);
    } finally {
      setIsFetching(false);
    }
  }, []);

  const fetchLocationById = useCallback(async (id) => {
    setIsFetching(true);
    try {
      const response = await axiosInstance.get(`location/${id}`);
      const { data } = response;
      setLocation(data);
      return data;
    } catch (err) {
      setLocation(null);
      return null;
    } finally {
      setIsFetching(false);
    }
  }, []);

  return {
    locations,
    location,
    totalPages,
    isFetching,
    fetchLocations,
    fetchLocationById
  };
};

export default useLocationsApi;

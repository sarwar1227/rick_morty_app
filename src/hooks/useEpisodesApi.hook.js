import { useCallback, useState } from "react";
import axiosInstance from "@services/axiosInstance";

const useEpisodesApi = () => {
  const [episodes, setEpisodes] = useState([]);
  const [episode, setEpisode] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [isFetching, setIsFetching] = useState(false);

  const fetchEpisodes = useCallback(async ({ page, search, filters }) => {
    setIsFetching(true);
    try {
      // Construct the query string based on parameters
      let query = `episode?page=${page}`;
      if (search) query += `&name=${search}`;
      if (filters) {
        const { episode: episodeFilter, air_date } = filters;
        if (episodeFilter) query += `&episode=${episodeFilter}`;
        if (air_date) query += `&air_date=${air_date}`;
      }

      const response = await axiosInstance.get(`/${query}`);
      const { data } = response;
      setEpisodes(data.results);
      setTotalPages(data.info.pages);
    } catch (err) {
      setEpisodes([]);
      setTotalPages(1);
    } finally {
      setIsFetching(false);
    }
  }, []);

  const fetchEpisodeById = useCallback(async (id) => {
    setIsFetching(true);
    try {
      const response = await axiosInstance.get(`episode/${id}`);
      const { data } = response;
      setEpisode(data);
      return data;
    } catch (err) {
      setEpisode(null);
      return null;
    } finally {
      setIsFetching(false);
    }
  }, []);

  return {
    episodes,
    episode,
    totalPages,
    isFetching,
    fetchEpisodes,
    fetchEpisodeById
  };
};

export default useEpisodesApi;

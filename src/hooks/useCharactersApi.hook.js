import { useState, useCallback } from "react";
import axiosInstance from "@services/axiosInstance";

const useCharactersApi = () => {
  const [characters, setCharacters] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isFetching, setIsFetching] = useState(false);
  const [character, setCharacter] = useState(null);
  const [origin, setOrigin] = useState(null);
  const [characterLocation, setCharacterLocation] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCharacters = useCallback(async ({ page, search, filters }) => {
    setIsFetching(true);
    try {
      // Construct the query string based on parameters
      let query = `character?page=${page}`;
      if (search) query += `&name=${search}`;
      if (filters) {
        const { status, location, episode, gender, species, type } = filters;
        if (status) query += `&status=${status}`;
        if (location) query += `&location=${location}`;
        if (episode) query += `&episode=${episode}`;
        if (gender) query += `&gender=${gender}`;
        if (species) query += `&species=${species}`;
        if (type) query += `&type=${type}`;
      }

      const response = await axiosInstance.get(`/${query}`);
      const { data } = response;
      setCharacters(data.results);
      setTotalPages(data.info.pages);
    } catch (err) {
      setCharacters([]);
      setTotalPages(1);
    } finally {
      setIsFetching(false);
    }
  }, []);

  const fetchCharacter = useCallback(async (id) => {
    try {
      const characterResponse = await axiosInstance.get(`character/${id}`);
      setCharacter(characterResponse.data);

      if (characterResponse.data.origin.url) {
        const originResponse = await axiosInstance.get(
          characterResponse.data.origin.url
        );
        setOrigin(originResponse.data);
      }

      if (characterResponse.data.location.url) {
        const locationResponse = await axiosInstance.get(
          characterResponse.data.location.url
        );
        setCharacterLocation(locationResponse.data);
      }

      if (characterResponse.data.episode.length) {
        const episodePromises = characterResponse.data.episode.map(
          (episodeUrl) => axiosInstance.get(episodeUrl)
        );
        const episodeResponses = await Promise.all(episodePromises);
        setEpisodes(episodeResponses.map((response) => response.data.name));
      }
    } finally {
      setIsLoading(false);
      setIsFetching(false);
    }
  }, []);

  const fetchMultipleCharacters = useCallback(async (ids) => {
    setIsFetching(true);
    try {
      const response = await axiosInstance.get(`/character/${ids.join(",")}`);
      setCharacters(
        Array.isArray(response.data) ? response.data : [response.data]
      );
    } catch (err) {
      setCharacters([]);
    } finally {
      setIsFetching(false);
    }
  }, []);

  return {
    fetchCharacters,
    fetchCharacter,
    fetchMultipleCharacters,
    characters,
    totalPages,
    isFetching,
    character,
    origin,
    characterLocation,
    episodes,
    isLoading
  };
};

export default useCharactersApi;

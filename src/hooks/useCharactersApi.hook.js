import { useState, useCallback } from "react";
import axiosInstance from "@services/axiosInstance";

// In-memory caches for different types of data
const cache = {
  characterList: {},
  characterDetails: {},
  multipleCharacters: {},
  origins: {},
  locations: {},
  episodes: {},
};
const useCharactersApi = () => {
  const [characters, setCharacters] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isFetching, setIsFetching] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [character, setCharacter] = useState({
    character: null,
    origin: null,
    location: null,
    episodes: [],
  });

  const fetchCharacterList = useCallback(async ({ page, search, filters }) => {
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

      // Check cache first
      if (cache.characterList[query]) {
        const cachedData = cache.characterList[query];
        setCharacters(cachedData.results);
        setTotalPages(cachedData.info.pages);
      } else {
        const response = await axiosInstance.get(`/${query}`);
        const data = response.data;
        setCharacters(data.results);
        setTotalPages(data.info.pages);

        // Store in cache
        cache.characterList[query] = data;
      }
    } catch (err) {
      setCharacters([]);
      setTotalPages(1);
    } finally {
      setIsFetching(false);
    }
  }, []);

  const fetchCharacter = useCallback(async (id) => {
    setIsLoading(true);
    setIsFetching(true);
    try {
      // Check cache first
      if (cache.characterDetails[id]) {
        const cachedData = cache.characterDetails[id];
        setCharacter({
          character: cachedData.character,
          origin: cache.origins[cachedData.character.origin.url] || null,
          location: cache.locations[cachedData.character.location.url] || null,
          episodes: cachedData.episodes,
        });
      } else {
        const characterResponse = await axiosInstance.get(`character/${id}`);
        const characterData = characterResponse.data;

        let originData = null;
        let locationData = null;

        if (characterData.origin.url) {
          // Fetch origin data if not in cache
          try {
            if (!cache.origins[characterData.origin.url]) {
              const originResponse = await axiosInstance.get(
                characterData.origin.url
              );
              originData = originResponse.data;
              cache.origins[characterData.origin.url] = originData;
            } else {
              originData = cache.origins[characterData.origin.url];
            }
          } catch (error) {
            console.error("Error fetching origin data:", error);
            originData = null;
          }
        }

        if (characterData.location.url) {
          // Fetch location data if not in cache
          try {
            if (!cache.locations[characterData.location.url]) {
              const locationResponse = await axiosInstance.get(
                characterData.location.url
              );
              locationData = locationResponse.data;
              cache.locations[characterData.location.url] = locationData;
            } else {
              locationData = cache.locations[characterData.location.url];
            }
          } catch (error) {
            console.error("Error fetching location data:", error);
            locationData = null;
          }
        }

        if (characterData.episode.length) {
          try {
            const episodePromises = characterData.episode.map((episodeUrl) => {
              // Check cache first
              if (cache.episodes[episodeUrl]) {
                return Promise.resolve({ data: cache.episodes[episodeUrl] });
              } else {
                return axiosInstance.get(episodeUrl);
              }
            });
            const episodeResponses = await Promise.all(episodePromises);
            const episodeNames = episodeResponses.map(
              (response) => response.data.name
            );

            episodeResponses.forEach((response) => {
              const url = response.config?.url;
              if (url) {
                cache.episodes[url] = response.data;
              }
            });

            const characterInfo = {
              character: characterData,
              origin: originData,
              location: locationData,
              episodes: episodeNames,
            };
            setCharacter(characterInfo);

            // Cache the complete character data
            cache.characterDetails[id] = characterInfo;
          } catch (error) {
            console.error("Error fetching episode data:", error);
            setCharacter((prevData) => ({
              ...prevData,
              episodes: [],
            }));
          }
        } else {
          const characterInfo = {
            character: characterData,
            origin: originData,
            location: locationData,
            episodes: [],
          };
          setCharacter(characterInfo);

          // Cache the complete character data
          cache.characterDetails[id] = characterInfo;
        }
      }
    } catch (error) {
      console.error("Error fetching character data:", error);
    } finally {
      setIsLoading(false);
      setIsFetching(false);
    }
  }, []);

  const fetchMultipleCharacters = useCallback(async (ids) => {
    setIsFetching(true);
    try {
      const idsString = ids.join(",");

      // Check cache first
      if (cache.multipleCharacters[idsString]) {
        const cachedData = cache.multipleCharacters[idsString];
        setCharacters(Array.isArray(cachedData) ? cachedData : [cachedData]);
      } else {
        const response = await axiosInstance.get(`/character/${idsString}`);
        const data = response.data;
        setCharacters(Array.isArray(data) ? data : [data]);

        // Store in cache
        cache.multipleCharacters[idsString] = data;
      }
    } catch (err) {
      setCharacters([]);
      console.error("Error fetching multiple characters data:", err);
    } finally {
      setIsFetching(false);
    }
  }, []);

  return {
    fetchCharacterList,
    fetchCharacter,
    fetchMultipleCharacters,
    characters,
    totalPages,
    isFetching,
    origin,
    character,
    isLoading,
  };
};

export default useCharactersApi;

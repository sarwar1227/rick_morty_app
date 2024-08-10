import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Grid, Box, Typography } from "@mui/material";
import { useCharactersApi, useEpisodesApi } from "@hooks";
import { CharacterCard, Loader } from "@components";

const EpisodesCharactersPage = () => {
  /**
   * Local states
   */
  const [episodeName, setEpisodeName] = useState("");

  /**
   * Url Params
   */
  const { id } = useParams();

  /**
   * Custom Hooks
   */
  const {
    fetchMultipleCharacters,
    characters,
    isFetching: isFetchingCharacters
  } = useCharactersApi();
  const { fetchEpisodeById, isFetching: isFetchingEpisode } = useEpisodesApi();

  /**
   * Fetches the below data on first load  -
   * 1. Episodes data based on id provided in url
   * 2. List of characters data associated with the episode
   */
  useEffect(() => {
    const fetchEpisodeData = async () => {
      const episodeData = await fetchEpisodeById(id);
      if (episodeData) {
        setEpisodeName(episodeData.name);
        const characterIds = episodeData.characters.map((url) => url.split("/").pop());
        fetchMultipleCharacters(characterIds);
      }
    };

    fetchEpisodeData();
  }, [id, fetchEpisodeById, fetchMultipleCharacters]);

  if (isFetchingEpisode || isFetchingCharacters) {
    return <Loader />;
  }

  return (
    <Box>
      <Typography variant="h4" textAlign="center" my={4}>
        Characters from {episodeName}
      </Typography>
      {characters.length === 0 ? (
        <Box textAlign="center" mt={4}>
          <Typography>No characters found.</Typography>
        </Box>
      ) : (
        <Grid container spacing={1} marginBottom={1}>
          {characters.map((character) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={character.id}>
              <CharacterCard character={character} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default EpisodesCharactersPage;

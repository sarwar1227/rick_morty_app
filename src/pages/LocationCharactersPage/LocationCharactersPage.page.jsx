import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Grid, Box, Typography } from "@mui/material";
import { useCharactersApi, useLocationsApi } from "@hooks";
import { CharacterCard, Loader } from "@components";

const LocationCharactersPage = () => {
  /**
   * Local states
   */
  const [locationName, setLocationName] = useState("");

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
  const { fetchLocationById, isFetching: isFetchingLocation } = useLocationsApi();

  /**
   * Fetches the below data on first load  -
   * 1. Location data based on id provided in url
   * 2. List of characters data associated with the location
   */
  useEffect(() => {
    const fetchLocationData = async () => {
      const locationData = await fetchLocationById(id);
      if (locationData) {
        setLocationName(locationData.name);
        const characterIds = locationData.residents.map((url) => url.split("/").pop());
        fetchMultipleCharacters(characterIds);
      }
    };

    fetchLocationData();
  }, [id, fetchLocationById, fetchMultipleCharacters]);

  if (isFetchingLocation || isFetchingCharacters) {
    return <Loader />;
  }

  return (
    <Box>
      <Typography variant="h4" textAlign="center" my={4}>
        Characters from {locationName}
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

export default LocationCharactersPage;

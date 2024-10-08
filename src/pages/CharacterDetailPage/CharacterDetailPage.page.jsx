import { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  useTheme,
  Grid,
  Typography,
  Card,
  CardContent,
  Stack,
  useMediaQuery,
} from "@mui/material";
import { Videocam, LocationOn, Map, PlayCircle } from "@mui/icons-material";
import { CharacterStatusIndicator, Loader, DescriptionList } from "@components";
import { useCharactersApi } from "@hooks";

const CharacterDetailPage = () => {
  const { breakpoints } = useTheme();
  const isSmallScreen = useMediaQuery(breakpoints.down("sm"));
  const { id } = useParams();
  const { fetchCharacter, isFetching, character, isLoading } =
    useCharactersApi();

  const originDescriptionItems = [
    { title: "Name", value: character.origin?.name },
    { title: "Type", value: character.origin?.type },
    { title: "Dimension", value: character.origin?.dimension },
    { title: "Residents", value: character.origin?.residents?.length || "0" },
  ];

  const locationDescriptionItems = [
    { title: "Name", value: character.location?.name },
    { title: "Type", value: character.location?.type },
    { title: "Dimension", value: character.location?.dimension },
    { title: "Residents", value: character.location?.residents?.length || "0" },
  ];

  const characterDescriptionItems = [
    { title: "Status", value: character?.character?.status },
    { title: "Species", value: character?.character?.species },
    { title: "Type", value: character?.character?.type },
    { title: "Gender", value: character?.character?.gender },
  ];

  /**
   * Fetches the character data, once the component loads.
   */
  useEffect(() => {
    if (id) {
      fetchCharacter(id);
    }
  }, [id]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Grid container spacing={0.5}>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Stack direction="column">
              <Stack justifyContent="center" alignItems="center" spacing={1}>
                <CharacterStatusIndicator
                  status={character?.character?.status}
                />
                <Typography
                  variant={isSmallScreen ? "h4" : "h1"}
                  marginBottom={0.5}
                >
                  {character?.character?.name}
                </Typography>
              </Stack>
              <Stack
                justifyContent="space-evenly"
                direction={isSmallScreen ? "column" : "row"}
              >
                <DescriptionList items={characterDescriptionItems} />
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Card>
          <CardContent>
            <Stack alignItems="center" spacing={0.5} marginBottom={0.5}>
              <Map />
              <Typography variant="h4" marginBottom={0.5}>
                Origin
              </Typography>
            </Stack>
            <Stack direction="column">
              <DescriptionList items={originDescriptionItems} />
            </Stack>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Card>
          <CardContent>
            <Stack alignItems="center" spacing={0.5} marginBottom={0.5}>
              <LocationOn />
              <Typography variant="h4" marginBottom={0.5}>
                Current Location
              </Typography>
            </Stack>
            <Stack direction="column">
              <DescriptionList items={locationDescriptionItems} />
            </Stack>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Stack alignItems="center" spacing={0.5} marginBottom={0.5}>
              <Videocam />
              <Typography variant="h4">Episodes</Typography>
            </Stack>
            {isFetching ? (
              <Loader />
            ) : (
              character.episodes.map((episode) => (
                <Stack spacing={0.5} key={episode}>
                  <PlayCircle />
                  <Typography variant="body1">{episode}</Typography>
                </Stack>
              ))
            )}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default CharacterDetailPage;

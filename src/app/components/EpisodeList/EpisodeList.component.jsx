import EpisodeCard from "@components/EpisodeCard";
import { Grid, Box, Typography } from "@mui/material";

const EpisodeList = ({ episodes }) => {
  if (episodes.length === 0) {
    return (
      <Box textAlign="center" mt={4}>
        <Typography>No episodes found.</Typography>
      </Box>
    );
  }

  return (
    <Grid container spacing={1} marginBottom={1}>
      {episodes.map((episode) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={episode.id}>
          <EpisodeCard episode={episode} />
        </Grid>
      ))}
    </Grid>
  );
};

export default EpisodeList;

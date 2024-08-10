import LocationCard from "@components/LocationCard";
import { Grid, Box, Typography } from "@mui/material";

const LocationList = ({ locations }) => {
  if (locations.length === 0) {
    return (
      <Box textAlign="center" mt={4}>
        <Typography>No locations found.</Typography>
      </Box>
    );
  }

  return (
    <Grid container spacing={1} marginBottom={1}>
      {locations.map((location) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={location.id}>
          <LocationCard location={location} />
        </Grid>
      ))}
    </Grid>
  );
};

export default LocationList;

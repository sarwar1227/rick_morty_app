import { useState, useEffect } from "react";
import { Grid, Typography, useTheme, useMediaQuery } from "@mui/material";
import { SearchBar, Loader, PaginationBar, LocationList } from "@components";
import { useLocationsApi } from "@hooks";

const LocationsPage = () => {
  /**
   * Local states
   */
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  /**
   * Hooks
   */
  const { breakpoints } = useTheme();
  const isSmallScreen = useMediaQuery(() => breakpoints.down("sm"));

  /**
   * Custom Hooks
   */
  const { locations, totalPages, isFetching, fetchLocations } = useLocationsApi();

  /**
   * Fetches the locations based on first load or change of  -
   * 1. Selected page number
   * 2. Search query
   */
  useEffect(() => {
    fetchLocations({ page, search });
  }, [page, search]);

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Typography
          textAlign="center"
          variant={isSmallScreen ? "h5" : "h3"}
          fontWeight={800}
        >
          Locations
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <SearchBar
          placeholder="Type location name to search..."
          onSearch={setSearch}
          resetPageNumber={() => setPage(1)}
        />
      </Grid>
      <Grid item xs={12}>
        <PaginationBar page={page} totalPages={totalPages} setPage={setPage} />
      </Grid>
      <Grid item xs={12}>
        {isFetching && <Loader />}
        {!isFetching && !locations.length && (
          <Typography textAlign="center">No Locations Found</Typography>
        )}
        {!isFetching && locations.length > 0 && (
          <LocationList locations={locations} />
        )}
      </Grid>
    </Grid>
  );
};

export default LocationsPage;

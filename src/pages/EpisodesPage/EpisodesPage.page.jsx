import { useState, useEffect } from "react";
import { Grid, Typography, useTheme, useMediaQuery } from "@mui/material";
import { SearchBar, Loader, PaginationBar, EpisodeList } from "@components";
import { useEpisodesApi } from "@hooks";

const EpisodesPage = () => {
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
  const { episodes, totalPages, isFetching, fetchEpisodes } = useEpisodesApi();

  /**
   * Fetches the episodes based on first load or change of  -
   * 1. Selected page number
   * 2. Search query
   */
  useEffect(() => {
    fetchEpisodes({ page, search });
  }, [page, search]);

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Typography
          textAlign="center"
          variant={isSmallScreen ? "h5" : "h3"}
          fontWeight={800}
        >
          Episodes
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <SearchBar
          placeholder="Type episode name to search..."
          onSearch={setSearch}
          resetPageNumber={() => setPage(1)}
        />
      </Grid>
      <Grid item xs={12}>
        <PaginationBar page={page} totalPages={totalPages} setPage={setPage} />
      </Grid>
      <Grid item xs={12}>
        {isFetching && <Loader />}
        {!isFetching && !episodes.length && (
          <Typography textAlign="center">No Episodes Found</Typography>
        )}
        {!isFetching && episodes.length > 0 && (
          <EpisodeList episodes={episodes} />
        )}
      </Grid>
    </Grid>
  );
};

export default EpisodesPage;

import { useState, useEffect } from "react";
import {
  useTheme,
  Grid,
  Typography,
  useMediaQuery,
  Stack,
} from "@mui/material";
import {
  SearchBar,
  FilterBar,
  CharacterList,
  Loader,
  PaginationBar,
} from "@components";
import { useCharactersApi } from "@hooks";

const CharactersPage = () => {
  /**
   * Local states
   */
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({});

  /**
   * Hooks
   */
  const { breakpoints } = useTheme();
  const isSmallScreen = useMediaQuery(() => breakpoints.down("sm"));

  /**
   * Custom Hooks
   */
  const { fetchCharacterList, characters, totalPages, isFetching } =
    useCharactersApi();

  /**
   * Fetches the characters based on first load or change of  -
   * 1. Selected page number
   * 2. Search query
   * 3. Applied filters
   */
  useEffect(() => {
    fetchCharacterList({ page, search, filters });
  }, [page, search, filters]);

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Typography
          textAlign="center"
          variant={isSmallScreen ? "h5" : "h3"}
          fontWeight={800}
        >
          Characters
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Stack spacing={1.5} direction="column">
          <FilterBar onFilterChange={setFilters} />
          <SearchBar
            placeholder="Type character to search..."
            onSearch={setSearch}
            resetPageNumber={() => setPage(1)}
          />
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <PaginationBar page={page} totalPages={totalPages} setPage={setPage} />
      </Grid>
      <Grid item xs={12}>
        {isFetching && <Loader />}
        {!isFetching && !characters.length && (
          <Typography textAlign="center">No Characters Found</Typography>
        )}
        {!isFetching && characters.length > 0 && (
          <CharacterList characters={characters} />
        )}
      </Grid>
    </Grid>
  );
};

export default CharactersPage;

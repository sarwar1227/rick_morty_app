import { useEffect, useState } from "react";
import { TextField, MenuItem, Button, Grid, Typography } from "@mui/material";
import { Clear } from "@mui/icons-material";
import { axiosInstance } from "@services";
import Loader from "@components/Loader";
import { initialFilterOptions, initialFilters } from "./FilterBar.constants";

const FilterBar = ({ onFilterChange, isLoading }) => {
  /**
   * Local states
   * */
  const [filters, setFilters] = useState(initialFilters);
  const [filterOptions, setFilterOptions] = useState(initialFilterOptions);
  const [loadingOptions, setLoadingOptions] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Operations performed here are as follows -
   * 1. Fetch all characters, locations & episodes
   * 2. Extract the episode, location, status, gender, species, type options for filters.
   */
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        // Fetching all data in parallel
        const [characterResponse, locationResponse, episodeResponse] = await Promise.all([
          axiosInstance.get("https://rickandmortyapi.com/api/character"),
          axiosInstance.get("https://rickandmortyapi.com/api/location"),
          axiosInstance.get("https://rickandmortyapi.com/api/episode")
        ]);

        // Extract options from API responses
        const locations = locationResponse.data.results.map(
          (location) => location.name
        );
        const episodes = episodeResponse.data.results.map(
          (episode) => episode.name
        );
        const characters = characterResponse.data.results;

        // Derive filter options from characters data
        const statuses = [
          ...new Set(characters.map((character) => character.status))
        ];
        const genders = [
          ...new Set(characters.map((character) => character.gender))
        ];
        const species = [
          ...new Set(characters.map((character) => character.species))
        ];
        const types = [
          ...new Set(
            characters.map((character) => character.type).filter(Boolean)
          )
        ];

        setFilterOptions({
          status: statuses,
          location: locations,
          episode: episodes,
          gender: genders,
          species,
          type: types
        });
      } catch (err) {
        setError(err);
      } finally {
        setLoadingOptions(false);
      }
    };

    fetchOptions();
  }, []);

  /**
   * Handles filter change
   * */
  const handleFilterChange = (filterName, value) => {
    const newFilters = {
      ...filters,
      [filterName]: value
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  /**
   * Handles clearing filters
   * */
  const handleClearFilters = () => {
    setFilters(initialFilters);
    onFilterChange(initialFilters);
  };

  if (loadingOptions) return <Loader />;
  if (error) {
    return <Typography color="error">Error loading filter options</Typography>;
  }

  /**
   * Filter fields configuration
   */
  const filterFields = [
    { label: "Status", name: "status", options: filterOptions.status },
    { label: "Location", name: "location", options: filterOptions.location },
    { label: "Episode", name: "episode", options: filterOptions.episode },
    { label: "Gender", name: "gender", options: filterOptions.gender },
    { label: "Species", name: "species", options: filterOptions.species },
    { label: "Type", name: "type", options: filterOptions.type }
  ];

  return (
    <Grid container gap={1} justifyContent="center">
      {filterFields.map(({ label, name, options }) => (
        <Grid item xs={3} lg={1.5} key={name}>
          <TextField
            color="warning"
            size="small"
            fullWidth
            select
            label={label}
            value={filters[name]}
            onChange={(e) => handleFilterChange(name, e.target.value)}
            variant="outlined"
            disabled={isLoading}
          >
            <MenuItem value="">All</MenuItem>
            {options.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      ))}
      <Grid item xs={12}>
        <Button
          fullWidth
          size="small"
          variant="text"
          disabled={isLoading}
          color="warning"
          onClick={handleClearFilters}
          endIcon={<Clear />}
        >
          Clear
        </Button>
      </Grid>
    </Grid>
  );
};

export default FilterBar;

import { useState, useEffect, useRef } from "react";
import { TextField, InputAdornment } from "@mui/material";
import { Search } from "@mui/icons-material";

const SearchBar = ({ placeholder, onSearch, resetPageNumber }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const debounceTimeoutRef = useRef(null);

  const handleChange = (event) => {
    // Reset the page number whenever the search input changes
    resetPageNumber();

    const query = event.target.value;
    setSearchTerm(query);

    // Clear the existing timeout if the user is still typing
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    // Debounce the search input
    debounceTimeoutRef.current = setTimeout(() => {
      onSearch(query);
    }, 300);
  };

  // Cleanup the timeout on component unmount
  // eslint-disable-next-line arrow-body-style
  useEffect(() => {
    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, []);

  return (
    <TextField
      color="warning"
      size="small"
      fullWidth
      variant="outlined"
      placeholder={placeholder}
      value={searchTerm}
      onChange={handleChange}
      sx={{ marginRight: 1 }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Search />
          </InputAdornment>
        )
      }}
    />
  );
};

export default SearchBar;

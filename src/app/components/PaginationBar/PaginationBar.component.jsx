import { Stack, Pagination, useMediaQuery, useTheme } from "@mui/material";

const PaginationBar = ({ page, totalPages, setPage }) => {
  const { breakpoints } = useTheme();
  const isSmallScreen = useMediaQuery(breakpoints.down("sm"));

  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <Stack direction="row" justifyContent="center" sx={{ width: "100%" }}>
      <Pagination
        count={totalPages}
        page={page}
        onChange={handleChange}
        color="warning"
        showFirstButton
        showLastButton
        size={isSmallScreen ? "small" : "medium"}
      />
    </Stack>
  );
};

export default PaginationBar;

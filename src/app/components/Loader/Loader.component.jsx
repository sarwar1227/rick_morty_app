import { CircularProgress, Stack } from "@mui/material";

const Loader = () => (
  <Stack justifyContent="center">
    <CircularProgress color="warning" />
  </Stack>
);

export default Loader;

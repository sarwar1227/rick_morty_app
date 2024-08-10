import { Stack, Typography } from "@mui/material";
import { memo } from "react";

const DescriptionItem = memo(({ title, value }) => (
  <Stack spacing={0.5} alignItems="center">
    <Typography variant="h6">{title}:</Typography>
    <Typography>{value || "N/A"}</Typography>
  </Stack>
));

export default DescriptionItem;

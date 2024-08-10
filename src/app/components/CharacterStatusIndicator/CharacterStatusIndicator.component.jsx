import { Box } from "@mui/material";
import { getStatusColor } from "./CharacterStatusIndicator.helper";

const CharacterStatusIndicator = ({ status }) => (
  <Box
    sx={{
      width: 8,
      height: 8,
      borderRadius: "50%",
      backgroundColor: getStatusColor(status),
      mr: 0.25
    }}
  />
);

export default CharacterStatusIndicator;

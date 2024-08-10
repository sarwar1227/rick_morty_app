import {
  Typography,
  useTheme,
  useMediaQuery,
  Button,
  IconButton,
  Stack
} from "@mui/material";
import { LocationOn, PlayCircle } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const {
    spacing,
    breakpoints: { down }
  } = useTheme();
  const isSmallScreen = useMediaQuery(down("sm"));

  return (
    <Stack
      alignItems="center"
      justifyContent="space-between"
      sx={{
        background: "#494a4d",
        padding: spacing(0.5, 1)
      }}
    >
      <Typography
        onClick={() => navigate("/")}
        color="white"
        variant={isSmallScreen ? "h6" : "h3"}
        sx={{
          cursor: "pointer",
          fontWeight: 800
        }}
      >
        Rick & Morty App
      </Typography>
      <Stack spacing={1}>
        {isSmallScreen ? (
          <IconButton color="warning" onClick={() => navigate("/locations")}>
            <Typography marginRight={0.25}>Locations</Typography>
            <LocationOn />
          </IconButton>
        ) : (
          <Button
            color="warning"
            endIcon={<LocationOn />}
            onClick={() => navigate("/locations")}
          >
            Explore Locations
          </Button>
        )}
        {isSmallScreen ? (
          <IconButton color="warning" onClick={() => navigate("/episodes")}>
            <Typography marginRight={0.25}>Episodes</Typography>
            <PlayCircle />
          </IconButton>
        ) : (
          <Button
            color="warning"
            endIcon={<PlayCircle />}
            onClick={() => navigate("/episodes")}
          >
            Explore Epsidoes
          </Button>
        )}
      </Stack>
    </Stack>
  );
};

export default Header;

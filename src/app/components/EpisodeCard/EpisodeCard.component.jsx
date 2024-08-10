import { Card, CardContent, Typography, Stack, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const EpisodeCard = ({
  episode: { id, name, episode, air_date, characters }
}) => {
  const navigate = useNavigate();

  return (
    <Card
      sx={{
        cursor: "pointer",
        transition: "transform 0.3s ease-in-out",
        "&:hover": {
          transform: "scale(1.05)"
        }
      }}
    >
      <CardContent>
        <Stack direction="column">
          <Typography variant="h6">{name}</Typography>
          <Typography variant="body2" color="textSecondary">
            {episode} - {air_date}
          </Typography>
          <Button
            variant="contained"
            color="warning"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/episode/${id}/characters`);
            }}
            sx={{ marginTop: 1 }}
          >
            See All Characters
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default EpisodeCard;

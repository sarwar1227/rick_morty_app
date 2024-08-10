import CharacterStatusIndicator from "@components/CharacterStatusIndicator";
import { Card, CardContent, Typography, CardMedia, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

const CharacterCard = ({ character: { id, name, image, status, species } }) => {
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
      onClick={() => navigate(`/profile/${id}`)}
    >
      <CardMedia component="img" height="140" image={image} alt={name} />
      <CardContent>
        <Stack direction="column">
          <Typography variant="h6">{name}</Typography>
          <Stack alignItems="center">
            <CharacterStatusIndicator status={status} />
            <Typography variant="body2" color="textSecondary">
              {status} - {species}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default CharacterCard;

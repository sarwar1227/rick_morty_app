import { Card, CardContent, Typography, Stack, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const LocationCard = ({
  location: { id, name, type, dimension, residents }
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
            {type} - {dimension}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Residents: {residents.length}
          </Typography>
          <Button
            variant="contained"
            color="warning"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/location/${id}/characters`);
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

export default LocationCard;

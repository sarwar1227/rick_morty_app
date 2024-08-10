import { Grid, Box, Typography } from "@mui/material";
import CharacterCard from "../CharacterCard";

const CharacterList = ({ characters }) => {
  if (characters.length === 0) {
    return (
      <Box textAlign="center" mt={4}>
        <Typography>No characters found.</Typography>
      </Box>
    );
  }

  return (
    <Grid container spacing={1} marginBottom={1}>
      {characters.map((character) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={character.id}>
          <CharacterCard character={character} />
        </Grid>
      ))}
    </Grid>
  );
};

export default CharacterList;

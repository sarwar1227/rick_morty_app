import { Container, Stack } from "@mui/material";
import { Header, Footer } from "@containers/index";

const AppWrapper = ({ children }) => (
  <Stack
    direction="column"
    sx={{
      minHeight: "100vh"
    }}
  >
    <Header />
    <Container maxWidth="md" sx={{ marginTop: 1, marginBottom: 1 }}>
      {children}
    </Container>
    <Footer />
  </Stack>
);

export default AppWrapper;

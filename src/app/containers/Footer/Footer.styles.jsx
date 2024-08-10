import { styled, Box } from "@mui/material";

export const FooterWrapper = styled(Box)(({ theme: { spacing } }) => ({
  borderTop: "1px solid #ccc",
  marginTop: "auto",
  marginBottom: spacing(1),
  paddingTop: spacing(2)
}));

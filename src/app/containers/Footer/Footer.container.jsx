import { Link, Typography } from "@mui/material";
import { FooterWrapper } from "./Footer.styles";

const Footer = () => (
  <FooterWrapper>
    <Link
      sx={{ textDecoration: "none" }}
      href="https://www.linkedin.com/in/sarwar1227"
      target="_blank"
      rel="noopener noreferrer"
      color="inherit"
    >
      <Typography variant="body2" align="center">
        © {new Date().getFullYear()} - Made with 💜 by Sarwar Ali
      </Typography>
    </Link>
  </FooterWrapper>
);

export default Footer;

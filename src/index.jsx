import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { getAppTheme } from "@theme";
import { GlobalAlert } from "@components";
import { AppWrapper } from "@layouts";
import { store } from "@store";
import App from "./App";

import "./index.css";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <ThemeProvider theme={getAppTheme()}>
        <CssBaseline>
          <GlobalAlert />
          <AppWrapper>
            <App />
          </AppWrapper>
        </CssBaseline>
      </ThemeProvider>
    </Provider>
  </BrowserRouter>
);

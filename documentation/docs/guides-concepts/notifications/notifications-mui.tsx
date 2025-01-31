import { Sandpack } from "@site/src/components/sandpack";
import React from "react";

export default function NotificationMui() {
  return (
    <Sandpack
      height={460}
      showOpenInCodeSandbox={false}
      dependencies={{
        "@refinedev/core": "latest",
        "@refinedev/simple-rest": "latest",
        "@emotion/react": "^11.8.2",
        "@emotion/styled": "^11.8.1",
        "@mui/lab": "^5.0.0-alpha.85",
        "@mui/material": "^5.14.2",
        "@refinedev/mui": "latest",
      }}
      startRoute="/"
      files={{
        "/App.tsx": {
          code: AppTsxCode,
        },
        "/home-page.tsx": {
          code: HomePageTsxCode,
          active: true,
        },
      }}
    />
  );
}

const AppTsxCode = /* jsx */ `
import React from "react";
import { Refine } from "@refinedev/core";
import {
    RefineThemes,
    notificationProvider,
    RefineSnackbarProvider,
} from "@refinedev/mui";
import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import { ThemeProvider } from "@mui/material/styles";
import dataProvider from "@refinedev/simple-rest";
import { HomePage } from "./home-page";

const App: React.FC = () => {
    return (
        <ThemeProvider theme={RefineThemes.Blue}>
            <CssBaseline />
            <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
            <RefineSnackbarProvider preventDuplicate={true}>
                <Refine
                    dataProvider={dataProvider(
                        "https://api.fake-rest.refine.dev",
                    )}
                    notificationProvider={notificationProvider}
                >
                    <HomePage />
                </Refine>
            </RefineSnackbarProvider>
        </ThemeProvider>
    );
};

export default App;

`.trim();

const HomePageTsxCode = /* jsx */ `
import React from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { useNotification } from "@refinedev/core";

export const HomePage = () => {
    const { open, close } = useNotification();
    return (
        <Grid
            container
            spacing={2}
            sx={{
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
            }}
        >
            <Grid item>
                <Button
                    variant="contained"
                    onClick={() => {
                        open?.({
                            type: "success",
                            message: "Notification Title",
                            description:
                                "This is the content of the notification.",
                            key: "notification-key",
                        });
                    }}
                >
                    Open Notification
                </Button>
            </Grid>
            <Grid item>
                <Button
                    variant="outlined"
                    onClick={() => {
                        close?.("notification-key");
                    }}
                >
                    Close Notification
                </Button>
            </Grid>
        </Grid>
    );
};


`.trim();

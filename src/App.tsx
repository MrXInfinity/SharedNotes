import {
  RouterProvider,
  createBrowserRouter,
  Navigate,
} from "react-router-dom";
import Navigation from "./components/Navigation";
import CssBaseline from "@mui/material/CssBaseline";
import Home from "./pages/Home/Home";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SignIn from "./pages/SignInComponent";
import SignUp from "./pages/SignUpComponent";
import { ThemeProvider } from "@mui/material/styles";
import useCustomTheme from "./theme";
import Container from "@mui/material/Container";
import { auth } from "./firebase";
import useAuthContext from "./context";
import LoggedOutNav from "./components/LoggedOutNav";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers";
import SharedNotes from "./pages/SharedNotes/SharedNotes";
import NotePage from "./pages/PrivateNotes/NotePage";

function App() {
  const queryClient = new QueryClient();
  const { currentUser, logout } = useAuthContext();
  const { theme, changeTheme } = useCustomTheme();

  return (
    <Container
      disableGutters={true}
      maxWidth="xl"
      sx={{ padding: 0 }}
    >
      <QueryClientProvider client={queryClient}>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <RouterProvider
              router={createBrowserRouter([
                {
                  path: "/",
                  element: auth.currentUser ? (
                    <Navigation {...{ logout, changeTheme }} />
                  ) : (
                    <Navigate to="/sign-in" />
                  ),
                  children: [
                    {
                      index: true,
                      element: <Home />,
                    },
                    {
                      path: "shared-notes",
                      element: <SharedNotes />,
                    },
                    {
                      path: "private-notes",
                      element: <NotePage category={"Private"} />,
                    },
                    {
                      path: "reminders",
                      element: <h1>Reminders</h1>,
                    },
                    {
                      path: "tasks",
                      element: <h1>Tasks</h1>,
                    },
                    {
                      path: "public-share",
                      element: <h1>Public Note Sharing</h1>,
                    },
                  ],
                },
                {
                  path: "sign-in",
                  element: !auth.currentUser ? (
                    <LoggedOutNav {...{ changeTheme }} />
                  ) : (
                    <Navigate to="/" />
                  ),
                  children: [
                    {
                      index: true,
                      element: <SignIn />,
                    },
                    {
                      path: "new-user",
                      element: <SignUp />,
                    },
                  ],
                },
              ])}
            />
          </ThemeProvider>
        </LocalizationProvider>
      </QueryClientProvider>
    </Container>
  );
}

export default App;

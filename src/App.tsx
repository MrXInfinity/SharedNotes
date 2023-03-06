import {
  RouterProvider,
  createBrowserRouter,
  Navigate,
} from "react-router-dom";
import { auth } from "./firebase";
import useCustomTheme from "./theme";
import useAuth from "./hooks/useAuth";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers";
import Navigation from "./components/Navigation";
import LoggedOutNav from "./pages/LoggedOutPage/LoggedOutNav";
import Home from "./pages/Home/Home";
import SignIn from "./pages/LoggedOutPage/SignInComponent";
import SignUp from "./pages/LoggedOutPage/SignUpComponent";
import NotePage from "./pages/NotesPage/NotePage";

function App() {
  const { theme, changeTheme } = useCustomTheme();
  const { logout } = useAuth();

  console.log(auth.currentUser);

  return (
    <Container
      disableGutters={true}
      maxWidth="xl"
      sx={{ padding: 0 }}
    >
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
                    element: <NotePage category={"Shared"} />,
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
    </Container>
  );
}

export default App;

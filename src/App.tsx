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

function App() {
  const queryClient = new QueryClient();
  const { currentUser, logout } = useAuthContext();
  const { theme, changeTheme } = useCustomTheme();

  return (
    <Container sx={{ padding: 0 }}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <RouterProvider
            router={createBrowserRouter([
              {
                path: "/",
                element: currentUser ? (
                  <Navigation {...{ logout }} />
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
                    element: <h1>Shared Notes</h1>,
                  },
                  {
                    path: "private-notes",
                    element: <h1>Private Notes</h1>,
                  },
                  {
                    path: "reminders",
                    element: <h1>Reminders</h1>,
                  },
                  {
                    path: "tasks",
                    element: <h1>Tasks</h1>,
                  },
                ],
              },
              {
                path: "sign-in",
                element: !currentUser ? (
                  <LoggedOutNav {...{ changeTheme }} />
                ) : (
                  <Navigate to="/" />
                ),
                children: [
                  {
                    index: true,
                    element: <SignIn {...{ changeTheme }} />,
                  },
                  {
                    path: "new-user",
                    element: <SignUp {...{ changeTheme }} />,
                  },
                ],
              },
            ])}
          />
        </ThemeProvider>
      </QueryClientProvider>
    </Container>
  );
}

export default App;

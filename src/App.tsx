import {
  RouterProvider,
  createBrowserRouter,
  redirect,
} from "react-router-dom";
import Navigation from "./components/Navigation";
import CssBaseline from "@mui/material/CssBaseline";
import Home from "./pages/Home/Home";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import UseAuthenticate from "./hooks/useAuthenticate";
import SignIn from "./pages/SignInComponent";
import { ThemeProvider } from "@mui/material/styles";
import useCustomTheme from "./theme";
import Container from "@mui/material/Container";

function App() {
  const queryClient = new QueryClient();
  const { currentUser } = UseAuthenticate();
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
                loader: async () => {
                  if (!currentUser) return redirect("/sign-in");
                },
                element: <Navigation />,
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
                path: "/sign-in",
                element: <SignIn setIsDarkMode={changeTheme} />,
              },
              {
                path: "/sign-up",
                element: <h1>Sign Up</h1>,
              },
            ])}
          />
        </ThemeProvider>
      </QueryClientProvider>
    </Container>
  );
}

export default App;

import { Container } from "@mui/system";
import {
  RouterProvider,
  createBrowserRouter,
  useNavigate,
} from "react-router-dom";
import Navigation from "./components/Navigation";
import CssBaseline from "@mui/material/CssBaseline";
import Home from "./pages/Home/Home";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import UseAuthenticate from "./hooks/useAuthenticate";

function App() {
  const queryClient = new QueryClient();
  const navigate = useNavigate();
  const { currentUser, login } = UseAuthenticate();

  return (
    <Container sx={{ padding: 0 }}>
      <QueryClientProvider client={queryClient}>
        <CssBaseline />
        <RouterProvider
          router={createBrowserRouter([
            {
              path: "/",
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
              element: <h1>Sign In</h1>,
            },
            {
              path: "/sign-up",
              element: <h1>Sign Up</h1>,
            },
          ])}
        />
      </QueryClientProvider>
    </Container>
  );
}

export default App;

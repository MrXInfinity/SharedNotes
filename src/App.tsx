import {
  RouterProvider,
  createBrowserRouter,
  Navigate,
} from "react-router-dom";
import { auth } from "./firebase";
import useCustomTheme from "./theme";
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
import Reminder from "./pages/Reminder/Reminder";
import { FirestoreProvider } from "./firestoreContext";
import Task from "./pages/Task/Task";
import moment from "moment";
import PublicPage from "./pages/PublicPage/PublicPage";
import { useAuthState } from "react-firebase-hooks/auth";

function App() {
  const { theme, changeTheme } = useCustomTheme();
  const [signedInUser, loading, error] = useAuthState(auth);
  console.log(signedInUser);

  moment.updateLocale("en", {
    weekdays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    calendar: {
      lastDay: "[Yesterday]",
      sameDay: "[Today]",
      nextDay: "[Tomorrow]",
      lastWeek: "[last] dddd",
      nextWeek: "dddd",
      sameElse: "MM/DD/YY",
    },
  });

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
                element: signedInUser ? (
                  <FirestoreProvider
                    key={null}
                    type={""}
                    props={undefined}
                  >
                    <Navigation {...{ changeTheme }} />
                  </FirestoreProvider>
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
                    element: <Reminder />,
                  },
                  {
                    path: "tasks",
                    element: <Task />,
                  },
                  {
                    path: "public-share",
                    element: <PublicPage />,
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

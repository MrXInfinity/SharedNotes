import Brightness7Icon from "@mui/icons-material/Brightness7";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import YouTubeIcon from "@mui/icons-material/YouTube";
import {
  Box,
  Container,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import LoggedOutBg from "../../assets/logoutBG.jpg";

const LinkIcon: React.FC<{ link?: string; icon: any; click?: () => void }> = ({
  link,
  icon,
  click,
}) => {
  const theme = useTheme();
  return (
    <IconButton onClick={click ? () => click() : undefined}>
      <a
        style={{ color: theme.palette.primary.main }}
        href={link}
      >
        {icon}
      </a>
    </IconButton>
  );
};

const LoggedOutNav: React.FC<{ changeTheme: () => void }> = ({
  changeTheme,
}) => {
  const theme = useTheme();

  return (
    <Container
      style={{
        background: `url("${LoggedOutBg}")`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      maxWidth="xl"
      disableGutters
      sx={{
        px: 0,
        height: "100vh",
      }}
    >
      <Box
        sx={{
          backgroundColor: "background.paper",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          py: { xs: 1, sm: 2, md: 2 },
          px: 3,
          opacity: 0.9,
        }}
      >
        <Typography
          sx={{ fontWeight: 450, fontSize: { xs: 16, md: 18 } }}
          color="primary"
        >
          ShareNotes
        </Typography>
        <Stack
          direction="row"
          spacing={{ xs: 1, sm: 2 }}
        >
          <LinkIcon
            icon={
              theme.palette.mode === "dark" ? (
                <Brightness7Icon />
              ) : (
                <DarkModeIcon />
              )
            }
            click={() => changeTheme()}
          />
          <LinkIcon
            link="https://www.facebook.com"
            icon={<FacebookIcon />}
          />
          <LinkIcon
            link="https://www.github.com"
            icon={<GitHubIcon />}
          />
          <LinkIcon
            link="https://www.youtube.com"
            icon={<YouTubeIcon />}
          />
        </Stack>
      </Box>
      <Outlet />
    </Container>
  );
};

export default LoggedOutNav;

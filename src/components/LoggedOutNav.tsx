import {
  Box,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import LinkIcon from "@mui/icons-material/Link";
import notepadBg from "../assets/notepad-bg.svg";
import React, { useState } from "react";
import { Outlet } from "react-router-dom";

const LoggedOutNav: React.FC<{ changeTheme: () => void }> = ({
  changeTheme,
}) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const showMenu = Boolean(anchorEl);

  const LinkMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const MenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Container
      style={{
        backgroundSize: "cover",
        background: `url("${notepadBg}") no-repeat center`,
        height: "100vh",
      }}
      sx={{ px: 0 }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 3,
          py: 4,
        }}
      >
        <Typography variant="h5">ShareNotes</Typography>
        <Stack
          direction="row"
          spacing={{ xs: 1, sm: 2 }}
        >
          <IconButton
            onClick={() => changeTheme()}
            color="primary"
          >
            {theme.palette.mode === "dark" ? (
              <Brightness7Icon />
            ) : (
              <DarkModeIcon />
            )}
          </IconButton>
          <div>
            <IconButton
              color="primary"
              onClick={LinkMenuClick}
              aria-controls={showMenu ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={showMenu ? "true" : undefined}
            >
              <LinkIcon />
            </IconButton>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={showMenu}
              onClose={MenuClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem>
                <a href="https://www.facebook.com">Facebook</a>
              </MenuItem>
              <MenuItem>
                <a href="https://www.twitter.com">Twitter</a>
              </MenuItem>
              <MenuItem>
                <a href="https://www.youtube.com">Youtube</a>
              </MenuItem>
            </Menu>
          </div>
        </Stack>
      </Box>
      <Outlet />
    </Container>
  );
};

export default LoggedOutNav;

import {
  AppBar,
  Box,
  Fab,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Tab,
  Tabs,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Link, NavLink, Outlet } from "react-router-dom";
import { Stack } from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LanguageIcon from "@mui/icons-material/Language";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import CottageOutlinedIcon from "@mui/icons-material/CottageOutlined";
import CloudOutlinedIcon from "@mui/icons-material/CloudOutlined";
import FolderSharedIcon from "@mui/icons-material/FolderShared";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AddIcon from "@mui/icons-material/Add";
import { ReactElement, useState } from "react";
import { Container } from "@mui/system";
import NewNoteModal from "./NewNoteModal";
import NewTaskModal from "./NewTaskModal";
import NewReminderModal from "./NewReminderModal";

//Each navitem
const NavItem: React.FC<{
  link: string;
  icon: ReactElement;
  label?: string;
  ariaLabel: string;
}> = ({ link, icon, label, ariaLabel }) => {
  const themeColor = useTheme();
  return (
    <NavLink
      to={link}
      style={({ isActive }) =>
        isActive
          ? {
              backgroundColor: themeColor.palette.primary.main,
              color: themeColor.palette.primary.contrastText,
            }
          : { color: themeColor.palette.text.primary }
      }
    >
      <Tab
        aria-label={ariaLabel}
        iconPosition="start"
        sx={{
          minWidth: 0,
          flexGrow: 1,
          width: "100%",
          textDecoration: "none",
        }}
        label={label}
        icon={icon}
      />
    </NavLink>
  );
};

const Navigation: React.FC<{
  logout: () => Promise<void>;
  changeTheme: () => void;
}> = ({ logout, changeTheme }) => {
  //Modals
  const [isNewNoteModalOpen, setIsNewNoteModalOpen] = useState(false);
  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false);
  const [isNewReminderModalOpen, setIsNewReminderModalOpen] = useState(false);
  //Menu withing Settings
  const [anchorSettingsEl, setAnchorSettingsEl] = useState<null | HTMLElement>(
    null
  );
  const showSettingsMenu = Boolean(anchorSettingsEl);
  //Menu within new button
  const [anchorNewEl, setAnchorNewEl] = useState<null | HTMLElement>(null);
  const showNewMenu = Boolean(anchorNewEl);

  const isWindowLarge = useMediaQuery("(min-width:600px)");
  const theme = useTheme();
  return (
    <>
      <Box mb={4}>
        <AppBar
          position="static"
          sx={{
            pt: { xs: 2, md: 4 },
            pb: { xs: 1.5, md: 3 },
            backgroundColor: theme.palette.background.paper,
            boxShadow: "none",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundImage: "none",
            px: 3,
          }}
        >
          <Typography
            sx={{ fontWeight: 450, fontSize: { xs: 24, md: 24 } }}
            color="primary"
          >
            ShareNotes
          </Typography>
          <Stack
            direction="row"
            spacing={{ xs: 1, sm: 2 }}
            sx={{ alignItems: "center" }}
          >
            <IconButton>
              <Link
                to="/public-share"
                style={{
                  color: theme.palette.text.secondary,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <LanguageIcon />
              </Link>
            </IconButton>

            <IconButton onClick={() => changeTheme()}>
              {theme.palette.mode === "dark" ? (
                <Brightness7Icon />
              ) : (
                <DarkModeIcon />
              )}
            </IconButton>

            <div>
              <IconButton
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                  setAnchorSettingsEl(event.currentTarget);
                }}
                aria-controls={showSettingsMenu ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={showSettingsMenu ? "true" : undefined}
              >
                <SettingsRoundedIcon />
              </IconButton>
              <Menu
                id="basic-menu"
                anchorEl={anchorSettingsEl}
                open={showSettingsMenu}
                onClose={() => setAnchorSettingsEl(null)}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem>My Account</MenuItem>
                <MenuItem>Settings</MenuItem>
                <MenuItem onClick={() => logout()}>Log Out</MenuItem>
              </Menu>
            </div>
          </Stack>
        </AppBar>
        {/* When Windows is larger than or equal to 600px*/}
        {isWindowLarge ? (
          <Container
            disableGutters={true}
            maxWidth="xl"
            sx={{ display: "flex" }}
          >
            <Tabs
              orientation="vertical"
              sx={{
                backgroundColor: theme.palette.background.paper,
                position: "static",
                pt: 4,
                color: "white",
                backgroundImage: "none",
                boxShadow: "none",
                display: "inline-flex",
                flexDirection: "column",
                width: "20%",
                height: "100%",
              }}
            >
              <NavItem
                link={"/"}
                icon={<CottageOutlinedIcon />}
                label="Home"
                ariaLabel="Home Menu"
              />
              <NavItem
                link={"/shared-notes"}
                icon={<CloudOutlinedIcon />}
                label="Shared Notes"
                ariaLabel="Share Notes Menu"
              />
              <NavItem
                link={"/private-notes"}
                icon={<FolderSharedIcon />}
                label="Public Notes"
                ariaLabel="Private Notes Menu"
              />
              <NavItem
                link={"/reminders"}
                icon={<CalendarTodayIcon />}
                label="Reminders"
                ariaLabel="Reminders Menu"
              />
              <NavItem
                link={"/tasks"}
                icon={<AssignmentIcon />}
                label="Tasks"
                ariaLabel="Tasks Menu"
              />
            </Tabs>
            <Outlet />
          </Container>
        ) : (
          <>
            {/* Mobile Port */}
            <Paper
              sx={{
                display: "grid",
                width: "100%",
                gridTemplateColumns: "repeat(5, 1fr)",
                backgroundImage: "none",
                boxShadow: "none",
                position: "static",
                mb: 4,
              }}
            >
              <NavItem
                link={"/"}
                icon={<CottageOutlinedIcon />}
                ariaLabel="Home Menu"
              />
              <NavItem
                link={"/shared-notes"}
                icon={<CloudOutlinedIcon />}
                ariaLabel="Shared Notes Menu"
              />
              <NavItem
                link={"/private-notes"}
                icon={<FolderSharedIcon />}
                ariaLabel="Private Notes Menu"
              />
              <NavItem
                link={"/reminders"}
                icon={<CalendarTodayIcon />}
                ariaLabel="Reminder Menu"
              />
              <NavItem
                link={"/tasks"}
                icon={<AssignmentIcon />}
                ariaLabel="Tasks Menu"
              />
            </Paper>
            <Outlet />
            <Box sx={{ position: "fixed", right: 30, bottom: 30 }}>
              <Fab
                color="primary"
                variant="extended"
                aria-label="Add New"
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                  setAnchorNewEl(event.currentTarget);
                }}
                aria-controls={showNewMenu ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={showNewMenu ? "true" : undefined}
              >
                <AddIcon />
                <Typography sx={{ fontWeight: "bold", fontSize: 18, ml: 1 }}>
                  ADD
                </Typography>
              </Fab>
              <Menu
                id="basic-menu"
                anchorEl={anchorNewEl}
                open={showNewMenu}
                onClose={() => setAnchorNewEl(null)}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                sx={{ mb: 4 }}
              >
                <MenuItem onClick={() => setIsNewNoteModalOpen(true)}>
                  New Note
                </MenuItem>
                <MenuItem onClick={() => setIsNewTaskModalOpen(true)}>
                  New Task
                </MenuItem>
                <MenuItem onClick={() => setIsNewReminderModalOpen(true)}>
                  New Reminder
                </MenuItem>
              </Menu>
            </Box>
          </>
        )}

        <NewNoteModal
          isOpen={isNewNoteModalOpen}
          setIsOpen={setIsNewNoteModalOpen}
        />
        <NewTaskModal
          isOpen={isNewTaskModalOpen}
          setIsOpen={setIsNewTaskModalOpen}
        />
        <NewReminderModal
          isOpen={isNewReminderModalOpen}
          setIsOpen={setIsNewReminderModalOpen}
        />
      </Box>
    </>
  );
};

export default Navigation;

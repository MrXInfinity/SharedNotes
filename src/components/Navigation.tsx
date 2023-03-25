import AddIcon from "@mui/icons-material/Add";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import CloudIcon from "@mui/icons-material/Cloud";
import CloudOutlinedIcon from "@mui/icons-material/CloudOutlined";
import CottageIcon from "@mui/icons-material/Cottage";
import CottageOutlinedIcon from "@mui/icons-material/CottageOutlined";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import FolderSharedIcon from "@mui/icons-material/FolderShared";
import FolderSharedOutlinedIcon from "@mui/icons-material/FolderSharedOutlined";
import LanguageIcon from "@mui/icons-material/Language";
import NotificationsIcon from "@mui/icons-material/Notifications";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import {
  AppBar,
  Box,
  Button,
  Fab,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Stack,
  Tab,
  Tabs,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Container } from "@mui/system";
import { useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import useFirestoreDb from "../hooks/useFirestoreDb";
import NewNoteModal from "./NewNoteModal";
import NewReminderModal from "./NewReminderModal";
import NewTaskModal from "./NewTaskModal";

//Each navitem
const NavItem: React.FC<any> = ({
  link,
  inactiveIcon,
  activeIcon,
  label,
  value,
  selectedValue,
  setSelectedValue,
}) => {
  const theme = useTheme();
  return (
    <NavLink
      onClick={() => setSelectedValue(value)}
      to={link}
      style={{ textDecoration: "none" }}
    >
      <Tab
        style={
          selectedValue === value
            ? { color: theme.palette.primary.main }
            : { color: theme.palette.text.primary }
        }
        onClick={() => setSelectedValue("home")}
        iconPosition="start"
        sx={{
          opacity: 1,
          minWidth: 0,
          flexGrow: 1,
          width: "100%",
          justifyContent: { md: "start" },
        }}
        label={label}
        icon={selectedValue === value ? activeIcon : inactiveIcon}
      />
    </NavLink>
  );
};

export type modalStateTypes = {
  isOpen: boolean;
  type: "" | "note" | "reminder" | "task";
};

const Navigation: React.FC<{
  logout: () => Promise<void>;
  changeTheme: () => void;
}> = ({ logout, changeTheme }) => {
  const { addReminder } = useFirestoreDb();
  // const { setIsNewReminderModalOpen } = useFirestoreContext();
  //Modals

  const [isModalOpen, setIsModalOpen] = useState<modalStateTypes>({
    isOpen: false,
    type: "",
  });

  //Menu withing Settings
  const [anchorSettingsEl, setAnchorSettingsEl] = useState<null | HTMLElement>(
    null
  );
  const showSettingsMenu = Boolean(anchorSettingsEl);
  //Menu within new button
  const [anchorNewEl, setAnchorNewEl] = useState<null | HTMLElement>(null);
  const showNewMenu = Boolean(anchorNewEl);
  const [tabsValue, setTabsValue] = useState("home");

  const isWindowLarge = useMediaQuery("(min-width:600px)");
  const theme = useTheme();
  return (
    <>
      <Box mb={4}>
        <AppBar
          position="static"
          sx={{
            pt: { xs: 1, md: 4 },
            pb: { xs: 1, md: 3 },
            backgroundColor: theme.palette.background.paper,
            boxShadow: "none",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundImage: "none",
            px: 3,
            textDecoration: "none",
          }}
        >
          <Typography
            sx={{ fontWeight: 450, fontSize: { xs: 16, md: 24 } }}
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
            <div
              style={{ display: "flex", flexDirection: "column", width: "20%" }}
            >
              <Box
                sx={{
                  backgroundColor: "background.paper",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Button
                  color="primary"
                  variant="contained"
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
                    ADD NEW
                  </Typography>
                </Button>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorNewEl}
                  open={showNewMenu}
                  onClose={() => setAnchorNewEl(null)}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "center",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                  }}
                  sx={{ mt: 5 }}
                >
                  <MenuItem
                    onClick={() =>
                      setIsModalOpen({ isOpen: true, type: "note" })
                    }
                  >
                    New Note
                  </MenuItem>
                  <MenuItem
                    onClick={() =>
                      setIsModalOpen({ isOpen: true, type: "reminder" })
                    }
                  >
                    New Reminder
                  </MenuItem>
                  <MenuItem
                    onClick={() =>
                      setIsModalOpen({ isOpen: true, type: "task" })
                    }
                  >
                    New Task
                  </MenuItem>
                </Menu>
              </Box>
              <Tabs
                value={null}
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

                  height: "100%",
                }}
              >
                <NavItem
                  link={"/"}
                  inactiveIcon={<CottageOutlinedIcon />}
                  activeIcon={<CottageIcon />}
                  label="Home"
                  value="home"
                  selectedValue={tabsValue}
                  setSelectedValue={setTabsValue}
                />
                <NavItem
                  link={"/shared-notes"}
                  inactiveIcon={<CloudOutlinedIcon />}
                  activeIcon={<CloudIcon />}
                  label="Shared notes"
                  value="shared notes"
                  selectedValue={tabsValue}
                  setSelectedValue={setTabsValue}
                />
                <NavItem
                  link={"/private-notes"}
                  inactiveIcon={<FolderSharedOutlinedIcon />}
                  activeIcon={<FolderSharedIcon />}
                  label="Public notes"
                  value="public notes"
                  selectedValue={tabsValue}
                  setSelectedValue={setTabsValue}
                />
                <NavItem
                  link={"/reminders"}
                  inactiveIcon={<NotificationsOutlinedIcon />}
                  activeIcon={<NotificationsIcon />}
                  label="reminders"
                  value="Reminders"
                  selectedValue={tabsValue}
                  setSelectedValue={setTabsValue}
                />
                <NavItem
                  link={"/tasks"}
                  inactiveIcon={<AssignmentOutlinedIcon />}
                  activeIcon={<AssignmentIcon />}
                  label="Tasks"
                  value="tasks"
                  selectedValue={tabsValue}
                  setSelectedValue={setTabsValue}
                />
              </Tabs>
            </div>
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
                mb: 3,
              }}
            >
              <NavItem
                link={"/"}
                inactiveIcon={<CottageOutlinedIcon />}
                activeIcon={<CottageIcon />}
                value="home"
                selectedValue={tabsValue}
                setSelectedValue={setTabsValue}
              />
              <NavItem
                link={"/shared-notes"}
                inactiveIcon={<CloudOutlinedIcon />}
                activeIcon={<CloudIcon />}
                value="shared notes"
                selectedValue={tabsValue}
                setSelectedValue={setTabsValue}
              />
              <NavItem
                link={"/private-notes"}
                inactiveIcon={<FolderSharedOutlinedIcon />}
                activeIcon={<FolderSharedIcon />}
                value="private notes"
                selectedValue={tabsValue}
                setSelectedValue={setTabsValue}
              />
              <NavItem
                link={"/reminders"}
                inactiveIcon={<NotificationsOutlinedIcon />}
                activeIcon={<NotificationsIcon />}
                value="reminders"
                selectedValue={tabsValue}
                setSelectedValue={setTabsValue}
              />
              <NavItem
                link={"/tasks"}
                inactiveIcon={<AssignmentOutlinedIcon />}
                activeIcon={<AssignmentIcon />}
                value="tasks"
                selectedValue={tabsValue}
                setSelectedValue={setTabsValue}
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
                <MenuItem
                  onClick={() => setIsModalOpen({ isOpen: true, type: "note" })}
                >
                  New Note
                </MenuItem>
                <MenuItem
                  onClick={() =>
                    setIsModalOpen({ isOpen: true, type: "reminder" })
                  }
                >
                  New Reminder
                </MenuItem>
                <MenuItem
                  onClick={() => setIsModalOpen({ isOpen: true, type: "task" })}
                >
                  New Task
                </MenuItem>
              </Menu>
            </Box>
          </>
        )}
        {isModalOpen.type === "note" && (
          <NewNoteModal
            isOpen={isModalOpen.isOpen}
            setIsOpen={setIsModalOpen}
          />
        )}
        {isModalOpen.type === "task" && (
          <NewTaskModal
            isOpen={isModalOpen.isOpen}
            setIsOpen={setIsModalOpen}
          />
        )}
        {isModalOpen.type === "reminder" && (
          <NewReminderModal
            isOpen={isModalOpen.isOpen}
            setIsOpen={setIsModalOpen}
          />
        )}
      </Box>
    </>
  );
};

export default Navigation;

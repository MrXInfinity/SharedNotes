import {
  AppBar,
  Box,
  Button,
  Icon,
  styled,
  SvgIconProps,
  Tab,
  Typography,
} from "@mui/material";
import { NavLink, Outlet } from "react-router-dom";
import { Stack } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import CottageOutlinedIcon from "@mui/icons-material/CottageOutlined";
import CloudOutlinedIcon from "@mui/icons-material/CloudOutlined";
import FolderSharedIcon from "@mui/icons-material/FolderShared";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { SvgIconComponent } from "@mui/icons-material";

type NavItemProps = {
  link: string;
  children: JSX.Element;
};

const EachTabs = styled(Tab)({
  minWidth: 0,
});

const NavItem: React.FC<NavItemProps> = ({ link, children }) => {
  return (
    <NavLink
      to={link}
      style={({ isActive }) =>
        isActive ? { backgroundColor: "#F07534", color: "#FFFFFF" } : undefined
      }
    >
      <Tab
        sx={{
          minWidth: 0,
          flexGrow: 1,
          width: "100%",
        }}
        icon={
          <Icon sx={{ display: "flex", justifyContent: "center" }}>
            {children}
          </Icon>
        }
      />
    </NavLink>
  );
};

const Navigation = () => {
  return (
    <>
      <Box mb={4}>
        <AppBar
          position="static"
          sx={{ pt: 4 }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 4,
              px: 3,
            }}
          >
            <Typography variant="h5">ShareNotes</Typography>
            <Stack
              direction="row"
              spacing={{ xs: 1, sm: 2 }}
            >
              <SearchIcon />
              <DarkModeIcon />
              <AccountCircleRoundedIcon />
              <SettingsRoundedIcon />
            </Stack>
          </Box>
          <Stack
            direction="row"
            sx={{
              display: "grid",
              width: "100%",
              gridTemplateColumns: "repeat(5, 1fr)",
            }}
          >
            <NavItem link={"/"}>
              <CottageOutlinedIcon />
            </NavItem>
            <NavItem link={"/shared-notes"}>
              <CloudOutlinedIcon />
            </NavItem>
            <NavItem link={"/private-notes"}>
              <FolderSharedIcon />
            </NavItem>
            <NavItem link={"/reminders"}>
              <CalendarTodayIcon />
            </NavItem>
            <NavItem link={"/tasks"}>
              <AssignmentIcon />
            </NavItem>
          </Stack>
        </AppBar>
      </Box>
      <Outlet />
    </>
  );
};

export default Navigation;

import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  Menu,
  MenuItem,
  OutlinedInput,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import LinkIcon from "@mui/icons-material/Link";
import notepadBg from "../assets/notepad-bg.svg";
import { SubmitHandler, useForm } from "react-hook-form";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import useAuthContext from "../context";

type FormData = {
  email: string;
  password: string;
};

const StyledButtons: React.FC<{
  children: React.ReactNode;
  type?: "submit";
}> = ({ children, type }) => {
  return (
    <Button
      variant="contained"
      sx={{ color: "white" }}
      size="large"
      type={type}
    >
      {children}
    </Button>
  );
};

const SignIn: React.FC<{ changeTheme: () => void }> = ({ changeTheme }) => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const theme = useTheme();
  const { login } = useAuthContext();
  const [showPassword, setShowPassword] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const showMenu = Boolean(anchorEl);

  const LinkMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const MenuClose = () => {
    setAnchorEl(null);
  };

  const onSubmit: SubmitHandler<FormData> = (data) => {
    login(data.email, data.password);
  };

  return (
    <div
      style={{
        background: `url("${notepadBg}") no-repeat fixed center`,
        height: "100vh",
        width: "100vw",
      }}
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

      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          py: 2,
          px: 2,
          mx: 2,
        }}
        variant="outlined"
      >
        <CardHeader title="Sign In" />
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent sx={{ dislay: "flex" }}>
            <TextField
              sx={{ width: "100%", mb: 2 }}
              type="email"
              required
              id="outlined-basic"
              label="Email"
              variant="outlined"
              {...register("email", {
                required: true,
              })}
            />
            <FormControl
              required
              sx={{ my: 1, width: "100%" }}
              variant="outlined"
            >
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                {...register("password")}
                label="Password"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword((prev) => !prev)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </CardContent>
          <CardActions
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              width: "100%",
            }}
          >
            <StyledButtons>
              <Link
                to="/sign-up"
                style={{ color: "inherit", textDecoration: "none" }}
              >
                Sign up
              </Link>
            </StyledButtons>
            <StyledButtons type="submit">Sign In</StyledButtons>
          </CardActions>
        </form>
      </Card>
    </div>
  );
};

export default SignIn;

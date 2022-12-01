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
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import LinkIcon from "@mui/icons-material/Link";
import notepadBg from "../assets/notepad-bg.svg";
import useAuthContext from "../context";
import { SubmitHandler, useForm, UseFormRegister } from "react-hook-form";
import React, { useState } from "react";
import { Link } from "react-router-dom";

type FormData = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
};

const StyledTextFieldComponent: React.FC<{
  type: "email" | "firstname" | "lastname";
  label: string;
  register: UseFormRegister<FormData>;
}> = ({ type, label, register }) => {
  return (
    <TextField
      sx={{ width: "100%", mb: 2 }}
      type={type}
      required
      id="outlined-basic"
      label={label}
      variant="outlined"
      {...register(type, {
        required: true,
      })}
    />
  );
};

const SignUp: React.FC<{ changeTheme: () => void }> = ({ changeTheme }) => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      firstname: "",
      lastname: "",
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

  const onSubmit = (data: any) => {
    console.log(data);
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
        <CardHeader
          action={
            <IconButton aria-label="return">
              <Link to="/sign-in">
                <ArrowBackIcon />
              </Link>
            </IconButton>
          }
          title="Sign Up"
        />
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent sx={{ dislay: "flex" }}>
            <StyledTextFieldComponent
              type="firstname"
              register={register}
              label="First Name"
            />
            <StyledTextFieldComponent
              type="lastname"
              register={register}
              label="Last Name"
            />
            <StyledTextFieldComponent
              type="email"
              register={register}
              label="Email"
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
            <Button
              variant="contained"
              sx={{ color: "white" }}
              size="large"
              type="submit"
            >
              Sign Up
            </Button>
          </CardActions>
        </form>
      </Card>
    </div>
  );
};

export default SignUp;

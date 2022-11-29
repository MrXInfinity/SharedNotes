import {
  Box,
  Card,
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
  styled,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import LinkIcon from "@mui/icons-material/Link";
import notepadBg from "../assets/notepad-bg.svg";
import { useForm } from "react-hook-form";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Dispatch, SetStateAction, useRef, useState } from "react";

type FormData = {
  email: string;
  password: string;
};

type SignInProps = () => Boolean;

const SignIn = ({ setIsDarkMode }: any) => {
  const {
    register,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const theme = useTheme();

  const ref = useRef<null | HTMLElement>(null);

  const LinkMenuClick = () => {
    setShowMenu((prev) => !prev);
  };
  const MenuClose = () => {
    setShowMenu(false);
  };

  console.log(watch());

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
            onClick={() => setIsDarkMode()}
            color="primary"
          >
            {theme.palette.mode === "dark" ? (
              <DarkModeIcon />
            ) : (
              <Brightness7Icon />
            )}
          </IconButton>
          <div>
            <IconButton
              color="primary"
              onClick={() => LinkMenuClick()}
              aria-controls={showMenu ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={showMenu ? "true" : undefined}
            >
              <LinkIcon />
            </IconButton>
            <Menu
              id="basic-menu"
              open={showMenu}
              onClose={MenuClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem>Profile</MenuItem>
              <MenuItem>My account</MenuItem>
              <MenuItem>Logout</MenuItem>
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
      </Card>
    </div>
  );
};

export default SignIn;

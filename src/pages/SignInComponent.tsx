import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import React, { useState } from "react";
import { Link, redirect } from "react-router-dom";
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

  const { login, logout } = useAuthContext();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit: SubmitHandler<FormData> = (data) => {
    login(data.email, data.password);
  };

  return (
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
          <Button onClick={() => logout()}>Sign up</Button>
          <StyledButtons type="submit">Sign In</StyledButtons>
        </CardActions>
      </form>
    </Card>
  );
};

export default SignIn;

{
  /* <StyledButtons>
  <Link
    to="/sign-up"
    style={{ color: "inherit", textDecoration: "none" }}
  >
    Sign up
  </Link>
</StyledButtons>; */
}

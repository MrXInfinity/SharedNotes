import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import type { ErrorType, ErrorKeys, ErrorValues } from "../../hooks/useAuth";

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

const SignIn: React.FC = () => {
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

  const { login, error } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit: SubmitHandler<FormData> = ({ email, password }) => {
    login(email, password);
  };
  console.log(error);

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        p: 2,
        pb: 3,
        mx: "auto",
        maxWidth: "565px",
        mt: 10,
      }}
      variant="outlined"
    >
      <CardHeader title="Sign In" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent sx={{ dislay: "flex" }}>
          <TextField
            sx={{ width: "100%", mb: 2 }}
            type="email"
            error={error.email ? true : false}
            helperText={error.email?.message}
            required
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
            error={error.password ? true : false}
          >
            <InputLabel>Password</InputLabel>
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
            <FormHelperText>{error.password?.message}</FormHelperText>
          </FormControl>
        </CardContent>
        <CardActions
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 2,
            width: "100%",
            px: 2,
          }}
        >
          <StyledButtons>
            <Link
              to="/sign-in/new-user"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              Sign up
            </Link>
          </StyledButtons>
          <StyledButtons type="submit">Sign In</StyledButtons>
        </CardActions>
      </form>
    </Card>
  );
};

export default SignIn;

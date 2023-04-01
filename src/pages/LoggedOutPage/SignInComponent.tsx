import { Visibility, VisibilityOff } from "@mui/icons-material";
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
  Typography,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { auth } from "../../firebase";

type FormData = {
  email: string;
  password: string;
};

const SignIn: React.FC = () => {
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const theme = useTheme();
  const [signInWithEmailAndPassword, _, loading, error] =
    useSignInWithEmailAndPassword(auth);
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit: SubmitHandler<FormData> = ({ email, password }) => {
    signInWithEmailAndPassword(email, password);
  };

  useEffect(() => {
    if (error) {
      setError("email", {
        type: "custom",
        message: "Incorrect email/password",
      });
      setError("password", {
        type: "custom",
        message: "Incorrect email/password",
      });
    }

    return () => clearErrors();
  }, [error]);

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        py: { xs: 3, md: 2 },
        px: { xs: 3, md: 4 },
        mx: "auto",
        maxWidth: "400px",
        mt: { xs: 14, md: 16 },
        opacity: 0.98,
      }}
      variant="outlined"
    >
      <CardHeader title="Log In" />

      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent sx={{ dislay: "flex" }}>
          <TextField
            sx={{ width: "100%", mb: 2 }}
            type="email"
            error={errors.email ? true : false}
            helperText={errors.email?.message}
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
            error={errors.password ? true : false}
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
            <FormHelperText>{errors.password?.message}</FormHelperText>
          </FormControl>
        </CardContent>
        <CardActions
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            width: "100%",
            px: 2,
          }}
        >
          <Button
            fullWidth
            variant="contained"
            sx={{ color: "white" }}
            size="large"
            type="submit"
            disabled={loading}
          >
            Log In
          </Button>
          <Typography sx={{ fontSize: { xs: 14, md: 16 }, opacity: 0.8 }}>
            Don't have an account yet?{" "}
            <Link
              to="/sign-in/new-user"
              style={{
                color: theme.palette.primary.main,
                textDecoration: "none",
              }}
            >
              Sign up
            </Link>
          </Typography>
        </CardActions>
      </form>
    </Card>
  );
};

export default SignIn;

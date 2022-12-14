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
  OutlinedInput,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import useAuthContext from "../context";
import { useForm, UseFormRegister } from "react-hook-form";
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
      label={label}
      variant="outlined"
      {...register(type, {
        required: true,
      })}
    />
  );
};

const SignUp: React.FC = () => {
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

  const { login } = useAuthContext();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (data: any) => {
    console.log(data);
  };

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
        mt: 6,
      }}
      variant="outlined"
    >
      <Box
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
          position: "relative",
          alignItems: "center",
          py: 2,
        }}
      >
        <IconButton
          sx={{ left: 0, position: "absolute" }}
          aria-label="return"
        >
          <Link to="/sign-in">
            <ArrowBackIcon color="primary" />
          </Link>
        </IconButton>
        <Typography variant="h5">Sign Up</Typography>
      </Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent sx={{ dislay: "flex", gap: 2 }}>
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
            display: "flex",
            width: "100%",
            flexGrow: 1,
            px: 2,
            justifyContent: "end",
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
  );
};

export default SignUp;

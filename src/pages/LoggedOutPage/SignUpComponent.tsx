import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { AuthErrorCodes, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import { FieldErrorsImpl, UseFormRegister, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { auth, db } from "../../firebase";

type FormData = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
};

const StyledTextFieldComponent: React.FC<{
  type?: string;
  value: "email" | "firstname" | "lastname";
  label: string;
  register: UseFormRegister<FormData>;
  formError: Partial<FieldErrorsImpl<FormData>>;
  minLength?: number;
  maxLength?: number;
}> = ({ type, value, label, register, formError, minLength, maxLength }) => {
  return (
    <TextField
      sx={{ width: "100%", mb: 2 }}
      error={formError[value] ? true : false}
      helperText={formError[value]?.message}
      type={type ?? "text"}
      required
      label={label}
      variant="outlined"
      {...register(value, {
        required: `${type} is required.`,
        minLength: {
          value: minLength ?? 2,
          message: "This should be atleast 3 characters.",
        },
        maxLength: {
          value: maxLength ?? 40,
          message: "Too many characters.",
        },
      })}
    />
  );
};

const SignUp: React.FC = () => {
  const {
    register,
    handleSubmit,
    setError,
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
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async ({
    email,
    password,
    firstname,
    lastname,
  }: FormData) => {
    setIsLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      if (auth.currentUser)
        await setDoc(doc(db, "Users", auth.currentUser!.uid), {
          firstname,
          lastname,
          email,
          bio: "",
        });
      setIsLoading(false);
    } catch (err: any) {
      console.log(err);
      setIsLoading(false);
      if (err.code == AuthErrorCodes.EMAIL_EXISTS) {
        setError("email", {
          type: "custom",
          message: "This email is already taken.",
        });
      }
      if (err.code == AuthErrorCodes.WEAK_PASSWORD) {
        setError("password", {
          type: "custom",
          message: "Chosen password is weak.",
        });
      } else {
        setError("email", {
          type: "custom",
          message: "Invalid email or password.",
        });
        setError("password", {
          type: "custom",
          message: "Invalid email or password",
        });
      }
    }
  };
  console.log(errors);

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        pt: { xs: 3, md: 2 },
        px: { xs: 3, md: 4 },
        pb: { xs: 4, md: 3 },
        mx: "auto",
        maxWidth: "400px",
        mt: { xs: 8, md: 8 },
        opacity: 0.98,
      }}
      variant="outlined"
    >
      <Stack
        direction="column"
        sx={{
          width: "100%",
          justifyContent: "center",

          alignItems: "center",
          pt: 2,
          pb: 1,
        }}
      >
        <Typography variant="h5">Sign Up</Typography>
        <Typography
          sx={{ opacity: 0.8, fontSize: { xs: 12, md: 12 }, my: 0.5 }}
        >
          or
        </Typography>
        <Typography sx={{ opacity: 0.8, fontSize: { xs: 14, md: 16 } }}>
          Already have an account?{" "}
          <Link
            to="/sign-in"
            style={{
              color: theme.palette.primary.main,
              textDecoration: "none",
            }}
          >
            Log in
          </Link>
        </Typography>
      </Stack>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent sx={{ dislay: "flex", gap: 2 }}>
          <StyledTextFieldComponent
            register={register}
            formError={errors}
            label="First Name"
            value="firstname"
          />
          <StyledTextFieldComponent
            register={register}
            formError={errors}
            label="Last Name"
            value="lastname"
          />
          <StyledTextFieldComponent
            type="email"
            register={register}
            formError={errors}
            label="Email"
            value="email"
          />
          <FormControl
            required
            sx={{ my: 1, width: "100%" }}
            variant="outlined"
            error={errors?.password ? true : false}
          >
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              {...register("password", {
                required: "Please provide a password",
                minLength: {
                  value: 4,
                  message: "Chosen password is weak",
                },
                maxLength: {
                  value: 40,
                  message: "Too many characters!",
                },
              })}
              label="Password"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword((prev) => !prev)}
                    edge="end"
                  >
                    {showPassword ? (
                      <VisibilityOff fontSize="small" />
                    ) : (
                      <Visibility fontSize="small" />
                    )}
                  </IconButton>
                </InputAdornment>
              }
            />
            <FormHelperText>{errors?.password?.message}</FormHelperText>
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
            fullWidth
            variant="contained"
            size="large"
            type="submit"
            disabled={isLoading}
            sx={{ color: "white" }}
          >
            Sign Up
          </Button>
        </CardActions>
      </form>
    </Card>
  );
};

export default SignUp;

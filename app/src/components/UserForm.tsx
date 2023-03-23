import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  TextField,
} from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { User } from "../models/User";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

interface UserPayload extends User {
  repeatPassword: string;
}

const userValidationSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
  repeatPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Repeat password is required"),
  about: yup
    .string()
    .max(100, "About cannot exceed 100 characters")
    .required("About is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  dateOfBirthTimestamp: yup.number().required("Date of birth is required"),
  isSpecial: yup.bool(),
});

const UserForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UserPayload>({
    resolver: yupResolver(userValidationSchema),
  });
  const { createAccount, isLoading } = useAuthContext();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<UserPayload> = async ({
    repeatPassword,
    ...data
  }) => {
    await createAccount(data);
    navigate(-1);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box display="flex" flexDirection="column">
        <Controller
          name="username"
          defaultValue=""
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              sx={{ mb: 2 }}
              variant="outlined"
              label="Username"
              error={Boolean(errors.username)}
              helperText={errors.username?.message}
              InputLabelProps={{ shrink: true }}
            />
          )}
        />
        <Controller
          name="password"
          defaultValue=""
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              sx={{ mb: 2 }}
              variant="outlined"
              label="Password"
              type="password"
              error={Boolean(errors.password)}
              helperText={errors.password?.message}
              InputLabelProps={{ shrink: true }}
            />
          )}
        />
        <Controller
          name="repeatPassword"
          defaultValue=""
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              sx={{ mb: 2 }}
              variant="outlined"
              label="Repeat Password"
              type="password"
              error={Boolean(errors.repeatPassword)}
              helperText={errors.repeatPassword?.message}
              InputLabelProps={{ shrink: true }}
            />
          )}
        />
        <Controller
          name="about"
          defaultValue=""
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="About"
              sx={{ mb: 2 }}
              minRows={4}
              maxRows={8}
              multiline
              error={Boolean(errors.about)}
              helperText={errors.about?.message}
            />
          )}
        />
        <Controller
          name="email"
          defaultValue=""
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              sx={{ mb: 2 }}
              variant="outlined"
              label="Email"
              error={Boolean(errors.email)}
              helperText={errors.email?.message}
            />
          )}
        />
        <Controller
          name="dateOfBirthTimestamp"
          defaultValue={new Date().getTime()}
          control={control}
          render={({ field }) => (
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                {...field}
                onChange={(date) => {
                  if (!date) return;
                  field.onChange(new Date(date).getTime());
                }}
                value={new Date(field.value)}
                label="Date of Birth"
              />
            </LocalizationProvider>
          )}
        />
        <Controller
          name="isSpecial"
          defaultValue={false}
          control={control}
          render={({ field }) => (
            <FormControlLabel
              control={<Checkbox {...field} />}
              label="Mark as Special"
            />
          )}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          disabled={isLoading}
        >
          Submit
          {isLoading && (
            <CircularProgress size={16} sx={{ color: "#fff", ml: 2 }} />
          )}
        </Button>
      </Box>
    </form>
  );
};

export default UserForm;

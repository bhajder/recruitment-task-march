import { Box, Button, TextField } from "@mui/material";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { AuthPayload } from "../models/Auth";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAuthContext } from "../shared/AuthContext";

const loginValidationSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

const LoginForm = () => {
  const { login } = useAuthContext();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthPayload>({
    resolver: yupResolver(loginValidationSchema),
  });

  const onSubmit: SubmitHandler<AuthPayload> = async (data) => {
    await login(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box display="flex" flexDirection="column" sx={{ width: 600 }}>
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
        <Button type="submit" variant="contained" color="primary">
          Log In
        </Button>
      </Box>
    </form>
  );
};

export default LoginForm;

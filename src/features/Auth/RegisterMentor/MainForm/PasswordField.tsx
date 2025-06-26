import * as React from "react";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { alpha, styled } from "@mui/material/styles";
import { useFormContext, type RegisterOptions } from "react-hook-form";
import Box from "@mui/material/Box";

const BootstrapInput = styled(OutlinedInput)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
  },
  "& .MuiOutlinedInput-input": {
    borderRadius: 4,
    position: "relative",
    backgroundColor: "#F3F6F9",
    border: "1px solid",
    borderColor: "#E0E3E7",
    fontSize: 16,
    width: "100%", // Ensure full width
    padding: "10px 12px",
    transition: theme.transitions.create(["border-color", "background-color", "box-shadow"]),
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
    ...theme.applyStyles("dark", {
      backgroundColor: "#1A2027",
      borderColor: "#2D3843",
    }),
  },
}));

interface PasswordFieldProps {
  name: string;
  label: string;
  registerOptions?: RegisterOptions;
}

export default function PasswordField({ name, label, registerOptions }: PasswordFieldProps) {
  const { register, formState: { errors } } = useFormContext();
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => event.preventDefault();
  const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => event.preventDefault();

  return (
    <FormControl fullWidth error={!!errors[name]} sx={{ mb: 2 }}>
      <BootstrapInput
        id={`${name}-input`}
        type={showPassword ? "text" : "password"}
        {...register(name, registerOptions)}
       
        placeholder={name === "password" ? "أدخل كلمة المرور" : "أكد كلمة المرور"}
      />
      <InputLabel htmlFor={`${name}-input`} sx={{ mt: 1, textAlign: "right", minWidth: "120px", ml: 2 }}>
        {label}
      </InputLabel>
      {errors[name] && (
        <Box sx={{ color: "error.main", fontSize: "0.75rem", mt: 0.5 }}>
          {errors[name]?.message as string}
        </Box>
      )}
    </FormControl>
  );
}
// src/webdelivery/components/auth/LoginForm.jsx

import {
  Box,
  TextField,
  Button,
  Typography,
  InputAdornment,
  IconButton,
  Alert,
  CircularProgress,
} from "@mui/material";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { deliveryBoyLogin } from "../../api/AuthApi";
import useDeliveryAuth from "../../hooks/UseDeliveryAuth";

/**
 * LoginForm
 *
 * Responsible for:
 * 1. Collecting email + password (matches API payload)
 * 2. Calling deliveryBoyLogin API
 * 3. On success → calling context login(token, user) → navigate to dashboard
 * 4. On failure → showing normalized error message
 *
 * API payload : { email, password }
 * API response: { token, user: { user_id, name, mobile, email, roles } }
 */
const LoginForm = () => {
   const deliveryPath = import.meta.env.VITE_DELIVERY_PATH;
  const navigate = useNavigate();
  const { login } = useDeliveryAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setError("");
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError("Please enter both email and password.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await deliveryBoyLogin(formData.email, formData.password);

      // response is already unwrapped by Axios interceptor:
      // { status, token, user: { user_id, name, mobile, email, roles }, message }
      login(response.token, response.user);
      localStorage.setItem("isLoggedIn", "true")
      navigate(`/${deliveryPath}/dashboard`);
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputSx = {
    backgroundColor: "#0F172A",
    borderRadius: "10px",
    color: "#FFFFFF",
    "& fieldset": { borderColor: "#334155 !important" },
    "&:hover fieldset": { borderColor: "#F97316 !important" },
    "&.Mui-focused fieldset": { borderColor: "#F97316 !important" },
    "& input::placeholder": { color: "#475569" },
  };

  const labelSx = {
    color: "#94A3B8",
    fontSize: "0.8rem",
    fontWeight: 600,
    mb: 0.8,
    letterSpacing: "0.02em",
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}
    >
      {/* API error */}
      {error && (
        <Alert
          severity="error"
          sx={{
            borderRadius: "10px",
            backgroundColor: "rgba(239,68,68,0.1)",
            color: "#FCA5A5",
            border: "1px solid rgba(239,68,68,0.2)",
            "& .MuiAlert-icon": { color: "#EF4444" },
          }}
        >
          {error}
        </Alert>
      )}

      {/* Email field — changed from phone to email per API spec */}
      <Box>
        <Typography sx={labelSx}>Email</Typography>
        <TextField
          fullWidth
          name="email"
          type="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          disabled={loading}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailRoundedIcon sx={{ color: "#475569", fontSize: 20 }} />
              </InputAdornment>
            ),
            sx: inputSx,
          }}
        />
      </Box>

      {/* Password field */}
      <Box>
        <Typography sx={labelSx}>Password</Typography>
        <TextField
          fullWidth
          name="password"
          type={showPassword ? "text" : "password"}
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
          disabled={loading}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockRoundedIcon sx={{ color: "#475569", fontSize: 20 }} />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword((p) => !p)}
                  edge="end"
                  size="small"
                  sx={{ color: "#475569" }}
                  disabled={loading}
                >
                  {showPassword ? (
                    <VisibilityOffRoundedIcon fontSize="small" />
                  ) : (
                    <VisibilityRoundedIcon fontSize="small" />
                  )}
                </IconButton>
              </InputAdornment>
            ),
            sx: inputSx,
          }}
        />
      </Box>

      {/* Submit */}
      <Button
        type="submit"
        fullWidth
        variant="contained"
        size="large"
        disabled={loading}
        sx={{
          mt: 1,
          py: 1.5,
          borderRadius: "10px",
          background: "linear-gradient(135deg, #F97316 0%, #EA580C 100%)",
          fontWeight: 700,
          fontSize: "0.95rem",
          letterSpacing: "0.02em",
          "&:hover": {
            background: "linear-gradient(135deg, #FB923C 0%, #F97316 100%)",
            transform: "translateY(-1px)",
            boxShadow: "0 8px 20px rgba(249,115,22,0.35)",
          },
          "&.Mui-disabled": {
            background: "rgba(249,115,22,0.3)",
            color: "rgba(255,255,255,0.4)",
          },
          transition: "all 0.2s ease",
        }}
      >
        {loading ? (
          <CircularProgress size={22} sx={{ color: "rgba(255,255,255,0.7)" }} />
        ) : (
          "Sign In"
        )}
      </Button>
    </Box>
  );
};

export default LoginForm;
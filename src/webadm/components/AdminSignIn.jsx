
// UI ONLY CHANGED CODE

import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  InputAdornment,
  IconButton,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import api from "../services/apiClient";
import logo from "../../assets/logo.png";

export default function AdminSignIn() {

  
  const navigate = useNavigate();
  const adminPath = import.meta.env.VITE_ADMIN_PATH;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate(`/${adminPath}/dashboard`);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/adm/admin_email_verification", {
        email,
        password,
      });

      console.log("API Response:", response.data);

      if (response.data.data.status === "success") {
        localStorage.setItem("token", response.data.data.token);
        localStorage.setItem("adm_user",JSON.stringify(response.data.data.user.name));
        localStorage.setItem("isLoggedIn", "true")
        console.log("Token saved:", localStorage.getItem("token"));
        console.log("Navigating to /admin/dashboard...");
        navigate(`/${adminPath}/dashboard`);
        console.log("Navigate called");
      }
    } catch (err) {
      console.log("Error:", err);
      setError("Login failed. Try again.");
    }
  };

  // const goToSignup = () => {
  //   navigate("/${adminPath}/signup");
  // };

  

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "#f0f4f8",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: { xs: 2, sm: 3 },
        py: 4,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          maxWidth: { xs: "100%", sm: 400 },
          borderRadius: "16px",
          border: "1px solid #e2e8f0",
          px: { xs: 3, sm: 4 },
          py: { xs: 4, sm: 4.5 },
        }}
      >
        {/* Logo */}
        <Box textAlign="center" mb={1.5}>
          <Box
            sx={{
              width: "70%",
              height: 44,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={logo}
              alt="SM Veg Mart"
              style={{
                height: "100%",
                objectFit: "contain",
                animation: "float 2s ease-in-out infinite",
              }}
            />
          </Box>
        </Box>

        {/* Divider */}
        <Box sx={{ borderTop: "1px solid #f1f5f9", mb: 2.5 }} />

        {/* Title block — separated clearly below divider */}
        <Box mb={3}>
          <Typography
            variant="h6"
            fontWeight={500}
            sx={{ color: "#1e293b", fontSize: "17px", mb: 0.4 }}
            textAlign={"center"}
          >
            Admin Login
          </Typography>
          <Typography sx={{ color: "#94a3b8", fontSize: "13px" }} textAlign={"center"}>
            Sign in to your management portal
          </Typography>
        </Box>

        {/* Form */}
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email Address"
            type="email"
            size="small"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{
              mt: 0,
              mb: 2,
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
                background: "#fafbfc",
                fontSize: "14px",
                "& fieldset": { borderColor: "#e2e8f0" },
                "&:hover fieldset": { borderColor: "#94a3b8" },
                "&.Mui-focused fieldset": { borderColor: "#94a3b8" },
                "&.Mui-focused": { background: "#fff" },
              },
              "& .MuiInputLabel-root": { fontSize: "14px" },
              "& .MuiInputLabel-root.Mui-focused": { color: "#64748b" },
            }}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            size="small"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword((prev) => !prev)}
                    edge="end"
                    size="small"
                    aria-label="toggle password visibility"
                    sx={{ color: "#94a3b8", "&:hover": { color: "#475569" } }}
                  >
                    {showPassword ? (
                      <VisibilityOffIcon sx={{ fontSize: 16 }} />
                    ) : (
                      <VisibilityIcon sx={{ fontSize: 16 }} />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              mt: 0,
              mb: 1,
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
                background: "#fafbfc",
                fontSize: "14px",
                "& fieldset": { borderColor: "#e2e8f0" },
                "&:hover fieldset": { borderColor: "#94a3b8" },
                "&.Mui-focused fieldset": { borderColor: "#94a3b8" },
                "&.Mui-focused": { background: "#fff" },
              },
              "& .MuiInputLabel-root": { fontSize: "14px" },
              "& .MuiInputLabel-root.Mui-focused": { color: "#64748b" },
            }}
          />

          {error && (
            <Typography color="error" mt={1} fontSize={13}>
              {error}
            </Typography>
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disableElevation
            sx={{
              mt: 2.5,
              py: 1.2,
              borderRadius: "8px",
              background: "#334155",
              fontSize: "14px",
              fontWeight: 500,
              textTransform: "none",
              letterSpacing: "0.02em",
              "&:hover": { background: "#1e293b" },
            }}
          >
            Sign In
          </Button>

          <Typography
            textAlign="center"
            mt={2}
            fontSize={13}
            sx={{ color: "#94a3b8" }}
          >
            Don't have an account?{" "}
            <Box
              component="span"
              sx={{
                color: "#475569",
                fontWeight: 500,
                textDecoration: "underline",
                textUnderlineOffset: "2px",
                cursor: "pointer",
              }}
            >
              Sign Up
            </Box>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );



}
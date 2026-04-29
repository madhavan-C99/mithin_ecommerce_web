// src/webadm/features/deliveryboy/components/AddDeliveryBoy.jsx

import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Grid,
  TextField,
  Button,
  IconButton,
  Typography,
  InputAdornment,
  CircularProgress,
  Divider,
} from "@mui/material";
import CloseIcon                from "@mui/icons-material/Close";
import PersonAddAltIcon         from "@mui/icons-material/PersonAddAlt";
import VisibilityIcon           from "@mui/icons-material/Visibility";
import VisibilityOffIcon        from "@mui/icons-material/VisibilityOff";
import PersonOutlineIcon        from "@mui/icons-material/PersonOutline";
import PhoneAndroidOutlinedIcon from "@mui/icons-material/PhoneAndroidOutlined";
import EmailOutlinedIcon        from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon         from "@mui/icons-material/LockOutlined";
import LocationOnOutlinedIcon   from "@mui/icons-material/LocationOnOutlined";
import { deliveryBoyAPI }       from "../deliveryBoyAPI";

// ─── Constants ────────────────────────────────────────────────────────────────
const NAVY   = "#1e3c72";
const BLUE   = "#2a5298";
const RADIUS = "10px";

const INITIAL_FORM = {
  name:             "",
  mobile_number:    "",
  email:            "",
  password:         "",
  confirm_password: "",
  address_line1:    "",
  address_line2:    "",
};

// ─── Section header ───────────────────────────────────────────────────────────
const SectionLabel = ({ label }) => (
  <Box sx={{ mb: 1.75 }}>
    <Typography
      sx={{
        fontSize:      "0.67rem",
        fontWeight:    700,
        color:         BLUE,
        textTransform: "uppercase",
        letterSpacing: "0.13em",
        mb:            0.75,
      }}
    >
      {label}
    </Typography>
    <Divider sx={{ borderColor: "#e8edf5" }} />
  </Box>
);

// ─── Shared field styles — WHITE background, no disabled feel ─────────────────
const fieldSx = (hasError) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: RADIUS,
    fontSize:     "0.875rem",
    background:   "#ffffff",           // ← white, never grey
    transition:   "box-shadow 0.18s, border-color 0.18s",

    "& fieldset": {
      borderColor: hasError ? "#d32f2f" : "#d0d5dd",
    },
    "&:hover fieldset": {
      borderColor: hasError ? "#d32f2f" : BLUE,
    },
    "&.Mui-focused": {
      boxShadow: `0 0 0 3px rgba(42,82,152,0.10)`,
      "& fieldset": {
        borderColor: hasError ? "#d32f2f" : BLUE,
        borderWidth: "1.5px",
      },
    },
  },

  "& .MuiInputLabel-root": {
    fontSize: "0.84rem",
    color:    "#64748b",
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: hasError ? "#d32f2f" : BLUE,
  },
  "& .MuiInputLabel-shrink": {
    color:      hasError ? "#d32f2f" : BLUE,
    fontWeight: 500,
  },

  "& .MuiInputAdornment-root svg": {
    fontSize: "1.05rem",
    color:    hasError ? "#d32f2f" : "#94a3b8",
  },

  "& .MuiFormHelperText-root": {
    fontSize: "0.7rem",
    mt:       0.4,
    mx:       0.25,
  },
});

// ─── Reusable Field ───────────────────────────────────────────────────────────
const Field = ({
  form, errors, handleChange,
  name, label, icon,
  type = "text",
  endAdornment,
  ...rest
}) => {
  const hasError = Boolean(errors[name]);
  return (
    <TextField
      fullWidth
      size="small"
      name={name}
      label={label}
      type={type}
      value={form[name]}
      onChange={handleChange}
      error={hasError}
      helperText={errors[name] || ""}
      InputProps={{
        startAdornment: icon
          ? <InputAdornment position="start">{icon}</InputAdornment>
          : undefined,
        ...(endAdornment ? { endAdornment } : {}),
      }}
      sx={fieldSx(hasError)}
      {...rest}
    />
  );
};

// ─── Component ────────────────────────────────────────────────────────────────
export default function AddDeliveryBoy({ open, onClose, onSuccess }) {
  const [form,        setForm]        = useState(INITIAL_FORM);
  const [errors,      setErrors]      = useState({});
  const [loading,     setLoading]     = useState(false);
  const [showPass,    setShowPass]    = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: "" }));
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim())
      e.name = "Full name is required";
    if (!form.mobile_number.trim())
      e.mobile_number = "Mobile number is required";
    else if (!/^\d{10}$/.test(form.mobile_number))
      e.mobile_number = "Enter a valid 10-digit number";
    if (!form.email.trim())
      e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      e.email = "Enter a valid email address";
    if (!form.password)
      e.password = "Password is required";
    else if (form.password.length < 6)
      e.password = "Minimum 6 characters";
    if (!form.confirm_password)
      e.confirm_password = "Please confirm the password";
    else if (form.password !== form.confirm_password)
      e.confirm_password = "Passwords do not match";
    if (!form.address_line1.trim())
      e.address_line1 = "Address line 1 is required";
    return e;
  };

  const handleSubmit = async () => {
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    try {
      await deliveryBoyAPI.createDeliveryBoy(form);
      onSuccess("Delivery boy added successfully!");
      handleClose();
    } catch (err) {
      console.error(err);
      setErrors({ api: "Something went wrong. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setForm(INITIAL_FORM);
    setErrors({});
    setShowPass(false);
    setShowConfirm(false);
    onClose();
  };

  const fp = { form, errors, handleChange };

  // ── eye-toggle helpers ────────────────────────────────────────────────────
  const eyeAdornment = (visible, toggle) => (
    <InputAdornment position="end">
      <IconButton
        size="small"
        onClick={toggle}
        edge="end"
        tabIndex={-1}
        sx={{
          color:     "#94a3b8",
          mr:        "-4px",
          "&:hover": { color: BLUE, background: "rgba(42,82,152,0.06)" },
        }}
      >
        {visible
          ? <VisibilityOffIcon sx={{ fontSize: 18 }} />
          : <VisibilityIcon    sx={{ fontSize: 18 }} />}
      </IconButton>
    </InputAdornment>
  );

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      fullScreen={false}
      PaperProps={{
        sx: {
          borderRadius:  "18px",
          boxShadow:     "0 24px 64px rgba(0,0,0,0.20)",
          overflow:      "hidden",
          mx:            { xs: 2, sm: "auto" },
          my:            { xs: 2, sm: "auto" },
          maxHeight:     { xs: "92vh", sm: "90vh" },
          display:       "flex",
          flexDirection: "column",
        },
      }}
    >
      {/* ── Header ── */}
      <DialogTitle sx={{ p: 0, flexShrink: 0 }} mb={1}>
        <Box
          sx={{
            background:     `linear-gradient(110deg, ${NAVY} 0%, ${BLUE} 100%)`,
            px:             { xs: 2.5, sm: 3 },
            py:             { xs: 2, sm: 2.25 },
            display:        "flex",
            alignItems:     "center",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.75 }}>
            <Box
              sx={{
                width:          { xs: 36, sm: 40 },
                height:         { xs: 36, sm: 40 },
                borderRadius:   "10px",
                background:     "rgba(255,255,255,0.15)",
                display:        "flex",
                alignItems:     "center",
                justifyContent: "center",
                flexShrink:     0,
              }}
            >
              <PersonAddAltIcon sx={{ color: "#fff", fontSize: { xs: 18, sm: 20 } }} />
            </Box>
            <Box>
              <Typography
                sx={{
                  color:      "#fff",
                  fontWeight: 700,
                  fontSize:   { xs: "0.95rem", sm: "1.05rem" },
                  lineHeight: 1.25,
                }}
              >
                Add Delivery Boy
              </Typography>
              <Typography
                sx={{ color: "rgba(255,255,255,0.65)", fontSize: "0.72rem", mt: 0.25 }}
              >
                Fill in all required details below
              </Typography>
            </Box>
          </Box>

          <IconButton
            size="small"
            onClick={handleClose}
            sx={{
              color:       "rgba(255,255,255,0.75)",
              borderRadius: "8px",
              p:           0.75,
              "&:hover":   { color: "#fff", background: "rgba(255,255,255,0.14)" },
            }}
          >
            <CloseIcon sx={{ fontSize: 19 }} />
          </IconButton>
        </Box>
      </DialogTitle>

      {/* ── Body ── */}
      <DialogContent
        sx={{
          px:        { xs: 2.5, sm: 3 },
          pt:        "20px !important",
          pb:        1,
          overflowY: "auto",
          flex:      1,
          "&::-webkit-scrollbar":       { width: "4px" },
          "&::-webkit-scrollbar-track": { background: "transparent" },
          "&::-webkit-scrollbar-thumb": { background: "#cbd5e1", borderRadius: "4px" },
        }}
      >
        {/* API error banner */}
        {errors.api && (
          <Box
            sx={{
              mb:           2,
              p:            1.5,
              borderRadius: RADIUS,
              background:   "#fff5f5",
              border:       "1px solid #fecaca",
            }}
          >
            <Typography sx={{ color: "#dc2626", fontSize: "0.8rem" }}>
              {errors.api}
            </Typography>
          </Box>
        )}

        {/* ── Personal Information ── */}
        <SectionLabel label="Personal Information" />
        <Grid container spacing={{ xs: 1.5, sm: 2 }} sx={{ mb: { xs: 4, sm: 4 } }}>

          {/* Full Name — full width */}
          <Grid item xs={12} mt={2}>
            <Field
              {...fp}
              name="name"
              label="Full Name"
              icon={<PersonOutlineIcon />}
            />
          </Grid>

          {/* Mobile */}
          <Grid item xs={12} sm={6} mt={2}>
            <Field
              {...fp}
              name="mobile_number"
              label="Mobile Number"
              icon={<PhoneAndroidOutlinedIcon />}
            />
          </Grid>

          {/* Email */}
          <Grid item xs={12} sm={6} mt={2}>
            <Field
              {...fp}
              name="email"
              label="Email Address"
              type="email"
              icon={<EmailOutlinedIcon />}
            />
          </Grid>
        </Grid>

        {/* ── Account Credentials ── */}
        <SectionLabel label="Account Credentials" />
        <Grid container spacing={{ xs: 1.5, sm: 2 }} sx={{ mb: { xs: 4, sm: 4 } }}>

          {/* Password */}
          <Grid item xs={12} sm={6} mt={2}>
            <Field
              {...fp}
              name="password"
              label="Password"
              icon={<LockOutlinedIcon />}
              type={showPass ? "text" : "password"}
              endAdornment={eyeAdornment(showPass, () => setShowPass((v) => !v))}
            />
          </Grid>

          {/* Confirm Password */}
          <Grid item xs={12} sm={6} mt={2}>
            <Field
              {...fp}
              name="confirm_password"
              label="Confirm Password"
              icon={<LockOutlinedIcon />}
              type={showConfirm ? "text" : "password"}
              endAdornment={eyeAdornment(showConfirm, () => setShowConfirm((v) => !v))}
            />
          </Grid>
        </Grid>

        {/* ── Address Details ── */}
        <SectionLabel label="Address Details" />
        <Grid container spacing={{ xs: 1.5, sm: 2 }} sx={{ mb: 2 }}>

          {/* Address Line 1 */}
          <Grid item xs={12} sm={6} mt={2}>
            <Field
              {...fp}
              name="address_line1"
              label="Address Line 1"
              icon={<LocationOnOutlinedIcon />}
            />
          </Grid>

          {/* Address Line 2 */}
          <Grid item xs={12} sm={6} mt={2}>
            <Field
              {...fp}
              name="address_line2"
              label="Address Line 2 (Optional)"
              icon={<LocationOnOutlinedIcon />}
            />
          </Grid>
        </Grid>
      </DialogContent>

      {/* ── Footer ── */}
      <DialogActions
        sx={{
          px:             { xs: 2.5, sm: 3 },
          py:             { xs: 1.75, sm: 2 },
          gap:            1.25,
          borderTop:      "1px solid #f1f5f9",
          justifyContent: "flex-end",
          flexShrink:     0,
          background:     "#fafbfd",
          // Stack vertically on xs, horizontal on sm+
          flexDirection: "row",
          alignItems: "center"
          // flexDirection:  { xs: "column-reverse", sm: "row" },
          // alignItems:     { xs: "stretch", sm: "center" },
        }}
      >
        <Button
          onClick={handleClose}
          sx={{
            borderRadius:  RADIUS,
            textTransform: "none",
            fontWeight:    500,
            px:            3,
            py:            0.95,
            fontSize:      "0.875rem",
            border:        "1px solid #cbd5e1",
            color:         "#64748b",
            "&:hover": {
              borderColor: BLUE,
              color:       BLUE,
              background:  "#f0f4ff",
            },
          }}
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={loading}
          startIcon={
            loading
              ? <CircularProgress size={14} color="inherit" />
              : <PersonAddAltIcon sx={{ fontSize: "17px !important" }} />
          }
          sx={{
            borderRadius:  RADIUS,
            textTransform: "none",
            fontWeight:    600,
            px:            3,
            py:            0.95,
            fontSize:      "0.875rem",
            background:    `linear-gradient(110deg, ${NAVY}, ${BLUE})`,
            boxShadow:     "0 4px 14px rgba(30,60,114,0.28)",
            "&:hover": {
              background: "linear-gradient(110deg, #16305e, #1e3f7a)",
              boxShadow:  "0 6px 20px rgba(30,60,114,0.38)",
            },
            "&.Mui-disabled": { background: "#cbd5e1", boxShadow: "none" },
          }}
        >
          {loading ? "Adding..." : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
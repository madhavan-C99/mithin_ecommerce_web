// import {
//   Box,
//   TextField,
//   Button,
//   MenuItem,
//   Typography,
//   IconButton,
//   Grid,
//   Paper,
//   FormGroup,
//   FormControlLabel,
//   Checkbox
// } from "@mui/material";

// import CloseIcon from "@mui/icons-material/Close";
// import { useEffect, useState } from "react";
// import { cususerAPI } from "../cususerAPI";



// const AddAdmin=({close})=>{
//     const [accepted, setAccepted] = useState(false);
//     const [form, setForm] = useState({
//     name: "",
//     email: "",
//     mobile: "",
//     password: "",
//     confirm_password: ""
//   });
//     const [errors, setErrors] = useState({});

//   // ================= HANDLE CHANGE =================
// const handleChange = (e) => {
//   const { name, value } = e.target;

//   // Mobile - numbers only
//   if (name === "mobile") {
//     if (value === "" || /^[0-9]*$/.test(value)) {
//       setForm({ ...form, [name]: value });
//     }
//   }

//   // Name - letters only
//   else if (name === "name") {
//     if (/^[a-zA-Z\s]*$/.test(value)) {
//       setForm({ ...form, [name]: value });
//     }
//   }

//   // Email validation
//   else if (name === "email") {
//     setForm({ ...form, [name]: value });

//     const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (value && !emailPattern.test(value)) {
//       // console.log("Invalid email format");
//     }
//   }

//   // Password validation (min 6 characters)
//   else if (name === "password") {
//     if (value.length <= 12) {
//       setForm({ ...form, [name]: value });
//     }
//   }

//   // Confirm password validation
//   else if (name === "confirm_password") {
//     setForm({ ...form, [name]: value });

//     if (form.password !== value) {
//       console.log("Password does not match");
//     }
//   }

//   // Other fields
//   else {
//     setForm({ ...form, [name]: value });
//   }
// };

//   // ================= VALIDATION =================
//   const validate = () => {
//   let temp = {};

//   const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//   if (!form.name.trim()) temp.name = "Name is required";

//   if (!form.email.trim()) {
//     temp.email = "Email is required";
//   } else if (!emailPattern.test(form.email)) {
//     temp.email = "Invalid email format";
//   }

//   if (!form.mobile) temp.mobile = "Mobile is required";
//   else if (form.mobile.length !== 10)
//     temp.mobile = "Mobile must be 10 digits";

//   if (!form.password) temp.password = "Password is required";

//   if (!form.confirm_password)
//     temp.confirm_password = "Confirm Password is required";
//   else if (form.password !== form.confirm_password)
//     temp.confirm_password = "Passwords do not match";

//   if (!accepted) temp.accepted = "Please accept the details";

//   setErrors(temp);
//   return Object.keys(temp).length === 0;
// };


//   // ================= SUBMIT =================
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!validate()) return;

//     const formData = new FormData();
//     formData.append("name", form.name);
//     formData.append("email", form.email);
//     formData.append("mobile", parseInt(form.mobile));
//     formData.append("password",(form.password));
//     formData.append("confirm_password",(form.confirm_password));
//     formData.append("is_active", form.is_active);
  
//     try {
//       await cususerAPI.adduserAPI(formData);
//       close();
//       // refresh();
//     } catch (err) {
//       console.error(err.response?.data);
//     }
//   };


// const RefreshForm = () => {
//   setForm({
//     name: "",
//     email: "",
//     mobile: "",
//     password: "",
//     confirm_password: "",
//   });
//   setAccepted(false);
//   setErrors({});
// };

//     return (
//         <>
// <Box
//       sx={{
//         position: "fixed",
//         inset: 0,
//         backgroundColor: "rgba(0,0,0,0.4)",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         zIndex: 999,
//         // overflowY:"auto",
//         p:2
//       }}
//     >
//   <Paper sx={{ width: "100%", maxWidth: 450,maxHeight:"90vh",m:9, p: 3, borderRadius: 3,overflowY:'auto' }}>
//         <Box display="flex" justifyContent="space-between" mt={0}>
//           <Typography variant="h6" fontWeight={600}>Add New User</Typography>
//           <IconButton onClick={close}>
//             <CloseIcon />
//           </IconButton>
//         </Box>
//           <Box component="form" onSubmit={handleSubmit} mb={0} >
//           <Grid container spacing={1} mb={1}>
//                         {/* NAME */}
//             <Grid item xs={12} md={6} minWidth={"100%"} >
//               <TextField
//                 label="*Name"
//                 name="name"
//                 fullWidth
//                 size="small"
//                 value={form.name}
//                 onChange={handleChange}
//                 error={!!errors.name}
//                 helperText={errors.name}
//               />
//             </Grid>

//             {/* TAMIL NAME */}
//             <Grid item xs={12} md={6} minWidth={"100%"} mb={1}>
//               <TextField
//                 label="*Email"
//                 name="email"
//                 fullWidth
//                 size="small"
//                 value={form.email}
//                 onChange={handleChange}
//                 error={!!errors.email}
//                 helperText={errors.email}
//               />
//             </Grid>
//           </Grid>
  
//           <Grid container spacing={1} mb={1}>
//                         {/* NAME */}
//             <Grid item xs={12} md={6} minWidth={"100%"} >
//               <TextField
//                 label="Mobile"
//                 name="mobile"
//                 fullWidth
//                 size="small"
//                 value={form.mobile}
//                 onChange={handleChange}
//                 error={!!errors.mobile}
//                 helperText={errors.mobile}
//               />
//             </Grid>

//             {/* TAMIL NAME */}
//             <Grid item xs={12} md={6} minWidth={"100%"}>
//               <TextField
//                 label="*Password"
//                 name="password"
//                 fullWidth
//                 size="small"
//                 value={form.password}
//                 onChange={handleChange}
//                 error={!!errors.password}
//                 helperText={errors.password}
//               />
//             </Grid>
//           </Grid>

//           <Grid container spacing={1} mb={1}>
//                         {/* NAME */}
//             <Grid item xs={12} md={6} minWidth={"100%"}>
//               <TextField
//                 label="*Confirm Password"
//                 name="confirm_password"
//                 fullWidth
//                 size="small"
//                 value={form.confirm_password}
//                 onChange={handleChange}
//                 error={!!errors.confirm_password}
//                 helperText={errors.confirm_password}
//               />
//             </Grid>

//            </Grid>
//                        {/* ACCEPT CHECKBOX */}
//                        <Grid item xs={12} width={"100%"}>
//                          <FormGroup>
//                            <FormControlLabel
//                              control={
//                                <Checkbox
//                                  checked={accepted}
//                                  onChange={(e) => setAccepted(e.target.checked)}
//                                />
//                              }
//                              label="Accept the above given details"
//                            />
//                          </FormGroup>
//                          {errors.accepted && (
//                            <Typography color="error" variant="caption">
//                              {errors.accepted}
//                            </Typography>
//                          )}
//                        </Grid>
//                       {/* BUTTONS */}
//             <Grid
//               item
//               xs={12}
//               width={"100%"}
//               marginTop={2}
//               sx={{ display: "flex", justifyContent: "space-evenly" }}
//             >
//               <Button
//                 type="submit"
//                 variant="contained"
//                 fullWidth
//                 sx={{ height: 45, borderRadius: 2, fontWeight: 600, width: 120 }}
//               >
//                 Save User
//               </Button>

//               <Button
//                 variant="contained"
//                 onClick={RefreshForm}
//                 fullWidth
//                 sx={{ height: 45, borderRadius: 2, fontWeight: 600, width: 120 }}
//               >
//                 Reset
//               </Button>
//             </Grid>
//           </Box>


//      </Paper>   

//     </Box>
        
//         </>
//     )
// }

// export default AddAdmin










import {
  Box,
  TextField,
  Button,
  MenuItem,
  Typography,
  IconButton,
  Grid,
  Paper,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Divider
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { useEffect, useState } from "react";
import { cususerAPI } from "../cususerAPI";


// ─── Shared TextField style ───────────────────────────────────────────────────
const fieldSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "10px",
    backgroundColor: "#f8fafc",
    fontSize: { xs: "12px", sm: "13px", md: "13px" },
    transition: "box-shadow 0.2s ease, background-color 0.2s ease",
    "&:hover": { backgroundColor: "#f1f5f9" },
    "&.Mui-focused": {
      backgroundColor: "#ffffff",
      boxShadow: "0 0 0 3px rgba(59,130,246,0.12)"
    }
  },
  "& .MuiInputLabel-root": {
    fontSize: { xs: "12px", sm: "12px", md: "13px" },
    color: "#6B7280",
    fontWeight: 500
  },
  "& .MuiInputLabel-root.Mui-focused": { color: "#3b82f6" },
  "& .MuiFormHelperText-root": {
    fontSize: { xs: "10px", sm: "10px", md: "11px" },
    margin: "3px 4px 0"
  }
};


const AddAdmin = ({ close }) => {
  const [accepted, setAccepted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirm_password: ""
  });
  const [errors, setErrors] = useState({});

  // ================= HANDLE CHANGE (untouched) =================
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "mobile") {
      if (value === "" || /^[0-9]*$/.test(value)) {
        setForm({ ...form, [name]: value });
      }
    } else if (name === "name") {
      if (/^[a-zA-Z\s]*$/.test(value)) {
        setForm({ ...form, [name]: value });
      }
    } else if (name === "email") {
      setForm({ ...form, [name]: value });
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (value && !emailPattern.test(value)) {
        // console.log("Invalid email format");
      }
    } else if (name === "password") {
      if (value.length <= 12) {
        setForm({ ...form, [name]: value });
      }
    } else if (name === "confirm_password") {
      setForm({ ...form, [name]: value });
      if (form.password !== value) {
        console.log("Password does not match");
      }
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  // ================= VALIDATION (untouched) =================
  const validate = () => {
    let temp = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!form.name.trim()) temp.name = "Name is required";

    if (!form.email.trim()) {
      temp.email = "Email is required";
    } else if (!emailPattern.test(form.email)) {
      temp.email = "Invalid email format";
    }

    if (!form.mobile) temp.mobile = "Mobile is required";
    else if (form.mobile.length !== 10)
      temp.mobile = "Mobile must be 10 digits";

    if (!form.password) temp.password = "Password is required";

    if (!form.confirm_password)
      temp.confirm_password = "Confirm Password is required";
    else if (form.password !== form.confirm_password)
      temp.confirm_password = "Passwords do not match";

    if (!accepted) temp.accepted = "Please accept the details";

    setErrors(temp);
    return Object.keys(temp).length === 0;
  };

  // ================= SUBMIT (untouched) =================
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("email", form.email);
    formData.append("mobile", parseInt(form.mobile));
    formData.append("password", form.password);
    formData.append("confirm_password", form.confirm_password);
    formData.append("is_active", form.is_active);

    try {
      await cususerAPI.adduserAPI(formData);
      close();
    } catch (err) {
      console.error(err.response?.data);
    }
  };

  // ================= RESET (untouched) =================
  const RefreshForm = () => {
    setForm({
      name: "",
      email: "",
      mobile: "",
      password: "",
      confirm_password: ""
    });
    setAccepted(false);
    setErrors({});
  };

  return (
    <>
      {/* ── Fixed Overlay (structure kept as-is) ───────────────────────── */}
      <Box
        sx={{
          position: "fixed",
          inset: 0,
          backgroundColor: "rgba(0,0,0,0.45)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 999,
          p: { xs: 1.5, sm: 2, md: 3 }
        }}
      >
        {/* ── Modal Paper ─────────────────────────────────────────────── */}
        <Paper
          elevation={0}
          sx={{
            width: "100%",
            maxWidth: { xs: "100%", sm: 420, md: 440 },
            maxHeight: "92vh",
            m: { xs: 1, sm: 3, md: "auto" },
            borderRadius: "18px",
            overflowY: "auto",
            overflowX: "hidden",
            boxShadow: "0 20px 60px rgba(0,0,0,0.18), 0 4px 16px rgba(0,0,0,0.08)",
            "&::-webkit-scrollbar": { width: "4px" },
            "&::-webkit-scrollbar-track": { background: "transparent" },
            "&::-webkit-scrollbar-thumb": { background: "#e2e8f0", borderRadius: "10px" }
          }}
        >

          {/* ── Header ──────────────────────────────────────────────── */}
          <Box
            sx={{
              px: { xs: 2.5, sm: 3 },
              pt: { xs: 2.5, sm: 3 },
              pb: 2,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start"
            }}
          >
            <Box>
              {/* Accent pill */}
              <Box
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 0.6,
                  backgroundColor: "#eff6ff",
                  border: "1px solid #bfdbfe",
                  borderRadius: "20px",
                  px: 1.2,
                  py: 0.3,
                  mb: 1
                }}
              >
                <PersonOutlineIcon sx={{ fontSize: "12px", color: "#3b82f6" }} />
                <Typography
                  sx={{
                    fontSize: "11px",
                    fontWeight: 600,
                    color: "#3b82f6",
                    letterSpacing: "0.03em"
                  }}
                >
                  New User
                </Typography>
              </Box>

              <Typography
                sx={{
                  fontSize: { xs: "16px", sm: "17px", md: "18px" },
                  fontWeight: 700,
                  color: "#111827",
                  lineHeight: 1.2
                }}
              >
                Add New User
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: "11px", sm: "12px" },
                  color: "#9CA3AF",
                  mt: 0.4,
                  fontWeight: 400
                }}
              >
                Fill in the details below to create an account
              </Typography>
            </Box>

            {/* Close button */}
            <IconButton
              onClick={close}
              size="small"
              sx={{
                backgroundColor: "#f3f4f6",
                borderRadius: "8px",
                width: 30,
                height: 30,
                mt: 0.5,
                flexShrink: 0,
                "&:hover": { backgroundColor: "#e5e7eb" }
              }}
            >
              <CloseIcon sx={{ fontSize: "15px", color: "#6B7280" }} />
            </IconButton>
          </Box>

          {/* Divider */}
          <Divider sx={{ borderColor: "#f1f5f9" }} />

          {/* ── Form Body ───────────────────────────────────────────── */}
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ px: { xs: 2.5, sm: 3 }, pt: 2.5, pb: 3 }}
          >
            <Grid container spacing={1.8}>

              {/* Name */}
              <Grid item xs={12} minWidth="100%">
                <TextField
                  label="*Name"
                  name="name"
                  fullWidth
                  size="small"
                  value={form.name}
                  onChange={handleChange}
                  error={!!errors.name}
                  helperText={errors.name}
                  sx={fieldSx}
                />
              </Grid>

              {/* Email */}
              <Grid item xs={12} md={6} minWidth="100%">
                <TextField
                  label="*Email"
                  name="email"
                  fullWidth
                  size="small"
                  value={form.email}
                  onChange={handleChange}
                  error={!!errors.email}
                  helperText={errors.email}
                  sx={fieldSx}
                />
              </Grid>

              {/* Mobile */}
              <Grid item xs={12} md={6} minWidth="100%">
                <TextField
                  label="Mobile"
                  name="mobile"
                  fullWidth
                  size="small"
                  value={form.mobile}
                  onChange={handleChange}
                  error={!!errors.mobile}
                  helperText={errors.mobile}
                  sx={fieldSx}
                />
              </Grid>

              {/* Security section label */}
              <Grid item xs={12} minWidth="100%">
                <Typography
                  sx={{
                    fontSize: "10.5px",
                    fontWeight: 700,
                    color: "#9CA3AF",
                    letterSpacing: "0.07em",
                    textTransform: "uppercase",
                    mt: 0.5,
                    mb: -0.5
                  }}
                >
                  Security
                </Typography>
              </Grid>

              {/* Password */}
              <Grid item xs={12} md={6} minWidth="100%">
                <TextField
                  label="*Password"
                  name="password"
                  type="password"
                  fullWidth
                  size="small"
                  value={form.password}
                  onChange={handleChange}
                  error={!!errors.password}
                  helperText={errors.password}
                  sx={fieldSx}
                />
              </Grid>

              {/* Confirm Password */}
              <Grid item xs={12} md={6} minWidth="100%">
                <TextField
                  label="*Confirm Password"
                  name="confirm_password"
                  type="password"
                  fullWidth
                  size="small"
                  value={form.confirm_password}
                  onChange={handleChange}
                  error={!!errors.confirm_password}
                  helperText={errors.confirm_password}
                  sx={fieldSx}
                />
              </Grid>

              {/* Accept Checkbox — styled card */}
              <Grid item xs={12} width="100%">
                <Box
                  sx={{
                    backgroundColor: errors.accepted ? "#fff5f5" : "#f8fafc",
                    border: `1.5px solid ${errors.accepted ? "#fecaca" : "#e2e8f0"}`,
                    borderRadius: "10px",
                    px: 1.5,
                    py: 0.8,
                    mt: 0.5,
                    transition: "border-color 0.2s"
                  }}
                >
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={accepted}
                          onChange={(e) => setAccepted(e.target.checked)}
                          size="small"
                          sx={{
                            p: 0.4,
                            color: "#9CA3AF",
                            "&.Mui-checked": { color: "#3b82f6" }
                          }}
                        />
                      }
                      label={
                        <Typography
                          sx={{
                            fontSize: { xs: "12px", sm: "12px", md: "13px" },
                            color: "#374151",
                            fontWeight: 500
                          }}
                        >
                          Accept the above given details
                        </Typography>
                      }
                      sx={{ m: 0, gap: 0.5 }}
                    />
                  </FormGroup>
                </Box>
                {errors.accepted && (
                  <Typography
                    color="error"
                    sx={{ fontSize: { xs: "10px", sm: "11px" }, mt: 0.5, ml: 0.5 }}
                  >
                    {errors.accepted}
                  </Typography>
                )}
              </Grid>

              {/* ── Buttons ───────────────────────────────────────── */}
              <Grid item xs={12} width="100%">
                <Box
                  sx={{
                    display: "flex",
                    gap: { xs: 1.5, sm: 2 },
                    mt: 0.5
                  }}
                >
                  {/* Save User */}
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    sx={{
                      height: { xs: 38, sm: 40, md: 42 },
                      borderRadius: "10px",
                      fontWeight: 600,
                      fontSize: { xs: "12px", sm: "13px" },
                      textTransform: "none",
                      boxShadow: "0 2px 8px rgba(59,130,246,0.25)",
                      "&:hover": {
                        boxShadow: "0 4px 14px rgba(59,130,246,0.35)",
                        transform: "translateY(-1px)"
                      },
                      transition: "all 0.2s ease"
                    }}
                  >
                    Save User
                  </Button>

                  {/* Reset */}
                  <Button
                    variant="contained"
                    onClick={RefreshForm}
                    fullWidth
                    sx={{
                      height: { xs: 38, sm: 40, md: 42 },
                      borderRadius: "10px",
                      fontWeight: 600,
                      fontSize: { xs: "12px", sm: "13px" },
                      textTransform: "none",
                      backgroundColor: "#f1f5f9",
                      color: "#374151",
                      boxShadow: "none",
                      "&:hover": {
                        backgroundColor: "#e2e8f0",
                        boxShadow: "none",
                        transform: "translateY(-1px)"
                      },
                      transition: "all 0.2s ease"
                    }}
                  >
                    Reset
                  </Button>
                </Box>
              </Grid>

            </Grid>
          </Box>
        </Paper>
      </Box>
    </>
  );
};

export default AddAdmin;
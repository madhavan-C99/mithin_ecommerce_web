// // src/webadm/features/minimumordermanagement/components/MinimumOrderForm.jsx

// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Typography,
//   TextField,
//   Button,
//   CircularProgress,
//   Paper,
//   Divider,
//   Alert,
//   Chip,
// } from "@mui/material";
// import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
// import SaveOutlinedIcon          from "@mui/icons-material/SaveOutlined";
// import EditOutlinedIcon          from "@mui/icons-material/EditOutlined";
// import CurrencyRupeeIcon         from "@mui/icons-material/CurrencyRupee";
// import CheckCircleOutlineIcon    from "@mui/icons-material/CheckCircleOutline";
// import InfoOutlinedIcon          from "@mui/icons-material/InfoOutlined";
// import { minimumOrderAPI }       from "../minimumOrderAPI";

// // ── localStorage keys ──────────────────────────────────────
// const LS_MODE_KEY   = "mom_mode";    // "add" | "update"
// const LS_VALUES_KEY = "mom_values";  // { min_order_amount, delivery_fee }

// // ── helper: load saved values from localStorage ────────────
// const loadSavedState = () => {
//   try {
//     const mode   = localStorage.getItem(LS_MODE_KEY)   || "add";
//     const values = localStorage.getItem(LS_VALUES_KEY);
//     return {
//       mode,
//       savedValues: values ? JSON.parse(values) : null,
//     };
//   } catch {
//     return { mode: "add", savedValues: null };
//   }
// };

// const MinimumOrderForm = () => {

//   const { mode: savedMode, savedValues } = loadSavedState();

//   // ── state ──────────────────────────────────────────────────
//   const [mode,           setMode]           = useState(savedMode);   // "add" | "update"
//   const [minOrderAmount, setMinOrderAmount] = useState(
//     savedValues?.min_order_amount ?? ""
//   );
//   const [deliveryFee,    setDeliveryFee]    = useState(
//     savedValues?.delivery_fee ?? ""
//   );
//   const [loading,        setLoading]        = useState(false);
//   const [successMsg,     setSuccessMsg]     = useState("");
//   const [errorMsg,       setErrorMsg]       = useState("");
//   const [isEditing,      setIsEditing]      = useState(false);

//   // When mode is "update" and not actively editing → show read-only view
//   const isReadOnly = mode === "update" && !isEditing;

//   // ── validation ─────────────────────────────────────────────
//   const validate = () => {
//     if (!minOrderAmount || !deliveryFee) {
//       setErrorMsg("Both fields are required.");
//       return false;
//     }
//     if (Number(minOrderAmount) <= 0) {
//       setErrorMsg("Minimum order amount must be greater than 0.");
//       return false;
//     }
//     if (Number(deliveryFee) <= 0) {
//       setErrorMsg("Delivery fee must be greater than 0.");
//       return false;
//     }
//     return true;
//   };

//   // ── handle save (add) ──────────────────────────────────────
//   const handleSave = async () => {
//     setSuccessMsg("");
//     setErrorMsg("");

//     if (!validate()) return;

//     setLoading(true);
//     try {
//       const payload = {
//         min_order_amount: Number(minOrderAmount),
//         delivery_fee:     Number(deliveryFee),
//       };

//       await minimumOrderAPI.addOrderFee(payload);

//       // persist to localStorage → switch to update mode
//       localStorage.setItem(LS_MODE_KEY,   "update");
//       localStorage.setItem(LS_VALUES_KEY, JSON.stringify(payload));

//       setMode("update");
//       setIsEditing(false);
//       setSuccessMsg("Order fee saved successfully!");

//     } catch (err) {
//       console.error("addOrderFee failed:", err);
//       setErrorMsg("Failed to save. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ── handle update ──────────────────────────────────────────
//   const handleUpdate = async () => {
//     setSuccessMsg("");
//     setErrorMsg("");

//     if (!validate()) return;

//     setLoading(true);
//     try {
//       const payload = {
//         min_order_amount: Number(minOrderAmount),
//         delivery_fee:     Number(deliveryFee),
//       };

//       await minimumOrderAPI.updateOrderFee(payload);

//       // update localStorage
//       localStorage.setItem(LS_VALUES_KEY, JSON.stringify(payload));

//       setIsEditing(false);
//       setSuccessMsg("Order fee updated successfully!");

//     } catch (err) {
//       console.error("updateOrderFee failed:", err);
//       setErrorMsg("Failed to update. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ── handle edit click ──────────────────────────────────────
//   const handleEditClick = () => {
//     setSuccessMsg("");
//     setErrorMsg("");
//     setIsEditing(true);
//   };

//   // ── handle cancel edit ─────────────────────────────────────
//   const handleCancelEdit = () => {
//     // restore last saved values
//     if (savedValues) {
//       setMinOrderAmount(savedValues.min_order_amount ?? "");
//       setDeliveryFee(savedValues.delivery_fee ?? "");
//     }
//     setIsEditing(false);
//     setSuccessMsg("");
//     setErrorMsg("");
//   };

//   // ── clear messages after 4s ────────────────────────────────
//   useEffect(() => {
//     if (!successMsg && !errorMsg) return;
//     const timer = setTimeout(() => {
//       setSuccessMsg("");
//       setErrorMsg("");
//     }, 4000);
//     return () => clearTimeout(timer);
//   }, [successMsg, errorMsg]);

//   // ── shared input sx ────────────────────────────────────────
//   const inputSx = {
//     "& .MuiOutlinedInput-root": {
//       borderRadius: "10px",
//       backgroundColor: isReadOnly ? "#f7f9fc" : "#fff",
//       "& fieldset": { borderColor: "#e0e7ef" },
//       "&:hover fieldset": {
//         borderColor: isReadOnly ? "#e0e7ef" : "#2a5298",
//       },
//       "&.Mui-focused fieldset": { borderColor: "#2a5298" },
//     },
//     "& .MuiInputLabel-root.Mui-focused": { color: "#2a5298" },
//   };

//   return (
//     <Box>

//       {/* ── Page Header ─────────────────────────────────────── */}
//       <Box
//         sx={{
//           display       : "flex",
//           alignItems    : { xs: "flex-start", sm: "center" },
//           flexDirection : { xs: "column", sm: "row" },
//           justifyContent: "space-between",
//           gap           : 1.5,
//           mb            : 3,
//         }}
//       >
//         <Box>
//           <Typography
//             variant="h5"
//             fontWeight={700}
//             fontSize={{ xs: "1.1rem", sm: "1.3rem", md: "1.5rem" }}
//             color="#1a2e4a"
//           >
//             Minimum Order Management
//           </Typography>
//           <Typography
//             fontSize={{ xs: "0.78rem", sm: "0.85rem" }}
//             color="text.secondary"
//             mt={0.4}
//           >
//             Configure the minimum order amount and delivery fee for customer orders.
//           </Typography>
//         </Box>

//         {/* Mode badge */}
//         <Chip
//           icon={
//             mode === "update"
//               ? <CheckCircleOutlineIcon sx={{ fontSize: 15 }} />
//               : <InfoOutlinedIcon       sx={{ fontSize: 15 }} />
//           }
//           label={mode === "update" ? "Configured" : "Not Configured"}
//           size="small"
//           sx={{
//             backgroundColor: mode === "update" ? "#e8f5e9" : "#fff8e1",
//             color          : mode === "update" ? "#2e7d32" : "#f57f17",
//             fontWeight     : 600,
//             fontSize       : "0.75rem",
//             border         : `1px solid ${mode === "update" ? "#c8e6c9" : "#ffe082"}`,
//             alignSelf      : { xs: "flex-start", sm: "center" },
//           }}
//         />
//       </Box>

//       {/* ── Card ────────────────────────────────────────────── */}
//       <Paper
//         elevation={0}
//         sx={{
//           borderRadius: "16px",
//           border      : "1px solid #e2ecf4",
//           overflow    : "hidden",
//           maxWidth    : { xs: "100%", sm: 580, md: 600 },
//         }}
//       >
//         {/* Card header */}
//         <Box
//           sx={{
//             background : "linear-gradient(90deg, #1e3c72, #2a5298)",
//             px         : { xs: 2.5, sm: 3 },
//             py         : { xs: 2,   sm: 2.5 },
//             display    : "flex",
//             alignItems : "center",
//             justifyContent: "space-between",
//           }}
//         >
//           <Box sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
//             <LocalShippingOutlinedIcon
//               sx={{ color: "rgba(255,255,255,0.85)", fontSize: { xs: 20, sm: 22 } }}
//             />
//             <Typography
//               fontWeight={700}
//               fontSize={{ xs: "0.9rem", sm: "1rem" }}
//               color="#fff"
//               letterSpacing={0.3}
//             >
//               Delivery Fee Settings
//             </Typography>
//           </Box>

//           {/* Edit button — only shown in update/read-only mode */}
//           {isReadOnly && (
//             <Button
//               size="small"
//               startIcon={<EditOutlinedIcon sx={{ fontSize: "15px !important" }} />}
//               onClick={handleEditClick}
//               sx={{
//                 color          : "#fff",
//                 borderColor    : "rgba(255,255,255,0.45)",
//                 border         : "1px solid rgba(255,255,255,0.45)",
//                 borderRadius   : "8px",
//                 textTransform  : "none",
//                 fontSize       : { xs: "0.72rem", sm: "0.78rem" },
//                 fontWeight     : 600,
//                 px             : { xs: 1.2, sm: 1.8 },
//                 py             : 0.5,
//                 "&:hover"      : {
//                   backgroundColor: "rgba(255,255,255,0.12)",
//                   borderColor    : "rgba(255,255,255,0.7)",
//                 },
//               }}
//             >
//               Edit
//             </Button>
//           )}
//         </Box>

//         {/* Card body */}
//         <Box sx={{ px: { xs: 2.5, sm: 3 }, py: { xs: 2.5, sm: 3 } }}>

//           {/* Info note */}
//           <Box
//             sx={{
//               display      : "flex",
//               alignItems   : "flex-start",
//               gap          : 1,
//               backgroundColor: "#f0f6ff",
//               border       : "1px solid #d0e4f7",
//               borderRadius : "10px",
//               px           : 2,
//               py           : 1.4,
//               mb           : 3,
//             }}
//           >
//             <InfoOutlinedIcon sx={{ fontSize: 16, color: "#2a5298", mt: 0.2, flexShrink: 0 }} />
//             <Typography fontSize={{ xs: "0.76rem", sm: "0.8rem" }} color="#2a5298" lineHeight={1.6}>
//               {mode === "add"
//                 ? "Set the minimum order amount and delivery fee. Once saved, customers will be charged the delivery fee if their order is below the minimum amount."
//                 : isEditing
//                   ? "You are editing the current delivery fee settings. Click Update to apply changes."
//                   : "These values are currently active. Customers are charged the delivery fee for orders below the minimum amount."
//               }
//             </Typography>
//           </Box>

//           {/* Fields */}
//           <Box
//             sx={{
//               display      : "flex",
//               flexDirection: "column",
//               gap          : 2.5,
//             }}
//           >
//             {/* Minimum Order Amount */}
//             <TextField
//               label="Minimum Order Amount"
//               type="number"
//               fullWidth
//               value={minOrderAmount}
//               onChange={(e) => setMinOrderAmount(e.target.value)}
//               disabled={isReadOnly || loading}
//               InputProps={{
//                 startAdornment: (
//                   <CurrencyRupeeIcon
//                     sx={{
//                       fontSize: 18,
//                       color   : isReadOnly ? "#9e9e9e" : "#2a5298",
//                       mr      : 0.5,
//                     }}
//                   />
//                 ),
//                 inputProps: { min: 1 },
//               }}
//               helperText="Orders below this amount will be charged a delivery fee"
//               sx={inputSx}
//             />

//             {/* Delivery Fee */}
//             <TextField
//               label="Delivery Fee"
//               type="number"
//               fullWidth
//               value={deliveryFee}
//               onChange={(e) => setDeliveryFee(e.target.value)}
//               disabled={isReadOnly || loading}
//               InputProps={{
//                 startAdornment: (
//                   <CurrencyRupeeIcon
//                     sx={{
//                       fontSize: 18,
//                       color   : isReadOnly ? "#9e9e9e" : "#2a5298",
//                       mr      : 0.5,
//                     }}
//                   />
//                 ),
//                 inputProps: { min: 1 },
//               }}
//               helperText="This fee will be added to orders below the minimum amount"
//               sx={inputSx}
//             />
//           </Box>

//           {/* Live preview — only when values are filled */}
//           {minOrderAmount > 0 && deliveryFee > 0 && (
//             <Box
//               sx={{
//                 mt           : 3,
//                 backgroundColor: "#f4faf4",
//                 border       : "1px solid #d8eed8",
//                 borderRadius : "10px",
//                 px           : 2,
//                 py           : 1.5,
//               }}
//             >
//               <Typography
//                 fontSize={{ xs: "0.76rem", sm: "0.8rem" }}
//                 fontWeight={600}
//                 color="#2e7d32"
//                 mb={0.5}
//               >
//                 Preview
//               </Typography>
//               <Typography
//                 fontSize={{ xs: "0.75rem", sm: "0.79rem" }}
//                 color="#4a7a4a"
//                 lineHeight={1.7}
//               >
//                 Orders <strong>below ₹{minOrderAmount}</strong> → delivery fee of{" "}
//                 <strong>₹{deliveryFee}</strong> will be charged.
//                 <br />
//                 Orders <strong>₹{minOrderAmount} and above</strong> → delivery is{" "}
//                 <strong>FREE</strong>.
//               </Typography>
//             </Box>
//           )}

//           {/* Success / Error messages */}
//           {successMsg && (
//             <Alert
//               severity="success"
//               sx={{ mt: 2.5, borderRadius: "10px", fontSize: { xs: "0.78rem", sm: "0.82rem" } }}
//             >
//               {successMsg}
//             </Alert>
//           )}
//           {errorMsg && (
//             <Alert
//               severity="error"
//               sx={{ mt: 2.5, borderRadius: "10px", fontSize: { xs: "0.78rem", sm: "0.82rem" } }}
//             >
//               {errorMsg}
//             </Alert>
//           )}

//           <Divider sx={{ my: 3, borderColor: "#eef2f7" }} />

//           {/* Action buttons */}
//           <Box
//             sx={{
//               display       : "flex",
//               gap           : 1.5,
//               flexDirection : { xs: "column", sm: "row" },
//               justifyContent: "flex-end",
//             }}
//           >
//             {/* Cancel — only shown when editing in update mode */}
//             {mode === "update" && isEditing && (
//               <Button
//                 variant="outlined"
//                 fullWidth={false}
//                 onClick={handleCancelEdit}
//                 disabled={loading}
//                 sx={{
//                   borderRadius : "10px",
//                   textTransform: "none",
//                   fontWeight   : 600,
//                   fontSize     : { xs: "0.82rem", sm: "0.88rem" },
//                   px           : { xs: 2, sm: 3 },
//                   py           : 1.2,
//                   borderColor  : "#c0cfe0",
//                   color        : "#5a6a7a",
//                   width        : { xs: "100%", sm: "auto" },
//                   "&:hover"    : {
//                     borderColor    : "#a0b0c0",
//                     backgroundColor: "#f5f8fc",
//                   },
//                 }}
//               >
//                 Cancel
//               </Button>
//             )}

//             {/* Save / Update button */}
//             {!isReadOnly && (
//               <Button
//                 variant="contained"
//                 fullWidth
//                 onClick={mode === "add" ? handleSave : handleUpdate}
//                 disabled={loading}
//                 startIcon={
//                   loading
//                     ? <CircularProgress size={16} sx={{ color: "#fff" }} />
//                     : mode === "add"
//                       ? <SaveOutlinedIcon  sx={{ fontSize: "17px !important" }} />
//                       : <EditOutlinedIcon  sx={{ fontSize: "17px !important" }} />
//                 }
//                 sx={{
//                   background   : "linear-gradient(135deg, #1e3c72, #2a5298)",
//                   fontWeight   : 700,
//                   fontSize     : { xs: "0.85rem", sm: "0.92rem" },
//                   textTransform: "none",
//                   py           : 1.4,
//                   borderRadius : "10px",
//                   width        : { xs: "100%", sm: "auto" },
//                   minWidth     : { sm: 160 },
//                   boxShadow    : "0 4px 14px rgba(30,60,114,0.35)",
//                   transition   : "all 0.2s ease",
//                   "&:hover"    : {
//                     background : "linear-gradient(135deg, #163057, #1e3d7a)",
//                     boxShadow  : "0 6px 20px rgba(30,60,114,0.45)",
//                     transform  : "translateY(-1px)",
//                   },
//                   "&:active"   : { transform: "translateY(0)" },
//                   "&.Mui-disabled": { color: "#fff", background: "#a0b4d0" },
//                 }}
//               >
//                 {loading
//                   ? (mode === "add" ? "Saving..."   : "Updating...")
//                   : (mode === "add" ? "Save Settings" : "Update Settings")
//                 }
//               </Button>
//             )}
//           </Box>
//         </Box>
//       </Paper>
//     </Box>
//   );
// };

// export default MinimumOrderForm;











// src/webadm/features/minimumordermanagement/components/MinimumOrderForm.jsx

import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Paper,
  Divider,
  Alert,
  Chip,
  InputAdornment,
} from "@mui/material";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import SaveOutlinedIcon          from "@mui/icons-material/SaveOutlined";
import EditOutlinedIcon          from "@mui/icons-material/EditOutlined";
import CurrencyRupeeIcon         from "@mui/icons-material/CurrencyRupee";
import CheckCircleOutlineIcon    from "@mui/icons-material/CheckCircleOutline";
import InfoOutlinedIcon          from "@mui/icons-material/InfoOutlined";
import ShoppingCartOutlinedIcon  from "@mui/icons-material/ShoppingCartOutlined";
import LocalOfferOutlinedIcon    from "@mui/icons-material/LocalOfferOutlined";
import { minimumOrderAPI }       from "../minimumOrderAPI";

// ── localStorage keys ──────────────────────────────────────
const LS_MODE_KEY   = "mom_mode";
const LS_VALUES_KEY = "mom_values";

// ── helper: load saved values from localStorage ────────────
const loadSavedState = () => {
  try {
    const mode   = localStorage.getItem(LS_MODE_KEY) || "add";
    const values = localStorage.getItem(LS_VALUES_KEY);
    return {
      mode,
      savedValues: values ? JSON.parse(values) : null,
    };
  } catch {
    return { mode: "add", savedValues: null };
  }
};





const StatCard = ({ icon, label, value, color, bg }) => (
  <Box
    sx={{
      flex           : 1,
      minWidth       : 0,
      backgroundColor: bg,
      border         : `1px solid ${color}30`,
      borderRadius   : "12px",
      px             : { xs: 1.2, sm: 2 },
      py             : { xs: 1.2, sm: 2 },
      display        : "flex",
      alignItems     : "center",
      gap            : { xs: 0.8, sm: 1.5 },
    }}
  >
    <Box
      sx={{
        width         : { xs: 30, sm: 40 },
        height        : { xs: 30, sm: 40 },
        borderRadius  : "10px",
        backgroundColor: `${color}18`,
        display       : "flex",
        alignItems    : "center",
        justifyContent: "center",
        flexShrink    : 0,
      }}
    >
      {React.cloneElement(icon, {
        sx: { fontSize: { xs: 16, sm: 20 }, color },
      })}
    </Box>
    <Box sx={{ minWidth: 0, flex: 1 }}>
      <Typography
        fontSize={{ xs: "0.64rem", sm: "0.72rem" }}
        color="text.secondary"
        fontWeight={500}
        sx={{
          overflow    : "hidden",
          textOverflow: "ellipsis",
          whiteSpace  : { xs: "normal", sm: "nowrap" },
          lineHeight  : 1.3,
        }}
      >
        {label}
      </Typography>
      <Typography
        fontSize={{ xs: "0.92rem", sm: "1.15rem" }}
        fontWeight={800}
        color={color}
        lineHeight={1.2}
      >
        {value}
      </Typography>
    </Box>
  </Box>
);





const MinimumOrderForm = () => {

  const { mode: savedMode, savedValues } = loadSavedState();

  // ── state — all unchanged ──────────────────────────────────
  const [mode,           setMode]           = useState(savedMode);
  const [minOrderAmount, setMinOrderAmount] = useState(
    savedValues?.min_order_amount ?? ""
  );
  const [deliveryFee,    setDeliveryFee]    = useState(
    savedValues?.delivery_fee ?? ""
  );
  const [loading,        setLoading]        = useState(false);
  const [successMsg,     setSuccessMsg]     = useState("");
  const [errorMsg,       setErrorMsg]       = useState("");
  const [isEditing,      setIsEditing]      = useState(false);

  const isReadOnly = mode === "update" && !isEditing;

const getOrderFeeapi = async () => {
  try {
    const result = await minimumOrderAPI.fetchOrderFee();
    console.log("✅ fetchOrderFee response:", result);

    const fee = result?.data?.data?.[0]; // ✅ array-ல் முதல் item
    console.log("✅ fee:", fee);

    if (fee) {
      setMinOrderAmount(fee.min_order_amount ?? "");
      setDeliveryFee(fee.delivery_charge ?? "");  // ✅ delivery_charge (fee இல்ல)
      setMode("update");

      localStorage.setItem(LS_MODE_KEY, "update");
      localStorage.setItem(LS_VALUES_KEY, JSON.stringify({
        min_order_amount: fee.min_order_amount,
        delivery_fee    : fee.delivery_charge,   // ✅
      }));
    }
  } catch (error) {
    console.log("Invalid Error", error);
  }
};
  
    useEffect(() => {
      getOrderFeeapi();
    }, []);


  // ── validation — unchanged ─────────────────────────────────
  const validate = () => {
    if (!minOrderAmount || !deliveryFee) {
      setErrorMsg("Both fields are required.");
      return false;
    }
    if (Number(minOrderAmount) < 0) {
      setErrorMsg("Minimum order amount must be greater than 0.");
      return false;
    }
    if (Number(deliveryFee) < 0) {
      setErrorMsg("Delivery fee must be greater than 0.");
      return false;
    }
    return true;
  };

  // ── handle save — unchanged ────────────────────────────────
  const handleSave = async () => {
    setSuccessMsg("");
    setErrorMsg("");
    if (!validate()) return;
    setLoading(true);
    try {
      const payload = {
        min_order_amount: Number(minOrderAmount),
        delivery_fee    : Number(deliveryFee),
      };
      await minimumOrderAPI.addOrderFee(payload);
      localStorage.setItem(LS_MODE_KEY,   "update");
      localStorage.setItem(LS_VALUES_KEY, JSON.stringify(payload));
      setMode("update");
      setIsEditing(false);
      setSuccessMsg("Order fee saved successfully!");
    } catch (err) {
      console.error("addOrderFee failed:", err);
      setErrorMsg("Failed to save. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ── handle update — unchanged ──────────────────────────────
  const handleUpdate = async () => {
    setSuccessMsg("");
    setErrorMsg("");
    if (!validate()) return;
    setLoading(true);
    try {
      const payload = {
        min_order_amount: Number(minOrderAmount),
        delivery_fee    : Number(deliveryFee),
      };
      await minimumOrderAPI.updateOrderFee(payload);
      localStorage.setItem(LS_VALUES_KEY, JSON.stringify(payload));
      setIsEditing(false);
      setSuccessMsg("Order fee updated successfully!");
    } catch (err) {
      console.error("updateOrderFee failed:", err);
      setErrorMsg("Failed to update. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ── handle edit — unchanged ────────────────────────────────
  const handleEditClick = () => {
    setSuccessMsg("");
    setErrorMsg("");
    setIsEditing(true);
  };

  // ── handle cancel — unchanged ──────────────────────────────
  const handleCancelEdit = () => {
    if (savedValues) {
      setMinOrderAmount(savedValues.min_order_amount ?? "");
      setDeliveryFee(savedValues.delivery_fee ?? "");
    }
    setIsEditing(false);
    setSuccessMsg("");
    setErrorMsg("");
  };

  // ── clear messages after 4s — unchanged ───────────────────
  useEffect(() => {
    if (!successMsg && !errorMsg) return;
    const timer = setTimeout(() => {
      setSuccessMsg("");
      setErrorMsg("");
    }, 4000);
    return () => clearTimeout(timer);
  }, [successMsg, errorMsg]);

  // ── shared input sx ────────────────────────────────────────
  const inputSx = {
    "& .MuiOutlinedInput-root": {
      borderRadius   : "12px",
      backgroundColor: isReadOnly ? "#f7f9fc" : "#fff",
      fontSize       : { xs: "0.9rem", sm: "0.95rem" },
      "& fieldset"   : { borderColor: "#dde6f0" },
      "&:hover fieldset": {
        borderColor: isReadOnly ? "#dde6f0" : "#2a5298",
      },
      "&.Mui-focused fieldset": { borderColor: "#2a5298", borderWidth: 2 },
    },
    "& .MuiInputLabel-root": {
      fontSize: { xs: "0.85rem", sm: "0.9rem" },
    },
    "& .MuiInputLabel-root.Mui-focused": { color: "#2a5298" },
    "& .MuiFormHelperText-root": {
      fontSize: { xs: "0.7rem", sm: "0.72rem" },
    },
  };

  return (
    <Box>

      {/* ── Page Header ─────────────────────────────────────── */}
      {/* <Box
        sx={{
          display       : "flex",
          alignItems    : { xs: "flex-start", sm: "center" },
          flexDirection : { xs: "column", sm: "row" },
          justifyContent: "space-between",
          gap           : 1.5,
          mb            : { xs: 2.5, sm: 3 },
        }}
      > */}
        {/* <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}> */}
          {/* Icon bubble */}
          {/* <Box
            sx={{
              width          : { xs: 42, sm: 48 },
              height         : { xs: 42, sm: 48 },
              borderRadius   : "13px",
              background     : "linear-gradient(135deg, #1e3c72, #2a5298)",
              display        : "flex",
              alignItems     : "center",
              justifyContent : "center",
              flexShrink     : 0,
              boxShadow      : "0 4px 12px rgba(30,60,114,0.28)",
            }}
          >
            <LocalShippingOutlinedIcon
              sx={{ color: "#fff", fontSize: { xs: 22, sm: 24 } }}
            />
          </Box>
          <Box>
            <Typography
              variant="h5"
              fontWeight={800}
              fontSize={{ xs: "1.05rem", sm: "1.2rem", md: "1.35rem" }}
              color="#1a2e4a"
              lineHeight={1.2}
            >
              Minimum Order Management
            </Typography>
            <Typography
              fontSize={{ xs: "0.74rem", sm: "0.8rem" }}
              color="text.secondary"
              mt={0.3}
            >
              Configure delivery fee and free delivery threshold
            </Typography>
          </Box>
        </Box> */}

        {/* Status badge */}
        {/* <Chip
          icon={
            mode === "update"
              ? <CheckCircleOutlineIcon sx={{ fontSize: "14px !important" }} />
              : <InfoOutlinedIcon       sx={{ fontSize: "14px !important" }} />
          }
          label={mode === "update" ? "Configured" : "Not Configured"}
          size="small"
          sx={{
            backgroundColor: mode === "update" ? "#e8f5e9" : "#fff8e1",
            color          : mode === "update" ? "#2e7d32" : "#f57f17",
            fontWeight     : 700,
            fontSize       : "0.72rem",
            border         : `1px solid ${mode === "update" ? "#a5d6a7" : "#ffe082"}`,
            alignSelf      : { xs: "flex-start", sm: "center" },
            px             : 0.5,
          }}
        />
      </Box> */}


      {/* ── Page Header ─────────────────────────────────────── */}
<Box
  sx={{
    display      : "flex",
    flexDirection: "column",
    gap          : 1.5,
    mb           : { xs: 2.5, sm: 3 },
  }}
>
  {/* Top row — icon + title */}
  <Box sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
    {/* Icon bubble */}
    <Box
      sx={{
        width         : { xs: 38, sm: 48 },
        height        : { xs: 38, sm: 48 },
        borderRadius  : "13px",
        background    : "linear-gradient(135deg, #1e3c72, #2a5298)",
        display       : "flex",
        alignItems    : "center",
        justifyContent: "center",
        flexShrink    : 0,
        boxShadow     : "0 4px 12px rgba(30,60,114,0.28)",
      }}
    >
      <LocalShippingOutlinedIcon
        sx={{ color: "#fff", fontSize: { xs: 20, sm: 24 } }}
      />
    </Box>

    {/* Title + subtitle */}
    <Box sx={{ minWidth: 0 }}>
      <Typography
        variant="h5"
        fontWeight={800}
        fontSize={{ xs: "1rem", sm: "1.2rem", md: "1.35rem" }}
        color="#1a2e4a"
        lineHeight={1.2}
      >
        Minimum Order Management
      </Typography>
      <Typography
        fontSize={{ xs: "0.71rem", sm: "0.8rem" }}
        color="text.secondary"
        mt={0.3}
      >
        Configure delivery fee and free delivery threshold
      </Typography>
    </Box>
  </Box>

  {/* Status badge — always on its own row on xs */}
  <Box>
    <Chip
      icon={
        mode === "update"
          ? <CheckCircleOutlineIcon sx={{ fontSize: "14px !important" }} />
          : <InfoOutlinedIcon       sx={{ fontSize: "14px !important" }} />
      }
      label={mode === "update" ? "Configured" : "Not Configured"}
      size="small"
      sx={{
        backgroundColor: mode === "update" ? "#e8f5e9" : "#fff8e1",
        color          : mode === "update" ? "#2e7d32" : "#f57f17",
        fontWeight     : 700,
        fontSize       : "0.72rem",
        border         : `1px solid ${mode === "update" ? "#a5d6a7" : "#ffe082"}`,
        px             : 0.5,
      }}
    />
  </Box>
</Box>



      {/* ── Stat Cards — only when configured ─────────────── */}
      {mode === "update" && minOrderAmount && deliveryFee && (
        <Box
          sx={{
            display: "flex",
            gap    : { xs: 1.5, sm: 2 },
            mb     : { xs: 2.5, sm: 3 },
            flexDirection: { xs: "row" },
          }}
        >
          <StatCard
            icon={<ShoppingCartOutlinedIcon />}
            label="Min. Order Amount"
            value={`₹${minOrderAmount}`}
            color="#1e3c72"
            bg="#f0f4ff"
          />
          <StatCard
            icon={<LocalShippingOutlinedIcon />}
            label="Delivery Fee"
            value={`₹${deliveryFee}`}
            color="#e65100"
            bg="#fff4ef"
          />
        </Box>
      )}

      {/* ── Main Card ──────────────────────────────────────── */}
      <Paper
        elevation={0}
        sx={{
          borderRadius: "18px",
          border      : "1px solid #e2ecf4",
          overflow    : "hidden",
          boxShadow   : "0 4px 24px rgba(30,60,114,0.08)",
        }}
      >
        {/* Card header */}
        <Box
          sx={{
            background    : "linear-gradient(90deg, #1e3c72 0%, #2a5298 60%, #3461b8 100%)",
            px            : { xs: 2.5, sm: 3 },
            py            : { xs: 2, sm: 2.5 },
            display       : "flex",
            alignItems    : "center",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
            <LocalShippingOutlinedIcon
              sx={{
                color   : "rgba(255,255,255,0.9)",
                fontSize: { xs: 18, sm: 20 },
              }}
            />
            <Typography
              fontWeight={700}
              fontSize={{ xs: "0.88rem", sm: "0.98rem" }}
              color="#fff"
              letterSpacing={0.3}
            >
              Delivery Fee Settings
            </Typography>
          </Box>

          {/* Edit button — read-only mode only */}
          {isReadOnly && (
            <Button
              size="small"
              startIcon={<EditOutlinedIcon sx={{ fontSize: "14px !important" }} />}
              onClick={handleEditClick}
              sx={{
                color         : "#fff",
                border        : "1px solid rgba(255,255,255,0.4)",
                borderRadius  : "8px",
                textTransform : "none",
                fontSize      : { xs: "0.72rem", sm: "0.78rem" },
                fontWeight    : 600,
                px            : { xs: 1.2, sm: 1.8 },
                py            : 0.6,
                backdropFilter: "blur(4px)",
                "&:hover"     : {
                  backgroundColor: "rgba(255,255,255,0.15)",
                  borderColor    : "rgba(255,255,255,0.7)",
                },
              }}
            >
              Edit
            </Button>
          )}
        </Box>

        {/* Card body */}
        <Box sx={{ px: { xs: 2, sm: 3 }, py: { xs: 2.5, sm: 3 } }}>

          {/* Info note */}
          <Box
            sx={{
              display        : "flex",
              alignItems     : "flex-start",
              gap            : 1,
              backgroundColor: isEditing ? "#fff8e1" : "#f0f6ff",
              border         : `1px solid ${isEditing ? "#ffe082" : "#d0e4f7"}`,
              borderRadius   : "10px",
              px             : { xs: 1.5, sm: 2 },
              py             : 1.4,
              mb             : 3,
            }}
          >
            <InfoOutlinedIcon
              sx={{
                fontSize : 15,
                color    : isEditing ? "#f57f17" : "#2a5298",
                mt       : 0.2,
                flexShrink: 0,
              }}
            />
            <Typography
              fontSize={{ xs: "0.74rem", sm: "0.79rem" }}
              color={isEditing ? "#7a4f00" : "#2a5298"}
              lineHeight={1.65}
            >
              {mode === "add"
                ? "Set the minimum order amount and delivery fee. Once saved, customers will be charged the delivery fee if their order is below the minimum amount."
                : isEditing
                  ? "You are editing the current settings. Make your changes and click Update to apply them."
                  : "These values are currently active. Customers are charged the delivery fee for orders below the minimum amount."
              }
            </Typography>
          </Box>

          {/* ── Input fields ──────────────────────────────────── */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>

            {/* Minimum Order Amount */}
            <TextField
              label="Minimum Order Amount"
              type="number"
              fullWidth
              value={minOrderAmount}
              onChange={(e) => setMinOrderAmount(e.target.value)}
              onWheel={(e) => e.target.blur()}  
              disabled={isReadOnly || loading}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Box
                      sx={{
                        display       : "flex",
                        alignItems    : "center",
                        justifyContent: "center",
                        width         : 28,
                        height        : 28,
                        borderRadius  : "8px",
                        backgroundColor: isReadOnly ? "#f0f0f0" : "#eef2ff",
                      }}
                    >
                      <CurrencyRupeeIcon
                        sx={{
                          fontSize: 15,
                          color   : isReadOnly ? "#9e9e9e" : "#2a5298",
                        }}
                      />
                    </Box>
                  </InputAdornment>
                ),
                inputProps: { min: 1 },
              }}
              helperText="Orders below this amount will be charged a delivery fee"
              sx={inputSx}
            />

            {/* Delivery Fee */}
            <TextField
              label="Delivery Fee"
              type="number"
              fullWidth
              value={deliveryFee}
              onChange={(e) => setDeliveryFee(e.target.value)}
              onWheel={(e) => e.target.blur()}
              disabled={isReadOnly || loading}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Box
                      sx={{
                        display       : "flex",
                        alignItems    : "center",
                        justifyContent: "center",
                        width         : 28,
                        height        : 28,
                        borderRadius  : "8px",
                        backgroundColor: isReadOnly ? "#f0f0f0" : "#fff4ef",
                      }}
                    >
                      <LocalShippingOutlinedIcon
                        sx={{
                          fontSize: 15,
                          color   : isReadOnly ? "#9e9e9e" : "#e65100",
                        }}
                      />
                    </Box>
                  </InputAdornment>
                ),
                inputProps: { min: 1 },
              }}
              helperText="This fee will be added to orders below the minimum amount"
              sx={inputSx}
            />
          </Box>

          {/* ── Live Preview — only when values filled ─────────── */}
          {Number(minOrderAmount) > 0 && Number(deliveryFee) > 0 && (
            <Box
              sx={{
                mt             : 3,
                backgroundColor: "#f4faf4",
                border         : "1px solid #c8e6c9",
                borderRadius   : "12px",
                px             : { xs: 2, sm: 2.5 },
                py             : { xs: 1.5, sm: 2 },
              }}
            >
              {/* Preview header */}
              <Box
                sx={{
                  display    : "flex",
                  alignItems : "center",
                  gap        : 0.8,
                  mb         : 1.2,
                }}
              >
                <LocalOfferOutlinedIcon
                  sx={{ fontSize: 15, color: "#2e7d32" }}
                />
                <Typography
                  fontSize={{ xs: "0.75rem", sm: "0.8rem" }}
                  fontWeight={700}
                  color="#2e7d32"
                >
                  Live Preview
                </Typography>
              </Box>

              {/* Two rule rows */}
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>

                {/* Rule 1 — delivery charged */}
                <Box
                  sx={{
                    display        : "flex",
                    alignItems     : "center",
                    gap            : 1,
                    backgroundColor: "#fff",
                    border         : "1px solid #e8f5e9",
                    borderRadius   : "8px",
                    px             : 1.5,
                    py             : 1,
                  }}
                >
                  <Box
                    sx={{
                      width         : 8,
                      height        : 8,
                      borderRadius  : "50%",
                      backgroundColor: "#e65100",
                      flexShrink    : 0,
                    }}
                  />
                  <Typography
                    fontSize={{ xs: "0.73rem", sm: "0.78rem" }}
                    color="#4a4a4a"
                    lineHeight={1.5}
                  >
                    Orders{" "}
                    <Typography
                      component="span"
                      fontWeight={700}
                      fontSize="inherit"
                      color="#e65100"
                    >
                      below ₹{minOrderAmount}
                    </Typography>
                    {" → "}
                    <Typography
                      component="span"
                      fontWeight={700}
                      fontSize="inherit"
                      color="#e65100"
                    >
                      ₹{deliveryFee} delivery fee
                    </Typography>{" "}
                    will be charged
                  </Typography>
                </Box>

                {/* Rule 2 — free delivery */}
                <Box
                  sx={{
                    display        : "flex",
                    alignItems     : "center",
                    gap            : 1,
                    backgroundColor: "#fff",
                    border         : "1px solid #e8f5e9",
                    borderRadius   : "8px",
                    px             : 1.5,
                    py             : 1,
                  }}
                >
                  <Box
                    sx={{
                      width         : 8,
                      height        : 8,
                      borderRadius  : "50%",
                      backgroundColor: "#2e7d32",
                      flexShrink    : 0,
                    }}
                  />
                  <Typography
                    fontSize={{ xs: "0.73rem", sm: "0.78rem" }}
                    color="#4a4a4a"
                    lineHeight={1.5}
                  >
                    Orders{" "}
                    <Typography
                      component="span"
                      fontWeight={700}
                      fontSize="inherit"
                      color="#2e7d32"
                    >
                      ₹{minOrderAmount} and above
                    </Typography>
                    {" → "}
                    <Typography
                      component="span"
                      fontWeight={700}
                      fontSize="inherit"
                      color="#2e7d32"
                    >
                      FREE delivery
                    </Typography>
                  </Typography>
                </Box>

              </Box>
            </Box>
          )}

          {/* ── Success / Error alerts ─────────────────────────── */}
          {successMsg && (
            <Alert
              severity="success"
              sx={{
                mt          : 2.5,
                borderRadius: "10px",
                fontSize    : { xs: "0.76rem", sm: "0.8rem" },
              }}
            >
              {successMsg}
            </Alert>
          )}
          {errorMsg && (
            <Alert
              severity="error"
              sx={{
                mt          : 2.5,
                borderRadius: "10px",
                fontSize    : { xs: "0.76rem", sm: "0.8rem" },
              }}
            >
              {errorMsg}
            </Alert>
          )}

          <Divider sx={{ my: { xs: 2.5, sm: 3 }, borderColor: "#eef2f7" }} />

          {/* ── Action buttons ─────────────────────────────────── */}
          <Box
            sx={{
              display       : "flex",
              gap           : 1.5,
              flexDirection : { xs: "column", sm: "row" },
              justifyContent: "flex-end",
            }}
          >
            {/* Cancel — only when editing in update mode */}
            {mode === "update" && isEditing && (
              <Button
                variant="outlined"
                onClick={handleCancelEdit}
                disabled={loading}
                sx={{
                  borderRadius : "10px",
                  textTransform: "none",
                  fontWeight   : 600,
                  fontSize     : { xs: "0.82rem", sm: "0.88rem" },
                  px           : { xs: 2, sm: 3 },
                  py           : 1.3,
                  borderColor  : "#c0cfe0",
                  color        : "#5a6a7a",
                  width        : { xs: "100%", sm: "auto" },
                  "&:hover"    : {
                    borderColor    : "#a0b0c0",
                    backgroundColor: "#f5f8fc",
                  },
                }}
              >
                Cancel
              </Button>
            )}

            {/* Save / Update button */}
            {!isReadOnly && (
              <Button
                variant="contained"
                onClick={mode === "add" ? handleSave : handleUpdate}
                disabled={loading}
                startIcon={
                  loading
                    ? <CircularProgress size={15} sx={{ color: "#fff" }} />
                    : mode === "add"
                      ? <SaveOutlinedIcon sx={{ fontSize: "16px !important" }} />
                      : <EditOutlinedIcon sx={{ fontSize: "16px !important" }} />
                }
                sx={{
                  background   : "linear-gradient(135deg, #1e3c72 0%, #2a5298 50%, #3461b8 100%)",
                  fontWeight   : 700,
                  fontSize     : { xs: "0.84rem", sm: "0.9rem" },
                  textTransform: "none",
                  py           : 1.4,
                  px           : { xs: 2.5, sm: 3.5 },
                  borderRadius : "10px",
                  width        : { xs: "100%", sm: "auto" },
                  minWidth     : { sm: 160 },
                  boxShadow    : "0 4px 14px rgba(30,60,114,0.32)",
                  transition   : "all 0.2s ease",
                  "&:hover"    : {
                    background : "linear-gradient(135deg, #163057, #1e3d7a)",
                    boxShadow  : "0 6px 20px rgba(30,60,114,0.42)",
                    transform  : "translateY(-1px)",
                  },
                  "&:active"      : { transform: "translateY(0)" },
                  "&.Mui-disabled": { color: "#fff", background: "#a0b4d0" },
                }}
              >
                {loading
                  ? (mode === "add" ? "Saving..."        : "Updating...")
                  : (mode === "add" ? "Save Settings"    : "Update Settings")
                }
              </Button>
            )}
          </Box>

        </Box>
      </Paper>
    </Box>
  );
};

export default MinimumOrderForm;

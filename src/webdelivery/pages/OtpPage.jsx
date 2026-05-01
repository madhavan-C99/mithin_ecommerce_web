// // // 📁 src/webdelivery/pages/OtpPage.jsx

// // import {
// //   Box,
// //   Typography,
// //   TextField,
// //   Button,
// //   CircularProgress,
// //   Alert,
// // } from "@mui/material";
// // import LockRoundedIcon from "@mui/icons-material/LockRounded";
// // import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
// // import LocalShippingRoundedIcon from "@mui/icons-material/LocalShippingRounded";
// // import { useState } from "react";
// // import { useLocation, useNavigate } from "react-router-dom";
// // import deliveryAxios from "../api/Axios";
// // import useDeliveryAuth from "../hooks/useDeliveryAuth";

// // /**
// //  * OtpPage
// //  *
// //  * Navigated to from ActiveOrderCard when "Reached Location" is clicked.
// //  * Receives order_id via router state.
// //  *
// //  * Flow:
// //  * 1. Delivery boy enters OTP given by customer
// //  * 2. Clicks "Verify OTP"
// //  * 3. API: POST /adm/verify_otp_for_deliver_order
// //  *    Payload: { order_id, otp, delivery_boy_id }
// //  * 4. On success → show success state on same page
// //  * 5. On failure → show error, allow retry
// //  */

// // const verifyDeliveryOtp = async (order_id, otp, delivery_boy_id) => {
// //   return await deliveryAxios.post("/adm/verify_otp_for_deliver_order", {
// //     order_id,
// //     otp,
// //     delivery_boy_id,
// //   });
// // };

// // const OtpPage = () => {
// //   const location = useLocation();
// //   const navigate = useNavigate();
// //   const { deliveryBoy } = useDeliveryAuth();

// //   const order_id = location.state?.order_id;

// //   const [otp, setOtp] = useState("");
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState("");
// //   const [isSuccess, setIsSuccess] = useState(false);

// //   const handleChange = (e) => {
// //     setError("");
// //     // Allow digits only, max 6 chars
// //     const val = e.target.value.replace(/\D/g, "").slice(0, 6);
// //     setOtp(val);
// //   };

// //   const handleVerify = async () => {
// //     if (otp.length < 4) {
// //       setError("Please enter a valid OTP.");
// //       return;
// //     }

// //     setLoading(true);
// //     setError("");

// //     try {
// //       await verifyDeliveryOtp(order_id, otp, deliveryBoy?.user_id);
// //       setIsSuccess(true);
// //     } catch (err) {
// //       setError(err.message || "OTP verification failed. Please try again.");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // ── Success State ──
// //   if (isSuccess) {
// //     return (
// //       <Box
// //         sx={{
// //           display: "flex",
// //           alignItems: "center",
// //           justifyContent: "center",
// //           minHeight: "60vh",
// //         }}
// //       >
// //         <Box
// //           sx={{
// //             backgroundColor: "#FFFFFF",
// //             borderRadius: "24px",
// //             border: "1px solid #E2E8F0",
// //             p: { xs: 4, md: 6 },
// //             textAlign: "center",
// //             maxWidth: 440,
// //             width: "100%",
// //             boxShadow: "0 8px 32px rgba(0,0,0,0.06)",
// //           }}
// //         >
// //           <Box
// //             sx={{
// //               width: 80,
// //               height: 80,
// //               borderRadius: "50%",
// //               background: "linear-gradient(135deg, #22C55E 0%, #16A34A 100%)",
// //               display: "flex",
// //               alignItems: "center",
// //               justifyContent: "center",
// //               mx: "auto",
// //               mb: 3,
// //               boxShadow: "0 8px 24px rgba(34,197,94,0.3)",
// //             }}
// //           >
// //             <CheckCircleRoundedIcon sx={{ color: "#fff", fontSize: 44 }} />
// //           </Box>
// //           <Typography sx={{ fontWeight: 800, color: "#0F172A", fontSize: "1.4rem", mb: 1 }}>
// //             Delivery Complete!
// //           </Typography>
// //           <Typography
// //             sx={{
// //               color: "#64748B",
// //               fontSize: "0.9rem",
// //               lineHeight: 1.6,
// //               mb: 1,
// //             }}
// //           >
// //             Order #{order_id} has been delivered successfully.
// //           </Typography>
// //           <Typography sx={{ color: "#94A3B8", fontSize: "0.82rem", mb: 4 }}>
// //             OTP Verified Successfully.
// //           </Typography>
// //           <Button
// //             onClick={() => navigate("/delivery/dashboard")}
// //             variant="contained"
// //             fullWidth
// //             sx={{
// //               borderRadius: "12px",
// //               background: "linear-gradient(135deg, #F97316 0%, #EA580C 100%)",
// //               fontWeight: 700,
// //               py: 1.4,
// //               textTransform: "none",
// //               fontSize: "0.95rem",
// //               "&:hover": {
// //                 background: "linear-gradient(135deg, #FB923C 0%, #F97316 100%)",
// //                 boxShadow: "0 6px 20px rgba(249,115,22,0.35)",
// //               },
// //             }}
// //           >
// //             Back to Dashboard
// //           </Button>
// //         </Box>
// //       </Box>
// //     );
// //   }

// //   // ── OTP Entry State ──
// //   return (
// //     <Box
// //       sx={{
// //         display: "flex",
// //         alignItems: "center",
// //         justifyContent: "center",
// //         minHeight: "60vh",
// //       }}
// //     >
// //       <Box
// //         sx={{
// //           backgroundColor: "#FFFFFF",
// //           borderRadius: "24px",
// //           border: "1px solid #E2E8F0",
// //           p: { xs: 3, md: 5 },
// //           maxWidth: 440,
// //           width: "100%",
// //           boxShadow: "0 8px 32px rgba(0,0,0,0.06)",
// //         }}
// //       >
// //         {/* Header */}
// //         <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 3 }}>
// //           <Box
// //             sx={{
// //               width: 48,
// //               height: 48,
// //               borderRadius: "14px",
// //               background: "linear-gradient(135deg, #F97316 0%, #EA580C 100%)",
// //               display: "flex",
// //               alignItems: "center",
// //               justifyContent: "center",
// //               flexShrink: 0,
// //             }}
// //           >
// //             <LocalShippingRoundedIcon sx={{ color: "#fff", fontSize: 26 }} />
// //           </Box>
// //           <Box>
// //             <Typography sx={{ fontWeight: 800, color: "#0F172A", fontSize: "1.15rem", lineHeight: 1.2 }}>
// //               Verify Delivery OTP
// //             </Typography>
// //             <Typography sx={{ color: "#64748B", fontSize: "0.8rem" }}>
// //               Order #{order_id}
// //             </Typography>
// //           </Box>
// //         </Box>

// //         <Typography sx={{ color: "#475569", fontSize: "0.875rem", mb: 3, lineHeight: 1.6 }}>
// //           Ask the customer for the OTP sent to their registered mobile number and enter it below to confirm delivery.
// //         </Typography>

// //         {/* Error */}
// //         {error && (
// //           <Alert
// //             severity="error"
// //             sx={{
// //               mb: 2.5,
// //               borderRadius: "10px",
// //               backgroundColor: "rgba(239,68,68,0.08)",
// //               color: "#B91C1C",
// //               border: "1px solid rgba(239,68,68,0.2)",
// //               "& .MuiAlert-icon": { color: "#EF4444" },
// //             }}
// //           >
// //             {error}
// //           </Alert>
// //         )}

// //         {/* OTP Input */}
// //         <Box sx={{ mb: 1 }}>
// //           <Typography
// //             sx={{
// //               color: "#64748B",
// //               fontSize: "0.78rem",
// //               fontWeight: 700,
// //               mb: 0.8,
// //               letterSpacing: "0.04em",
// //               textTransform: "uppercase",
// //             }}
// //           >
// //             Enter OTP
// //           </Typography>
// //           <TextField
// //             fullWidth
// //             value={otp}
// //             onChange={handleChange}
// //             placeholder="Enter OTP"
// //             disabled={loading}
// //             inputProps={{
// //               maxLength: 6,
// //               inputMode: "numeric",
// //               style: {
// //                 textAlign: "center",
// //                 fontSize: "1.6rem",
// //                 fontWeight: 800,
// //                 letterSpacing: "0.3em",
// //                 color: "#0F172A",
// //               },
// //             }}
// //             InputProps={{
// //               startAdornment: (
// //                 <LockRoundedIcon sx={{ color: "#94A3B8", fontSize: 20, mr: 1 }} />
// //               ),
// //               sx: {
// //                 borderRadius: "12px",
// //                 backgroundColor: "#F8FAFC",
// //                 "& fieldset": { borderColor: "#E2E8F0" },
// //                 "&:hover fieldset": { borderColor: "#F97316" },
// //                 "&.Mui-focused fieldset": { borderColor: "#F97316" },
// //               },
// //             }}
// //           />
// //         </Box>

// //         {/* Verify button */}
// //         <Button
// //           onClick={handleVerify}
// //           fullWidth
// //           variant="contained"
// //           disabled={loading || otp.length < 4}
// //           sx={{
// //             mt: 3,
// //             borderRadius: "12px",
// //             background: "linear-gradient(135deg, #F97316 0%, #EA580C 100%)",
// //             fontWeight: 700,
// //             py: 1.5,
// //             textTransform: "none",
// //             fontSize: "0.95rem",
// //             "&:hover": {
// //               background: "linear-gradient(135deg, #FB923C 0%, #F97316 100%)",
// //               boxShadow: "0 6px 20px rgba(249,115,22,0.35)",
// //             },
// //             "&.Mui-disabled": {
// //               background: "rgba(249,115,22,0.3)",
// //               color: "rgba(255,255,255,0.5)",
// //             },
// //           }}
// //         >
// //           {loading ? (
// //             <CircularProgress size={22} sx={{ color: "rgba(255,255,255,0.7)" }} />
// //           ) : (
// //             "Verify OTP"
// //           )}
// //         </Button>

// //         {/* Back link */}
// //         <Typography
// //           onClick={() => navigate("/delivery/orders")}
// //           sx={{
// //             textAlign: "center",
// //             color: "#94A3B8",
// //             fontSize: "0.8rem",
// //             mt: 2.5,
// //             cursor: "pointer",
// //             "&:hover": { color: "#F97316" },
// //             transition: "color 0.2s",
// //           }}
// //         >
// //           ← Back to Current Orders
// //         </Typography>
// //       </Box>
// //     </Box>
// //   );
// // };

// // export default OtpPage;












// // 📁 src/webdelivery/pages/OtpPage.jsx

// import { Box, Typography, Button, CircularProgress } from "@mui/material";
// import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
// import LocalShippingRoundedIcon from "@mui/icons-material/LocalShippingRounded";
// import LockRoundedIcon from "@mui/icons-material/LockRounded";
// import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
// import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
// import ErrorOutlineRoundedIcon from "@mui/icons-material/ErrorOutlineRounded";
// import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
// import { useState, useRef, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import deliveryAxios from "../api/Axios";
// import useDeliveryAuth from "../hooks/useDeliveryAuth";

// /**
//  * OtpPage
//  *
//  * Navigated to from ActiveOrderCard when "Reached Location" is clicked.
//  * Receives order_id via router state.
//  *
//  * Flow:
//  * 1. Delivery boy enters OTP given by customer
//  * 2. Clicks "Verify OTP"
//  * 3. API: POST /adm/verify_otp_for_deliver_order
//  *    Payload: { order_id, otp, delivery_boy_id }
//  * 4. On success → show success state on same page
//  * 5. On failure → show error, allow retry
//  */

// const verifyDeliveryOtp = async (order_id, otp, delivery_boy_id) => {
//   return await deliveryAxios.post("/adm/verify_otp_for_deliver_order", {
//     order_id,
//     otp,
//     delivery_boy_id,
//   });
// };

// const OTP_LENGTH = 6;

// // ── Blinking cursor shown in active empty box ──
// const BlinkCursor = () => (
//   <Box
//     sx={{
//       width: "2px",
//       height: "26px",
//       backgroundColor: "#F97316",
//       borderRadius: "2px",
//       animation: "otpBlink 0.9s step-end infinite",
//       "@keyframes otpBlink": {
//         "0%, 100%": { opacity: 1 },
//         "50%": { opacity: 0 },
//       },
//     }}
//   />
// );

// // ── Individual OTP digit box ──
// const OtpBox = ({ value, isActive, isFilled, isError }) => (
//   <Box
//     sx={{
//       width: { xs: 46, sm: 52 },
//       height: { xs: 56, sm: 62 },
//       borderRadius: "12px",
//       border: "2px solid",
//       borderColor: isError
//         ? "#EF4444"
//         : isActive
//         ? "#F97316"
//         : isFilled
//         ? "#F97316"
//         : "#E5E7EB",
//       backgroundColor: isError
//         ? "#FEF2F2"
//         : isActive || isFilled
//         ? "#FFFFFF"
//         : "#F9FAFB",
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "center",
//       fontSize: { xs: "1.25rem", sm: "1.4rem" },
//       fontWeight: 800,
//       color: isError ? "#EF4444" : isFilled ? "#F97316" : "#111827",
//       boxShadow: isActive ? "0 0 0 3px rgba(249,115,22,0.15)" : "none",
//       transition: "border-color 0.15s, box-shadow 0.15s, background-color 0.15s",
//       cursor: "text",
//       userSelect: "none",
//       flexShrink: 0,
//     }}
//   >
//     {value ? value : isActive ? <BlinkCursor /> : ""}
//   </Box>
// );

// const OtpPage = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { deliveryBoy } = useDeliveryAuth();

//   const order_id = location.state?.order_id;

//   // ── Original state (untouched) ──
//   const [otp, setOtp] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [isSuccess, setIsSuccess] = useState(false);

//   const hiddenInputRef = useRef(null);

//   // Auto-focus the hidden input on mount
//   useEffect(() => {
//     hiddenInputRef.current?.focus();
//   }, []);

//   // ── Original handler (untouched logic) ──
//   const handleChange = (e) => {
//     setError("");
//     const val = e.target.value.replace(/\D/g, "").slice(0, OTP_LENGTH);
//     setOtp(val);
//   };

//   // ── Original handler (untouched logic) ──
//   const handleVerify = async () => {
//     if (otp.length < 4) {
//       setError("Please enter the complete OTP.");
//       return;
//     }
//     setLoading(true);
//     setError("");
//     try {
//       await verifyDeliveryOtp(order_id, otp, deliveryBoy?.user_id);
//       setIsSuccess(true);
//     } catch (err) {
//       setError(err.message || "OTP verification failed. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const focusInput = () => hiddenInputRef.current?.focus();

//   // ── Success State ──
//   if (isSuccess) {
//     return (
//       <Box
//         sx={{
//           minHeight: { xs: "calc(100vh - 120px)", md: "70vh" },
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           px: { xs: 2, sm: 3 },
//           py: 4,
//           backgroundColor: "#F4F6F9",
//         }}
//       >
//         <Box
//           sx={{
//             background: "#FFFFFF",
//             borderRadius: "20px",
//             border: "1px solid #E5E7EB",
//             p: { xs: "2rem 1.5rem", sm: "2.5rem 2rem" },
//             width: "100%",
//             maxWidth: 480,
//             textAlign: "center",
//           }}
//         >
//           {/* Success icon */}
//           <Box
//             sx={{
//               width: 76,
//               height: 76,
//               borderRadius: "50%",
//               background: "#F0FDF4",
//               border: "2px solid rgba(34,197,94,0.2)",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               mx: "auto",
//               mb: 2.5,
//             }}
//           >
//             <CheckCircleRoundedIcon sx={{ color: "#22C55E", fontSize: 42 }} />
//           </Box>

//           <Typography
//             sx={{
//               fontWeight: 800,
//               fontSize: { xs: "1.2rem", sm: "1.35rem" },
//               color: "#111827",
//               mb: 0.75,
//             }}
//           >
//             Delivery confirmed!
//           </Typography>

//           <Typography
//             sx={{
//               fontSize: { xs: "0.82rem", sm: "0.88rem" },
//               color: "#6B7280",
//               lineHeight: 1.65,
//               mb: 1.5,
//             }}
//           >
//             Order #{order_id} has been successfully
//             <br />
//             delivered to the customer.
//           </Typography>

//           {/* Verified pill */}
//           <Box sx={{ display: "flex", justifyContent: "center", mb: 3.5 }}>
//             <Box
//               sx={{
//                 display: "inline-flex",
//                 alignItems: "center",
//                 gap: 0.6,
//                 fontSize: "0.75rem",
//                 fontWeight: 600,
//                 color: "#15803D",
//                 background: "#F0FDF4",
//                 border: "1px solid rgba(34,197,94,0.25)",
//                 borderRadius: "999px",
//                 px: 1.5,
//                 py: 0.5,
//               }}
//             >
//               <CheckCircleRoundedIcon sx={{ fontSize: 13 }} />
//               OTP verified successfully
//             </Box>
//           </Box>

//           <Button
//             onClick={() => navigate("/delivery/dashboard")}
//             fullWidth
//             variant="contained"
//             endIcon={<ArrowForwardRoundedIcon />}
//             sx={{
//               borderRadius: "13px",
//               backgroundColor: "#111827",
//               fontWeight: 800,
//               py: { xs: 1.4, sm: 1.6 },
//               fontSize: { xs: "0.88rem", sm: "0.95rem" },
//               textTransform: "none",
//               boxShadow: "none",
//               "&:hover": { backgroundColor: "#1F2937", boxShadow: "none" },
//             }}
//           >
//             Go to dashboard
//           </Button>
//         </Box>
//       </Box>
//     );
//   }

//   // ── OTP Entry State ──
//   return (
//     <Box
//       sx={{
//         minHeight: { xs: "calc(100vh - 120px)", md: "70vh" },
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         justifyContent: "center",
//         px: { xs: 2, sm: 3 },
//         py: 4,
//         backgroundColor: "#F4F6F9",
//       }}
//     >
//       {/* ── Context bar ── */}
//       <Box
//         sx={{
//           display: "flex",
//           alignItems: "center",
//           gap: 1.5,
//           background: "#FFFFFF",
//           border: "1px solid #E5E7EB",
//           borderRadius: "12px",
//           p: "12px 16px",
//           width: "100%",
//           maxWidth: 480,
//           mb: 2,
//         }}
//       >
//         <Box
//           sx={{
//             width: 36,
//             height: 36,
//             borderRadius: "8px",
//             background: "#FFF3EA",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             flexShrink: 0,
//           }}
//         >
//           <LocalShippingRoundedIcon sx={{ color: "#F97316", fontSize: 20 }} />
//         </Box>

//         <Box>
//           <Typography sx={{ fontSize: "11px", fontWeight: 500, color: "#9CA3AF", mb: "1px" }}>
//             Current delivery
//           </Typography>
//           <Typography sx={{ fontSize: "14px", fontWeight: 700, color: "#111827" }}>
//             Order #{order_id}
//           </Typography>
//         </Box>

//         {/* At location badge */}
//         <Box
//           sx={{
//             ml: "auto",
//             display: "flex",
//             alignItems: "center",
//             gap: 0.6,
//             fontSize: "12px",
//             fontWeight: 600,
//             color: "#F97316",
//             background: "#FFF3EA",
//             border: "1px solid rgba(249,115,22,0.2)",
//             borderRadius: "999px",
//             px: 1.25,
//             py: 0.5,
//             whiteSpace: "nowrap",
//           }}
//         >
//           <Box
//             sx={{ width: 6, height: 6, borderRadius: "50%", background: "#F97316" }}
//           />
//           At location
//         </Box>
//       </Box>

//       {/* ── Main card ── */}
//       <Box
//         sx={{
//           background: "#FFFFFF",
//           borderRadius: "20px",
//           border: "1px solid #E5E7EB",
//           p: { xs: "1.5rem", sm: "1.75rem 2rem" },
//           width: "100%",
//           maxWidth: 480,
//         }}
//       >
//         {/* Card header */}
//         <Box
//           sx={{
//             textAlign: "center",
//             pb: 2.5,
//             mb: 2.5,
//             borderBottom: "1px solid #F3F4F6",
//           }}
//         >
//           <Box
//             sx={{
//               width: 60,
//               height: 60,
//               borderRadius: "50%",
//               background: "#FFF3EA",
//               border: "2px solid rgba(249,115,22,0.15)",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               mx: "auto",
//               mb: 1.75,
//             }}
//           >
//             <LockRoundedIcon sx={{ color: "#F97316", fontSize: 26 }} />
//           </Box>

//           <Typography
//             sx={{
//               fontWeight: 800,
//               fontSize: { xs: "1.05rem", sm: "1.15rem" },
//               color: "#111827",
//               mb: 0.5,
//             }}
//           >
//             Enter customer OTP
//           </Typography>
//           <Typography sx={{ fontSize: "13px", color: "#6B7280", lineHeight: 1.6 }}>
//             Ask the customer for the OTP sent
//             <br />
//             to their registered mobile number.
//           </Typography>
//         </Box>

//         {/* Info hint */}
//         <Box
//           sx={{
//             display: "flex",
//             alignItems: "flex-start",
//             gap: 1,
//             background: "#F9FAFB",
//             border: "1px solid #E5E7EB",
//             borderRadius: "10px",
//             p: "11px 13px",
//             mb: 2.5,
//           }}
//         >
//           <InfoOutlinedIcon sx={{ fontSize: 16, color: "#9CA3AF", mt: "2px", flexShrink: 0 }} />
//           <Typography sx={{ fontSize: "12.5px", color: "#6B7280", lineHeight: 1.55 }}>
//             The customer received a{" "}
//             <Box component="span" sx={{ fontWeight: 700, color: "#374151" }}>
//               6-digit code
//             </Box>{" "}
//             via SMS. It expires soon — verify promptly.
//           </Typography>
//         </Box>

//         {/* OTP label */}
//         <Typography
//           sx={{
//             fontSize: "11px",
//             fontWeight: 700,
//             letterSpacing: "0.06em",
//             textTransform: "uppercase",
//             color: "#9CA3AF",
//             mb: 1,
//           }}
//         >
//           OTP Code
//         </Typography>

//         {/* OTP boxes + hidden real input */}
//         <Box
//           onClick={focusInput}
//           sx={{
//             display: "flex",
//             gap: { xs: "7px", sm: "9px" },
//             justifyContent: "center",
//             mb: 2,
//             cursor: "text",
//             position: "relative",
//           }}
//         >
//           {Array.from({ length: OTP_LENGTH }).map((_, i) => (
//             <OtpBox
//               key={i}
//               value={otp[i] || ""}
//               isActive={i === otp.length && !loading}
//               isFilled={i < otp.length}
//               isError={!!error && i < otp.length}
//             />
//           ))}

//           {/* Hidden real input — captures all keyboard input */}
//           <Box
//             component="input"
//             ref={hiddenInputRef}
//             value={otp}
//             onChange={handleChange}
//             disabled={loading}
//             type="text"
//             inputMode="numeric"
//             autoComplete="one-time-code"
//             maxLength={OTP_LENGTH}
//             sx={{
//               position: "absolute",
//               opacity: 0,
//               width: "1px",
//               height: "1px",
//               pointerEvents: "none",
//               border: "none",
//               outline: "none",
//             }}
//           />
//         </Box>

//         {/* Error message */}
//         {error && (
//           <Box
//             sx={{
//               display: "flex",
//               alignItems: "center",
//               gap: 1,
//               background: "#FEF2F2",
//               border: "1px solid rgba(239,68,68,0.2)",
//               borderRadius: "9px",
//               p: "10px 13px",
//               mb: 2,
//             }}
//           >
//             <ErrorOutlineRoundedIcon sx={{ fontSize: 16, color: "#EF4444", flexShrink: 0 }} />
//             <Typography sx={{ fontSize: "13px", color: "#B91C1C", fontWeight: 500 }}>
//               {error}
//             </Typography>
//           </Box>
//         )}

//         {/* Verify / Confirm button */}
//         <Button
//           onClick={handleVerify}
//           fullWidth
//           variant="contained"
//           disabled={loading || otp.length < 4}
//           startIcon={
//             !loading && (
//               <CheckCircleRoundedIcon sx={{ fontSize: "18px !important" }} />
//             )
//           }
//           sx={{
//             borderRadius: "13px",
//             backgroundColor: "#F97316",
//             fontWeight: 800,
//             py: { xs: 1.4, sm: 1.6 },
//             fontSize: { xs: "0.88rem", sm: "0.95rem" },
//             textTransform: "none",
//             boxShadow: "none",
//             mb: 1.5,
//             "&:hover": {
//               backgroundColor: "#EA580C",
//               boxShadow: "none",
//             },
//             "&.Mui-disabled": {
//               backgroundColor: "rgba(249,115,22,0.28)",
//               color: "rgba(255,255,255,0.55)",
//             },
//             "&:active": { transform: "scale(0.98)" },
//             transition: "background-color 0.2s, transform 0.12s",
//           }}
//         >
//           {loading ? (
//             <CircularProgress size={20} sx={{ color: "rgba(255,255,255,0.8)" }} />
//           ) : (
//             "Confirm Delivery"
//           )}
//         </Button>

//         {/* Back button */}
//         <Button
//           onClick={() => navigate("/delivery/orders")}
//           fullWidth
//           variant="outlined"
//           startIcon={
//             <ArrowBackIosNewRoundedIcon sx={{ fontSize: "13px !important" }} />
//           }
//           sx={{
//             borderRadius: "13px",
//             borderColor: "#E5E7EB",
//             borderWidth: "1.5px",
//             color: "#6B7280",
//             fontWeight: 600,
//             py: { xs: 1.2, sm: 1.4 },
//             fontSize: { xs: "0.85rem", sm: "0.9rem" },
//             textTransform: "none",
//             boxShadow: "none",
//             "&:hover": {
//               borderColor: "#F97316",
//               color: "#F97316",
//               backgroundColor: "transparent",
//               boxShadow: "none",
//             },
//             transition: "border-color 0.2s, color 0.2s",
//           }}
//         >
//           Back to current orders
//         </Button>
//       </Box>
//     </Box>
//   );
// };

// export default OtpPage;











// 📁 src/webdelivery/pages/OtpPage.jsx

import { Box, Typography, Button, CircularProgress } from "@mui/material";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import LocalShippingRoundedIcon from "@mui/icons-material/LocalShippingRounded";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import ErrorOutlineRoundedIcon from "@mui/icons-material/ErrorOutlineRounded";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import deliveryAxios from "../api/Axios";
import useDeliveryAuth from "../hooks/useDeliveryAuth";

/**
 * OtpPage
 *
 * Navigated to from ActiveOrderCard when "Reached Location" is clicked.
 * Receives order_id via router state.
 *
 * Flow:
 * 1. Delivery boy enters OTP given by customer
 * 2. Clicks "Verify OTP"
 * 3. API: POST /adm/verify_otp_for_deliver_order
 *    Payload: { order_id, otp, delivery_boy_id }
 * 4. On success → show success state on same page
 * 5. On failure → show error, allow retry
 */

const verifyDeliveryOtp = async (order_id, otp, delivery_boy_id) => {
  return await deliveryAxios.post("/adm/verify_otp_for_deliver_order", {
    order_id,
    otp,
    delivery_boy_id,
  });
};

// console.log("FULL RESPONSE:", JSON.stringify(response));
// console.log("response.data:", JSON.stringify(response?.data));
// console.log("response.data.data:", response?.data?.data);

const OTP_LENGTH = 6;

// ── Blinking cursor shown in active empty box ──
const BlinkCursor = () => (
  <Box
    sx={{
      width: "2px",
      height: "26px",
      backgroundColor: "#F97316",
      borderRadius: "2px",
      animation: "otpBlink 0.9s step-end infinite",
      "@keyframes otpBlink": {
        "0%, 100%": { opacity: 1 },
        "50%": { opacity: 0 },
      },
    }}
  />
);

// ── Individual OTP digit box ──
const OtpBox = ({ value, isActive, isFilled, isError }) => (
  <Box
    sx={{
      flex: 1,
      minWidth: 0,
      maxWidth: { xs: 48, sm: 56 },
      aspectRatio: "1 / 1.2",
      borderRadius: "10px",
      border: "2px solid",
      borderColor: isError
        ? "#EF4444"
        : isActive
        ? "#F97316"
        : isFilled
        ? "#F97316"
        : "#E5E7EB",
      backgroundColor: isError
        ? "#FEF2F2"
        : isActive || isFilled
        ? "#FFFFFF"
        : "#F9FAFB",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: { xs: "1.15rem", sm: "1.35rem" },
      fontWeight: 800,
      color: isError ? "#EF4444" : isFilled ? "#F97316" : "#111827",
      boxShadow: isActive ? "0 0 0 3px rgba(249,115,22,0.15)" : "none",
      transition: "border-color 0.15s, box-shadow 0.15s, background-color 0.15s",
      cursor: "text",
      userSelect: "none",
    }}
  >
    {value ? value : isActive ? <BlinkCursor /> : ""}
  </Box>
);

const OtpPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { deliveryBoy } = useDeliveryAuth();

  const order_id = location.state?.order_id;

  // ── Original state (untouched) ──
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const hiddenInputRef = useRef(null);

  // Auto-focus the hidden input on mount
  useEffect(() => {
    hiddenInputRef.current?.focus();
  }, []);

  // ── Original handler (untouched logic) ──
  const handleChange = (e) => {
    setError("");
    const val = e.target.value.replace(/\D/g, "").slice(0, OTP_LENGTH);
    setOtp(val);
  };

  // ── Original handler (untouched logic) ──
  // const handleVerify = async () => {
  //   if (otp.length < 4) {
  //     setError("Please enter the complete OTP.");
  //     return;
  //   }
  //   setLoading(true);
  //   setError("");
  //   try {
  //     await verifyDeliveryOtp(order_id, otp, deliveryBoy?.user_id);
  //     setIsSuccess(true);
  //   } catch (err) {
  //     setError(err.message || "OTP verification failed. Please try again.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

//   const handleVerify = async () => {
//   if (otp.length < 4) {
//     setError("Please enter the complete OTP.");
//     return;
//   }
//   setLoading(true);
//   setError("");
//   try {
//     const response = await verifyDeliveryOtp(order_id, otp, deliveryBoy?.user_id);
    
//     const message = response?.data?.data;

//     if (
//       typeof message === "string" &&
//       message.toLowerCase().includes("verified successfully")
//     ) {
//       // ✅ Genuine success
//       setIsSuccess(true);
//     } else {
//       // ❌ API returned an error message
//       setError(message || "OTP verification failed. Please try again.");
//     }

//   } catch (err) {
//     setError(err.message || "OTP verification failed. Please try again.");
//   } finally {
//     setLoading(false);
//   }
// };



const handleVerify = async () => {
  if (otp.length < 4) {
    setError("Please enter the complete OTP.");
    return;
  }
  setLoading(true);
  setError("");
  try {
    const response = await verifyDeliveryOtp(order_id, String(otp), deliveryBoy?.user_id);

    // Axios interceptor already unwraps response.data.data
    // so response is now the plain string directly
    const message = typeof response === "string" ? response : "";

    if (message.toLowerCase().includes("verified successfully")) {
      setIsSuccess(true);
    } else {
      setError(message || "OTP verification failed. Please try again.");
    }

  } catch (err) {
    setError(err.message || "OTP verification failed. Please try again.");
  } finally {
    setLoading(false);
  }
};



  const focusInput = () => hiddenInputRef.current?.focus();

  // ── Success State ──
  if (isSuccess) {
    return (
      <Box
        sx={{
          minHeight: { xs: "calc(100vh - 120px)", md: "70vh" },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          px: { xs: 2, sm: 3 },
          py: 4,
          backgroundColor: "#F4F6F9",
        }}
      >
        <Box
          sx={{
            background: "#FFFFFF",
            borderRadius: "20px",
            border: "1px solid #E5E7EB",
            p: { xs: "2rem 1.5rem", sm: "2.5rem 2rem" },
            width: "100%",
            maxWidth: 480,
            textAlign: "center",
          }}
        >
          {/* Success icon */}
          <Box
            sx={{
              width: 76,
              height: 76,
              borderRadius: "50%",
              background: "#F0FDF4",
              border: "2px solid rgba(34,197,94,0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mx: "auto",
              mb: 2.5,
            }}
          >
            <CheckCircleRoundedIcon sx={{ color: "#22C55E", fontSize: 42 }} />
          </Box>

          <Typography
            sx={{
              fontWeight: 800,
              fontSize: { xs: "1.2rem", sm: "1.35rem" },
              color: "#111827",
              mb: 0.75,
            }}
          >
            Delivery confirmed!
          </Typography>

          <Typography
            sx={{
              fontSize: { xs: "0.82rem", sm: "0.88rem" },
              color: "#6B7280",
              lineHeight: 1.65,
              mb: 1.5,
            }}
          >
            Order #{order_id} has been successfully
            <br />
            delivered to the customer.
          </Typography>

          {/* Verified pill */}
          <Box sx={{ display: "flex", justifyContent: "center", mb: 3.5 }}>
            <Box
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 0.6,
                fontSize: "0.75rem",
                fontWeight: 600,
                color: "#15803D",
                background: "#F0FDF4",
                border: "1px solid rgba(34,197,94,0.25)",
                borderRadius: "999px",
                px: 1.5,
                py: 0.5,
              }}
            >
              <CheckCircleRoundedIcon sx={{ fontSize: 13 }} />
              OTP verified successfully
            </Box>
          </Box>

          <Button
            onClick={() => navigate("/delivery/dashboard")}
            fullWidth
            variant="contained"
            endIcon={<ArrowForwardRoundedIcon />}
            sx={{
              borderRadius: "13px",
              backgroundColor: "#111827",
              fontWeight: 800,
              py: { xs: 1.4, sm: 1.6 },
              fontSize: { xs: "0.88rem", sm: "0.95rem" },
              textTransform: "none",
              boxShadow: "none",
              "&:hover": { backgroundColor: "#1F2937", boxShadow: "none" },
            }}
          >
            Go to dashboard
          </Button>
        </Box>
      </Box>
    );
  }

  // ── OTP Entry State ──
  return (
    <Box
      sx={{
        minHeight: { xs: "calc(100vh - 120px)", md: "70vh" },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: { xs: "flex-start", md: "center" },
        px: { xs: 1.5, sm: 3 },
        pt: { xs: 2, sm: 3, md: 4 },
        pb: { xs: 3, md: 4 },
        backgroundColor: "#F4F6F9",
      }}
    >
      {/* ── Context bar ── */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          background: "#FFFFFF",
          border: "1px solid #E5E7EB",
          borderRadius: "12px",
          p: { xs: "10px 12px", sm: "12px 16px" },
          width: "100%",
          maxWidth: 480,
          mb: { xs: 1.5, sm: 2 },
        }}
      >
        <Box
          sx={{
            width: 36,
            height: 36,
            borderRadius: "8px",
            background: "#FFF3EA",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <LocalShippingRoundedIcon sx={{ color: "#F97316", fontSize: 20 }} />
        </Box>

        <Box>
          <Typography sx={{ fontSize: "11px", fontWeight: 500, color: "#9CA3AF", mb: "1px" }}>
            Current delivery
          </Typography>
          <Typography sx={{ fontSize: "14px", fontWeight: 700, color: "#111827" }}>
            Order #{order_id}
          </Typography>
        </Box>

        {/* At location badge */}
        <Box
          sx={{
            ml: "auto",
            display: "flex",
            alignItems: "center",
            gap: 0.6,
            fontSize: "12px",
            fontWeight: 600,
            color: "#F97316",
            background: "#FFF3EA",
            border: "1px solid rgba(249,115,22,0.2)",
            borderRadius: "999px",
            px: 1.25,
            py: 0.5,
            whiteSpace: "nowrap",
          }}
        >
          <Box
            sx={{ width: 6, height: 6, borderRadius: "50%", background: "#F97316" }}
          />
          At location
        </Box>
      </Box>

      {/* ── Main card ── */}
      <Box
        sx={{
          background: "#FFFFFF",
          borderRadius: "20px",
          border: "1px solid #E5E7EB",
          p: { xs: "1.5rem", sm: "1.75rem 2rem" },
          width: "100%",
          maxWidth: 480,
        }}
      >
        {/* Card header */}
        <Box
          sx={{
            textAlign: "center",
            pb: 2.5,
            mb: 2.5,
            borderBottom: "1px solid #F3F4F6",
          }}
        >
          <Box
            sx={{
              width: 60,
              height: 60,
              borderRadius: "50%",
              background: "#FFF3EA",
              border: "2px solid rgba(249,115,22,0.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mx: "auto",
              mb: 1.75,
            }}
          >
            <LockRoundedIcon sx={{ color: "#F97316", fontSize: 26 }} />
          </Box>

          <Typography
            sx={{
              fontWeight: 800,
              fontSize: { xs: "1.05rem", sm: "1.15rem" },
              color: "#111827",
              mb: 0.5,
            }}
          >
            Enter customer OTP
          </Typography>
          <Typography sx={{ fontSize: "13px", color: "#6B7280", lineHeight: 1.6 }}>
            Ask the customer for the OTP sent
            <br />
            to their registered mobile number.
          </Typography>
        </Box>

        {/* Info hint */}
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            gap: 1,
            background: "#F9FAFB",
            border: "1px solid #E5E7EB",
            borderRadius: "10px",
            p: "11px 13px",
            mb: 2.5,
          }}
        >
          <InfoOutlinedIcon sx={{ fontSize: 16, color: "#9CA3AF", mt: "2px", flexShrink: 0 }} />
          <Typography sx={{ fontSize: "12.5px", color: "#6B7280", lineHeight: 1.55 }}>
            The customer received a{" "}
            <Box component="span" sx={{ fontWeight: 700, color: "#374151" }}>
              6-digit code
            </Box>{" "}
            via SMS. It expires soon — verify promptly.
          </Typography>
        </Box>

        {/* OTP label */}
        <Typography
          sx={{
            fontSize: "11px",
            fontWeight: 700,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            color: "#9CA3AF",
            mb: 1,
          }}
        >
          OTP Code
        </Typography>

        {/* OTP boxes + hidden real input */}
        <Box
          onClick={focusInput}
          sx={{
            display: "flex",
            gap: { xs: "7px", sm: "9px" },
            justifyContent: "center",
            mb: 2,
            cursor: "text",
            position: "relative",
          }}
        >
          {Array.from({ length: OTP_LENGTH }).map((_, i) => (
            <OtpBox
              key={i}
              value={otp[i] || ""}
              isActive={i === otp.length && !loading}
              isFilled={i < otp.length}
              isError={!!error && i < otp.length}
            />
          ))}

          {/* Hidden real input — captures all keyboard input */}
          <Box
            component="input"
            ref={hiddenInputRef}
            value={otp}
            onChange={handleChange}
            disabled={loading}
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={OTP_LENGTH}
            sx={{
              position: "absolute",
              opacity: 0,
              width: "1px",
              height: "1px",
              pointerEvents: "none",
              border: "none",
              outline: "none",
            }}
          />
        </Box>

        {/* Error message */}
        {error && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              background: "#FEF2F2",
              border: "1px solid rgba(239,68,68,0.2)",
              borderRadius: "9px",
              p: "10px 13px",
              mb: 2,
            }}
          >
            <ErrorOutlineRoundedIcon sx={{ fontSize: 16, color: "#EF4444", flexShrink: 0 }} />
            <Typography sx={{ fontSize: "13px", color: "#B91C1C", fontWeight: 500 }}>
              {error}
            </Typography>
          </Box>
        )}

        {/* Verify / Confirm button */}
        <Button
          onClick={handleVerify}
          fullWidth
          variant="contained"
          disabled={loading || otp.length < 4}
          startIcon={
            !loading && (
              <CheckCircleRoundedIcon sx={{ fontSize: "18px !important" }} />
            )
          }
          sx={{
            borderRadius: "13px",
            backgroundColor: "#F97316",
            fontWeight: 800,
            py: { xs: 1.4, sm: 1.6 },
            fontSize: { xs: "0.88rem", sm: "0.95rem" },
            textTransform: "none",
            boxShadow: "none",
            mb: 1.5,
            "&:hover": {
              backgroundColor: "#EA580C",
              boxShadow: "none",
            },
            "&.Mui-disabled": {
              backgroundColor: "rgba(249,115,22,0.28)",
              color: "rgba(255,255,255,0.55)",
            },
            "&:active": { transform: "scale(0.98)" },
            transition: "background-color 0.2s, transform 0.12s",
          }}
        >
          {loading ? (
            <CircularProgress size={20} sx={{ color: "rgba(255,255,255,0.8)" }} />
          ) : (
            "Confirm Delivery"
          )}
        </Button>

        {/* Back button */}
        <Button
          onClick={() => navigate("/delivery/orders")}
          fullWidth
          variant="outlined"
          startIcon={
            <ArrowBackIosNewRoundedIcon sx={{ fontSize: "13px !important" }} />
          }
          sx={{
            borderRadius: "13px",
            borderColor: "#E5E7EB",
            borderWidth: "1.5px",
            color: "#6B7280",
            fontWeight: 600,
            py: { xs: 1.2, sm: 1.4 },
            fontSize: { xs: "0.85rem", sm: "0.9rem" },
            textTransform: "none",
            boxShadow: "none",
            "&:hover": {
              borderColor: "#F97316",
              color: "#F97316",
              backgroundColor: "transparent",
              boxShadow: "none",
            },
            transition: "border-color 0.2s, color 0.2s",
          }}
        >
          Back to current orders
        </Button>
      </Box>
    </Box>
  );
};

export default OtpPage;
// // 📁 src/webdelivery/pages/DashboardPage.jsx

// import {
//   Box,
//   Typography,
//   Grid,
//   Card,
//   CardContent,
//   Chip,
//   Skeleton,
//   Alert,
// } from "@mui/material";
// import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
// import TodayRoundedIcon from "@mui/icons-material/TodayRounded";
// import LocalShippingRoundedIcon from "@mui/icons-material/LocalShippingRounded";
// import FiberManualRecordRoundedIcon from "@mui/icons-material/FiberManualRecordRounded";
// import StatCard from "../components/dashboard/StatCard";
// import useOrders from "../hooks/useOrders";
// import useDeliveryAuth from "../hooks/useDeliveryAuth";

// /**
//  * DashboardPage
//  *
//  * Renders:
//  * 1. Welcome header — delivery boy name from context
//  * 2. Two StatCard tiles — overall delivered + today delivered (from API)
//  * 3. Delivery boy info card — status, availability, contact details
//  *
//  * Data source: useOrders hook → fetchDeliveryBoyDetails API
//  */

// const STATUS_CONFIG = {
//   Online: { label: "Online", color: "#22C55E", bg: "rgba(34,197,94,0.1)", textColor: "#15803D" },
//   Offline: { label: "Offline", color: "#94A3B8", bg: "rgba(148,163,184,0.1)", textColor: "#475569" },
//   On_Delivery: { label: "On Delivery", color: "#F97316", bg: "rgba(249,115,22,0.1)", textColor: "#C2410C" },
// };

// const DashboardPage = () => {
//   const { deliveryBoy } = useDeliveryAuth();
//   const { deliveryBoyDetails, stats, loading, error, refetch } = useOrders();

//   const statusKey = deliveryBoyDetails?.status ?? "Offline";
//   const statusCfg = STATUS_CONFIG[statusKey] ?? STATUS_CONFIG["Offline"];

//   return (
//     <Box>
//       {/* ── Page Header ── */}
//       <Box sx={{ mb: 3 }}>
//         <Typography
//           sx={{
//             color: "#0F172A",
//             fontWeight: 800,
//             fontSize: { xs: "1.3rem", md: "1.6rem" },
//             lineHeight: 1.2,
//           }}
//         >
//           Good day, {deliveryBoy?.name ?? "Delivery Agent"} 👋
//         </Typography>
//         <Typography sx={{ color: "#64748B", fontSize: "0.875rem", mt: 0.5 }}>
//           Here's your delivery summary for today.
//         </Typography>
//       </Box>

//       {/* ── Error state ── */}
//       {error && (
//         <Alert
//           severity="error"
//           sx={{ mb: 3, borderRadius: "10px" }}
//           action={
//             <Typography
//               onClick={refetch}
//               sx={{
//                 color: "#EF4444",
//                 fontWeight: 600,
//                 fontSize: "0.8rem",
//                 cursor: "pointer",
//                 mr: 1,
//               }}
//             >
//               Retry
//             </Typography>
//           }
//         >
//           {error}
//         </Alert>
//       )}

//       {/* ── Stat Tiles ── */}
//       <Grid container spacing={2.5} sx={{ mb: 3 }}>
//         <Grid item xs={12} sm={6}>
//           <StatCard
//             title="Total Delivered"
//             value={stats.overall_delivered}
//             icon={<CheckCircleRoundedIcon />}
//             color="#22C55E"
//             loading={loading}
//           />
//         </Grid>
//         <Grid item xs={12} sm={6}>
//           <StatCard
//             title="Delivered Today"
//             value={stats.today_delivered}
//             icon={<TodayRoundedIcon />}
//             color="#F97316"
//             loading={loading}
//           />
//         </Grid>
//       </Grid>

//       {/* ── Delivery Boy Info Card ── */}
//       <Card
//         sx={{
//           borderRadius: "16px",
//           border: "1px solid #E2E8F0",
//           boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
//         }}
//         elevation={0}
//       >
//         <CardContent sx={{ p: 3 }}>
//           {/* Card header */}
//           <Box
//             sx={{
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "space-between",
//               mb: 2.5,
//             }}
//           >
//             <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//               <LocalShippingRoundedIcon sx={{ color: "#F97316", fontSize: 20 }} />
//               <Typography sx={{ fontWeight: 700, color: "#0F172A", fontSize: "0.95rem" }}>
//                 My Profile
//               </Typography>
//             </Box>

//             {/* Status chip */}
//             {loading ? (
//               <Skeleton variant="rounded" width={90} height={26} />
//             ) : (
//               <Chip
//                 icon={
//                   <FiberManualRecordRoundedIcon
//                     sx={{ fontSize: "10px !important", color: `${statusCfg.color} !important` }}
//                   />
//                 }
//                 label={statusCfg.label}
//                 size="small"
//                 sx={{
//                   backgroundColor: statusCfg.bg,
//                   color: statusCfg.textColor,
//                   fontWeight: 600,
//                   fontSize: "0.72rem",
//                   height: 26,
//                   border: `1px solid ${statusCfg.color}30`,
//                   "& .MuiChip-icon": { ml: "6px" },
//                 }}
//               />
//             )}
//           </Box>

//           {/* Info rows */}
//           <Grid container spacing={2}>
//             {[
//               {
//                 label: "Full Name",
//                 value: deliveryBoyDetails?.name,
//               },
//               {
//                 label: "Mobile",
//                 value: deliveryBoyDetails?.mobile_number,
//               },
//               {
//                 label: "Email",
//                 value: deliveryBoyDetails?.email,
//               },
//               {
//                 label: "Address",
//                 value: deliveryBoyDetails
//                   ? `${deliveryBoyDetails.address_line1}, ${deliveryBoyDetails.address_line2}`
//                   : null,
//               },
//               {
//                 label: "Availability",
//                 value: deliveryBoyDetails?.is_available ? "Available" : "Not Available",
//               },
//             ].map((row) => (
//               <Grid item xs={12} sm={6} key={row.label}>
//                 <Box>
//                   <Typography
//                     sx={{
//                       color: "#94A3B8",
//                       fontSize: "0.72rem",
//                       fontWeight: 600,
//                       letterSpacing: "0.04em",
//                       textTransform: "uppercase",
//                       mb: 0.3,
//                     }}
//                   >
//                     {row.label}
//                   </Typography>
//                   {loading ? (
//                     <Skeleton variant="text" width="70%" height={22} />
//                   ) : (
//                     <Typography
//                       sx={{
//                         color: "#1E293B",
//                         fontSize: "0.875rem",
//                         fontWeight: 600,
//                       }}
//                     >
//                       {row.value ?? "—"}
//                     </Typography>
//                   )}
//                 </Box>
//               </Grid>
//             ))}
//           </Grid>
//         </CardContent>
//       </Card>
//     </Box>
//   );
// };

// export default DashboardPage;











// // 📁 src/webdelivery/pages/DashboardPage.jsx

// import {
//   Box,
//   Typography,
//   Grid,
//   Card,
//   CardContent,
//   Chip,
//   Skeleton,
//   Alert,
//   Avatar,
//   Divider,
// } from "@mui/material";
// import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
// import TodayRoundedIcon from "@mui/icons-material/TodayRounded";
// import FiberManualRecordRoundedIcon from "@mui/icons-material/FiberManualRecordRounded";
// import useOrders from "../hooks/useOrders";
// import useDeliveryAuth from "../hooks/useDeliveryAuth";

// const STATUS_CONFIG = {
//   Online:      { label: "Online",      color: "#16A34A", bg: "rgba(22,163,74,0.08)",   textColor: "#15803D" },
//   Offline:     { label: "Offline",     color: "#94A3B8", bg: "rgba(148,163,184,0.10)", textColor: "#475569" },
//   On_Delivery: { label: "On Delivery", color: "#EA580C", bg: "rgba(234,88,12,0.08)",   textColor: "#C2410C" },
// };

// /* ─── Stat Card ─────────────────────────────────────────── */
// const StatCard = ({ title, value, icon, accentColor, gradientFrom, gradientTo, loading }) => (
//   <Card
//     elevation={0}
//     sx={{
//       borderRadius: "14px",
//       border: "1px solid #E2E8F0",
//       background: `linear-gradient(135deg, ${gradientFrom} 0%, ${gradientTo} 100%)`,
//       height: "100%",
//       position: "relative",
//       overflow: "hidden",
//     }}
//   >
//     {/* Subtle decorative arc */}
//     <Box sx={{
//       position: "absolute",
//       top: -40,
//       right: -40,
//       width: 130,
//       height: 130,
//       borderRadius: "50%",
//       border: `1px solid ${accentColor}18`,
//       pointerEvents: "none",
//     }} />
//     <Box sx={{
//       position: "absolute",
//       top: -10,
//       right: -10,
//       width: 70,
//       height: 70,
//       borderRadius: "50%",
//       border: `1px solid ${accentColor}12`,
//       pointerEvents: "none",
//     }} />

//     <CardContent sx={{ p: { xs: 2.5, md: 3 }, position: "relative" }}>
//       {/* Icon pill */}
//       <Box sx={{
//         display: "inline-flex",
//         alignItems: "center",
//         justifyContent: "center",
//         width: 40,
//         height: 40,
//         borderRadius: "10px",
//         backgroundColor: `${accentColor}15`,
//         mb: 2.5,
//         color: accentColor,
//       }}>
//         {icon}
//       </Box>

//       {loading ? (
//         <>
//           <Skeleton variant="text" width="50%" height={52} />
//           <Skeleton variant="text" width="65%" height={18} sx={{ mt: 0.5 }} />
//         </>
//       ) : (
//         <>
//           <Typography sx={{
//             fontWeight: 800,
//             fontSize: { xs: "2.2rem", md: "2.6rem" },
//             lineHeight: 1,
//             color: "#0F172A",
//             letterSpacing: "-0.02em",
//           }}>
//             {value ?? 0}
//           </Typography>
//           <Typography sx={{
//             fontSize: "0.775rem",
//             fontWeight: 600,
//             color: "#64748B",
//             letterSpacing: "0.05em",
//             textTransform: "uppercase",
//             mt: 0.75,
//           }}>
//             {title}
//           </Typography>
//         </>
//       )}
//     </CardContent>
//   </Card>
// );

// /* ─── Profile Table Row ─────────────────────────────────── */
// const ProfileRow = ({ label, value, loading, noBorder }) => (
//   <>
//     <Box sx={{
//       display: "grid",
//       gridTemplateColumns: { xs: "1fr", sm: "160px 1fr" },
//       gap: { xs: 0.25, sm: 2 },
//       py: 1.75,
//       px: { xs: 0, md: 0.5 },
//       alignItems: "baseline",
//     }}>
//       <Typography sx={{
//         fontSize: "0.72rem",
//         fontWeight: 700,
//         color: "#94A3B8",
//         letterSpacing: "0.06em",
//         textTransform: "uppercase",
//         flexShrink: 0,
//       }}>
//         {label}
//       </Typography>
//       {loading ? (
//         <Skeleton variant="text" width={140} height={20} />
//       ) : (
//         <Typography sx={{
//           fontSize: "0.875rem",
//           fontWeight: 600,
//           color: "#1E293B",
//           wordBreak: "break-word",
//         }}>
//           {value ?? "—"}
//         </Typography>
//       )}
//     </Box>
//     {!noBorder && <Divider sx={{ borderColor: "#F1F5F9" }} />}
//   </>
// );

// /* ─── Page ───────────────────────────────────────────────── */
// const DashboardPage = () => {
//   const { deliveryBoy } = useDeliveryAuth();
//   const { deliveryBoyDetails, stats, loading, error, refetch } = useOrders();

//   const statusKey = deliveryBoyDetails?.status ?? "Offline";
//   const statusCfg = STATUS_CONFIG[statusKey] ?? STATUS_CONFIG["Offline"];

//   const initials = (deliveryBoy?.name ?? "DA")
//     .split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);

//   const profileRows = [
//     { label: "Full Name",    value: deliveryBoyDetails?.name },
//     { label: "Mobile",       value: deliveryBoyDetails?.mobile_number },
//     { label: "Email",        value: deliveryBoyDetails?.email },
//     {
//       label: "Address",
//       value: deliveryBoyDetails
//         ? `${deliveryBoyDetails.address_line1}, ${deliveryBoyDetails.address_line2}`
//         : null,
//     },
//     {
//       label: "Availability",
//       value: deliveryBoyDetails?.is_available ? "Available" : "Not Available",
//     },
//   ];

//   return (
//     <Box>
//       {/* ── Header ── */}
//       <Box sx={{ mb: { xs: 3, md: 4 } }}>
//         <Typography sx={{
//           color: "#0F172A",
//           fontWeight: 800,
//           fontSize: { xs: "1.4rem", sm: "1.65rem", md: "1.85rem" },
//           lineHeight: 1.15,
//           letterSpacing: "-0.02em",
//         }}>
//           Good day, {deliveryBoy?.name ?? "Delivery Agent"} 👋
//         </Typography>
//         <Typography sx={{ color: "#64748B", fontSize: "0.875rem", mt: 0.5, fontWeight: 400 }}>
//           Here's your delivery summary for today.
//         </Typography>
//       </Box>

//       {/* ── Error ── */}
//       {error && (
//         <Alert
//           severity="error"
//           sx={{ mb: 3, borderRadius: "10px" }}
//           action={
//             <Typography
//               onClick={refetch}
//               sx={{ color: "#EF4444", fontWeight: 600, fontSize: "0.8rem", cursor: "pointer", mr: 1 }}
//             >
//               Retry
//             </Typography>
//           }
//         >
//           {error}
//         </Alert>
//       )}

//       {/* ── Stat Cards ── */}
//       <Grid container spacing={2.5} sx={{ mb: 3 }}>
//         <Grid item xs={12} sm={6}>
//           <StatCard
//             title="Total Delivered"
//             value={stats.overall_delivered}
//             icon={<CheckCircleRoundedIcon sx={{ fontSize: 20 }} />}
//             accentColor="#16A34A"
//             gradientFrom="#F8FFF9"
//             gradientTo="#EEF9F1"
//             loading={loading}
//           />
//         </Grid>
//         <Grid item xs={12} sm={6}>
//           <StatCard
//             title="Delivered Today"
//             value={stats.today_delivered}
//             icon={<TodayRoundedIcon sx={{ fontSize: 20 }} />}
//             accentColor="#EA580C"
//             gradientFrom="#FFFAF7"
//             gradientTo="#FFF1E8"
//             loading={loading}
//           />
//         </Grid>
//       </Grid>

//       {/* ── Profile Card ── */}
//       <Card
//         elevation={0}
//         sx={{
//           borderRadius: "14px",
//           border: "1px solid #E2E8F0",
//           overflow: "hidden",
//         }}
//       >
//         {/* Header */}
//         <Box sx={{
//           px: { xs: 2.5, md: 3 },
//           py: 2,
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "space-between",
//           borderBottom: "1px solid #F1F5F9",
//           backgroundColor: "#FAFBFC",
//         }}>
//           <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
//             <Avatar sx={{
//               width: 38,
//               height: 38,
//               backgroundColor: "#F97316",
//               fontSize: "0.82rem",
//               fontWeight: 700,
//               letterSpacing: "0.02em",
//             }}>
//               {initials}
//             </Avatar>
//             <Box>
//               <Typography sx={{ fontWeight: 700, color: "#0F172A", fontSize: "0.9rem", lineHeight: 1.25 }}>
//                 My Profile
//               </Typography>
//               <Typography sx={{ color: "#94A3B8", fontSize: "0.7rem", mt: 0.1 }}>
//                 Personal & contact details
//               </Typography>
//             </Box>
//           </Box>

//           {loading ? (
//             <Skeleton variant="rounded" width={88} height={26} />
//           ) : (
//             <Chip
//               icon={
//                 <FiberManualRecordRoundedIcon
//                   sx={{ fontSize: "9px !important", color: `${statusCfg.color} !important` }}
//                 />
//               }
//               label={statusCfg.label}
//               size="small"
//               sx={{
//                 backgroundColor: statusCfg.bg,
//                 color: statusCfg.textColor,
//                 fontWeight: 600,
//                 fontSize: "0.7rem",
//                 height: 24,
//                 border: `1px solid ${statusCfg.color}25`,
//                 "& .MuiChip-icon": { ml: "5px" },
//               }}
//             />
//           )}
//         </Box>

//         {/* Table-style fields */}
//         <CardContent sx={{ px: { xs: 2.5, md: 3 }, py: "0 !important", pb: "8px !important" }}>
//           {profileRows.map((row, i) => (
//             <ProfileRow
//               key={row.label}
//               label={row.label}
//               value={row.value}
//               loading={loading}
//               noBorder={i === profileRows.length - 1}
//             />
//           ))}
//         </CardContent>
//       </Card>
//     </Box>
//   );
// };

// export default DashboardPage;










// 📁 src/webdelivery/pages/DashboardPage.jsx

import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Chip,
  Skeleton,
  Alert,
  Avatar,
  Divider,
} from "@mui/material";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import TodayRoundedIcon from "@mui/icons-material/TodayRounded";
import FiberManualRecordRoundedIcon from "@mui/icons-material/FiberManualRecordRounded";
import useOrders from "../hooks/useOrders";
import useDeliveryAuth from "../hooks/useDeliveryAuth";

const STATUS_CONFIG = {
  Online:      { label: "Online",      color: "#16A34A", bg: "rgba(22,163,74,0.08)",   textColor: "#15803D" },
  Offline:     { label: "Offline",     color: "#94A3B8", bg: "rgba(148,163,184,0.10)", textColor: "#475569" },
  On_Delivery: { label: "On Delivery", color: "#EA580C", bg: "rgba(234,88,12,0.08)",   textColor: "#C2410C" },
};

/* ─── Stat Card ─────────────────────────────────────────── */
const StatCard = ({ title, value, icon, accentColor, gradientFrom, gradientTo, loading }) => (
  <Card
    elevation={0}
    sx={{
      borderRadius: "14px",
      border: "1px solid #E2E8F0",
      background: `linear-gradient(135deg, ${gradientFrom} 0%, ${gradientTo} 100%)`,
      height: "100%",
      position: "relative",
      overflow: "hidden",
    }}
  >
    {/* Subtle decorative arc */}
    <Box sx={{
      position: "absolute",
      top: -40,
      right: -40,
      width: 130,
      height: 130,
      borderRadius: "50%",
      border: `1px solid ${accentColor}18`,
      pointerEvents: "none",
    }} />
    <Box sx={{
      position: "absolute",
      top: -10,
      right: -10,
      width: 70,
      height: 70,
      borderRadius: "50%",
      border: `1px solid ${accentColor}12`,
      pointerEvents: "none",
    }} />

    <CardContent sx={{ p: { xs: 2, sm: 3, md: 4 }, position: "relative" }}>
      {/* Icon pill */}
      <Box sx={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: { xs: 36, md: 46 },
        height: { xs: 36, md: 46 },
        borderRadius: "12px",
        backgroundColor: `${accentColor}15`,
        mb: { xs: 2, md: 3 },
        color: accentColor,
      }}>
        {icon}
      </Box>

      {loading ? (
        <>
          <Skeleton variant="text" width="50%" height={64} />
          <Skeleton variant="text" width="65%" height={18} sx={{ mt: 0.5 }} />
        </>
      ) : (
        <>
          <Typography sx={{
            fontWeight: 800,
            fontSize: { xs: "1.6rem", sm: "2.4rem", md: "3.2rem" },
            lineHeight: 1,
            color: "#0F172A",
            letterSpacing: "-0.03em",
          }}>
            {value ?? 0}
          </Typography>
          <Typography sx={{
            fontSize: { xs: "0.65rem", md: "0.775rem" },
            fontWeight: 600,
            color: "#64748B",
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            mt: { xs: 0.5, md: 1 },
          }}>
            {title}
          </Typography>
        </>
      )}
    </CardContent>
  </Card>
);

/* ─── Profile Table Row ─────────────────────────────────── */
const ProfileRow = ({ label, value, loading, noBorder }) => (
  <>
    <Box sx={{
      display: "grid",
      gridTemplateColumns: { xs: "1fr", sm: "160px 1fr" },
      gap: { xs: 0.25, sm: 2 },
      py: 1.75,
      px: { xs: 0, md: 0.5 },
      alignItems: "baseline",
    }}>
      <Typography sx={{
        fontSize: "0.72rem",
        fontWeight: 700,
        color: "#94A3B8",
        letterSpacing: "0.06em",
        textTransform: "uppercase",
        flexShrink: 0,
      }}>
        {label}
      </Typography>
      {loading ? (
        <Skeleton variant="text" width={140} height={20} />
      ) : (
        <Typography sx={{
          fontSize: "0.875rem",
          fontWeight: 600,
          color: "#1E293B",
          wordBreak: "break-word",
        }}>
          {value ?? "—"}
        </Typography>
      )}
    </Box>
    {!noBorder && <Divider sx={{ borderColor: "#F1F5F9" }} />}
  </>
);

/* ─── Page ───────────────────────────────────────────────── */
const DashboardPage = () => {
  const { deliveryBoy } = useDeliveryAuth();
  const { deliveryBoyDetails, stats, loading, error, refetch } = useOrders();

  const statusKey = deliveryBoyDetails?.status ?? "Offline";
  const statusCfg = STATUS_CONFIG[statusKey] ?? STATUS_CONFIG["Offline"];

  const initials = (deliveryBoy?.name ?? "DA")
    .split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);

  const profileRows = [
    { label: "Full Name",    value: deliveryBoyDetails?.name },
    { label: "Mobile",       value: deliveryBoyDetails?.mobile_number },
    { label: "Email",        value: deliveryBoyDetails?.email },
    {
      label: "Address",
      value: deliveryBoyDetails
        ? `${deliveryBoyDetails.address_line1}, ${deliveryBoyDetails.address_line2}`
        : null,
    },
    // {
    //   label: "Availability",
    //   value: deliveryBoyDetails?.is_available ? "Available" : "Not Available",
    // },
  ];

  return (
    <Box>
      {/* ── Header ── */}
      <Box sx={{ mb: { xs: 3, md: 4 } }}>
        <Typography sx={{
          color: "#0F172A",
          fontWeight: 800,
          fontSize: { xs: "1.4rem", sm: "1.65rem", md: "1.85rem" },
          lineHeight: 1.15,
          letterSpacing: "-0.02em",
        }}>
          Good day, {deliveryBoy?.name ?? "Delivery Agent"} 👋
        </Typography>
        <Typography sx={{ color: "#64748B", fontSize: "0.875rem", mt: 0.5, fontWeight: 400 }}>
          Here's your delivery summary for today.
        </Typography>
      </Box>

      {/* ── Error ── */}
      {error && (
        <Alert
          severity="error"
          sx={{ mb: 3, borderRadius: "10px" }}
          action={
            <Typography
              onClick={refetch}
              sx={{ color: "#EF4444", fontWeight: 600, fontSize: "0.8rem", cursor: "pointer", mr: 1 }}
            >
              Retry
            </Typography>
          }
        >
          {error}
        </Alert>
      )}

      {/* ── Stat Cards ── */}
      <Grid container spacing={2.5} sx={{ mb: 3 }}>
        <Grid item xs={6}>
          <StatCard
            title="Total Delivered"
            value={stats.overall_delivered}
            icon={<CheckCircleRoundedIcon sx={{ fontSize: 20 }} />}
            accentColor="#16A34A"
            gradientFrom="#F8FFF9"
            gradientTo="#EEF9F1"
            loading={loading}
          />
        </Grid>
        <Grid item xs={6}>
          <StatCard
            title="Delivered Today"
            value={stats.today_delivered}
            icon={<TodayRoundedIcon sx={{ fontSize: 20 }} />}
            accentColor="#EA580C"
            gradientFrom="#FFFAF7"
            gradientTo="#FFF1E8"
            loading={loading}
          />
        </Grid>
      </Grid>

      {/* ── Profile Card ── */}
      <Card
        elevation={0}
        sx={{
          borderRadius: "14px",
          border: "1px solid #E2E8F0",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <Box sx={{
          px: { xs: 2.5, md: 3 },
          py: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid #F1F5F9",
          backgroundColor: "#FAFBFC",
        }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Avatar sx={{
              width: 38,
              height: 38,
              backgroundColor: "#F97316",
              fontSize: "0.82rem",
              fontWeight: 700,
              letterSpacing: "0.02em",
            }}>
              {initials}
            </Avatar>
            <Box>
              <Typography sx={{ fontWeight: 700, color: "#0F172A", fontSize: "0.9rem", lineHeight: 1.25 }}>
                My Profile
              </Typography>
              <Typography sx={{ color: "#94A3B8", fontSize: "0.7rem", mt: 0.1 }}>
                Personal & contact details
              </Typography>
            </Box>
          </Box>

           {/* {loading ? (
            <Skeleton variant="rounded" width={88} height={26} />
          ) : (
            <Chip
              icon={
                <FiberManualRecordRoundedIcon
                  sx={{ fontSize: "9px !important", color: `${statusCfg.color} !important` }}
                />
              }
              label={statusCfg.label}
              size="small"
              sx={{
                backgroundColor: statusCfg.bg,
                color: statusCfg.textColor,
                fontWeight: 600,
                fontSize: "0.7rem",
                height: 24,
                border: `1px solid ${statusCfg.color}25`,
                "& .MuiChip-icon": { ml: "5px" },
              }}
            />
          )}  */}
        </Box>

        {/* Table-style fields */}
        <CardContent sx={{ px: { xs: 2.5, md: 3 }, py: "0 !important", pb: "8px !important" }}>
          {profileRows.map((row, i) => (
            <ProfileRow
              key={row.label}
              label={row.label}
              value={row.value}
              loading={loading}
              noBorder={i === profileRows.length - 1}
            />
          ))}
        </CardContent>
      </Card>
    </Box>
  );
};

export default DashboardPage;
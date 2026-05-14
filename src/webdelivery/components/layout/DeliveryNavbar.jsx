









// // 📁 src/webdelivery/components/layout/DeliveryNavBar.jsx
// me code change 
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Divider,
  Tooltip,
  CircularProgress,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import FiberManualRecordRoundedIcon from "@mui/icons-material/FiberManualRecordRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SIDEBAR_WIDTH } from "./DeliverySideBar";
import useDeliveryAuth from "../../hooks/useDeliveryAuth";
import {
  fetchDeliveryBoyDetails,
  changeDeliveryBoyStatus,
} from "../../api/DeliveryApi";
const deliveryPath = import.meta.env.VITE_DELIVERY_PATH;
import { useDispatch } from "react-redux";
import { showNotification } from "../../../webapp/store/DistanceNotifySlice"
// store/DistanceNotifySlice"

const STATUS_CONFIG = {
  online:  { label: "Online",  color: "#22C55E", bg: "rgba(34,197,94,0.1)",   textColor: "#15803D" },
  offline: { label: "Offline", color: "#94A3B8", bg: "rgba(148,163,184,0.1)", textColor: "#475569" },
    busy:    { label: "Busy",    color: "#F97316", bg: "rgba(249,115,22,0.1)",   textColor: "#C2410C" },
};

const getInitials = (name = "") =>
  name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);

const DeliveryNavbar = ({ onMenuClick }) => {
  console.log("start")
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();
  const { deliveryBoy, logout } = useDeliveryAuth();
  const name = deliveryBoy?.name ?? "Delivery Agent";
const dispatch = useDispatch();
  const STORAGE_KEY = `delivery_status_${deliveryBoy?.user_id}`;

  // ── Bug 1 Fix: useState lazy init — localStorage சரியா படிக்கும் ──
  const [status, setStatusRaw] = useState(
    () => {
      const stored = localStorage.getItem(STORAGE_KEY);
      console.log("🟡 [INIT] localStorage status:", stored);
      return stored ?? null;
    }
  );
  const [statusLoading, setStatusLoading] = useState(true);
  const [toggleLoading, setToggleLoading] = useState(false);

  const setStatus = (val) => {
    console.log("🔄 [setStatus] New value:", val);
    setStatusRaw(val);
    if (val) localStorage.setItem(STORAGE_KEY, val);
  };

  // ── Bug 2 Fix: async/await சரியா wrap பண்ணினேன் ──
  // உன் code-ல் (async () => { ... })() comment ஆகி இருந்தது
  // அதனால await fetchDeliveryBoyDetails() crash ஆகுது
  useEffect(() => {
    const id = deliveryBoy?.user_id;
    console.log("🔵 [useEffect] deliveryBoy:", deliveryBoy);
    console.log("🔵 [useEffect] user_id:", id);

    if (!id) {
      console.warn("⚠️ [useEffect] No user_id — skipping fetch");
      setStatusLoading(false);
      return;
    }

    // ✅ async IIFE சரியா இருக்கு
    (async () => {
      try {
        console.log("📡 [fetchDeliveryBoyDetails] Calling API for id:", id);
        const res = await fetchDeliveryBoyDetails(id);
        console.log("✅ [fetchDeliveryBoyDetails] Full response:", res);

        const detail = res?.delivery_boy_details;
        console.log("✅ [fetchDeliveryBoyDetails] detail:", detail);
        console.log("✅ [fetchDeliveryBoyDetails] detail.status:", detail?.status);

        if (detail?.status) {
          const normalized = detail.status.toLowerCase();
          console.log("✅ [fetchDeliveryBoyDetails] Setting status to:", normalized);
            // ✅ busy ஆனா state update பண்ணாதே
          if (normalized !== "busy") {
            setStatus(normalized);
          } else {
            setStatus("online")
            console.warn("⚠️ Status is busy — state unchanged");
            
          }
        } else {
          console.warn("⚠️ [fetchDeliveryBoyDetails] No status in response");
        }
      } catch (err) {

        console.error("❌ [fetchDeliveryBoyDetails] Error:", err);
        console.error("❌ [fetchDeliveryBoyDetails] Response data:", err?.response?.data);
      } finally {
        setStatusLoading(false);
        console.log("🏁 [fetchDeliveryBoyDetails] Done — statusLoading = false");
      }
    })();
  }, [deliveryBoy?.user_id]);

  // ── Derived values — ✅ ஒரே இடத்துல define ──
  // Bug 3 Fix: உன் code-ல் இரண்டு இடத்துல declare ஆகி இருந்தது → crash
  const statusKey = status ?? "online";
  const statusCfg = STATUS_CONFIG[statusKey] ?? STATUS_CONFIG["online"];
  // const isOnline  = statusKey === "online";
  const isBusy = statusKey === "busy";
  console.log("isbusy",isBusy)
const isOnline = statusKey === "online" || statusKey === "busy";
console.log("isonline",isOnline)

  console.log("📊 [RENDER] status:", status, "| statusKey:", statusKey, "| isOnline:", isOnline);
  console.log("📊 [RENDER] statusLoading:", statusLoading, "| toggleLoading:", toggleLoading);

  // ── Toggle handler ────────────────────────────────────────
  const handleToggle = async () => {
    console.log("🖱️ [handleToggle] Clicked");
    console.log("🖱️ [handleToggle] toggleLoading:", toggleLoading, "| statusLoading:", statusLoading);

    if (toggleLoading || statusLoading) {
      console.warn("⚠️ [handleToggle] Blocked — loading in progress");
      return;
    }

    const id = deliveryBoy?.user_id;
    if (!id) {
      console.warn("⚠️ [handleToggle] No user_id");
      return;
    }

    setToggleLoading(true);
    try {
      const goingOnline = statusKey !== "online";
      console.log("🔀 [handleToggle] Current statusKey:", statusKey, "| goingOnline:", goingOnline);

      const payload = {
        available: goingOnline,
        status: goingOnline ? "Online" : "Offline",
      };
      console.log("📤 [handleToggle] Payload:", payload);

      const res = await changeDeliveryBoyStatus(id, payload);
      console.log("✅ [handleToggle] API response:", res);

      const newStatus = res?.current_status?.toLowerCase();
      console.log("✅ [handleToggle] New status from API:", newStatus);

      // ✅ busy-ஆ வந்தா state update பண்ணாதே
      if (newStatus && newStatus !== "busy") {
        setStatus(newStatus);
      } else if (newStatus === "busy") {
        console.warn("⚠️ [handleToggle] No current_status in response — check API response structure");
      }
    } catch (err) {
          console.error("❌ Full error object:", err);         // முழு error பாரு
          console.error("❌ err.response:", err?.response);
          console.error("❌ err.message:", err?.message);
          console.error("❌ err itself:", JSON.stringify(err));
  console.error("❌ Toggle failed:", err?.message?.data?.detail);
  
  const errMsg = err?.data?.detail || err?.message || "Something went wrong.";
  
  // ✅ screen-ல் popup show பண்ணு
  dispatch(showNotification({
    message: errMsg,
    severity: "error",
  }));
} finally {
      setToggleLoading(false);
      console.log("🏁 [handleToggle] Done");
    }
  };

  // ── Dropdown menu ─────────────────────────────────────────
  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);
  const handleMenuOpen  = (e) => setAnchorEl(e.currentTarget);
  const handleMenuClose = ()  => setAnchorEl(null);

  const handleLogout = () => {
    handleMenuClose();
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem("isLoggedIn");        // sessionStorage → localStorage
    localStorage.removeItem("deliveryPopupShown")
    logout();
    navigate(`/${deliveryPath}/login`);
  };

  // ── Toggle UI ─────────────────────────────────────────────
  const ToggleButton = () => {
    // Bug 4 Fix: உன் code-ல் "const isDisabled = ... || status" இருந்தது
    // status = "offline" string → truthy → always disabled ❌
    const isDisabled = toggleLoading || statusLoading; //
 // ✅ busy-லயும் toggle online-ஆ இருக்கும்
// const isDisabled = toggleLoading || statusLoading || isBusy; // ✅ busy-ல் click பண்ண முடியாது
    console.log("🎛️ [ToggleButton] isDisabled:", isDisabled, "| isOnline:", isOnline);

    return (
      <Tooltip
        //  title={isOnline ? "Go Offline" : "Go Online"}
                title={
          isBusy
            ? "Complete delivery first"
            : isOnline
            ? "Go offline"
            : "Go online"
        }
        arrow
      >
        <Box
          onClick={isDisabled ? undefined : handleToggle}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            cursor: isDisabled ? "not-allowed" : "pointer",
            userSelect: "none",
          }}
        >
          <Typography
            sx={{
              fontSize: "0.72rem",
              fontWeight: 700,
              color: isDisabled ? "#94A3B8" : statusCfg.textColor,
              // cursor: isBusy ? "not-allowed" : isDisabled ? "not-allowed" : "pointer",
              display: { xs: "none", sm: "block" },
              letterSpacing: "0.03em",
              transition: "color 0.2s",
            }}
          >
            {statusLoading ? "Loading…" : statusCfg.label}
          </Typography>

          <Box
            sx={{
              position: "relative",
              width: 44,
              height: 24,
              borderRadius: 999,
              backgroundColor: isBusy
                  ? "#22C55E"          // ✅ busy → green (online position)
                  : isDisabled
                  ? "#E2E8F0"          // loading → gray
                  : isOnline
                  ? "#22C55E"          // online → green
                  : "#CBD5E1",
              transition: "background-color 0.25s ease",
              flexShrink: 0,
              border: "1.5px solid",
              borderColor: isBusy
                  ? "#16A34A"          // ✅ busy → green border
                  : isDisabled
                  ? "#CBD5E1"
                  : isOnline
                  ? "#16A34A"
                  : "#94A3B8"
            }}
          >
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                transform: `translate(${isOnline ? "22px" : "2px"}, -50%)`,
                width: 18,
                height: 18,
                borderRadius: "50%",
                backgroundColor: "#FFFFFF",
                boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
                transition: "transform 0.25s ease",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {(toggleLoading || statusLoading) && (
                <CircularProgress
                  size={11}
                  thickness={5}
                  sx={{ color: isOnline ? "#22C55E" : "#94A3B8" }}
                />
              )}
            </Box>
          </Box>
        </Box>
      </Tooltip>
    );
  };

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        width: { md: `calc(100% - ${SIDEBAR_WIDTH}px)` },
        ml: { md: `${SIDEBAR_WIDTH}px` },
        backgroundColor: "#FFFFFF",
        borderBottom: "1px solid #E2E8F0",
        zIndex: (theme) => theme.zIndex.drawer - 1,
      }}
    >
      <Toolbar
        sx={{
          minHeight: { xs: 64, md: 68 },
          px: { xs: 2, md: 3 },
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {isMobile && (
            <IconButton
              onClick={onMenuClick}
              size="small"
              sx={{
                color: "#1E293B",
                mr: 0.5,
                border: "1px solid #E2E8F0",
                borderRadius: "8px",
                p: "6px",
              }}
            >
              <MenuRoundedIcon fontSize="small" />
            </IconButton>
          )}
          <Box>
            <Typography
              variant="h6"
              sx={{
                color: "#0F172A",
                fontWeight: 700,
                fontSize: { xs: "0.95rem", md: "1.05rem" },
                lineHeight: 1.2,
              }}
            >
              SM VegMart
            </Typography>
            <Typography
              sx={{
                color: "#94A3B8",
                fontSize: "0.72rem",
                fontWeight: 500,
                letterSpacing: "0.04em",
                display: { xs: "none", sm: "block" },
              }}
            >
              Delivery Management Portal
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <ToggleButton />

          <Tooltip title="Account options" arrow>
            <Box
              onClick={handleMenuOpen}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                cursor: "pointer",
                borderRadius: "10px",
                px: 1,
                py: 0.5,
                border: "1px solid #E2E8F0",
                "&:hover": { backgroundColor: "#F8FAFC" },
                transition: "background 0.2s",
              }}
            >
              <Box sx={{ position: "relative" }}>
                <Avatar
                  sx={{
                    width: 34,
                    height: 34,
                    backgroundColor: "#F97316",
                    fontSize: "0.8rem",
                    fontWeight: 700,
                  }}
                >
                  {getInitials(name)}
                </Avatar>
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    backgroundColor: statusCfg.color,
                    border: "2px solid #FFFFFF",
                    transition: "background-color 0.3s",
                  }}
                />
              </Box>

              <Box sx={{ display: { xs: "none", sm: "block" } }}>
                <Typography sx={{ color: "#0F172A", fontWeight: 600, fontSize: "0.825rem", lineHeight: 1.2 }}>
                  {name}
                </Typography>
                <Typography sx={{ color: "#94A3B8", fontSize: "0.7rem", lineHeight: 1 }}>
                  Delivery Agent
                </Typography>
              </Box>

              <KeyboardArrowDownRoundedIcon
                sx={{ color: "#94A3B8", fontSize: 18, display: { xs: "none", sm: "block" } }}
              />
            </Box>
          </Tooltip>
        </Box>
      </Toolbar>

      <Menu
        anchorEl={anchorEl}
        open={menuOpen}
        onClose={handleMenuClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        PaperProps={{
          elevation: 0,
          sx: {
            mt: 1,
            minWidth: 200,
            borderRadius: "12px",
            border: "1px solid #E2E8F0",
            boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
          },
        }}
      >
        <Box sx={{ px: 2, py: 1.5 }}>
          <Typography sx={{ fontWeight: 700, fontSize: "0.875rem", color: "#0F172A" }}>
            {name}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mt: 0.3 }}>
            <FiberManualRecordRoundedIcon sx={{ fontSize: 9, color: statusCfg.color }} />
            <Typography sx={{ fontSize: "0.75rem", color: statusCfg.textColor, fontWeight: 500 }}>
              {statusCfg.label}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ borderColor: "#F1F5F9" }} />

        <MenuItem
          onClick={handleLogout}
          sx={{
            py: 1.2,
            gap: 1.5,
            fontSize: "0.875rem",
            color: "#EF4444",
            "&:hover": { backgroundColor: "#FEF2F2" },
          }}
        >
          <LogoutRoundedIcon fontSize="small" sx={{ color: "#EF4444" }} />
          Logout
        </MenuItem>
      </Menu>
    </AppBar>
  );
};

export default DeliveryNavbar;







// 

// // 📁 src/webdelivery/components/layout/DeliveryNavBar.jsx

// import {
//   AppBar,
//   Toolbar,
//   Box,
//   Typography,
//   Avatar,
//   Chip,
//   IconButton,
//   Menu,
//   MenuItem,
//   Divider,
//   Tooltip,
//   CircularProgress,
//   useTheme,
//   useMediaQuery,
// } from "@mui/material";
// import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
// import FiberManualRecordRoundedIcon from "@mui/icons-material/FiberManualRecordRounded";
// import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
// import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { SIDEBAR_WIDTH } from "./DeliverySideBar";
// import useDeliveryAuth from "../../hooks/useDeliveryAuth";
// import {
//   fetchDeliveryBoyDetails,
//   changeDeliveryBoyStatus,
// } from "../../api/DeliveryApi";

// /**
//  * DeliveryNavbar
//  *
//  * Status toggle behaviour:
//  * 1. On mount → fetchDeliveryBoyDetails to get real current status
//  * 2. Toggle click → call changeDeliveryBoyStatus API first
//  * 3. Only on API success → update local status state
//  * 4. While API call is in progress → toggle is disabled + spinner shown
//  */

// const STATUS_CONFIG = {
//   Online:  { label: "Available", color: "#22C55E", bg: "rgba(34,197,94,0.1)",  textColor: "#15803D" },
//   Offline: { label: "Offline",   color: "#94A3B8", bg: "rgba(148,163,184,0.1)", textColor: "#475569" },
//   On_Delivery: { label: "On Delivery", color: "#F97316", bg: "rgba(249,115,22,0.1)", textColor: "#C2410C" },
// };

// const getInitials = (name = "") =>
//   name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);

// const DeliveryNavbar = ({ onMenuClick }) => {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("md"));
//   const navigate = useNavigate();
//   const { deliveryBoy, logout } = useDeliveryAuth();
//   const name = deliveryBoy?.name ?? "Delivery Agent";

//   // ── Status state ──────────────────────────────────────────
//   // null = not yet loaded from API
//   const [status, setStatus]           = useState(null);
//   const [statusLoading, setStatusLoading] = useState(true); // true on mount (fetching)
//   const [toggleLoading, setToggleLoading] = useState(false); // true while toggle API call runs

//   // ── Fetch real status on mount ────────────────────────────
//   useEffect(() => {
//     const id = deliveryBoy?.user_id;
//     if (!id) { setStatusLoading(false); return; }

//     (async () => {
//       try {
//         const res = await fetchDeliveryBoyDetails(id);
//         // res.data shape: { status: "Online"|"Offline"|"On_Delivery", ... }
//         setStatus(res?.data?.status ?? "Offline");
//       } catch {
//         setStatus("Offline");
//       } finally {
//         setStatusLoading(false);
//       }
//     })();
//   }, [deliveryBoy?.user_id]);

//   // ── Toggle handler ────────────────────────────────────────
//   const handleToggle = async () => {
//     if (toggleLoading || statusLoading) return;
//     const id = deliveryBoy?.user_id;
//     if (!id) return;

//     setToggleLoading(true);
//     try {
//       const res = await changeDeliveryBoyStatus(id);
//       // API response: { data: { status: "Success", current_status: "Online"|"Offline", is_available: bool } }
//       const newStatus = res?.data?.current_status;
//       if (newStatus) setStatus(newStatus);
//     } catch {
//       // API failed — do not change status
//     } finally {
//       setToggleLoading(false);
//     }
//   };

//   // ── Dropdown menu ─────────────────────────────────────────
//   const [anchorEl, setAnchorEl] = useState(null);
//   const menuOpen = Boolean(anchorEl);
//   const handleMenuOpen  = (e) => setAnchorEl(e.currentTarget);
//   const handleMenuClose = ()  => setAnchorEl(null);

//   const handleLogout = () => {
//     handleMenuClose();
//     logout();
//     navigate("/delivery/login");
//   };

//   // ── Derived display values ────────────────────────────────
//   const statusKey = status ?? "Offline";
//   const statusCfg = STATUS_CONFIG[statusKey] ?? STATUS_CONFIG["Offline"];
//   const isOnline  = statusKey === "Online";

//   // ── Toggle UI ─────────────────────────────────────────────
//   const ToggleButton = () => {
//     const isDisabled = toggleLoading || statusLoading;

//     return (
//       <Tooltip
//         title={isDisabled ? "Updating…" : isOnline ? "Go Offline" : "Go Online"}
//         arrow
//       >
//         <Box
//           onClick={isDisabled ? undefined : handleToggle}
//           sx={{
//             display: "flex",
//             alignItems: "center",
//             gap: 1,
//             cursor: isDisabled ? "not-allowed" : "pointer",
//             userSelect: "none",
//           }}
//         >
//           {/* Label */}
//           <Typography
//             sx={{
//               fontSize: "0.72rem",
//               fontWeight: 700,
//               color: isDisabled ? "#94A3B8" : statusCfg.textColor,
//               display: { xs: "none", sm: "block" },
//               letterSpacing: "0.03em",
//               transition: "color 0.2s",
//             }}
//           >
//             {statusLoading ? "Loading…" : statusCfg.label}
//           </Typography>

//           {/* Toggle track */}
//           <Box
//             sx={{
//               position: "relative",
//               width: 44,
//               height: 24,
//               borderRadius: 999,
//               backgroundColor: isDisabled
//                 ? "#E2E8F0"
//                 : isOnline
//                 ? "#22C55E"
//                 : "#CBD5E1",
//               transition: "background-color 0.25s ease",
//               flexShrink: 0,
//               border: "1.5px solid",
//               borderColor: isDisabled
//                 ? "#CBD5E1"
//                 : isOnline
//                 ? "#16A34A"
//                 : "#94A3B8",
//             }}
//           >
//             {/* Thumb */}
//             <Box
//               sx={{
//                 position: "absolute",
//                 top: "50%",
//                 transform: `translate(${isOnline ? "22px" : "2px"}, -50%)`,
//                 width: 18,
//                 height: 18,
//                 borderRadius: "50%",
//                 backgroundColor: "#FFFFFF",
//                 boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
//                 transition: "transform 0.25s ease",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//               }}
//             >
//               {/* Spinner inside thumb while loading */}
//               {(toggleLoading || statusLoading) && (
//                 <CircularProgress
//                   size={11}
//                   thickness={5}
//                   sx={{ color: isOnline ? "#22C55E" : "#94A3B8" }}
//                 />
//               )}
//             </Box>
//           </Box>
//         </Box>
//       </Tooltip>
//     );
//   };

//   return (
//     <AppBar
//       position="fixed"
//       elevation={0}
//       sx={{
//         width: { md: `calc(100% - ${SIDEBAR_WIDTH}px)` },
//         ml: { md: `${SIDEBAR_WIDTH}px` },
//         backgroundColor: "#FFFFFF",
//         borderBottom: "1px solid #E2E8F0",
//         zIndex: (theme) => theme.zIndex.drawer - 1,
//       }}
//     >
//       <Toolbar
//         sx={{
//           minHeight: { xs: 64, md: 68 },
//           px: { xs: 2, md: 3 },
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//         }}
//       >
//         {/* ── Left: Hamburger + Title ── */}
//         <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//           {isMobile && (
//             <IconButton
//               onClick={onMenuClick}
//               size="small"
//               sx={{
//                 color: "#1E293B",
//                 mr: 0.5,
//                 border: "1px solid #E2E8F0",
//                 borderRadius: "8px",
//                 p: "6px",
//               }}
//             >
//               <MenuRoundedIcon fontSize="small" />
//             </IconButton>
//           )}
//           <Box>
//             <Typography
//               variant="h6"
//               sx={{
//                 color: "#0F172A",
//                 fontWeight: 700,
//                 fontSize: { xs: "0.95rem", md: "1.05rem" },
//                 lineHeight: 1.2,
//               }}
//             >
//               SM VegMart
//             </Typography>
//             <Typography
//               sx={{
//                 color: "#94A3B8",
//                 fontSize: "0.72rem",
//                 fontWeight: 500,
//                 letterSpacing: "0.04em",
//                 display: { xs: "none", sm: "block" },
//               }}
//             >
//               Delivery Management Portal
//             </Typography>
//           </Box>
//         </Box>

//         {/* ── Right: Toggle + Avatar ── */}
//         <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>

//           {/* ── Status Toggle ── */}
//           <ToggleButton />

//           {/* ── Avatar dropdown ── */}
//           <Tooltip title="Account options" arrow>
//             <Box
//               onClick={handleMenuOpen}
//               sx={{
//                 display: "flex",
//                 alignItems: "center",
//                 gap: 1,
//                 cursor: "pointer",
//                 borderRadius: "10px",
//                 px: 1,
//                 py: 0.5,
//                 border: "1px solid #E2E8F0",
//                 "&:hover": { backgroundColor: "#F8FAFC" },
//                 transition: "background 0.2s",
//               }}
//             >
//               <Box sx={{ position: "relative" }}>
//                 <Avatar
//                   sx={{
//                     width: 34,
//                     height: 34,
//                     backgroundColor: "#F97316",
//                     fontSize: "0.8rem",
//                     fontWeight: 700,
//                   }}
//                 >
//                   {getInitials(name)}
//                 </Avatar>
//                 {/* Status dot on avatar */}
//                 <Box
//                   sx={{
//                     position: "absolute",
//                     bottom: 0,
//                     right: 0,
//                     width: 10,
//                     height: 10,
//                     borderRadius: "50%",
//                     backgroundColor: statusCfg.color,
//                     border: "2px solid #FFFFFF",
//                     transition: "background-color 0.3s",
//                   }}
//                 />
//               </Box>

//               <Box sx={{ display: { xs: "none", sm: "block" } }}>
//                 <Typography sx={{ color: "#0F172A", fontWeight: 600, fontSize: "0.825rem", lineHeight: 1.2 }}>
//                   {name}
//                 </Typography>
//                 <Typography sx={{ color: "#94A3B8", fontSize: "0.7rem", lineHeight: 1 }}>
//                   Delivery Agent
//                 </Typography>
//               </Box>

//               <KeyboardArrowDownRoundedIcon
//                 sx={{ color: "#94A3B8", fontSize: 18, display: { xs: "none", sm: "block" } }}
//               />
//             </Box>
//           </Tooltip>
//         </Box>
//       </Toolbar>

//       {/* ── Dropdown Menu ── */}
//       <Menu
//         anchorEl={anchorEl}
//         open={menuOpen}
//         onClose={handleMenuClose}
//         transformOrigin={{ horizontal: "right", vertical: "top" }}
//         anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
//         PaperProps={{
//           elevation: 0,
//           sx: {
//             mt: 1,
//             minWidth: 200,
//             borderRadius: "12px",
//             border: "1px solid #E2E8F0",
//             boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
//           },
//         }}
//       >
//         <Box sx={{ px: 2, py: 1.5 }}>
//           <Typography sx={{ fontWeight: 700, fontSize: "0.875rem", color: "#0F172A" }}>
//             {name}
//           </Typography>
//           <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mt: 0.3 }}>
//             <FiberManualRecordRoundedIcon sx={{ fontSize: 9, color: statusCfg.color }} />
//             <Typography sx={{ fontSize: "0.75rem", color: statusCfg.textColor, fontWeight: 500 }}>
//               {statusCfg.label}
//             </Typography>
//           </Box>
//         </Box>

//         <Divider sx={{ borderColor: "#F1F5F9" }} />

//         <MenuItem
//           onClick={handleLogout}
//           sx={{
//             py: 1.2,
//             gap: 1.5,
//             fontSize: "0.875rem",
//             color: "#EF4444",
//             "&:hover": { backgroundColor: "#FEF2F2" },
//           }}
//         >
//           <LogoutRoundedIcon fontSize="small" sx={{ color: "#EF4444" }} />
//           Logout
//         </MenuItem>
//       </Menu>
//     </AppBar>
//   );
// };

// export default DeliveryNavbar;


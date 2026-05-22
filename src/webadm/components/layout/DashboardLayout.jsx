
// UI ONLY CHANGED CODE

import React, { useState, useEffect } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
  Tooltip,
  Collapse,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

import AllProduct from "../../features/products/AllProduct";
import AllCategory from "../../features/category/AllCategory";
import AllSubCategory from "../../features/subcategory/AllSubCategory";
import MassUpload from "../../features/massupload/MassUpload"
import OrderPage from "../../features/ordermanagement/pages/OrderPage";
import Notification from "../../features/notification/Notification";
import Navbar from "./AdmNavbar";
import { DashboardContext } from "../../context/AuthContext";

// Icons
import StreamSharpIcon from "@mui/icons-material/StreamSharp";
import AllInboxIcon from "@mui/icons-material/AllInbox";
import ApprovalIcon from "@mui/icons-material/Approval";
import CategoryIcon from "@mui/icons-material/Category";
import PaymentIcon from "@mui/icons-material/Payment";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import CatchingPokemonIcon from "@mui/icons-material/CatchingPokemon";
import GroupIcon from "@mui/icons-material/Group";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import BusinessIcon from "@mui/icons-material/Business";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import CusUser from "../../features/usermanagement/components/CusUser";
import DashboradView from "../../features/dashborad/DashboradView";
import BackupTableIcon from "@mui/icons-material/BackupTable";
import UploadFileIcon from "@mui/icons-material/UploadFile";
// minimum order page
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import MinimumOrderPage from "../../features/minimumordermanagement/pages/MinimumOrderPage";

// delivery boy management
import TwoWheelerIcon from "@mui/icons-material/TwoWheeler";
import DeliveryBoyPage from "../../features/deliveryboymanagement/pages/DeliveryBoyPage";
// adminpath url
const adminPath = import.meta.env.VITE_ADMIN_PATH;
// ── Constants ──────────────────────────────────────────────
const SIDEBAR_COLLAPSED = 64;
const SIDEBAR_EXPANDED  = 240;

// ── Reusable: animated text reveal wrapper ─────────────────
const RevealText = ({ show, children, sx = {} }) => (
  <Box
    sx={{
      overflow : "hidden",
      maxWidth : show ? 200 : 0,
      opacity  : show ? 1   : 0,
      transition: "max-width 0.35s cubic-bezier(0.4,0,0.2,1), opacity 0.25s ease",
      whiteSpace: "nowrap",
      ...sx,
    }}
  >
    {children}
  </Box>
);

export default function DashboardLayout() {
  const [selected,    setSelected]    = useState("Dashboard");
  const [hover,       setHover]       = useState(false);
  const [openMaster,  setOpenMaster]  = useState(false);

  const menuItems = [
    { name: "Dashboard",        icon: <SpaceDashboardIcon /> },
    { name: "User Management",  icon: <GroupIcon /> },
    {
      name: "Master Management",
      icon: <CatchingPokemonIcon />,
      children: [
        { name: "Categories",   icon: <AllInboxIcon /> },
        { name: "SubCategory",  icon: <ApprovalIcon /> },
        { name: "All Products", icon: <CategoryIcon /> },
        { name: "Mass Upload", icon: <UploadFileIcon /> },

      ],
    },
    { name: "Order Management", icon: <PaymentIcon /> },
    { name: "Notifications",    icon: <NotificationsNoneIcon /> },

    { name: "Min. Order Management", icon: <LocalShippingOutlinedIcon /> },
    { name: "Delivery Boy Management", icon: <TwoWheelerIcon /> },
  ];

  const navigate = useNavigate();

  // ✅ Token check - இல்லன்னா signin-க்கு அனுப்பு
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate(`/${adminPath}/signin`);
    }
  }, []);

  // Logout fix
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("adm_user");    
    navigate(`/${adminPath}/signin`); // ✅ "/" இல்ல, "/admin/signin"
  };

  useEffect(() => {
    const masterChildren = ["Categories", "SubCategory", "All Products"];
    if (masterChildren.includes(selected)) {
      setOpenMaster(true);
    }
  }, [selected]);

  const renderComponent = () => {
    switch (selected) {
      case "Categories":       return <AllCategory />;
      case "SubCategory":      return <AllSubCategory />;
      case "All Products":     return <AllProduct />;
      case "Mass Upload":     return <MassUpload />;
      case "Dashboard":        return <DashboradView />;
      case "Order Management": return <OrderPage />;
      case "Notifications":    return <Notification />;
      case "User Management":  return <CusUser />;
      case "Min. Order Management": return <MinimumOrderPage />;
      case "Delivery Boy Management": return <DeliveryBoyPage />;
      default:
        return (
          <Typography variant="h5" sx={{ p: 4 }}>
            {selected} Page
          </Typography>
        );
    }
  };

  // ── Shared icon sx ─────────────────────────────────────────
  const iconSx = (active) => ({
    color    : active ? "#fff" : "rgba(255,255,255,0.72)",
    minWidth : 0,
    mr       : hover ? 1.75 : 0,
    justifyContent: "center",
    transition: "margin 0.3s ease",
    "& .MuiSvgIcon-root": { fontSize: "1.2rem" },
  });

  // ── Shared button sx ───────────────────────────────────────
  const btnSx = (active, hoverBg = "rgba(255,255,255,0.08)") => ({
    borderRadius: "10px",
    mb          : 0.5,
    minHeight   : 44,
    px          : 1.25,
    justifyContent: hover ? "flex-start" : "center",
    backgroundColor: active ? "#1c2a52" : "transparent",
    transition  : "background-color 0.2s ease",
    "&:hover"   : { backgroundColor: active ? "#1c2a52" : hoverBg },
  });

  return (
    <DashboardContext.Provider value={{ selected, setSelected }}>
      <Box
        sx={{
          display : "flex",
          height  : "100vh",
          width   : "100vw",
          overflow: "hidden",
          background: "#f5f6f8",
        }}
      >
        {/* ════════════════════════════════════════
            SIDEBAR
        ════════════════════════════════════════ */}
        <Box
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          sx={{
            width     : hover ? SIDEBAR_EXPANDED : SIDEBAR_COLLAPSED,
            transition: "width 0.35s cubic-bezier(0.4,0,0.2,1), box-shadow 0.35s ease",
            backgroundColor: "#095c90",
            color          : "#fff",
            display        : "flex",
            flexDirection  : "column",
            position       : "fixed",
            left  : 0,
            top   : 0,
            height: "100vh",
            zIndex: 1300, // overlaps content + navbar
            overflowY : "auto",
            overflowX : "hidden",
            "&::-webkit-scrollbar": { display: "none" },
            msOverflowStyle: "none",
            scrollbarWidth : "none",
            boxShadow: hover
              ? "6px 0 28px rgba(0,0,0,0.30)"
              : "2px 0 8px rgba(0,0,0,0.18)",
          }}
        >

          {/* ── Brand / Logo ─────────────────────── */}
          <Box
            sx={{
              display       : "flex",
              alignItems    : "center",
              justifyContent: hover ? "flex-start" : "center",
              // justifyContent: "center",
              px        : hover ? 1.5 : 0,
              height    : { xs: 56, sm: 64 }, // exact AppBar height match → no gap
              // width: "100%",
              flexShrink: 0,
              transition: "padding 0.35s ease",
              borderBottom: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            {/*
              SM Badge — always visible.
              Design: rounded square, white text on a layered
              dark-blue gradient with a crisp ring border.
            */}
            <Box
              sx={{
                position      : "relative",
                width         : 40,
                height        : 40,
                borderRadius  : "11px",
                flexShrink    : 0,
                background    : "linear-gradient(145deg, #0d2f5c 0%, #154f8a 60%, #1a6aaa 100%)",
                border        : "1.5px solid rgba(255,255,255,0.22)",
                display       : "flex",
                alignItems    : "center",
                justifyContent: "center",
                boxShadow     : "0 3px 10px rgba(0,0,0,0.40), inset 0 1px 0 rgba(255,255,255,0.12)",
                // subtle shimmer line at the top
                "&::before": {
                  content     : '""',
                  position    : "absolute",
                  top         : 0,
                  left        : "15%",
                  width       : "70%",
                  height      : "1px",
                  background  : "rgba(255,255,255,0.28)",
                  borderRadius: "50%",
                },
              }}
            >
              <Typography
                sx={{
                  color      : "#fff",
                  fontWeight : 800,
                  fontSize   : "0.7rem",
                  letterSpacing: "0.08em",
                  lineHeight : 1,
                  userSelect : "none",
                  textShadow : "0 1px 4px rgba(0,0,0,0.5)",
                }}
              >
                SM
              </Typography>
            </Box>

            {/* Brand text — revealed on expand */}
            <RevealText show={hover} 
            // sx={{ ml: 2.5 }}
             sx={{ ml: hover ? 2.5 : 0 }}
            >
              {/* Product name */}
              <Typography
                sx={{
                  color      : "#fff",
                  fontWeight : 700,
                  fontSize   : { xs: "0.88rem", sm: "0.96rem" },
                  letterSpacing: "0.01em",
                  lineHeight : 1.25,
                }}
              >
                SM Veg Mart
              </Typography>
              {/* Subtle role tag */}
              <Box
                sx={{
                  display      : "inline-flex",
                  alignItems   : "center",
                  mt           : 0.3,
                  px           : 0.75,
                  py           : "1px",
                  borderRadius : "4px",
                  background   : "rgba(255,255,255,0.10)",
                  border       : "1px solid rgba(255,255,255,0.14)",
                }}
              >
                <Typography
                  sx={{
                    color        : "rgba(255,255,255,0.55)",
                    fontSize     : "0.58rem",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    fontWeight   : 600,
                    lineHeight   : 1.4,
                  }}
                >
                  Admin Panel
                </Typography>
              </Box>
            </RevealText>
          </Box>

          {/* ── Menu ─────────────────────────────── */}
          <Box sx={{ flexGrow: 1, pt: 1 }}>
            <List sx={{ px: 0.75 }}>
              {menuItems.map((item) => {

                /* ── Parent with children ── */
                if (item.children) {
                  return (
                    <Box key={item.name}>
                      <ListItem disablePadding>
                        <Tooltip title={!hover ? item.name : ""} placement="right" arrow>
                          <ListItemButton
                            onClick={() => setOpenMaster(!openMaster)}
                            sx={btnSx(false)}
                          >
                            <ListItemIcon sx={iconSx(false)}>
                              {item.icon}
                            </ListItemIcon>

                            <RevealText show={hover} sx={{ flex: 1 }}>
                              <Box
                                sx={{
                                  display       : "flex",
                                  alignItems    : "center",
                                  justifyContent: "space-between",
                                  pr            : 0.5,
                                }}
                              >
                                <ListItemText
                                  primary={item.name}
                                  sx={{
                                    "& .MuiTypography-root": {
                                      fontSize  : { xs: "0.8rem", sm: "0.85rem" },
                                      fontWeight: 500,
                                      color     : "rgba(255,255,255,0.85)",
                                    },
                                  }}
                                />
                                {openMaster
                                  ? <ExpandLess sx={{ fontSize: "1rem", color: "rgba(255,255,255,0.45)", flexShrink: 0 }} />
                                  : <ExpandMore sx={{ fontSize: "1rem", color: "rgba(255,255,255,0.45)", flexShrink: 0 }} />
                                }
                              </Box>
                            </RevealText>
                          </ListItemButton>
                        </Tooltip>
                      </ListItem>

                      {/* Sub-items */}
                      <Collapse in={openMaster && hover}>
                        <List component="div" disablePadding>
                          {item.children.map((sub) => (
                            <ListItem key={sub.name} disablePadding>
                              <ListItemButton
                                onClick={() => setSelected(sub.name)}
                                sx={{
                                  pl             : 3.5,
                                  borderRadius   : "10px",
                                  mb             : 0.5,
                                  minHeight      : 40,
                                  backgroundColor: selected === sub.name ? "#1e1f4f" : "transparent",
                                  "&:hover"      : {
                                    backgroundColor: selected === sub.name
                                      ? "#1e1f4f"
                                      : "rgba(255,255,255,0.08)",
                                  },
                                }}
                              >
                                <ListItemIcon
                                  sx={{
                                    color  : selected === sub.name ? "#fff" : "#9ca3af",
                                    minWidth: 0,
                                    mr     : 1.5,
                                    "& .MuiSvgIcon-root": { fontSize: "1.05rem" },
                                  }}
                                >
                                  {sub.icon}
                                </ListItemIcon>
                                <ListItemText
                                  primary={sub.name}
                                  sx={{
                                    "& .MuiTypography-root": {
                                      fontSize  : { xs: "0.78rem", sm: "0.82rem" },
                                      fontWeight: selected === sub.name ? 600 : 400,
                                      color     : selected === sub.name
                                        ? "#fff"
                                        : "rgba(255,255,255,0.70)",
                                    },
                                  }}
                                />
                              </ListItemButton>
                            </ListItem>
                          ))}
                        </List>
                      </Collapse>
                    </Box>
                  );
                }

                /* ── Regular item ── */
                return (
                  <ListItem key={item.name} disablePadding>
                    <Tooltip title={!hover ? item.name : ""} placement="right" arrow>
                      <ListItemButton
                        onClick={() => setSelected(item.name)}
                        sx={btnSx(selected === item.name)}
                      >
                        <ListItemIcon sx={iconSx(selected === item.name)}>
                          {item.icon}
                        </ListItemIcon>

                        <RevealText show={hover}>
                          <ListItemText
                            primary={item.name}
                            sx={{
                              "& .MuiTypography-root": {
                                fontSize  : { xs: "0.8rem", sm: "0.85rem" },
                                fontWeight: selected === item.name ? 600 : 400,
                                color     : selected === item.name
                                  ? "#fff"
                                  : "rgba(255,255,255,0.85)",
                              },
                            }}
                          />
                        </RevealText>
                      </ListItemButton>
                    </Tooltip>
                  </ListItem>
                );
              })}
            </List>
          </Box>

          {/* ── Bottom / Logout ─────────────────── */}
          <Box sx={{ pb: 1.5, flexShrink: 0 }}>
            <Divider sx={{ backgroundColor: "#0b2d48", mx: 1, my: 1 }} />
            <List sx={{ px: 0.75 }}>
              <ListItem disablePadding>
                <Tooltip title={!hover ? "Logout" : ""} placement="right" arrow>
                  <ListItemButton
                    onClick={handleLogout}
                    sx={btnSx(false, "rgba(239,68,68,0.13)")}
                  >
                    <LogoutIcon
                      sx={{
                        color     : "rgba(255,255,255,0.72)",
                        mr        : hover ? 1.75 : 0,
                        transition: "margin 0.3s ease",
                        flexShrink: 0,
                        fontSize  : "1.2rem",
                      }}
                    />
                    <RevealText show={hover}>
                      <ListItemText
                        primary="Logout"
                        sx={{
                          "& .MuiTypography-root": {
                            fontSize : { xs: "0.8rem", sm: "0.85rem" },
                            fontWeight: 400,
                            color    : "rgba(255,255,255,0.85)",
                          },
                        }}
                      />
                    </RevealText>
                  </ListItemButton>
                </Tooltip>
              </ListItem>
            </List>
          </Box>
        </Box>

        {/* ════════════════════════════════════════
            MAIN CONTENT
            ml is always the COLLAPSED width only
            → sidebar overlays, content never shifts
        ════════════════════════════════════════ */}
        <Box
          sx={{
            ml           : `${SIDEBAR_COLLAPSED}px`,
            flex         : 1,
            display      : "flex",
            flexDirection: "column",
            minWidth     : 0,
            height       : "100vh",
            overflow     : "hidden",
          }}
        >
          {/* Navbar — sticky, flush with sidebar top → zero gap */}
          <Box
            sx={{
              flexShrink: 0,
              position  : "sticky",
              top       : 0,
              zIndex    : 1100,
            }}
          >
            <Navbar />
          </Box>

          {/* Scrollable page content */}
          <Box
            sx={{
              flexGrow   : 1,
              overflowY  : "auto",
              overflowX  : "hidden",
              p          : { xs: 1.5, sm: 2, md: 3 },
              "&::-webkit-scrollbar"      : { width: "5px" },
              "&::-webkit-scrollbar-track": { background: "transparent" },
              "&::-webkit-scrollbar-thumb": {
                background   : "#c4c4c4",
                borderRadius : "4px",
              },
              "&::-webkit-scrollbar-thumb:hover": { background: "#a0a0a0" },
            }}
          >
            {renderComponent()}
          </Box>
        </Box>
      </Box>
    </DashboardContext.Provider>
  );
}
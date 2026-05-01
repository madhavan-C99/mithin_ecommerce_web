// 📁 src/webdelivery/components/layout/DeliverySideBar.jsx

import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
} from "@mui/material";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import LocalShippingRoundedIcon from "@mui/icons-material/LocalShippingRounded";
import HistoryRoundedIcon from "@mui/icons-material/HistoryRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { useNavigate, useLocation } from "react-router-dom";
import useDeliveryAuth from "../../hooks/useDeliveryAuth";

export const SIDEBAR_WIDTH = 260;

/**
 * ✅ Route paths fixed to match DeliveryRoutes.jsx:
 *   /delivery/dashboard
 *   /delivery/orders       (was /delivery/current-order)
 *   /delivery/history      (was /delivery/order-history)
 *
 * ✅ Logout wired to real context logout()
 */
const navItems = [
  {
    label: "Dashboard",
    icon: <DashboardRoundedIcon fontSize="small" />,
    path: "/delivery/dashboard",
  },
  {
    label: "Current Orders",
    icon: <LocalShippingRoundedIcon fontSize="small" />,
    path: "/delivery/orders",
  },
  {
    label: "Order History",
    icon: <HistoryRoundedIcon fontSize="small" />,
    path: "/delivery/history",
  },
];

const DeliverySidebar = ({ mobileOpen, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useDeliveryAuth();

  const handleNav = (path) => {
    navigate(path);
    if (onClose) onClose();
  };

  // ✅ Real logout — clears context + localStorage
  const handleLogout = () => {
    logout();
    navigate("/delivery/login");
  };

  const drawerContent = (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#0F172A",
      }}
    >
      {/* ── Brand ── */}
      <Box sx={{ px: 3, py: 3, display: "flex", alignItems: "center", gap: 1.5 }}>
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: "12px",
            background: "linear-gradient(135deg, #F97316 0%, #EA580C 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <LocalShippingIcon sx={{ color: "#fff", fontSize: 22 }} />
        </Box>
        <Box>
          <Typography
            sx={{ color: "#FFFFFF", fontWeight: 800, fontSize: "1rem", lineHeight: 1.2, letterSpacing: "-0.01em" }}
          >
            SM VegMart
          </Typography>
          <Typography
            sx={{ color: "#F97316", fontWeight: 600, fontSize: "0.7rem", letterSpacing: "0.08em", textTransform: "uppercase" }}
          >
            Delivery Portal
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ borderColor: "rgba(255,255,255,0.06)", mx: 2 }} />

      {/* ── Navigation ── */}
      <Box sx={{ flex: 1, px: 1.5, py: 2 }}>
        {/* <Typography
          sx={{
            color: "#475569",
            fontSize: "0.68rem",
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            px: 1.5,
            mb: 1,
          }}
        >
          Navigation
        </Typography> */}

        <List disablePadding sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <ListItem key={item.path} disablePadding>
                <ListItemButton
                  onClick={() => handleNav(item.path)}
                  sx={{
                    borderRadius: "10px",
                    px: 1.5,
                    py: 1,
                    backgroundColor: isActive ? "rgba(249,115,22,0.15)" : "transparent",
                    "&:hover": {
                      backgroundColor: isActive
                        ? "rgba(249,115,22,0.2)"
                        : "rgba(255,255,255,0.05)",
                    },
                    transition: "background-color 0.2s ease",
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 36, color: isActive ? "#F97316" : "#64748B" }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{
                      fontSize: "0.875rem",
                      fontWeight: isActive ? 700 : 500,
                      color: isActive ? "#FFFFFF" : "#94A3B8",
                    }}
                  />
                  {isActive && (
                    <Box
                      sx={{
                        width: 3,
                        height: 20,
                        borderRadius: 4,
                        backgroundColor: "#F97316",
                        ml: 1,
                      }}
                    />
                  )}
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>

      <Divider sx={{ borderColor: "rgba(255,255,255,0.06)", mx: 2 }} />

      {/* ── Logout ── */}
      <Box sx={{ px: 1.5, py: 2 }}>
        <ListItemButton
          onClick={handleLogout}
          sx={{
            borderRadius: "10px",
            px: 1.5,
            py: 1,
            "&:hover": {
              backgroundColor: "rgba(239,68,68,0.1)",
              "& .logout-icon, & .logout-text": { color: "#EF4444" },
            },
            transition: "all 0.2s ease",
          }}
        >
          <ListItemIcon sx={{ minWidth: 36 }}>
            <LogoutRoundedIcon
              className="logout-icon"
              fontSize="small"
              sx={{ color: "#64748B", transition: "color 0.2s" }}
            />
          </ListItemIcon>
          <ListItemText
            primary="Logout"
            primaryTypographyProps={{
              fontSize: "0.875rem",
              fontWeight: 500,
              color: "#64748B",
              sx: { transition: "color 0.2s" },
            }}
          />
        </ListItemButton>
      </Box>

      {/* ── Version ── */}
      <Box sx={{ px: 3, pb: 2.5 }}>
        <Typography sx={{ color: "#334155", fontSize: "0.7rem" }}>
          v1.0.0 · Delivery Portal
        </Typography>
      </Box>
    </Box>
  );

  return (
    <Box component="nav" sx={{ width: { md: SIDEBAR_WIDTH }, flexShrink: { md: 0 } }}>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": { width: SIDEBAR_WIDTH },
        }}
      >
        {drawerContent}
      </Drawer>

      <Drawer
        variant="permanent"
        open
        sx={{
          display: { xs: "none", md: "block" },
          "& .MuiDrawer-paper": { width: SIDEBAR_WIDTH, position: "fixed", height: "100vh" },
        }}
      >
        {drawerContent}
      </Drawer>
    </Box>
  );
};

export default DeliverySidebar;

import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Badge,
  Button
} from "@mui/material";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import HomeIcon from "@mui/icons-material/Home";

import { useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { openCartDrawer } from "../../store/UiSlice";

import { useAuth } from "../../context/AuthContext";

const AccountNavbar = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { logout } = useAuth();

  const items = useSelector((state) => state.cart.items);

  const totalItems = items.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  const handleLogout = () => {
    logout();
    localStorage.removeItem("isLoggedIn");        // sessionStorage → localStorage
    localStorage.removeItem("deliveryPopupShown")
    navigate("/", { replace: true });
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        bgcolor: "#4CAF50",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          minHeight: { xs: 56, md: 64 }
        }}
      >

        {/* LEFT SECTION */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>

          <IconButton
            color="inherit"
            onClick={() => navigate("/")}
          >
            <HomeIcon />
          </IconButton>

          <Typography sx={{ mx: 1, opacity: 0.6 }}>
            |
          </Typography>

          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              letterSpacing: 0.3,
              fontSize: { xs: "1rem", md: "1.25rem" }
            }}
          >
            My Account
          </Typography>

        </Box>


        {/* RIGHT SECTION */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>

          <IconButton
            color="inherit"
            // onClick={() => dispatch(openCartDrawer())}
            onClick={() => navigate("/cart")}
            sx={{
              backgroundColor: "rgba(255,255,255,0.15)",
              "&:hover": {
                backgroundColor: "rgba(255,255,255,0.25)"
              }
            }}
          >
            <Badge badgeContent={totalItems} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>

          <Button
            variant="contained"
            onClick={handleLogout}
            sx={{
              textTransform: "none",
              fontWeight: 600,
              backgroundColor: "#ffffff",
              color: "#4CAF50",
              px: { xs: 1.5, md: 2.5 },
              fontSize: { xs: "0.8rem", md: "0.9rem" },
              "&:hover": {
                backgroundColor: "#f5f5f5"
              }
            }}
          >
            Logout
          </Button>

        </Box>

      </Toolbar>
    </AppBar>
  );
};

export default AccountNavbar;
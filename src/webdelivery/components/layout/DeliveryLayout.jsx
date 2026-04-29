import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Box, Toolbar } from "@mui/material";
import DeliverySidebar from "./DeliverySidebar";
import DeliveryNavbar from "./DeliveryNavbar";

const SIDEBAR_WIDTH = 240;

const DeliveryLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", backgroundColor: "background.default" }}>
      <DeliverySidebar
        mobileOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { md: `calc(100% - ${SIDEBAR_WIDTH}px)` },
          ml: { md: `${SIDEBAR_WIDTH}px` },
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <DeliveryNavbar onMenuClick={() => setMobileOpen(true)} />
        <Toolbar sx={{ minHeight: { xs: 64, md: 68 } }} />
        <Box sx={{ flex: 1, p: { xs: 2, sm: 3, md: 3 } }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default DeliveryLayout;
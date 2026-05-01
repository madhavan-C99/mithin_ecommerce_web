// import { useState } from "react";
// import { Outlet } from "react-router-dom";
// import { Box, Toolbar } from "@mui/material";
// import DeliverySidebar from "./DeliverySidebar";
// import DeliveryNavbar from "./DeliveryNavbar";

// const SIDEBAR_WIDTH = 240;

// const DeliveryLayout = () => {
//   const [mobileOpen, setMobileOpen] = useState(false);

//   return (
//     <Box sx={{ display: "flex", minHeight: "100vh", backgroundColor: "background.default" }}>
//       <DeliverySidebar
//         mobileOpen={mobileOpen}
//         onClose={() => setMobileOpen(false)}
//       />

//       <Box
//         component="main"
//         sx={{
//           flexGrow: 1,
//           width: { md: `calc(100% - ${SIDEBAR_WIDTH}px)` },
//           ml: { md: `${SIDEBAR_WIDTH}px` },
//           display: "flex",
//           flexDirection: "column",
//           minHeight: "100vh",
//         }}
//       >
//         <DeliveryNavbar onMenuClick={() => setMobileOpen(true)} />
//         <Toolbar sx={{ minHeight: { xs: 64, md: 68 } }} />
//         <Box sx={{ flex: 1, p: { xs: 2, sm: 3, md: 3 } }}>
//           <Outlet />
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default DeliveryLayout;











// 📁 src/webdelivery/components/layout/DeliveryLayout.jsx

import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Box, Toolbar } from "@mui/material";
import DeliverySidebar from "./DeliverySideBar";
import DeliveryNavbar from "./DeliveryNavBar";
import { SIDEBAR_WIDTH } from "./DeliverySideBar";

/**
 * DeliveryLayout — Final Fix
 *
 * Root cause of the narrow-column/gap issue:
 *   Setting BOTH `ml: 260px` AND `width: calc(100% - 260px)` on a flex child
 *   double-subtracts the sidebar width and collapses the content into a narrow
 *   centered column. In a flex container, `flexGrow:1` alone fills the
 *   remaining space correctly — the explicit `width` override was the bug.
 *
 * Fix:
 *   Removed `width` entirely. Only `ml` + `flexGrow:1` are needed.
 *   Added `minWidth:0` so the flex child can shrink below its content size
 *   without overflowing.
 */

const DeliveryLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "#F1F5F9",
      }}
    >
      <DeliverySidebar
        mobileOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />

      {/* ── Main content area ── */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          // ✅ ml offsets content past the fixed sidebar.
          // ✅ NO width override — flexGrow:1 already fills remaining space.
          //    width:calc(100%-260px) + ml:260px was double-subtracting → narrow column.
          // ml: { xs: 0, md: `${SIDEBAR_WIDTH}px` },
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          minWidth: 0, // allows flex child to shrink without overflow
        }}
      >
        <DeliveryNavbar onMenuClick={() => setMobileOpen(true)} />

        {/* Spacer for fixed navbar height */}
        <Toolbar sx={{ minHeight: { xs: 64, md: 68 } }} />

        {/* Page content */}
        <Box
          sx={{
            flex: 1,
            width: "100%",
            px: { xs: 2, sm: 3, md: 4 },
            py: { xs: 2.5, md: 3.5 },
            boxSizing: "border-box",
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default DeliveryLayout;
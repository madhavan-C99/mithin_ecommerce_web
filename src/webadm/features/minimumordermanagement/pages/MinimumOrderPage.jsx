// // src/webadm/features/minimumordermanagement/pages/MinimumOrderPage.jsx

// import React from "react";
// import { Box } from "@mui/material";
// import MinimumOrderForm from "../components/MinimumOrderForm";

// const MinimumOrderPage = () => {
//   return (
//     <Box
//       sx={{
//         width : "100%",
//         height: "100%",
//         p     : { xs: 0, sm: 0 },
//       }}
//     >
//       <MinimumOrderForm />
//     </Box>
//   );
// };

// export default MinimumOrderPage;










// src/webadm/features/minimumordermanagement/pages/MinimumOrderPage.jsx

import React from "react";
import { Box } from "@mui/material";
import MinimumOrderForm from "../components/MinimumOrderForm";

const MinimumOrderPage = () => {
  return (
    <Box
      sx={{
        width         : "100%",
        minHeight     : "100%",
        display       : "flex",
        justifyContent: "center",
        alignItems    : "flex-start",
        px            : { xs: 1, sm: 2, md: 3 },
        py            : { xs: 2, sm: 3, md: 4 },
      }}
    >
      <Box sx={{ width: "100%", maxWidth: 640 }}>
        <MinimumOrderForm />
      </Box>
    </Box>
  );
};

export default MinimumOrderPage;
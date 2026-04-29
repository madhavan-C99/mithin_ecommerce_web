// // // src/webdelivery/pages/DeliveryLoginPage.jsx

// // import {
// //   Box,
// //   Card,
// //   CardContent,
// //   Typography,
// //   Divider,
// // } from "@mui/material";
// // import LocalShippingIcon from "@mui/icons-material/LocalShipping";
// // import LocalShippingRoundedIcon from "@mui/icons-material/LocalShippingRounded";
// // import LoginForm from "../components/auth/LoginForm";

// // /**
// //  * DeliveryLoginPage
// //  *
// //  * Page shell only — layout, branding, background decorations.
// //  * All form logic lives in LoginForm.jsx.
// //  *
// //  * UI kept identical to your existing design.
// //  * Only change: phone field → email field (matches API payload).
// //  */
// // const DeliveryLoginPage = () => {
// //   return (
// //     <Box
// //       sx={{
// //         minHeight: "100vh",
// //         display: "flex",
// //         backgroundColor: "#0F172A",
// //         position: "relative",
// //         overflow: "hidden",
// //       }}
// //     >
// //       {/* Background decoration — top right */}
// //       <Box
// //         sx={{
// //           position: "absolute",
// //           top: -120,
// //           right: -120,
// //           width: 420,
// //           height: 420,
// //           borderRadius: "50%",
// //           background:
// //             "radial-gradient(circle, rgba(249,115,22,0.15) 0%, transparent 70%)",
// //           pointerEvents: "none",
// //         }}
// //       />
// //       {/* Background decoration — bottom left */}
// //       <Box
// //         sx={{
// //           position: "absolute",
// //           bottom: -80,
// //           left: -80,
// //           width: 300,
// //           height: 300,
// //           borderRadius: "50%",
// //           background:
// //             "radial-gradient(circle, rgba(249,115,22,0.08) 0%, transparent 70%)",
// //           pointerEvents: "none",
// //         }}
// //       />

// //       {/* ── Left panel (md+) ── */}
// //       <Box
// //         sx={{
// //           display: { xs: "none", md: "flex" },
// //           flex: 1,
// //           flexDirection: "column",
// //           justifyContent: "center",
// //           alignItems: "flex-start",
// //           px: { md: 8, lg: 12 },
// //           position: "relative",
// //         }}
// //       >
// //         {/* Brand */}
// //         <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 6 }}>
// //           <Box
// //             sx={{
// //               width: 48,
// //               height: 48,
// //               borderRadius: "14px",
// //               background: "linear-gradient(135deg, #F97316 0%, #EA580C 100%)",
// //               display: "flex",
// //               alignItems: "center",
// //               justifyContent: "center",
// //             }}
// //           >
// //             <LocalShippingIcon sx={{ color: "#fff", fontSize: 26 }} />
// //           </Box>
// //           <Box>
// //             <Typography
// //               sx={{
// //                 color: "#FFFFFF",
// //                 fontWeight: 800,
// //                 fontSize: "1.2rem",
// //                 lineHeight: 1.1,
// //               }}
// //             >
// //               SM VegMart
// //             </Typography>
// //             <Typography
// //               sx={{
// //                 color: "#F97316",
// //                 fontWeight: 600,
// //                 fontSize: "0.7rem",
// //                 letterSpacing: "0.1em",
// //                 textTransform: "uppercase",
// //               }}
// //             >
// //               Delivery Portal
// //             </Typography>
// //           </Box>
// //         </Box>

// //         {/* Hero icon */}
// //         <Box
// //           sx={{
// //             width: 100,
// //             height: 100,
// //             borderRadius: "28px",
// //             background: "rgba(249,115,22,0.12)",
// //             border: "1px solid rgba(249,115,22,0.2)",
// //             display: "flex",
// //             alignItems: "center",
// //             justifyContent: "center",
// //             mb: 4,
// //           }}
// //         >
// //           <LocalShippingRoundedIcon sx={{ color: "#F97316", fontSize: 52 }} />
// //         </Box>

// //         <Typography
// //           sx={{
// //             color: "#FFFFFF",
// //             fontWeight: 800,
// //             fontSize: { md: "2rem", lg: "2.5rem" },
// //             lineHeight: 1.2,
// //             mb: 2,
// //             maxWidth: 380,
// //           }}
// //         >
// //           Deliver with Speed & Confidence
// //         </Typography>
// //         <Typography
// //           sx={{
// //             color: "#64748B",
// //             fontSize: "0.95rem",
// //             lineHeight: 1.7,
// //             maxWidth: 360,
// //           }}
// //         >
// //           Manage your deliveries, track orders in real time, and view your
// //           earnings — all in one place.
// //         </Typography>

// //         {/* Stats row */}
// //         {/* <Box sx={{ display: "flex", gap: 4, mt: 5 }}>
// //           {[
// //             { value: "98%", label: "On-time rate" },
// //             { value: "4.9★", label: "Avg rating" },
// //             { value: "500+", label: "Deliveries" },
// //           ].map((stat) => (
// //             <Box key={stat.label}>
// //               <Typography
// //                 sx={{ color: "#F97316", fontWeight: 800, fontSize: "1.4rem" }}
// //               >
// //                 {stat.value}
// //               </Typography>
// //               <Typography
// //                 sx={{ color: "#475569", fontSize: "0.75rem", fontWeight: 500 }}
// //               >
// //                 {stat.label}
// //               </Typography>
// //             </Box>
// //           ))}
// //         </Box> */}
// //       </Box>

// //       {/* ── Right panel — Login card ── */}
// //       <Box
// //         sx={{
// //           width: { xs: "100%", md: 480 },
// //           display: "flex",
// //           alignItems: "center",
// //           justifyContent: "center",
// //           px: { xs: 2, sm: 4 },
// //           py: 4,
// //         }}
// //       >
// //         <Card
// //           sx={{
// //             width: "100%",
// //             maxWidth: 420,
// //             borderRadius: "20px",
// //             border: "1px solid rgba(255,255,255,0.06)",
// //             backgroundColor: "#1E293B",
// //             boxShadow: "0 24px 64px rgba(0,0,0,0.4)",
// //           }}
// //         >
// //           <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
// //             {/* Mobile brand */}
// //             <Box
// //               sx={{
// //                 display: { xs: "flex", md: "none" },
// //                 alignItems: "center",
// //                 gap: 1.5,
// //                 mb: 3,
// //               }}
// //             >
// //               <Box
// //                 sx={{
// //                   width: 38,
// //                   height: 38,
// //                   borderRadius: "10px",
// //                   background:
// //                     "linear-gradient(135deg, #F97316 0%, #EA580C 100%)",
// //                   display: "flex",
// //                   alignItems: "center",
// //                   justifyContent: "center",
// //                 }}
// //               >
// //                 <LocalShippingIcon sx={{ color: "#fff", fontSize: 20 }} />
// //               </Box>
// //               <Typography
// //                 sx={{ color: "#fff", fontWeight: 800, fontSize: "1rem" }}
// //               >
// //                 SM VegMart · Delivery
// //               </Typography>
// //             </Box>

// //             <Typography
// //               sx={{
// //                 color: "#FFFFFF",
// //                 fontWeight: 700,
// //                 fontSize: "1.4rem",
// //                 mb: 0.5,
// //               }}
// //             >
// //               Welcome back 👋
// //             </Typography>
// //             <Typography
// //               sx={{ color: "#64748B", fontSize: "0.875rem", mb: 3.5 }}
// //             >
// //               Sign in to your delivery account
// //             </Typography>

// //             {/* All form logic is here */}
// //             <LoginForm />

// //             <Divider sx={{ my: 3, borderColor: "rgba(255,255,255,0.06)" }} />

// //             <Typography
// //               sx={{
// //                 textAlign: "center",
// //                 color: "#475569",
// //                 fontSize: "0.78rem",
// //               }}
// //             >
// //               Having trouble signing in?{" "}
// //               <Typography
// //                 component="span"
// //                 sx={{
// //                   color: "#F97316",
// //                   fontWeight: 600,
// //                   cursor: "pointer",
// //                   "&:hover": { textDecoration: "underline" },
// //                 }}
// //               >
// //                 Contact your manager
// //               </Typography>
// //             </Typography>
// //           </CardContent>
// //         </Card>
// //       </Box>
// //     </Box>
// //   );
// // };

// // export default DeliveryLoginPage;










// // // src/webdelivery/pages/DeliveryLoginPage.jsx

// // import {
// //   Box,
// //   Card,
// //   CardContent,
// //   Typography,
// //   Divider,
// // } from "@mui/material";
// // import LocalShippingIcon from "@mui/icons-material/LocalShipping";
// // import LoginForm from "../components/auth/LoginForm";

// // const DeliveryLoginPage = () => {
// //   return (
// //     <Box
// //       sx={{
// //         minHeight: "100vh",
// //         display: "flex",
// //         alignItems: "center",
// //         justifyContent: "center",
// //         backgroundColor: "#0F172A",
// //         position: "relative",
// //         overflow: "hidden",
// //         px: { xs: 2, sm: 4 },
// //         py: 4,
// //       }}
// //     >
// //       {/* Background decoration — top right */}
// //       <Box
// //         sx={{
// //           position: "absolute",
// //           top: -120,
// //           right: -120,
// //           width: 420,
// //           height: 420,
// //           borderRadius: "50%",
// //           background:
// //             "radial-gradient(circle, rgba(249,115,22,0.15) 0%, transparent 70%)",
// //           pointerEvents: "none",
// //         }}
// //       />
// //       {/* Background decoration — bottom left */}
// //       <Box
// //         sx={{
// //           position: "absolute",
// //           bottom: -80,
// //           left: -80,
// //           width: 300,
// //           height: 300,
// //           borderRadius: "50%",
// //           background:
// //             "radial-gradient(circle, rgba(249,115,22,0.08) 0%, transparent 70%)",
// //           pointerEvents: "none",
// //         }}
// //       />

// //       {/* Login card — centered on all screen sizes */}
// //       <Card
// //         sx={{
// //           width: "100%",
// //           maxWidth: 420,
// //           borderRadius: "20px",
// //           border: "1px solid rgba(255,255,255,0.06)",
// //           backgroundColor: "#1E293B",
// //           boxShadow: "0 24px 64px rgba(0,0,0,0.4)",
// //           position: "relative",
// //           zIndex: 1,
// //         }}
// //       >
// //         <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
// //           {/* Brand */}
// //           <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 3 }}>
// //             <Box
// //               sx={{
// //                 width: 38,
// //                 height: 38,
// //                 borderRadius: "10px",
// //                 background: "linear-gradient(135deg, #F97316 0%, #EA580C 100%)",
// //                 display: "flex",
// //                 alignItems: "center",
// //                 justifyContent: "center",
// //               }}
// //             >
// //               <LocalShippingIcon sx={{ color: "#fff", fontSize: 20 }} />
// //             </Box>
// //             <Box>
// //               <Typography
// //                 sx={{ color: "#fff", fontWeight: 800, fontSize: "1rem", lineHeight: 1.1 }}
// //               >
// //                 SM VegMart
// //               </Typography>
// //               <Typography
// //                 sx={{
// //                   color: "#F97316",
// //                   fontWeight: 600,
// //                   fontSize: "0.65rem",
// //                   letterSpacing: "0.1em",
// //                   textTransform: "uppercase",
// //                 }}
// //               >
// //                 Delivery Portal
// //               </Typography>
// //             </Box>
// //           </Box>

// //           <Typography
// //             sx={{ color: "#FFFFFF", fontWeight: 700, fontSize: "1.4rem", mb: 0.5 }}
// //           >
// //             Welcome back 👋
// //           </Typography>
// //           <Typography sx={{ color: "#64748B", fontSize: "0.875rem", mb: 3.5 }}>
// //             Sign in to your delivery account
// //           </Typography>

// //           <LoginForm />

// //           <Divider sx={{ my: 3, borderColor: "rgba(255,255,255,0.06)" }} />

// //           <Typography
// //             sx={{ textAlign: "center", color: "#475569", fontSize: "0.78rem" }}
// //           >
// //             Having trouble signing in?{" "}
// //             <Typography
// //               component="span"
// //               sx={{
// //                 color: "#F97316",
// //                 fontWeight: 600,
// //                 cursor: "pointer",
// //                 "&:hover": { textDecoration: "underline" },
// //               }}
// //             >
// //               Contact your manager
// //             </Typography>
// //           </Typography>
// //         </CardContent>
// //       </Card>
// //     </Box>
// //   );
// // };

// // export default DeliveryLoginPage;










// // src/webdelivery/pages/DeliveryLoginPage.jsx

// import {
//   Box,
//   Card,
//   CardContent,
//   Typography,
//   Divider,
// } from "@mui/material";
// import LocalShippingIcon from "@mui/icons-material/LocalShipping";
// import LoginForm from "../components/auth/LoginForm";

// const DeliveryLoginPage = () => {
//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         backgroundColor: "#0F172A",
//         position: "relative",
//         overflow: "hidden",
//         px: { xs: 2, sm: 4 },
//         py: 4,
//       }}
//     >
//       {/* Background decoration — top right */}
//       <Box
//         sx={{
//           position: "absolute",
//           top: -120,
//           right: -120,
//           width: 420,
//           height: 420,
//           borderRadius: "50%",
//           background:
//             "radial-gradient(circle, rgba(249,115,22,0.15) 0%, transparent 70%)",
//           pointerEvents: "none",
//         }}
//       />
//       {/* Background decoration — bottom left */}
//       <Box
//         sx={{
//           position: "absolute",
//           bottom: -80,
//           left: -80,
//           width: 300,
//           height: 300,
//           borderRadius: "50%",
//           background:
//             "radial-gradient(circle, rgba(249,115,22,0.08) 0%, transparent 70%)",
//           pointerEvents: "none",
//         }}
//       />

//       {/* Login card — centered on ALL screen sizes */}
//       <Card
//         sx={{
//           width: "100%",
//           maxWidth: 420,
//           borderRadius: "20px",
//           border: "1px solid rgba(255,255,255,0.06)",
//           backgroundColor: "#1E293B",
//           boxShadow: "0 24px 64px rgba(0,0,0,0.4)",
//           position: "relative",
//           zIndex: 1,
//         }}
//       >
//         <CardContent sx={{ p: { xs: 3, sm: 4 } }}>

//           {/* Brand — always visible on all screen sizes */}
//           <Box
//             sx={{
//               display: "flex",
//               alignItems: "center",
//               gap: 1.5,
//               mb: 3,
//             }}
//           >
//             <Box
//               sx={{
//                 width: 38,
//                 height: 38,
//                 borderRadius: "10px",
//                 background: "linear-gradient(135deg, #F97316 0%, #EA580C 100%)",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 flexShrink: 0,
//               }}
//             >
//               <LocalShippingIcon sx={{ color: "#fff", fontSize: 20 }} />
//             </Box>
//             <Typography
//               sx={{ color: "#fff", fontWeight: 800, fontSize: "1rem" }}
//             >
//               SM VegMart · Delivery
//             </Typography>
//           </Box>

//           {/* Heading */}
//           <Typography
//             sx={{
//               color: "#FFFFFF",
//               fontWeight: 700,
//               fontSize: "1.4rem",
//               mb: 0.5,
//             }}
//           >
//             Welcome back 👋
//           </Typography>
//           <Typography
//             sx={{ color: "#64748B", fontSize: "0.875rem", mb: 3.5 }}
//           >
//             Sign in to your delivery account
//           </Typography>

//           {/* Form */}
//           <LoginForm />

//           <Divider sx={{ my: 3, borderColor: "rgba(255,255,255,0.06)" }} />

//           {/* Footer */}
//           <Typography
//             sx={{
//               textAlign: "center",
//               color: "#475569",
//               fontSize: "0.78rem",
//             }}
//           >
//             Having trouble signing in?{" "}
//             <Typography
//               component="span"
//               sx={{
//                 color: "#F97316",
//                 fontWeight: 600,
//                 cursor: "pointer",
//                 "&:hover": { textDecoration: "underline" },
//               }}
//             >
//               Contact your manager
//             </Typography>
//           </Typography>

//         </CardContent>
//       </Card>
//     </Box>
//   );
// };

// export default DeliveryLoginPage;










// src/webdelivery/pages/DeliveryLoginPage.jsx

import {
  Box,
  Card,
  CardContent,
  Typography,
  Divider,
} from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import LoginForm from "../components/auth/LoginForm";

const DeliveryLoginPage = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        minHeight: "100dvh", // dynamic viewport height — fixes mobile browser chrome
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#0F172A",
        position: "relative",
        overflow: "hidden",
        px: 2,
        py: 3,
        boxSizing: "border-box",
      }}
    >
      {/* Background decoration — top right */}
      <Box
        sx={{
          position: "absolute",
          top: -120,
          right: -120,
          width: 420,
          height: 420,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(249,115,22,0.15) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      {/* Background decoration — bottom left */}
      <Box
        sx={{
          position: "absolute",
          bottom: -80,
          left: -80,
          width: 300,
          height: 300,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(249,115,22,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Login card */}
      <Card
        sx={{
          width: "100%",
          maxWidth: 420,
          borderRadius: "20px",
          border: "1px solid rgba(255,255,255,0.06)",
          backgroundColor: "#1E293B",
          boxShadow: "0 24px 64px rgba(0,0,0,0.4)",
          position: "relative",
          zIndex: 1,
        }}
      >
        <CardContent
          sx={{
            p: { xs: 3, sm: 4 },
            "&:last-child": { pb: { xs: 3, sm: 4 } }, // override MUI default extra bottom padding
          }}
        >
          {/* Brand */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              mb: 3,
            }}
          >
            <Box
              sx={{
                width: 38,
                height: 38,
                borderRadius: "10px",
                background: "linear-gradient(135deg, #F97316 0%, #EA580C 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <LocalShippingIcon sx={{ color: "#fff", fontSize: 20 }} />
            </Box>
            <Typography
              sx={{ color: "#fff", fontWeight: 800, fontSize: "1rem" }}
            >
              SM VegMart · Delivery
            </Typography>
          </Box>

          {/* Heading */}
          <Typography
            sx={{
              color: "#FFFFFF",
              fontWeight: 700,
              fontSize: "1.4rem",
              mb: 0.5,
            }}
          >
            Welcome back 👋
          </Typography>
          <Typography
            sx={{ color: "#64748B", fontSize: "0.875rem", mb: 3.5 }}
          >
            Sign in to your delivery account
          </Typography>

          {/* Form */}
          <LoginForm />

          <Divider sx={{ my: 3, borderColor: "rgba(255,255,255,0.06)" }} />

          {/* Footer */}
          <Typography
            sx={{
              textAlign: "center",
              color: "#475569",
              fontSize: "0.78rem",
            }}
          >
            Having trouble signing in? {" "}
            <Typography
              component="span"
              sx={{
                color: "#F97316",
                fontWeight: 600,
                fontSize: {xs: 13},
                cursor: "pointer",
                "&:hover": { textDecoration: "underline" },
              }}
            >
              Contact your manager
            </Typography>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default DeliveryLoginPage;
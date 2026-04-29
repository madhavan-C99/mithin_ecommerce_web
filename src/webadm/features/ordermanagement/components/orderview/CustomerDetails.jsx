

// import {
//   Paper,
//   Box,
//   Typography,
//   MenuItem,
//   FormControl,
//   Select,
//   Grid,
//   CircularProgress,
// } from "@mui/material";



// export const CustomerDetails = ({ customer }) => {


//   return (
// <Paper
//   elevation={0}
//   sx={{
//     p: 2,
//     // minHeight: "93%",
//     backgroundColor:"#f8f8f8",
//     borderRadius: 3,
//   }}
// >
//   <Typography
//     variant="h5"
//     sx={{
//       fontWeight: "bold",
//       mb: 2,
//       fontSize: {
//         xs: "10px",
//         sm: "12px",
//         md: "13px",
//         lg: "14px",
//       },
//       color: "#2c3e50",
//     }}
//   >
//     Customer Details
//   </Typography>

//   <Box display="flex" flexDirection="column" gap={0.5}>
    
//     {[
//       { label: "Customer Name", value: customer?.customer_name },
//       { label: "Mobile Number", value: customer?.mobile },
//       { label: "Email", value: customer?.email },
//     ].map((item, index) => (
//       <Box
//         key={index}
//         display="grid"
//         gridTemplateColumns="120px 10px 1fr"
//         alignItems="start"
//       >
//         {/* Label */}
//         <Typography
//           sx={{
//             fontWeight: 600,
//             fontSize: {
//               xs: "10px",
//               sm: "11px",
//               md: "12px",
//               lg: "12px",
//             },
//           }}
//         >
//           {item.label}
//         </Typography>

//         {/* Colon */}
//         <Typography>:</Typography>

//         {/* Value */}
//         <Typography
//           color="text.secondary"
//           sx={{
//             fontSize: {
//               xs: "10px",
//               sm: "11px",
//               md: "12px",
//               lg: "12px",
//             },
//             wordBreak: "break-word",
//           }}
//         >
//           {item.value || " - "}
//         </Typography>
//       </Box>
//     ))}
//   </Box>
// </Paper>
//   );
// };

// export default CustomerDetails;











import {
  Paper,
  Box,
  Typography,
  MenuItem,
  FormControl,
  Select,
  Grid,
  CircularProgress,
} from "@mui/material";

export const CustomerDetails = ({ customer }) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 1.5, sm: 2 },
        backgroundColor: "#f8f8f8",
        borderRadius: 3,
        height: "100%",
      }}
    >
      {/* ── Title ── */}
      <Typography
        variant="h6"
        sx={{
          fontWeight: "bold",
          mb: 1.5,
          fontSize: { xs: "12px", sm: "13px", md: "14px", lg: "14px" },
          color: "#2c3e50",
          letterSpacing: 0.2,
        }}
      >
        Customer Details
      </Typography>

      {/* ── Rows ── */}
      <Box display="flex" flexDirection="column" gap={0.8}>
        {[
          { label: "Customer Name", value: customer?.customer_name },
          { label: "Mobile Number", value: customer?.mobile },
          { label: "Email",         value: customer?.email },
        ].map((item, index) => (
          <Box
            key={index}
            display="grid"
            gridTemplateColumns={{
              xs: "90px 8px 1fr",   // tighter label column on mobile
              sm: "110px 8px 1fr",
              md: "120px 10px 1fr",
            }}
            alignItems="start"
            gap={0}
          >
            {/* Label */}
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: { xs: "10px", sm: "11px", md: "12px", lg: "12px" },
                color: "#374151",
                lineHeight: 1.6,
              }}
            >
              {item.label}
            </Typography>

            {/* Colon */}
            <Typography
              sx={{
                fontSize: { xs: "10px", sm: "11px", md: "12px" },
                lineHeight: 1.6,
                color: "#374151",
              }}
            >
              :
            </Typography>

            {/* Value */}
            <Typography
              color="text.secondary"
              sx={{
                fontSize: { xs: "10px", sm: "11px", md: "12px", lg: "12px" },
                wordBreak: "break-word",
                lineHeight: 1.6,
              }}
            >
              {item.value || " - "}
            </Typography>
          </Box>
        ))}
      </Box>
    </Paper>
  );
};

export default CustomerDetails;
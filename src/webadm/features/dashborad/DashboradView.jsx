// import { Box, Typography } from "@mui/material";
// import DataBoxes from "./DataBoxes.jsx";
// import CategoryQtyChat from "./Categoryqtychart.jsx";
// import CategoryPieChart from "./CategoryPieChart.jsx";
// import SubCategoryChart from "./SubcategoryChart.jsx";


// const pageheading={
//     fontSize: {
//       xs: "16px",
//       sm: "20px",
//       md: "22px",
//       lg: "22px"
//     },
//     fontWeight:"bold",
//     minWidth:7,
//     mb:2
// }


// export default function DashboradView (){
//     return(
//         <>
//         <Typography variant="h4" sx={pageheading} >Dashboard</Typography>
//         <DataBoxes/>
//         <Box sx={{display:"flex", justifyContent:"space-evenly",marginBottom:"50px",}}>  
//             <CategoryQtyChat/>
//             <CategoryPieChart/> 
//         </Box>
//         {/* <SubCategoryChart/>  */}
        
//         </>
//     );
// }











// UI ONLY CHANGED CODE

import { Box, Typography } from "@mui/material";
import DataBoxes from "./DataBoxes.jsx";
import CategoryQtyChat from "./Categoryqtychart.jsx";
import CategoryPieChart from "./CategoryPieChart.jsx";
import SubCategoryChart from "./SubcategoryChart.jsx";


const pageheading = {
  fontSize: {
    xs: "16px",
    sm: "20px",
    md: "22px",
    lg: "22px"
  },
  fontWeight: "bold",
  minWidth: 7,
  mb: 2
};


export default function DashboradView() {
  return (
    <>
      <Typography variant="h4" sx={pageheading}>Dashboard</Typography>

      <DataBoxes />

      <Box
        sx={{
          display      : "flex",
          flexDirection: { xs: "column", md: "row" }, // stack on mobile, side-by-side on md+
          alignItems   : "stretch",                   // equal height always
          gap          : { xs: 2, sm: 2.5, md: 3 },
          marginBottom : "50px",
          width        : "100%",
        }}
      >
        {/* Each wrapper is exactly 50% on desktop, 100% on mobile */}
        <Box sx={{ flex: "1 1 0", minWidth: 0, width: "100%" }}>
          <CategoryQtyChat />
        </Box>

        <Box sx={{ flex: "1 1 0", minWidth: 0, width: "100%" }}>
          <CategoryPieChart />
        </Box>
      </Box>

      {/* <SubCategoryChart/> */}
    </>
  );
}
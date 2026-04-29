// import {
//   Box,
//   TextField,
//   Button,
//   Typography,
//   IconButton,
//   Grid,
//   Paper,
//   MenuItem
// } from "@mui/material";

// import CloseIcon from "@mui/icons-material/Close";
// import { useState, useEffect } from "react";
// import { subCategoryAPI } from "./subcategoryAPI";
// import { dropdownAPI } from "../../services/dropdownAPI";


// const fromheading={
//     fontWeight: 700,
//     color: "#1F2937",
//     fontSize: {
//       xs: "16px",
//       sm: "20px",
//       md: "22px",
//       lg: "22px"
//     },
//     minWidth:200
// }

// const inputLabelStyle = {
//   "& .MuiInputLabel-root": {
//     fontSize: {
//       xs: "12px",
//       sm: "13px",
//       md: "14px",
//       lg: "14px"
//     },
//     color: "#3679ff"
//     // color: "#6B7280"
//   }, "& .MuiInputBase-input": {
//     fontSize: {
//       xs: "10px",
//       sm: "10px",
//       md: "12px",
//       lg: "14px"
//     },
//     color: "#6B7280"
//   },
//      "& .MuiFormControlLabel-label": {
//       fontSize: {
//         xs: "12px",
//         sm: "13px",
//         md: "14px"
//       }
//     }
// };

// export const buttonStyle = {
//   mt: 2,
//   borderRadius: "8px",
//   fontWeight: 600,
//   height: 40,
//   fontSize: {
//       xs: "12px",
//       sm: "13px",
//       md: "14px",
//       lg: "15px"
//     },
// };



// const AddSubCategories = ({ close, refersh }) => {

//   const [errors, setErrors] = useState({});
//   const [catdrop, setCatdrop] = useState([]);

//   const [form, setForm] = useState({
//     name: "",
//     description: "",
//     status: false,
//     category_id: ""
//   });


//   // ---------------- FETCH CATEGORY DROPDOWN ----------------
//   useEffect(() => {
//     const categorydrop = async () => {
//       try {
//         const catData = await dropdownAPI.fetchDropCategory();
//         setCatdrop(catData.data.data);
//       } catch (error) {
//         console.error("Error fetching categories:", error);
//       }
//     };
//     categorydrop();
//   }, []);

//   // ---------------- VALIDATION ----------------
//   const validate = () => {
//     let temp = {};

//     if (!form.name.trim())
//       temp.name = "Category name is required";
//     else if (!/^[A-Za-z\s]+$/.test(form.name))
//       temp.name = "Only letters allowed";
//     if (!form.category_id) temp.category_id = "Select category";
//     if (form.status === "") temp.status = "Select status";

//     setErrors(temp);
//     return Object.keys(temp).length === 0;
//   };

//   // ---------------- SUBMIT ----------------
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!validate()) return;

//     try {

//       const payload = {
//         name: form.name,
//         description: form.description,
//         status: Boolean(form.status),   // convert string to boolean
//         category_id: Number(form.category_id)
//       };

//       await subCategoryAPI.addSubCategory(payload);

//       // reset form
//       setForm({
//         name: "",
//         description: "",
//         status: "",
//         category_id: ""
//       });

//       close();
//       refersh();

//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   //RESET FORM
//  const RefreshForm = () =>{
//      setForm({
//         name: "",
//         description: "",
//         status: "",
//         category_id: ""
//       });
//   }
//    const handleNameChange = (e) => {
//     const value = e.target.value;

//     // Allow only letters and space
//     if (/^[A-Za-z\s]*$/.test(value)) {
//       setForm({ ...form, name: value });
//     }
//   };
// return (
//   <Paper
//     elevation={3}
//     sx={{
//       // width: "100%",
//       minWidth: 200,
//       maxWidth:300,
//       // maxHeight: "80vh",
//       p: 2.5,
//       borderRadius: 0,
//       // overflow:"hiden"
//       overflowX:"hidden"
//     }}
//   >
//     <Box display="flex" justifyContent="space-around" mb={1}>
//       <Typography   sx={fromheading}>
//         Add SubCategory
//       </Typography>

//       <IconButton onClick={close}>
//         <CloseIcon />
//       </IconButton>
//     </Box>

//     <Box component="form" onSubmit={handleSubmit}>
//       <Grid container spacing={3}>

//         {/* Name */}
//         <Grid minWidth={"100%"} item xs={12}>
//           <TextField
//             label="Name"
//             maxWidth="100%"
//             fullWidth
//             size="small"
//             error={!!errors.name}
//             helperText={errors.name}
//             value={form.name}
//             onChange={handleNameChange}
// sx={inputLabelStyle}
//           />
//         </Grid>

//         {/* Category Dropdown */}
//         <Grid item minWidth={"100%"} maxWidth={"47%"} >
//           <TextField
//             select
//             label="Select Category"
//                 fullWidth
//                 size="small"
//             error={!!errors.category_id}
//             helperText={errors.category_id}
//             value={form.category_id}
//             onChange={(e) =>
//               setForm({ ...form, category_id: e.target.value })
//             }
// sx={inputLabelStyle}
//           >
//             {catdrop.map((s) => (
//               <MenuItem key={s.value} value={s.value}
//                          sx={{    fontSize: {
//                   xs: "12px",
//                   sm: "13px",
//                   md: "14px",
//                   lg: "14px"
//                 },
//                 color: "#6B7280"}} >
//                 {s.label}
//               </MenuItem>
//             ))}
//           </TextField>
//         </Grid>

//         {/* Status */}
//                      <Grid item xs={12} md={6} minWidth={"100%"}>
//                        <TextField
//                          select
//                          label="Status"
//                              fullWidth
//                              size="small"
//                          error={!!errors.status}
//                          helperText={errors.status}
//                          value={form.status}
//                          onChange={(e) =>
//                            setForm({ ...form, status: e.target.value })
//                          }
//              sx={inputLabelStyle}
//                        >
//                                  <MenuItem value={true} sx={{ color: "green", fontWeight: "bold",fontSize: {
//                           xs: "12px",
//                           sm: "13px",
//                           md: "14px",
//                           lg: "14px"
//                         }, }}>
//                   Active
//                 </MenuItem>
        
//                 <MenuItem value={false} sx={{ color: "red", fontWeight: "bold" ,fontSize: {
//                           xs: "12px",
//                           sm: "13px",
//                           md: "14px",
//                           lg: "14px"
//                         },}}>
//                   Inactive
//                 </MenuItem>
//                        </TextField>
//                      </Grid>
//         {/* Description */}
//         <Grid minWidth={"100%"} item xs={12}>
//           <TextField
//             label="Description"
//             multiline
//             rows={3}
//             fullWidth
//             value={form.description}
//             onChange={(e) =>
//               setForm({ ...form, description: e.target.value })
//             }
//              sx={inputLabelStyle}
//           />
//         </Grid>


//         {/* Submit */}
//         <Grid  item xs={12} sx={{display:"flex",gap:"10px",justifyContent:"space-evenly",alignItems:"center", width:"100%"}}>
//           <Button
//             type="submit"
//             variant="contained"
//             fullWidth
//             size="large"
//             sx={buttonStyle}

//           >
//             Submit
//           </Button>
          
//           <Button
//             type="submit"
//             variant="contained"
//             fullWidth
//             size="large"
//             onClick={RefreshForm}
//           sx={buttonStyle}
//           >
//             Reset
//           </Button>
            
//         </Grid>

//       </Grid>
//     </Box>
//   </Paper>
// );
// };

// export default AddSubCategories;











import {
  Box,
  TextField,
  Button,
  Typography,
  IconButton,
  Paper,
  MenuItem,
  Stack,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import { useState, useEffect } from "react";
import { subCategoryAPI } from "./subcategoryAPI";
import { dropdownAPI } from "../../services/dropdownAPI";

// ─── Styles ────────────────────────────────────────────────────────────────────
const fromheading = {
  fontWeight: 700,
  color: "#1F2937",
  fontSize: { xs: "15px", sm: "17px", md: "19px", lg: "20px" },
};

const inputLabelStyle = {
  "& .MuiInputLabel-root": {
    fontSize: { xs: "12px", sm: "13px", md: "14px" },
    color: "#3679ff",
  },
  "& .MuiInputBase-input": {
    fontSize: { xs: "12px", sm: "13px", md: "14px" },
    color: "#6B7280",
  },
  "& .MuiFormControlLabel-label": {
    fontSize: { xs: "12px", sm: "13px", md: "14px" },
  },
};

const buttonStyle = {
  borderRadius: "8px",
  fontWeight: 600,
  height: { xs: 36, sm: 38, md: 40 },
  textTransform: "none",
  fontSize: { xs: "12px", sm: "13px", md: "14px" },
};

const menuItemStyle = {
  fontSize: { xs: "12px", sm: "13px", md: "14px" },
  color: "#6B7280",
};
// ───────────────────────────────────────────────────────────────────────────────

const AddSubCategories = ({ close, refersh }) => {
  const [errors, setErrors] = useState({});
  const [catdrop, setCatdrop] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    status: false,
    category_id: "",
  });

  // ── FETCH CATEGORY DROPDOWN ────────────────────────────────────────────────
  useEffect(() => {
    const categorydrop = async () => {
      try {
        const catData = await dropdownAPI.fetchDropCategory();
        setCatdrop(catData.data.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    categorydrop();
  }, []);

  // ── VALIDATION ─────────────────────────────────────────────────────────────
  const validate = () => {
    let temp = {};
    if (!form.name.trim()) temp.name = "Category name is required";
    else if (!/^[A-Za-z\s]+$/.test(form.name)) temp.name = "Only letters allowed";
    if (!form.category_id) temp.category_id = "Select category";
    if (form.status === "") temp.status = "Select status";
    setErrors(temp);
    return Object.keys(temp).length === 0;
  };

  // ── SUBMIT ─────────────────────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      const payload = {
        name: form.name,
        description: form.description,
        status: Boolean(form.status),
        category_id: Number(form.category_id),
      };
      await subCategoryAPI.addSubCategory(payload);
      setForm({ name: "", description: "", status: "", category_id: "" });
      close();
      refersh();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // ── RESET ──────────────────────────────────────────────────────────────────
  const RefreshForm = () => {
    setForm({ name: "", description: "", status: "", category_id: "" });
  };

  const handleNameChange = (e) => {
    const value = e.target.value;
    if (/^[A-Za-z\s]*$/.test(value)) {
      setForm({ ...form, name: value });
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        width: "100%",
        p: { xs: 2, sm: 2.5, md: 3 },
        borderRadius: 0,
        overflowX: "hidden",
        boxSizing: "border-box",
      }}
    >
      {/* Header */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={{ xs: 2, sm: 2.5 }}
      >
        <Typography sx={fromheading}>Add SubCategory</Typography>
        <IconButton onClick={close} size="small">
          <CloseIcon sx={{ fontSize: { xs: 18, sm: 20 } }} />
        </IconButton>
      </Box>

      {/* Form */}
      <Box component="form" onSubmit={handleSubmit}>
        <Stack spacing={{ xs: 1.5, sm: 2 }}>
          {/* Name */}
          <TextField
            label="Name"
            fullWidth
            size="small"
            error={!!errors.name}
            helperText={errors.name}
            value={form.name}
            onChange={handleNameChange}
            sx={inputLabelStyle}
          />

          {/* Category */}
          <TextField
            select
            label="Select Category"
            fullWidth
            size="small"
            error={!!errors.category_id}
            helperText={errors.category_id}
            value={form.category_id}
            onChange={(e) => setForm({ ...form, category_id: e.target.value })}
            sx={inputLabelStyle}
          >
            {catdrop.map((s) => (
              <MenuItem key={s.value} value={s.value} sx={menuItemStyle}>
                {s.label}
              </MenuItem>
            ))}
          </TextField>

          {/* Status */}
          <TextField
            select
            label="Status"
            fullWidth
            size="small"
            error={!!errors.status}
            helperText={errors.status}
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
            sx={inputLabelStyle}
          >
            <MenuItem
              value={true}
              sx={{ color: "green", fontWeight: "bold", ...menuItemStyle }}
            >
              Active
            </MenuItem>
            <MenuItem
              value={false}
              sx={{ color: "red", fontWeight: "bold", ...menuItemStyle }}
            >
              Inactive
            </MenuItem>
          </TextField>

          {/* Description */}
          <TextField
            label="Description"
            multiline
            rows={3}
            fullWidth
            size="small"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            sx={inputLabelStyle}
          />

          {/* Buttons */}
          <Box display="flex" gap={1.5} pt={0.5}>
            <Button type="submit" variant="contained" fullWidth sx={buttonStyle}>
              Submit
            </Button>
            <Button
              type="button"
              variant="outlined"
              fullWidth
              onClick={RefreshForm}
              sx={buttonStyle}
            >
              Reset
            </Button>
          </Box>
        </Stack>
      </Box>
    </Paper>
  );
};

export default AddSubCategories;
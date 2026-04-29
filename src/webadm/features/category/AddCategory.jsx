

// import {
//   Box,
//   TextField,
//   Button,
//   Typography,
//   IconButton,
//   Grid,
//   Paper,
//   MenuItem,
//   FormControlLabel,
//   Switch
// } from "@mui/material";

// import CloseIcon from "@mui/icons-material/Close";
// import { useState } from "react";
// import { categoryAPI } from "./categoryAPI";



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
//  "& .MuiInputLabel-root": {
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
//       lg: "14px"
//     },
// };




// const AddCategories = ({ close, refresh }) => {
// //   const { uploadFile } = useAuth();

//   const [errors, setErrors] = useState({});
//   const [preview, setPreview] = useState("");

//   const [form, setForm] = useState({
//     name: "",
//     description: "",
//     status: "",
//     category_img: ""
//   });

//   // =========================
//   // LETTERS ONLY FUNCTION
//   // =========================
//   const handleNameChange = (e) => {
//     const value = e.target.value;

//     // Allow only letters and space
//     if (/^[A-Za-z\s]*$/.test(value)) {
//       setForm({ ...form, name: value });
//     }
//   };

//   // =========================
//   // NUMBERS ONLY FUNCTION 
//   // =========================
//   const handleNumberChange = (e, field) => {
//     const value = e.target.value;

//     if (/^\d*$/.test(value)) {
//       setForm({ ...form, [field]: value });
//     }
//   };

//   const handleImageChange = async (e) => {
//      const file = e.target.files[0];
//     if (!file) return;

//     setPreview(URL.createObjectURL(file));
//     setForm((prev) => ({
//       ...prev,
//       category_img: file, //  store File directly
//     }));
//   };

//   // =========================
//   // VALIDATION
//   // =========================
//   const validate = () => {
//     let temp = {};

//     if (!form.name.trim())
//       temp.name = "Category name is required";
//     else if (!/^[A-Za-z\s]+$/.test(form.name))
//       temp.name = "Only letters allowed";

//     if (!form.category_img)
//       temp.category_img = "Category image is required";

//     if (form.status === "") temp.status = "Select status";

//     setErrors(temp);
//     return Object.keys(temp).length === 0;
//   };

//   // =========================
//   // SUBMIT
//   // =========================
//   const handleSubmit = async (e) => {
//     console.log("submit")
//     e.preventDefault();

//     if (!validate()) return;
//       handleImageChange()
//     const formData = new FormData();
//      formData.append("name", form.name);
//      formData.append("status", form.status);
//      formData.append("description", form.description);
//      formData.append("category_img", form.category_img);
//     console.log("fromData in Category Add",formData)
//     try {
//       await categoryAPI.createCategoryApi(formData);
//       close();
//       refresh();
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   // =========================
//   // RESET
//   // =========================
//   const RefreshForm = () => {
//     setForm({
//       name: "",
//       description: "",
//       status: false,
//       category_img: ""
//     });

//     setPreview("");
//     setErrors({});
//   };

//   return (
//     <Box
//       sx={{
//         margin: "auto",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         // overflow:"hidden"
//       }}
//     >
//       <Paper
//     elevation={3}
//     sx={{
//       // width: "100%",
//       minWidth: 200,
//       maxWidth:300,
//       // maxHeight: "80vh",
//       p: 2,
//       borderRadius: 0,
//       // overflow:"hiden"
//       overflowX:"hidden"
//     }}
//       >
//         {/* HEADER */}
//         <Box display="flex" justifyContent="space-between" mb={1}>
//           <Typography variant="h6" fontWeight="bold" sx={fromheading}>
//             Add Category
//           </Typography>
//           <IconButton onClick={close}>
//             <CloseIcon />
//           </IconButton>
//         </Box>

//         <Box component="form" onSubmit={handleSubmit}>
//           <Grid container spacing={3}>

//             {/* CATEGORY NAME */}
//             <Grid minWidth={"100%"} item xs={12}>
//               <TextField
//                 label="Category Name"
//                             fullWidth
//             size="small"
//                 value={form.name}
//                 onChange={handleNameChange}
//                 error={!!errors.name}
//                 helperText={errors.name}
//                 sx={inputLabelStyle}
//               />
//             </Grid>

//             {/* IMAGE */}
//             <Grid item xs={12} minWidth={"100%"}>
//               <Button component="label" variant="outlined">
//                 Upload Category Image
//                 <input
//                   type="file"
//                   name="category_img"
//                   hidden
//                   // value={form.category_img}
//                   accept="image/*"
//                   onChange={handleImageChange}
//                   sx={inputLabelStyle}
//                 />
//               </Button>

//               {errors.category_img && (
//                 <Typography color="error" variant="body2">
//                   {errors.category_img}
//                 </Typography>
//               )}

//               {preview && (
//                 <Box mt={2}>
//                   <img src={preview} width="100" alt="preview" />
//                 </Box>
//               )}
//             </Grid>

//             {/* DESCRIPTION */}
//             <Grid item xs={12} >
//               <TextField
//                 label="Description"
//                 multiline
//                 rows={3}
//                 fullWidth
//             size="small"
//                 value={form.description}
//                 onChange={(e) =>
//                   setForm({ ...form, description: e.target.value })
//                 }
//                 sx={inputLabelStyle}
//               />
//             </Grid>

//             {/* STATUS */}
//             {/* <Grid item xs={12} minWidth={"100%"}>
//               <FormControlLabel
//                 control={
//                   <Switch
//                     checked={form.status}
//                     onChange={(e) =>
//                       setForm({ ...form, status: e.target.checked })
//                     }
//                     color="primary"
//                     sx={inputLabelStyle}
//                   />
//                 }
//                 label={form.status ? "Active" : "Inactive"}
//               />
//             </Grid> */}

//             {/* Status */}
//              <Grid item xs={12} md={6} minWidth={"100%"}>
//                <TextField
//                  select
//                  label="Status"
//                      fullWidth
//                      size="small"
//                  error={!!errors.status}
//                  helperText={errors.status}
//                  value={form.status}
//                  onChange={(e) =>
//                    setForm({ ...form, status: e.target.value })
//                  }
//      sx={inputLabelStyle}
//                >
//                          <MenuItem value={true} sx={{ color: "green", fontWeight: "bold",fontSize: {
//                   xs: "12px",
//                   sm: "13px",
//                   md: "14px",
//                   lg: "14px"
//                 }, }}>
//           Active
//         </MenuItem>

//         <MenuItem value={false} sx={{ color: "red", fontWeight: "bold" ,fontSize: {
//                   xs: "12px",
//                   sm: "13px",
//                   md: "14px",
//                   lg: "14px"
//                 },}}>
//           Inactive
//         </MenuItem>
//                </TextField>
//              </Grid>

//             {/* BUTTONS */}
//             <Grid
//               item
//               xs={12}
//               sx={{
//                 display: "flex",
//                 gap: "10px",
//                 justifyContent: "space-evenly"
//               }}
//               minWidth={"100%"}
//             >
//               <Button
//                 type="submit"
//                 variant="contained"
//                 fullWidth
//                  sx={buttonStyle}
//               >
//                 Save 
//               </Button>

//               <Button
//                 type="button"
//                 variant="contained"
//                 fullWidth
//                 onClick={RefreshForm}
//                  sx={buttonStyle}
//               >
//                 Reset
//               </Button>
//             </Grid>

//           </Grid>
//         </Box>
//       </Paper>
//     </Box>
//   );
// };

// export default AddCategories;











import {
  Box,
  TextField,
  Button,
  Typography,
  IconButton,
  Paper,
  MenuItem,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { categoryAPI } from "./categoryAPI";


// ── Style constants ───────────────────────────────────────────────────────────
const fromheading = {
  fontWeight: 700,
  color: "#1F2937",
  fontSize: { xs: "16px", sm: "18px", md: "20px" },
};

const inputLabelStyle = {
  "& .MuiInputLabel-root": {
    fontSize: { xs: "12px", sm: "13px", md: "14px" },
    color: "#3679ff",
  },
  "& .MuiInputBase-input": {
    fontSize: { xs: "11px", sm: "12px", md: "13px" },
    color: "#6B7280",
  },
};

const buttonStyle = {
  borderRadius: "8px",
  fontWeight: 600,
  height: { xs: 36, sm: 40 },
  fontSize: { xs: "12px", sm: "13px", md: "14px" },
  textTransform: "none",
};
// ── End style constants ───────────────────────────────────────────────────────


const AddCategories = ({ close, refresh }) => {

  // ── LOGIC: untouched ────────────────────────────────────────────────────────
  const [errors, setErrors] = useState({});
  const [preview, setPreview] = useState("");

  const [form, setForm] = useState({
    name: "",
    description: "",
    status: "",
    category_img: ""
  });

  const handleNameChange = (e) => {
    const value = e.target.value;
    if (/^[A-Za-z\s]*$/.test(value)) {
      setForm({ ...form, name: value });
    }
  };

  const handleNumberChange = (e, field) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setForm({ ...form, [field]: value });
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
    setForm((prev) => ({ ...prev, category_img: file }));
  };

  const validate = () => {
    let temp = {};
    if (!form.name.trim())
      temp.name = "Category name is required";
    else if (!/^[A-Za-z\s]+$/.test(form.name))
      temp.name = "Only letters allowed";
    if (!form.category_img)
      temp.category_img = "Category image is required";
    if (form.status === "") temp.status = "Select status";
    setErrors(temp);
    return Object.keys(temp).length === 0;
  };

  const handleSubmit = async (e) => {
    console.log("submit");
    e.preventDefault();
    if (!validate()) return;
    handleImageChange();
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("status", form.status);
    formData.append("description", form.description);
    formData.append("category_img", form.category_img);
    console.log("fromData in Category Add", formData);
    try {
      await categoryAPI.createCategoryApi(formData);
      close();
      refresh();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const RefreshForm = () => {
    setForm({ name: "", description: "", status: false, category_img: "" });
    setPreview("");
    setErrors({});
  };
  // ── END LOGIC ────────────────────────────────────────────────────────────────


  return (
    <Paper
      elevation={3}
      sx={{
        width: { xs: "88vw", sm: 420, md: 460 },
        maxWidth: "100%",
        p: { xs: 2.5, sm: 3, md: 3.5 },
        borderRadius: 3,
        overflowX: "hidden",
      }}
    >

      {/* ── Header ── */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2.5}>
        <Typography variant="h6" sx={fromheading}>
          Add Category
        </Typography>
        <IconButton onClick={close} size="small">
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>

      {/* ══════════════════════════════════════════
          FORM — single column flex, no Grid
          Grid was causing fields to wrap into
          unintended 2-column rows inside the Dialog
      ══════════════════════════════════════════ */}
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >

        {/* 1. Category Name */}
        <TextField
          label="Category Name"
          fullWidth
          size="small"
          value={form.name}
          onChange={handleNameChange}
          error={!!errors.name}
          helperText={errors.name}
          sx={inputLabelStyle}
        />

        {/* 2. Upload Image */}
        <Box>
          <Button
            component="label"
            variant="outlined"
            size="small"
            fullWidth
            sx={{
              borderRadius: 2,
              textTransform: "none",
              fontSize: { xs: "12px", sm: "13px" },
              height: { xs: 36, sm: 40 },
              justifyContent: "flex-start",
              px: 2,
              color: "text.secondary",
              borderColor: "#d1d5db",
              "&:hover": { borderColor: "#6366f1" },
            }}
          >
            📷&nbsp; Upload Category Image
            <input
              type="file"
              name="category_img"
              hidden
              accept="image/*"
              onChange={handleImageChange}
            />
          </Button>

          {errors.category_img && (
            <Typography color="error" fontSize={{ xs: "11px", sm: "12px" }} mt={0.5}>
              {errors.category_img}
            </Typography>
          )}

          {/* Image Preview */}
          {preview && (
            <Box mt={1.5}>
              <img
                src={preview}
                alt="preview"
                style={{
                  width: 80,
                  height: 80,
                  objectFit: "cover",
                  borderRadius: 8,
                  border: "1px solid #e5e7eb",
                  display: "block",
                }}
              />
            </Box>
          )}
        </Box>

        {/* 3. Description */}
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

        {/* 4. Status */}
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
          <MenuItem value={true} sx={{ color: "green", fontWeight: "bold", fontSize: { xs: "12px", sm: "13px" } }}>
            Active
          </MenuItem>
          <MenuItem value={false} sx={{ color: "red", fontWeight: "bold", fontSize: { xs: "12px", sm: "13px" } }}>
            Inactive
          </MenuItem>
        </TextField>

        {/* 5. Save + Reset — equal halves, side by side */}
        <Box display="flex" gap={1.5} mt={0.5}>
          <Button type="submit" variant="contained" fullWidth sx={buttonStyle}>
            Save
          </Button>
          <Button type="button" variant="outlined" fullWidth onClick={RefreshForm} sx={buttonStyle}>
            Reset
          </Button>
        </Box>

      </Box>
    </Paper>
  );
};

export default AddCategories;
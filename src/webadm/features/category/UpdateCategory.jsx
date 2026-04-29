// import {
//   Box,
//   TextField,
//   Button,
//   Typography,
//   MenuItem,
//   IconButton,
//   Avatar,
//   Paper,
//   Grid
// } from "@mui/material";

// import ClearIcon from "@mui/icons-material/Clear";
// import { useState, useEffect } from "react";
// import { useAuth } from "../../context/AuthContext";
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
//     // color: "#073288"
//     color: "#3679ff"
//   },
//     "& .MuiInputBase-input": {
//           fontSize: {
//       xs: "12px",
//       sm: "13px",
//       md: "14px",
//       lg: "14px"
//     },   
//     color: "#6B7280"
//     },
//      "& .MuiFormControlLabel-label": {
//       fontSize: {
//         xs: "12px",
//         sm: "13px",
//         md: "14px"
//       }
//     },
  
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




// const UpdateCategory = ({ category, close, refresh }) => {
// console.log("categorys for update category", category)
// //   const { uploadFile } = useAuth();

//   const [errors, setErrors] = useState({});

//   const [form, setForm] = useState({
//     id: "",
//     name: "",
//     description: "",
//     status: "",
//     category_img: ""
//   });

//   const [preview, setPreview] = useState("");

//   // ================= LOAD DATA =================
//   useEffect(() => {
//     if (category?.data) {

//       // const imagePath = product.data.category_img;
//         const category_selected = category.data[0]
//         console.log("cat_img",category_selected.category_img)
//       setForm({
//         id: category_selected.id || "",
//         name: category_selected.name || "",
//         description: category_selected.description || "",
//         status: category_selected.status ?? "",
//         category_img : category_selected.category_img
//         // category_img: product.data[0].category_img || ""
//       });

//       if (category_selected.category_img) {
//       setPreview(category_selected.category_img);
//       console.log(preview)
//     }

//       // if (imagePath) {
//       //   loadSingleImage(imagePath);
//       // }
//     }
//   }, [category]);

//   // ================= CLEAN MEMORY =================
//   useEffect(() => {
//     return () => {
//       if (preview) {
        
//         URL.revokeObjectURL(preview);
//       }
//     };
//   }, [preview]);


//   // ================= NAME VALIDATION (Letters Only) =================
//   const handleNameChange = (e) => {
//     const value = e.target.value;

//     if (/^[A-Za-z\s]*$/.test(value)) {
//       setForm({
//         ...form,
//         name: value
//       });
//     }
//   };

//   // ================= IMAGE CHANGE =================

//   const handleImageChange = async (e) => {
//      const file = e.target.files[0];
//     if (!file) return;

//     setPreview(URL.createObjectURL(file));
//     setForm((prev) => ({
//       ...prev,
//       category_img: file, //  store File directly
//     }));
//   };

//   // ================= VALIDATION =================
//   const validate = () => {

//     let temp = {};

//     if (!form.name.trim())
//       temp.name = "Name is required";
//     else if (!/^[A-Za-z\s]+$/.test(form.name))
//       temp.name = "Only letters allowed";

//     setErrors(temp);

//     return Object.keys(temp).length === 0;
//   };

//   // ================= SUBMIT =================
// const handleSubmit = async (e) => {
//   e.preventDefault();

//   if (!validate()) return;

//   try {
//     const formData = new FormData();

//     formData.append("id", Number(form.id));
//     formData.append("name", form.name);
//     formData.append("status", form.status);
//     formData.append("description", form.description);

//     // send only if new image uploaded

//   let imageFile;

// if (form.category_img  instanceof File) {
//   imageFile = form.category_img 
// }

// if (imageFile) {
//   formData.append("category_img", imageFile);
// }

//     const res = await categoryAPI.updateCategoryApi(formData);

//     if (res.status === 200) {
//       close();
//       refresh();
//     }

//   } catch (error) {
//     console.error("Update error:", error.response?.data);
//   }
// };

//   // ================= RESET =================
//   const handleReset = () => {
//     setForm({
//       id: "",
//       name: "",
//       description: "",
//       status: "",
//       category_img: ""
//     });
//     setPreview("");
//     setErrors({});
//   };

//   if (!category) return null;

//   return (
//          <Paper
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
//     >
//     <Box

//       component="form"
//       onSubmit={handleSubmit}
//     >
//       {/* HEADER */}
//       <Box sx={{ display: "flex", justifyContent: "space-between" }}>
//         <Typography variant="h6"  sx={fromheading}>
//           Update Category
//         </Typography>

//         <IconButton onClick={close}>
//           <ClearIcon />
//         </IconButton>
//       </Box>

//       {/* NAME */}
//       <TextField
//         label="Name"
//         name="name"
//         fullWidth
//           size="small"
//         margin="normal"
//         value={form.name}
//         onChange={handleNameChange}
//         error={!!errors.name}
//         helperText={errors.name}
//          sx={inputLabelStyle}
//       />

//       {/* IMAGE */}
//       <Box sx={{ mt: 2, mb: 2 }}>
//         <Avatar
//           src={preview}
//           sx={{ width: 100, height: 100 }}
//           variant="rounded"
//         />

//         <Button
//           variant="outlined"
//           component="label"
//            sx={inputLabelStyle}
//         >
//           Change Image
//           <input
//             type="file"
//             hidden
//             accept="image/*"
//             onChange={handleImageChange}
//           />
//         </Button>
//       </Box>

//       {/* DESCRIPTION */}
//       <TextField
//         label="Description"
//         name="description"
//         fullWidth
//           size="small"
//         margin="normal"
//         multiline
//         rows={3}
//         value={form.description}
//         onChange={(e) =>
//           setForm({ ...form, description: e.target.value })
//         }
//          sx={inputLabelStyle}
//       />

//       {/* STATUS */}
//       <TextField
//         select
//         label="Status"
//         name="status"
//         fullWidth
//           size="small"
//         margin="normal"
//         value={form.status}
//         onChange={(e) =>
//           setForm({
//             ...form,
//             status: e.target.value === true || e.target.value === "true"
//           })
//         }
//          sx={inputLabelStyle}
//       >
//         <MenuItem value={true} sx={{ color: "green", fontWeight: "bold",fontSize: {
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
//       </TextField>

//       {/* BUTTONS */}
//           <Grid
//               item
//               xs={12}
//               sx={{
//                 display: "flex",
//                 gap: "10px",
//                 justifyContent: "space-evenly"
//               }}
//               minWidth={"100%"}
//             >
//         <Button
//           type="submit"
//           variant="contained"
//           fullWidth
//            sx={buttonStyle}
//         >
//           Update
//         </Button>

//         <Button
//           type="button"
//           variant="contained"
//           fullWidth
    
//           onClick={handleReset}
//            sx={buttonStyle}
//         >
//           Reset
//         </Button>
//       </Grid>

//     </Box>
//     </Paper>
//   );
// };

// export default UpdateCategory;











import {
  Box,
  TextField,
  Button,
  Typography,
  MenuItem,
  IconButton,
  Avatar,
  Paper,
} from "@mui/material";

import ClearIcon from "@mui/icons-material/Clear";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { categoryAPI } from "./categoryAPI";


// ── Style constants ───────────────────────────────────────────────────────────
const fromheading = {
  fontWeight: 700,
  color: "#111827",
  fontSize: { xs: "15px", sm: "17px", md: "18px" },
  letterSpacing: "-0.3px",
};

const inputLabelStyle = {
  "& .MuiInputLabel-root": {
    fontSize: { xs: "12px", sm: "13px", md: "13px" },
    color: "#9CA3AF",
    fontWeight: 500,
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "#3B82F6",
  },
  "& .MuiInputBase-input": {
    fontSize: { xs: "12px", sm: "13px", md: "13px" },
    color: "#1F2937",
    fontWeight: 500,
  },
  "& .MuiOutlinedInput-root": {
    borderRadius: "10px",
    backgroundColor: "#F9FAFB",
    "& fieldset": {
      borderColor: "#E5E7EB",
    },
    "&:hover fieldset": {
      borderColor: "#D1D5DB",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#3B82F6",
      borderWidth: "1.5px",
    },
  },
  "& .MuiFormHelperText-root": {
    fontSize: "11px",
    marginLeft: "4px",
  },
};

const buttonStyle = {
  borderRadius: "10px",
  fontWeight: 600,
  height: { xs: 38, sm: 42 },
  fontSize: { xs: "12px", sm: "13px" },
  textTransform: "none",
  letterSpacing: "0.2px",
  boxShadow: "none",
  "&:hover": { boxShadow: "none" },
};
// ── End style constants ───────────────────────────────────────────────────────


const UpdateCategory = ({ category, close, refresh }) => {
  console.log("categorys for update category", category);

  // ── LOGIC: untouched ────────────────────────────────────────────────────────
  const [errors, setErrors] = useState({});

  const [form, setForm] = useState({
    id: "",
    name: "",
    description: "",
    status: "",
    category_img: ""
  });

  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (category?.data) {
      const category_selected = category.data[0];
      console.log("cat_img", category_selected.category_img);
      setForm({
        id: category_selected.id || "",
        name: category_selected.name || "",
        description: category_selected.description || "",
        status: category_selected.status ?? "",
        category_img: category_selected.category_img
      });
      if (category_selected.category_img) {
        setPreview(category_selected.category_img);
        console.log(preview);
      }
    }
  }, [category]);

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const handleNameChange = (e) => {
    const value = e.target.value;
    if (/^[A-Za-z\s]*$/.test(value)) {
      setForm({ ...form, name: value });
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
      temp.name = "Name is required";
    else if (!/^[A-Za-z\s]+$/.test(form.name))
      temp.name = "Only letters allowed";
    setErrors(temp);
    return Object.keys(temp).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      const formData = new FormData();
      formData.append("id", Number(form.id));
      formData.append("name", form.name);
      formData.append("status", form.status);
      formData.append("description", form.description);

      let imageFile;
      if (form.category_img instanceof File) {
        imageFile = form.category_img;
      }
      if (imageFile) {
        formData.append("category_img", imageFile);
      }

      const res = await categoryAPI.updateCategoryApi(formData);
      if (res.status === 200) {
        close();
        refresh();
      }
    } catch (error) {
      console.error("Update error:", error.response?.data);
    }
  };

  const handleReset = () => {
    setForm({ id: "", name: "", description: "", status: "", category_img: "" });
    setPreview("");
    setErrors({});
  };

  if (!category) return null;
  // ── END LOGIC ────────────────────────────────────────────────────────────────


  return (
    <Paper
      elevation={0}
      sx={{
        width: { xs: "92vw", sm: 460, md: 500 },
        maxWidth: "100%",
        borderRadius: "16px",
        border: "1px solid #E5E7EB",
        overflow: "hidden",
        boxShadow: "0 8px 32px rgba(0,0,0,0.10)",
      }}
    >
      {/* ── Colored top accent bar ── */}
      <Box
        sx={{
          height: 4,
          background: "linear-gradient(90deg, #3B82F6 0%, #6366F1 100%)",
        }}
      />

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: { xs: 2, sm: 2.5 },
          p: { xs: 2.5, sm: 3, md: 3.5 },
        }}
      >

        {/* ── Header ── */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography variant="h6" sx={fromheading}>
              Update Category
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: "11px", sm: "12px" },
                color: "#9CA3AF",
                mt: 0.3,
                fontWeight: 400,
              }}
            >
              Edit the details below and save
            </Typography>
          </Box>
          <IconButton
            onClick={close}
            size="small"
            sx={{
              bgcolor: "#F3F4F6",
              borderRadius: "8px",
              width: 32,
              height: 32,
              "&:hover": { bgcolor: "#E5E7EB" },
            }}
          >
            <ClearIcon sx={{ fontSize: 16, color: "#6B7280" }} />
          </IconButton>
        </Box>

        {/* ── Divider ── */}
        <Box sx={{ height: "1px", bgcolor: "#F3F4F6", mx: -3.5 }} />

        {/* ── Image Upload Row ── */}
        <Box
          display="flex"
          alignItems="center"
          gap={2}
          p={2}
          sx={{
            bgcolor: "#F8FAFF",
            borderRadius: "12px",
            border: "1.5px dashed #BFDBFE",
          }}
        >
          <Avatar
            src={preview}
            sx={{
              width: { xs: 60, sm: 72 },
              height: { xs: 60, sm: 72 },
              flexShrink: 0,
              borderRadius: "12px",
              border: "2px solid #E0EAFF",
              bgcolor: "#EEF2FF",
            }}
            variant="rounded"
          />
          <Box flex={1} minWidth={0}>
            <Typography
              sx={{
                fontSize: { xs: "12px", sm: "13px" },
                fontWeight: 600,
                color: "#374151",
                mb: 0.4,
              }}
            >
              Category Image
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: "10px", sm: "11px" },
                color: "#9CA3AF",
                mb: 1,
              }}
            >
              JPG, PNG or WebP · Max 5MB
            </Typography>
            <Button
              variant="outlined"
              component="label"
              size="small"
              sx={{
                borderRadius: "8px",
                textTransform: "none",
                fontSize: { xs: "11px", sm: "12px" },
                fontWeight: 600,
                color: "#3B82F6",
                borderColor: "#BFDBFE",
                bgcolor: "#fff",
                px: 1.5,
                py: 0.5,
                "&:hover": {
                  bgcolor: "#EFF6FF",
                  borderColor: "#93C5FD",
                },
              }}
            >
              Change Image
              <input type="file" hidden accept="image/*" onChange={handleImageChange} />
            </Button>
          </Box>
        </Box>

        {/* ── Name ── */}
        <TextField
          label="Category Name"
          name="name"
          fullWidth
          size="small"
          value={form.name}
          onChange={handleNameChange}
          error={!!errors.name}
          helperText={errors.name}
          sx={inputLabelStyle}
        />

        {/* ── Description ── */}
        <TextField
          label="Description"
          name="description"
          fullWidth
          size="small"
          multiline
          rows={3}
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          sx={{
            ...inputLabelStyle,
            "& .MuiOutlinedInput-root": {
              ...inputLabelStyle["& .MuiOutlinedInput-root"],
              alignItems: "flex-start",
            },
          }}
        />

        {/* ── Status ── */}
        <TextField
          select
          label="Status"
          name="status"
          fullWidth
          size="small"
          value={form.status}
          onChange={(e) =>
            setForm({
              ...form,
              status: e.target.value === true || e.target.value === "true"
            })
          }
          sx={inputLabelStyle}
        >
          <MenuItem
            value={true}
            sx={{
              fontSize: { xs: "12px", sm: "13px" },
              fontWeight: 600,
              color: "#16A34A",
              gap: 1,
            }}
          >
            ● &nbsp;Active
          </MenuItem>
          <MenuItem
            value={false}
            sx={{
              fontSize: { xs: "12px", sm: "13px" },
              fontWeight: 600,
              color: "#DC2626",
              gap: 1,
            }}
          >
            ● &nbsp;Inactive
          </MenuItem>
        </TextField>

        {/* ── Buttons ── */}
        <Box display="flex" gap={1.5} pt={0.5}>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              ...buttonStyle,
              background: "linear-gradient(135deg, #3B82F6 0%, #6366F1 100%)",
              "&:hover": {
                background: "linear-gradient(135deg, #2563EB 0%, #4F46E5 100%)",
                boxShadow: "0 4px 16px rgba(99,102,241,0.35)",
              },
            }}
          >
            Update
          </Button>
          <Button
            type="button"
            variant="outlined"
            fullWidth
            onClick={handleReset}
            sx={{
              ...buttonStyle,
              color: "#6B7280",
              borderColor: "#E5E7EB",
              bgcolor: "#F9FAFB",
              "&:hover": {
                bgcolor: "#F3F4F6",
                borderColor: "#D1D5DB",
              },
            }}
          >
            Reset
          </Button>
        </Box>

      </Box>
    </Paper>
  );
};

export default UpdateCategory;
// import {
//   Box,
//   TextField,
//   Button,
//   MenuItem,
//   Typography,
//   IconButton,
//   Grid,
//   Paper,
//   FormGroup,
//   FormControlLabel,
//   Checkbox
// } from "@mui/material";

// import CloseIcon from "@mui/icons-material/Close";
// import { useEffect, useState } from "react";
// import { useAuth } from "../../context/AuthContext";
// import { productsAPI } from "./productAPI";
// import { dropdownAPI } from "../../services/dropdownAPI";
// // import { authAPI } from "../api/Index";

// const fromheading={
//     fontWeight: 700,
//     color: "#1F2937",
//     fontSize: {
//       xs: "16px",
//       sm: "20px",
//       md: "22px",
//       lg: "22px"
//     },
//     minWidth:200,
// mb:4
// }

// const inputLabelStyle = {
//   "& .MuiInputLabel-root": {
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



// const AddProduct = ({ close, refresh }) => {
//   const { addProductApi, uploadFile } = useAuth();

//   const [subcatdrop, setsubCatdrop] = useState([]);
//   const [accepted, setAccepted] = useState(false);
//   const [preview, setPreview] = useState("");
//    const [catdrop, setCatdrop] = useState([]);

//   const [form, setForm] = useState({
//     name: "",
//     tamil_name: "",
//     price: "",
//     stock: "",
//     is_active: "",
//     subcategory_id: "",
//     // expiry_date: "",
//     trend_status: false,
//     weight: "",
//     description: "",
//     product_img: "",
//   });

//   const [errors, setErrors] = useState({});

//   // ================= LOAD CATEGORY DROP =================
//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const res = await dropdownAPI.fetchDropSub();
//         setsubCatdrop(res.data.data);
//       } catch (err) {
//         console.error("Error fetching categories:", err);
//       }
//     };
//     fetchCategories();
//   }, []);

//     // ---------------- FETCH CATEGORY DROPDOWN ----------------
//     useEffect(() => {
//       const categorydrop = async () => {
//         try {
//           const catData = await dropdownAPI.fetchDropCategory();
//           setCatdrop(catData.data.data);
//         } catch (error) {
//           console.error("Error fetching categories:", error);
//         }
//       };
//       categorydrop();
//     }, []);

//   // ================= HANDLE CHANGE =================
//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     // Numbers only validation for numeric fields
//     if (["price", "stock", "weight"].includes(name)) {
//       if (value === "" || /^[0-9]*$/.test(value)) {
//         setForm({ ...form, [name]: value });
//       }
//     }
//     // Tamil + English letters for tamil_name
//     else if (name === "tamil_name") {
//       if (/^[\u0B80-\u0BFFa-zA-Z\s]*$/.test(value)) {
//         setForm({ ...form, [name]: value });
//       }
//     }
//     // Letters only for name
//     else if (name === "name") {
//       if (/^[a-zA-Z\s]*$/.test(value)) {
//         setForm({ ...form, [name]: value });
//       }
//     }
//     // Other fields
//     else {
//       setForm({ ...form, [name]: value });
//     }
//   };

//   // ================= IMAGE UPLOAD =================
//   const handleImageChange = async (e) => {
//      const file = e.target.files[0];
//     if (!file) return;

//     setPreview(URL.createObjectURL(file));
//     setForm((prev) => ({
//       ...prev,
//       product_img: file, //  store File directly
//     }));
//   };

//   // ================= VALIDATION =================
//   const validate = () => {
//     let temp = {};

//     if (!form.name.trim()) temp.name = "Product Name is required";
//     if (!form.tamil_name.trim()) temp.tamil_name = "Tamil Name is required";
//     if (!form.price) temp.price = "Price is required";
//     if (!form.stock) temp.stock = "Stock is required";
//     // if (!form.weight) temp.weight = "Weight is required";
//     if (!form.unit) temp.unit = "Unit is required";
//     if (!form.is_active && form.is_active !== false)
//       temp.is_active = "Select status";
//     if (!form.category_id) temp.category_id = "Select category";
//     // if (!form.expiry_date) temp.expiry_date = "Select expiry date";
//     if (!accepted) temp.accepted = "You must accept details";
//     if (!form.product_img) temp.product_img = "Upload product image";

//     setErrors(temp);

//     return Object.keys(temp).length === 0;
//   };

//   // ================= SUBMIT =================
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!validate()) return;

//     const formData = new FormData();
//     formData.append("name", form.name);
//     formData.append("tamil_name", form.tamil_name);
//     formData.append("price", parseInt(form.price, 10));
//     formData.append("stock", parseInt(form.stock, 10));
//     formData.append("category_id", parseInt(form.category_id, 10));
//     // formData.append("weight", parseInt(form.weight, 10));
//     formData.append("is_active", form.is_active);
//     formData.append("unit",form.unit);
//     formData.append("trend_status", form.trend_status);
//     formData.append("expiry_date", form.expiry_date);
//     formData.append("description", form.description);
//     formData.append("product_img", form.product_img);
//     if (form.subcategory_id) {
//       formData.append("subcategory_id", parseInt(form.subcategory_id, 10));
//     }

//     try {
//       await productsAPI.addProductApi(formData);
//       close();
//       // refresh();
//     } catch (err) {
//       console.error(err.response?.data);
//     }
//   };

//   // ================= RESET =================
//   const RefreshForm = () => {
//     setForm({
//       name: "",
//       tamil_name: "",
//       price: "",
//       stock: "",
//       is_active: "",
//       subcategory_id: "",
//       // expiry_date: "",
//       trend_status: false,
//       weight: "",
//       description: "",
//       product_img: "",
//     });
//     setPreview("");
//     setAccepted(false);
//     setErrors({});
//   };

//   return (
//     <Box
//       sx={{
//         position: "fixed",
//         inset: 0,
//         backgroundColor: "rgba(0,0,0,0.4)",
//         display: "flex",
//         justifyContent: "center",
//         flexWrap:"wrap",
//         alignItems: "center",
//         zIndex: 999,
//         borderRadius:3,
//         // minWidth:300,
//         maxWidth:"100%",
//         // overflowY:"auto",
//         // p:2
//       }}
//     >
//       <Paper sx={{ width: "100%", maxWidth:800,maxHeight:"80vh",m:4, p: 3, borderRadius: 3,overflowY:'auto' }}>
//         <Box display="flex" justifyContent="space-between" mt={0}>
//           <Typography
//           sx={fromheading}>
    
//     Add Product</Typography>
//           <IconButton onClick={close}>
//             <CloseIcon />
//           </IconButton>
//         </Box>

//         <Box component="form" onSubmit={handleSubmit}>
//           <Grid container spacing={3}>

//             {/* NAME */}
//             <Grid item xs={12} md={6}>
//               <TextField
//                 label="Product Name"
//                 name="name"
//                 fullWidth
//                 size="small"
//                 value={form.name}
//                 onChange={handleChange}
//                 error={!!errors.name}
//                 helperText={errors.name}
//            sx={inputLabelStyle}
//               />
//             </Grid>

//             {/* TAMIL NAME */}
//             <Grid item xs={12} md={6} minWidth={220} >
//               <TextField
//                 label="Tamil Name"
//                 name="tamil_name"
//                 fullWidth
//                 size="small"
//                 value={form.tamil_name}
//                 onChange={handleChange}
//                 error={!!errors.tamil_name}
//                 helperText={errors.tamil_name}
//                 sx={inputLabelStyle}
//               />
//             </Grid>

//             {/* status */}
//             <Grid item xs={12} md={6} minWidth={220}>
//                          <TextField
//                               select
//                 label="Status"
//                 // name="is_active"
//                 fullWidth
//                 size="small"
//                 value={form.is_active}
//                 onChange={(e) =>
//                   setForm({ ...form, is_active: e.target.value})
//                 }
//                 error={!!errors.is_active}
//                 helperText={errors.is_active}
//                sx={inputLabelStyle} >
//                                    <MenuItem value={true} sx={{ color: "green", fontWeight: "bold",fontSize: {
//                             xs: "12px",
//                             sm: "13px",
//                             md: "14px",
//                             lg: "14px"
//                           }, }}>
//                     Active
//                   </MenuItem>
          
//                   <MenuItem value={false} sx={{ color: "red", fontWeight: "bold" ,fontSize: {
//                             xs: "12px",
//                             sm: "13px",
//                             md: "14px",
//                             lg: "14px"
//                           },}}>
//                     Inactive
//                   </MenuItem>
//                          </TextField>
//                        </Grid>

//             {/* category */}
//             <Grid item xs={12} md={6} minWidth={220} >
//               <TextField
//                 select
//                 label="Select Category"
//                 fullWidth
//                  size="small"
//                 value={form.category_id}
//                 onChange={(e) =>
//                   setForm({ ...form, category_id: Number(e.target.value) })
//                 }
//                 error={!!errors.subcategory_id}
//                 helperText={errors.subcategory_id}
//                 sx={inputLabelStyle}              
//               >
//                 {catdrop.length > 0 ? (
//                   catdrop.map((s) => (
//                     <MenuItem key={s.value} value={s.value} sx={{    fontSize: {
//                   xs: "12px",
//                   sm: "13px",
//                   md: "14px",
//                   lg: "14px"
//                 },
//                 color: "#6B7280"}}>
//                       {s.label}
//                     </MenuItem>
//                   ))
//                 ) : (
//                   <MenuItem disabled>No Category found</MenuItem>
//                 )}
//               </TextField>
//             </Grid>


//             {/* SUBCATEGORY */}
//             <Grid item xs={12} md={6} minWidth={220}>
//               <TextField
//                 select
//                 label="Select SubCategory"
//                 fullWidth
//                  size="small"
//                 value={form.subcategory_id }
//                 onChange={(e) =>
//                   setForm({ ...form, subcategory_id: Number(e.target.value) })
//                 }
//                 error={!!errors.subcategory_id}
//                 helperText={errors.subcategory_id}
//                 sx={inputLabelStyle}              
//               >
//                 {subcatdrop.length > 0 ? (
//                   subcatdrop.map((s) => (
//                     <MenuItem key={s.value} value={s.value} sx={{    fontSize: {
//                   xs: "12px",
//                   sm: "13px",
//                   md: "14px",
//                   lg: "14px"
//                 },
//                 color: "#6B7280"}}>
//                       {s.label }
//                     </MenuItem>
//                   ))
//                 ) : (
//                   <MenuItem disabled>No SubCategory found</MenuItem>
//                 )}
//               </TextField>
//             </Grid>


//             {/* TREND STATUS */}
//             <Grid item xs={12} minWidth={220}>
//               <TextField
//                 select
//                 label="Trend Status"
//                 name="trend_status"
//                 fullWidth
//                 size="small"
//                 value={form.trend_status}
//                sx={inputLabelStyle}               
//                 onChange={(e) =>
//                   setForm({ ...form, trend_status: e.target.value })
//                 }
//               >

//                 <MenuItem value={true} sx={{    fontSize: {
//                   xs: "12px",
//                   sm: "13px",
//                   md: "14px",
//                   lg: "14px"
//                 },
//                 color: "#6B7280"}}>Trending</MenuItem>
//                 <MenuItem value={false} sx={{    fontSize: {
//                   xs: "12px",
//                   sm: "13px",
//                   md: "14px",
//                   lg: "14px"
//                 },
//                 color: "#6B7280"}}>Not Trending</MenuItem>
//               </TextField>
//             </Grid>


//             {/* unit */}
//                {/* <Grid item xs={12} md={6} minWidth={220}>
//               <TextField
//                 label="Unit"
//                 name="unit"
//                 fullWidth
//                 size="small"
//                 value={form.unit}
//                 onChange={handleChange}
//                 error={!!errors.unit}
//                 helperText={errors.unit}
//                 sx={inputLabelStyle}
//               />
//             </Grid> */}



//             {/* unit */}
// <Grid item xs={12} md={6} minWidth={220}>
//   <TextField
//     select
//     label="Unit"
//     name="unit"
//     fullWidth
//     size="small"
//     value={form.unit}
//     onChange={handleChange}
//     error={!!errors.unit}
//     helperText={errors.unit}
//     sx={inputLabelStyle}
//   >
//     <MenuItem value="1bn" sx={{ fontSize: { xs: "12px", sm: "13px", md: "14px", lg: "14px" }, color: "#6B7280" }}>1bn</MenuItem>
//     <MenuItem value="1kg" sx={{ fontSize: { xs: "12px", sm: "13px", md: "14px", lg: "14px" }, color: "#6B7280" }}>1kg</MenuItem>
//     <MenuItem value="1 ltr" sx={{ fontSize: { xs: "12px", sm: "13px", md: "14px", lg: "14px" }, color: "#6B7280" }}>1 ltr</MenuItem>
//     <MenuItem value="1 pcs" sx={{ fontSize: { xs: "12px", sm: "13px", md: "14px", lg: "14px" }, color: "#6B7280" }}>1 pcs</MenuItem>
//   </TextField>
// </Grid>
            



//             {/* PRICE */}
//             <Grid item xs={12} md={6} minWidth={220}>
//               <TextField
//                 label="Price"
//                 name="price"
//                 type="number"
//                 fullWidth
//                 size="small"
//                 value={form.price}
//                 onChange={handleChange}
//                 error={!!errors.price}
//                 helperText={errors.price}
//                 sx={inputLabelStyle}              
//               />
//             </Grid>
              

//             {/* STOCK */}
//             <Grid item xs={12} md={6} minWidth={220} >
//               <TextField
//                 label="Stock"
//                 name="stock"
//                 type="number"
//                 fullWidth
//                 size="small"
//                 value={form.stock}
//                 onChange={handleChange}
//                 error={!!errors.stock}
//                 helperText={errors.stock}
//                 sx={inputLabelStyle}
// />
//             </Grid>

//             {/* STATUS */}
//             {/* <Grid  item xs={12} md={6} minWidth={220}>
//               <TextField
//                 select
//                 label="Status"
//                 name="is_active"
//                 fullWidth
//                 size="small"
//                 value={form.is_active}
//                 onChange={(e) =>
//                   setForm({ ...form, is_active: e.target.value === "true" })
//                 }
//                 error={!!errors.is_active}
//                 helperText={errors.is_active}
//                sx={inputLabelStyle}             
//               >
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
//               </TextField>
//             </Grid> */}
                       


                        

//             {/* EXPIRY DATE */}
//             {/* <Grid item xs={12} md={6} minWidth={220}>
//               <TextField
//                 type="Date"
//                 name="expiry_date"
//                 fullWidth
//                 size="small"
//                 value={form.expiry_date}
//                 onChange={handleChange}
//                 error={!!errors.expiry_date}
//                 helperText={errors.expiry_date}
//                 sx={inputLabelStyle}
//               />
//             </Grid> */}

            

            
         

//             {/* IMAGE */}
//             <Grid item xs={12} >
//               <Button component="label" variant="outlined"   sx={{
//     fontSize: {
//       xs: "12px",
//       sm: "13px",
//       md: "14px"
//     },
//     textTransform: "none"
//   }}>
//                 Upload Product Image
//                 <input
//                   type="file"
//                   name="product_img"
//                   hidden
//                   accept="image/*"
//                   onChange={handleImageChange}
          
//                 />
//               </Button>

//               {preview && (
//                   <Box
//     mt={2}
//     sx={{
//       width: {
//         xs: "100%",
//         sm: 200,
//         md: 250
//       },
//       height: 150,
//       border: "1px solid #e5e7eb",
//       borderRadius: 2,
//       overflow: "hidden",
//       display: "flex",
//       justifyContent: "center",
//       alignItems: "center",
//       backgroundColor: "#f9fafb"
//     }}
//   >
//                   <img src={preview} width="100%" />
//                 </Box>
//               )}

//               {errors.product_img && (
//                 <Typography color="error" variant="caption">
//                   {errors.product_img}
//                 </Typography>
//               )}
//             </Grid>

//             {/* DESCRIPTION */}
//             <Grid item xs={12} width={"95%"} >
//               <TextField
//                 label="Description"
//                 name="description"
//                 multiline
//                 rows={3}
//                 fullWidth
//                 size="small"
//                 value={form.description}
//                 onChange={handleChange}
//                sx={inputLabelStyle}
//               />
//             </Grid>



//             {/* WEIGHT */}
//             {/* <Grid item xs={12} md={6} minWidth={220} >
//               <TextField
//                 label="Weight"
//                 name="weight"
//                 fullWidth
//                 size="small"
//                 value={form.weight}
//                 onChange={handleChange}
//                 error={!!errors.weight}
//                 helperText={errors.weight}
//                 sx={inputLabelStyle}               
//               />
//             </Grid> */}

//             {/* ACCEPT CHECKBOX */}
//             <Grid item xs={12} width={"100%"}>
//               <FormGroup>
//                 <FormControlLabel
//                   control={
//                     <Checkbox
//                       checked={accepted}
//                       onChange={(e) => setAccepted(e.target.checked)}
//                     />
//                   }
//                   label="Accept the above given details"
//                   sx={inputLabelStyle}
//                 />
//               </FormGroup>
//               {errors.accepted && (
//                 <Typography color="error" variant="caption">
//                   {errors.accepted}
//                 </Typography>
//               )}
//             </Grid>

//             {/* BUTTONS */}
//         <Grid  item xs={12} sx={{display:"flex",gap:"20px",justifyContent:"space-evenly",alignItems:"center", width:"50%",margin:"auto"}}>

//               <Button
//                 type="submit"
//                 variant="contained"
//                 fullWidth
// sx={buttonStyle}              >
//                 Save Product
//               </Button>

//               <Button
//                 variant="contained"
//                 onClick={RefreshForm}
//                 fullWidth
//               sx={buttonStyle}              >
//                 Reset
//               </Button>
//             </Grid>

//           </Grid>
//         </Box>
//       </Paper>
//     </Box>
//   );
// };

// export default AddProduct;











import {
  Box,
  TextField,
  Button,
  MenuItem,
  Typography,
  IconButton,
  Grid,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Paper,
  Divider,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { productsAPI } from "./productAPI";
import { dropdownAPI } from "../../services/dropdownAPI";

const headingStyle = {
  fontWeight: 700,
  fontSize: { xs: "16px", sm: "18px", md: "20px" },
};

const sectionTitle = {
  fontWeight: 600,
  fontSize: "14px",
  color: "#374151",
  mb: 1,
};

const inputStyle = {
  "& .MuiInputLabel-root": {
    fontSize: { xs: "12px", sm: "13px" },
    color: "#3679ff",
  },
  "& .MuiInputBase-input": {
    fontSize: { xs: "12px", sm: "13px" },
  },
};

const buttonStyle = {
  borderRadius: "8px",
  height: 40,
  textTransform: "none",
};

const AddProduct = ({ close, onSuccess, onError }) => {
  const { addProductApi } = useAuth();

  const [subcatdrop, setsubCatdrop] = useState([]);
  const [catdrop, setCatdrop] = useState([]);
  const [accepted, setAccepted] = useState(false);
  const [preview, setPreview] = useState("");

  const [form, setForm] = useState({
    name: "",
    tamil_name: "",
    price: "",
    stock: "",
    is_active: "",
    subcategory_id: "",
    trend_status: false,
    weight: "",
    description: "",
    product_img: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    dropdownAPI.fetchDropSub().then(res => setsubCatdrop(res.data.data));
    dropdownAPI.fetchDropCategory().then(res => setCatdrop(res.data.data));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (["price", "stock"].includes(name)) {
      if (value === "" || /^[0-9]*$/.test(value)) {
        setForm({ ...form, [name]: value });
      }
    } else if (name === "tamil_name") {
      if (/^[\u0B80-\u0BFFa-zA-Z\s]*$/.test(value)) {
        setForm({ ...form, [name]: value });
      }
    } else if (name === "name") {
      if (/^[a-zA-Z\s]*$/.test(value)) {
        setForm({ ...form, [name]: value });
      }
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
    setForm((prev) => ({ ...prev, product_img: file }));
  };

  const validate = () => {
    let temp = {};
    if (!form.name.trim()) temp.name = "Required";
    if (!form.tamil_name.trim()) temp.tamil_name = "Required";
    if (!form.price) temp.price = "Required";
    if (!form.stock) temp.stock = "Required";
    if (!form.unit) temp.unit = "Required";
    if (!form.category_id) temp.category_id = "Required";
    if (!accepted) temp.accepted = "Required";
    if (!form.product_img) temp.product_img = "Required";
    setErrors(temp);
    return Object.keys(temp).length === 0;
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (!validate()) return;

  //   const formData = new FormData();
  //   Object.entries(form).forEach(([k, v]) => formData.append(k, v));

  //   await productsAPI.addProductApi(formData);
  //   close();
  // };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const formData = new FormData();
    Object.entries(form).forEach(([k, v]) => formData.append(k, v));

    try {
      await productsAPI.addProductApi(formData);
      onSuccess(); // closes modal + refreshes table + shows success toast
    } catch (err) {
      const message =
        err?.response?.data?.data?.message || "Something went wrong";
      onError(message); // shows error toast, modal stays open
    }
  };



  const resetForm = () => {
    setForm({});
    setPreview("");
    setAccepted(false);
    setErrors({});
  };

  return (
    <Box sx={{
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.6)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      p: 2,
      zIndex: 1300
    }}>
      <Paper sx={{
        width: "100%",
        maxWidth: 900,
        maxHeight: "92vh",
        display: "flex",
        flexDirection: "column",
        borderRadius: 3,
        overflow: "hidden"
      }}>

        {/* HEADER */}
        <Box sx={{ p: 2, borderBottom: "1px solid #eee", display: "flex", justifyContent: "space-between" }}>
          <Typography sx={headingStyle}>Add Product</Typography>
          <IconButton onClick={close}><CloseIcon /></IconButton>
        </Box>

        <Box component="form" onSubmit={handleSubmit} sx={{ p: 3, overflowY: "auto" }}>

          {/* BASIC INFO */}
          <Typography sx={sectionTitle}>Basic Information</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField label="Product Name" name="name" fullWidth size="small"
                value={form.name} onChange={handleChange}
                error={!!errors.name} helperText={errors.name} sx={inputStyle}/>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField label="Tamil Name" name="tamil_name" fullWidth size="small"
                value={form.tamil_name} onChange={handleChange}
                error={!!errors.tamil_name} helperText={errors.tamil_name} sx={inputStyle}/>
            </Grid>
          </Grid>

          <Divider sx={{ my: 2 }} />

          {/* CATEGORY */}
          <Typography sx={sectionTitle}>Category Details</Typography>
          
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <TextField select label="Status" fullWidth size="small"
                value={form.is_active}
                onChange={(e)=>setForm({...form,is_active:e.target.value})}
                sx={{...inputStyle, width: "100px",}}>
                <MenuItem value={true}>Active</MenuItem>
                <MenuItem value={false}>Inactive</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextField select label="Category" fullWidth size="small"
                value={form.category_id}
                onChange={(e)=>setForm({...form,category_id:e.target.value})}
                sx={{...inputStyle, width: "100px"}}>
                {catdrop.map(c=>(
                  <MenuItem key={c.value} value={c.value}>{c.label}</MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextField select label="Subcategory" fullWidth size="small"
                value={form.subcategory_id}
                onChange={(e)=>setForm({...form,subcategory_id:e.target.value})}
                sx={{...inputStyle, width: "120px"}}>
                {subcatdrop.map(s=>(
                  <MenuItem key={s.value} value={s.value}>{s.label}</MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} sm={3}>
    {/* Trend Status */}
    <TextField
      select
      label="Trend Status"
      name="trend_status"
      fullWidth
      size="small"
      value={form.trend_status}
      onChange={(e)=>setForm({...form,trend_status:e.target.value})}
      sx={inputStyle}
    >
      <MenuItem value={true}>Trending</MenuItem>
      <MenuItem value={false}>Not Trending</MenuItem>
    </TextField>
  </Grid>

          </Grid>

          <Divider sx={{ my: 2 }} />

          {/* PRICING */}
          <Typography sx={sectionTitle}>Pricing & Stock</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <TextField label="Price" name="price" fullWidth size="small"
                value={form.price} onChange={handleChange}
                error={!!errors.price} helperText={errors.price}
                sx={{...inputStyle, width: "100%"}}/>
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextField label="Stock" name="stock" fullWidth size="small"
                value={form.stock} onChange={handleChange}
                error={!!errors.stock} helperText={errors.stock}
                sx={{...inputStyle, width: "100%"}}/>
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextField select label="Unit" name="unit" fullWidth size="small"
                value={form.unit} onChange={handleChange}
                error={!!errors.unit} helperText={errors.unit}
                sx={{...inputStyle, width: "80px"}}>
                <MenuItem value="1 bn">1 bn</MenuItem>
                <MenuItem value="1 kg">1 kg</MenuItem>
                <MenuItem value="1 ltr">1 ltr</MenuItem>
                <MenuItem value="1 pcs">1 pcs</MenuItem>
              </TextField>
            </Grid>
          </Grid>

          <Divider sx={{ my: 2 }} />

          {/* MEDIA */}
          <Typography sx={sectionTitle}>Product Media</Typography>

          <Button component="label" variant="outlined" sx={{ mb: 1 }}>
            Upload Image
            <input hidden type="file" onChange={handleImageChange}/>
          </Button>

          {preview && (
            <Box sx={{
              width: 140,
              height: 140,
              border: "1px solid #eee",
              borderRadius: 2,
              overflow: "hidden"
            }}>
              <img src={preview} width="100%" height="100%" style={{objectFit:"cover"}} />
            </Box>
          )}

          {errors.product_img && (
            <Typography color="error" variant="caption">
              {errors.product_img}
            </Typography>
          )}

          <Divider sx={{ my: 2 }} />

          {/* DESCRIPTION */}
          <TextField label="Description" name="description" multiline rows={3} fullWidth
            value={form.description} onChange={handleChange}
            sx={inputStyle}/>

          <Divider sx={{ my: 2 }} />

          {/* FOOTER */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <FormControlLabel
              control={<Checkbox checked={accepted}
                onChange={(e)=>setAccepted(e.target.checked)}/>}
              label="Accept details"
            />

            <Box sx={{
              display: "flex",
              gap: 2,
              flexWrap: "wrap",
              justifyContent: "flex-end"
            }}>
              <Button type="submit" variant="contained" sx={buttonStyle}>
                Save
              </Button>
              <Button variant="outlined" onClick={resetForm} sx={buttonStyle}>
                Reset
              </Button>
            </Box>
          </Box>

        </Box>
      </Paper>
    </Box>
  );
};

export default AddProduct;
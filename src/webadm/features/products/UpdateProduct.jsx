// // import {
// //   Box,
// //   TextField,
// //   Button,
// //   Typography,
// //   MenuItem,
// //   IconButton,
// //   Avatar,
// //   Grid,
// //   FormControlLabel,
// //   Checkbox,
// //   Paper
// // } from "@mui/material";
// // import ClearIcon from "@mui/icons-material/Clear";
// // import { useState, useEffect } from "react";
// // // import api, { authAPI } from "../api/Index";
// // import { productsAPI } from "./productAPI";
// // import { dropdownAPI } from "../../services/dropdownAPI";
// // import { useAuth } from "../../context/AuthContext";
// // // import { useAuth } from "../authcontext/AuthContext";

// // const fromheading={
// //     fontWeight: 700,
// //     color: "#1F2937",
// //     fontSize: {
// //       xs: "16px",
// //       sm: "20px",
// //       md: "22px",
// //       lg: "22px"
// //     },
// //     minWidth:200,
// //     mb:3
// // }

// // const inputLabelStyle = {
// //   "& .MuiInputLabel-root": {
// //     fontSize: {
// //       xs: "12px",
// //       sm: "13px",
// //       md: "14px",
// //       lg: "14px"
// //     },
// //     // color: "#073288"
// //     color: "#3679ff"
// //   },
// //     "& .MuiInputBase-input": {
// //           fontSize: {
// //       xs: "12px",
// //       sm: "13px",
// //       md: "14px",
// //       lg: "14px"
// //     },   
// //     color: "#6B7280"
// //     },
// //      "& .MuiFormControlLabel-label": {
// //       fontSize: {
// //         xs: "12px",
// //         sm: "13px",
// //         md: "14px"
// //       }
// //     }
// // };

// // export const buttonStyle = {
// //   mt: 2,
// //   borderRadius: "8px",
// //   fontWeight: 600,
// //   height: 40,
// //   fontSize: {
// //       xs: "12px",
// //       sm: "13px",
// //       md: "14px",
// //       lg: "15px"
// //     },
// // };



// // const UpdateProducts = ({ product, close, refresh }) => {
// // console.log("update product click", product.category_img)
// //   const [form, setForm] = useState({
// //     id: "",
// //     tamil_name: "",
// //     name: "",
// //     price: "",
// //     stock: "",
// //     subcategory_id: "",
// //     category_id:"",
// //     current_trending_status: false,
// //     status: false,
// //     expiry_date: "",
// //     weight: "",
// //     description: "",
// //     product_img:""

// //   });
// //   const [subcatdrop, setsubCatdrop] = useState([]);
// //   const [catdrop, setCatdrop] = useState([]);
// //   const [preview, setPreview] = useState("");
// //   const [accepted, setAccepted] = useState(false);
// //   const [errors, setErrors] = useState({});
// //   // const { uploadFile } = useAuth();

// //   //  Load product data into form

// // // ---------------------
// // useEffect(() => {
// //   if (!product?.data || catdrop.length === 0) return;

// // const products_select = product.data[0]
// //   const matchedSubcategory = subcatdrop.find(
// //     (item) =>
// //       item.label.trim() === products_select.subcategory?.trim()
// //   );
// //   const matchedCategory = catdrop.find(
// //     (item) =>
// //       item.label.trim() === products_select.category?.trim()
// //   );
// //   console.log("product_data",product.data)

// //   console.log("string",product.data[0].id)
// //   console.log("string cate name",product.data[0].subcategory)
// //   console.log("string cat name for subcat",product.data[0].subcategory)
  
// //   setForm({
// //     id: products_select.id || "",
// //     name: products_select.name || "",
// //     tamil_name: products_select.tamil_name || "",
// //     price: products_select.price || "",
// //     stock: products_select.stock || "",
// //     subcategory_id: matchedSubcategory
// //       ? String(matchedSubcategory.value)
// //       : "",
// //     category_id: matchedCategory
// //       ? String(matchedCategory.value)
// //       : "",  
// //     status: products_select.status ?? false,
// //     current_trending_status:
// //       products_select.current_trending_status ?? false,
// //     expiry_date: products_select.expiry_date || "",
// //     weight: products_select.weight || "",
// //     description: products_select.description || "",
// //     product_img: products_select.product_img || "",
// //     unit:products_select.unit || ""
// //   });
// //   console.log("SetForm Here %%%%",form)

// //   console.log("Product subcategory:", product.data.category_img);
// //   console.log("Dropdown:", catdrop);
// //   if (products_select.product_img) {
// //       setPreview(products_select.product_img);
// //     }
// //     console.log("preview 1 for image",preview)

// // }, [product, catdrop]);


// //   //========================= REFRESH  ================================
// //   const RefreshContent = () => {
// //   setForm((prev) => ({
// //     ...prev,
// //     name: "",
// //     tamil_name: "",
// //     price: "",
// //     stock: "",
// //     subcategory_id: "",
// //     category_id:"",
// //     expiry_date: "",
// //     weight: "",
// //     unit:"",
// //     description: "",
// //     product_img: "",
// //   }));

// //   setAccepted(false);
// //   setPreview("");
// // };

// //   // ================= RESET =================
// //   const RefreshForm = () => {
// //     setForm({
// //       name: "",
// //       tamil_name: "",
// //       price: "",
// //       stock: "",
// //       is_active: "",
// //       subcategory_id: "",
// //       expiry_date: "",
// //       trend_status: false,
// //       weight: "",
// //       description: "",
// //       product_img: "",
// //     });
// //     setPreview("");
// //     setAccepted(false);
// //     setErrors({});
// //   };


// //   //====================  Fetch dropdown categories======================
// //   useEffect(() => {
// //     const fetchDropdown = async () => {
// //       try {
// //         const res = await dropdownAPI.fetchDropSub();
// //         setsubCatdrop(res?.data?.data || []);
// //       } catch (error) {
// //         console.log("Dropdown error:", error);
// //       }
// //     };
// //     fetchDropdown();
// //   }, []);

// //     // ---------------- FETCH CATEGORY DROPDOWN ----------------
// //     useEffect(() => {
// //       const categorydrop = async () => {
// //         try {
// //           const catData = await dropdownAPI.fetchDropCategory();
// //           setCatdrop(catData.data.data);
// //         } catch (error) {
// //           console.error("Error fetching categories:", error);
// //         }
// //       };
// //       categorydrop();
// //     }, []);
// //   const handleChange = (e) => {
// //   const { name, value } = e.target;

// //   let errorMsg = "";

// //   // NAME VALIDATION (Only letters & spaces)
// //   if (name === "name") {
// //     if (!value.trim()) {
// //       errorMsg = "Product name is required";
// //     } else if (!/^[A-Za-z\s]+$/.test(value)) {
// //       errorMsg = "Only letters and spaces allowed";
// //     }
// //   }

// //   // TAMIL NAME
// //   // TAMIL NAME VALIDATION
// //   if (name === "tamil_name") {
// //     if (!value.trim()) {
// //       errorMsg = "Tamil name is required";
// //     } 
// //     else if (!/^[\u0B80-\u0BFF\s]+$/.test(value)) {
// //       errorMsg = "Only Tamil letters allowed";
// //     }
// //   }

// //   // PRICE VALIDATION
// //   if (name === "price") {
// //     if (value === "") {
// //       errorMsg = "Price is required";
// //     } else if (!/^\d+(\.\d+)?$/.test(value)) {
// //       errorMsg = "Only numbers allowed";
// //     } else if (Number(value) < 0) {
// //       errorMsg = "Price cannot be negative";
// //     }
// //   }

// //   // STOCK VALIDATION
// //   if (name === "stock") {
// //     if (value === "") {
// //       errorMsg = "Stock is required";
// //     } else if (!/^\d+$/.test(value)) {
// //       errorMsg = "Only whole numbers allowed";
// //     } else if (Number(value) < 0) {
// //       errorMsg = "Stock cannot be negative";
// //     }
// //   }

// //   // WEIGHT VALIDATION
// //   if (name === "weight") {
// //     if (value === "") {
// //       errorMsg = "Weight is required";
// //     } else if (!/^\d+(\.\d+)?$/.test(value)) {
// //       errorMsg = "Only numbers allowed";
// //     } else if (Number(value) < 0) {
// //       errorMsg = "Weight cannot be negative";
// //     }
// //   }

// //   if (name === "category_id") {
// //   if (!value) {
// //     errorMsg = "Select a category";
// //   }
// // }

// //   setForm({
// //     ...form,
// //     [name]: value,
// //   });

// //   setErrors({
// //     ...errors,
// //     [name]: errorMsg,
// //   });
// // };
// // // ================= VALIDATION =================
// // const validate = () => {
// //   let tempErrors = {};

// //   if (!form.name.trim()) {
// //     tempErrors.name = "Product name is required";
// //   }

// //   if (!form.tamil_name.trim()) {
// //     tempErrors.tamil_name = "Tamil name is required";
// //   }

// //   if (!form.price) {
// //     tempErrors.price = "Price is required";
// //   }

// //   if (!form.stock) {
// //     tempErrors.stock = "Stock is required";
// //   }

// //   if (!form.category_id) {
// //     tempErrors.category_id = "Select a category";
// //   }

// //   if (!form.expiry_date) {
// //     tempErrors.expiry_date = "Select expiry date";
// //   }

// //   if (!form.weight) {
// //     tempErrors.weight = "Weight is required";
// //   }

// //   if (!form.unit) {
// //     tempErrors.unit = "Unit is required";
// //   }

// //   // if (!form.product_img) {
// //   //   tempErrors.product_img = "Please upload product image";
// //   // }
// //   if (!form.product_img && !preview) {
// //     tempErrors.product_img = "Please upload product image";
// //   }

// //   if (!accepted) {
// //     tempErrors.accepted = "You must accept the details";
// //   }

// //   setErrors(tempErrors);

// //   return Object.keys(tempErrors).length === 0;
// // };

// // // ============================
// //   //CHANGE OLD IMAGE STRING INTO PATH 
// // //   const convertUrlToFile = async (url) => {
// // //   const response = await fetch(url);
// // //   const blob = await response.blob();
// // //   const fileName = url.split("/").pop();

// // //   return new File([blob], fileName, { type: blob.type });
// // // }; 
// // // // ============================
// // const handleSubmit = async (e) => {
// //   e.preventDefault();

// //   if (!validate()) return;

// //   try {
// //     const formData = new FormData();

// //     formData.append("id", Number(form.id));
// //     formData.append("name", form.name);
// //     formData.append("tamil_name", form.tamil_name);
// //     formData.append("price", Number(form.price));
// //     formData.append("stock", Number(form.stock));
// //     formData.append("category_id", Number(form.category_id));
// //     formData.append("weight", Number(form.weight));
// //     formData.append("expiry_date", form.expiry_date);
// //     formData.append("status", form.status);
// //     formData.append("current_trending_status", form.current_trending_status);
// //     formData.append("description", form.description);
// //     formData.append("unit",form.unit);
// // console.log("oriduct image", form.product_img)

// //     if (form.subcategory_id) {
// //       formData.append("subcategory_id", parseInt(form.subcategory_id, 10));
// //     }
// //     // if (form.product_img instanceof File) {
// //     //   formData.append("product_img", form.product_img);
// //     // }
// // //     if (form.product_img instanceof File) {
// // //   // New image selected
// // //   formData.append("product_img", form.product_img);
// // // } else if (typeof form.product_img === "string" && form.product_img !== "") {
// // //   // Old image path send in SAME KEY
// // //   formData.append("product_img", form.product_img);
// // // }

// // // alex img code remove 
// // //  let imageFile;

// // // if (form.product_img instanceof File) {
// // //   imageFile = form.product_img;
// // // } else {
// // //   imageFile = await convertUrlToFile(form.product_img);
// // // }



// // let imageFile;

// // if (form.product_img instanceof File) {
// //   imageFile = form.product_img;
// // }

// // if (imageFile) {
// //   formData.append("product_img", imageFile);
// // }


// //     await productsAPI.updateProduct(formData);

// //     close();
// //     // refresh();

// //   } catch (error) {
// //     console.error("Update error:", error.response?.data);
// //     console.error("FULL ERROR:", error);
// // console.error("RESPONSE:", error.response);
// // console.error("DATA:", error.response?.data);
// //   }
// // };
// // // =============================
  
// //  const handleImageChange = async (e) => {
// //      const file = e.target.files[0];
// //     if (!file) return;

// //     setPreview(URL.createObjectURL(file));
// //     setForm((prev) => ({
// //       ...prev,
// //       product_img: file, //  store File directly
// //     }));


// //   };

// //   if (!product) return null;
// // return (
// //   <>
// //   {console.log("preview",preview)}
// //   <Box
// //   sx={{
// //     position: "fixed",
// //     inset: 0,
// //     backgroundColor: "rgba(0,0,0,0.4)",
// //     display: "flex",
// //     justifyContent: "center",
// //     alignItems: "center",
// //     zIndex: 999,
// //   }}
// // >
// //       <Paper sx={{ width: "100%", maxWidth:800,maxHeight:"80vh",m:4, p: 3, borderRadius: 3,overflowY:'auto'}}>

// //     {/* HEADER */}
// //         <Box display="flex" justifyContent="space-between" mt={0}>
// //    <Typography   sx={fromheading}>
// //         Update Product
// //       </Typography>
// //       <IconButton onClick={close}>
// //         <ClearIcon />
// //       </IconButton>
// //     </Box>

// //     <Box component="form" onSubmit={handleSubmit}>
// //       <Grid container spacing={3}>

// //         {/* ROW 1 */}
// //         <Grid item xs={12} md={6} >
// //           <TextField
// //             label="Product Name"
// //             name="name"
// //             fullWidth
// //             size="small"
// //             value={form.name}
// //             onChange={handleChange}
// //             error={!!errors?.name}
// //             helperText={errors?.name}
// // sx={inputLabelStyle}
// //           />
// //         </Grid>

// //         <Grid item xs={12} md={6} minWidth={220}>
// //           <TextField
// //             label="Tamil Name"
// //             name="tamil_name"
// //             fullWidth
// //             size="small"
// //             value={form.tamil_name}
// //             onChange={handleChange}
// //             error={!!errors?.tamil_name}
// //             helperText={errors?.tamil_name}
// // sx={inputLabelStyle}
// //           />
// //         </Grid>

// //         {/* ROW 3 */}
// //         <Grid item xs={12} md={6} minWidth={220}>
// //           <TextField
// //             select
// //             label="Status"
// //             fullWidth
// //             size="small"
// //             value={form.status}
// //             onChange={(e) =>
// //             setForm({
// //               ...form,
// //               status: e.target.value,
// //             })
// //           }
// // sx={inputLabelStyle}
// //           >
// //         <MenuItem value={true} sx={{ color: "green", fontWeight: "bold" ,fontSize: {
// //                   xs: "12px",
// //                   sm: "13px",
// //                   md: "14px",
// //                   lg: "14px"
// //                 },}}>
// //           Active
// //         </MenuItem>

// //         <MenuItem value={false} sx={{ color: "red", fontWeight: "bold",fontSize: {
// //                   xs: "12px",
// //                   sm: "13px",
// //                   md: "14px",
// //                   lg: "14px"
// //                 },}}>
// //           Inactive
// //         </MenuItem>
// //           </TextField>
// //         </Grid>


// //           <Grid item xs={12} md={6} minWidth={220}>
// //           <TextField
// //           select
// //           label="Category"
// //           name="category_id"
// //           fullWidth
// //           size="small"
// //           value={form.category_id}
// //           onChange={handleChange}
// //           error={!!errors?.category_id}
// //           helperText={errors?.category_id}
// //           sx={inputLabelStyle}
// //         >
// //           {catdrop.length > 0 ? (
// //             catdrop.map((item) => (
// //               <MenuItem key={item.value} value={String(item.value)} sx={{    fontSize: {
// //                   xs: "12px",
// //                   sm: "13px",
// //                   md: "14px",
// //                   lg: "14px"
// //                 },
// //                 color: "#6B7280"}}>
// //                 {item.label}
// //               </MenuItem>
// //             ))
// //           ) : (
// //             <MenuItem disabled>No Category Found</MenuItem>
// //           )}
// //         </TextField>
// //         </Grid>

        
// //         <Grid item xs={12} md={6} minWidth={220}>
// //           <TextField
// //           select
// //           label="Subcategory"
// //           name="subcategory_id"
// //           fullWidth
// //           size="small"
// //           value={form.subcategory_id}
// //           onChange={handleChange}
// //           error={!!errors?.subcategory_id}
// //           helperText={errors?.subcategory_id}
// //           sx={inputLabelStyle}
// //         >
// //           {subcatdrop.length > 0 ? (
// //             subcatdrop.map((item) => (
// //               <MenuItem key={item.value} value={String(item.value)} sx={{    fontSize: {
// //                   xs: "12px",
// //                   sm: "13px",
// //                   md: "14px",
// //                   lg: "14px"
// //                 },
// //                 color: "#6B7280"}}>
// //                 {item.label}
// //               </MenuItem>
// //             ))
// //           ) : (
// //             <MenuItem disabled>No subCategory Found</MenuItem>
// //           )}
// //         </TextField>
// //         </Grid>


        
// //         {/* TRENDING */}
// //         <Grid item xs={12} md={6} minWidth={220}>
// //           <TextField
// //             select
// //             label="Trending Status"
// //             fullWidth
// //             size="small"
// //             value={form.current_trending_status}
// //             onChange={(e) =>
// //               setForm({
// //                 ...form,
// //                 current_trending_status:
// //                   e.target.value === "true",
// //               })
// //             }
// // sx={inputLabelStyle}
// //           >
// //             <MenuItem value="true">Yes</MenuItem>
// //             <MenuItem value="false">No</MenuItem>
// //           </TextField>
// //         </Grid>


// //          {/* <Grid item xs={12} md={6} minWidth={220}>
// //           <TextField
// //             label="Unit"
// //             name="unit"
// //             fullWidth
// //             size="small"
// //             value={form.unit}
// //             onChange={handleChange}
// //             error={!!errors?.weight}
// //             helperText={errors?.unit}
// //             InputLabelProps={{ shrink: true }}
// // sx={inputLabelStyle}
// //           />
// //         </Grid> */}




// //         <Grid item xs={12} md={6} minWidth={220}>
// //   <TextField
// //     select
// //     label="Unit"
// //     name="unit"
// //     fullWidth
// //     size="small"
// //     value={form.unit}
// //     onChange={handleChange}
// //     error={!!errors?.unit}
// //     helperText={errors?.unit}
// //     InputLabelProps={{ shrink: true }}
// //     sx={inputLabelStyle}
// //   >
// //     <MenuItem value="1bn" sx={{ fontSize: { xs: "12px", sm: "13px", md: "14px", lg: "14px" }, color: "#6B7280" }}>1bn</MenuItem>
// //     <MenuItem value="1kg" sx={{ fontSize: { xs: "12px", sm: "13px", md: "14px", lg: "14px" }, color: "#6B7280" }}>1kg</MenuItem>
// //     <MenuItem value="1 ltr" sx={{ fontSize: { xs: "12px", sm: "13px", md: "14px", lg: "14px" }, color: "#6B7280" }}>1 ltr</MenuItem>
// //     <MenuItem value="1 pcs" sx={{ fontSize: { xs: "12px", sm: "13px", md: "14px", lg: "14px" }, color: "#6B7280" }}>1 pcs</MenuItem>
// //   </TextField>
// // </Grid>



// //         {/* ROW 2 */}
// //         <Grid item xs={12} md={6} minWidth={220}>
// //           <TextField
// //             label="Price"
// //             name="price"
// //             type="number"
// //             fullWidth
// //             size="small"
// //             value={form.price}
// //             onChange={handleChange}
// //             error={!!errors?.price}
// //             helperText={errors?.price}
// // sx={inputLabelStyle}
// //           />
// //         </Grid>

// //         <Grid item xs={12} md={6} minWidth={220}>
// //           <TextField
// //             label="Stock"
// //             name="stock"
// //             type="number"
// //             fullWidth
// //             size="small"
// //             value={form.stock}
// //             onChange={handleChange}
// //             error={!!errors?.stock}
// //             helperText={errors?.stock}
// // sx={inputLabelStyle}
// //           />
// //         </Grid>

        


// //         {/* ROW 4
// //         <Grid item xs={12} md={6} minWidth={220}>
// //           <TextField
// //             label="Expiry Date"
// //             type="date"
// //             fullWidth
// //             size="small"
// //             InputLabelProps={{ shrink: true }}
// //             value={form.expiry_date}
// //             onChange={handleChange}
// //             name="expiry_date"
// //             error={!!errors?.expiry_date}
// //             helperText={errors?.expiry_date}
// // sx={inputLabelStyle}
// //           />
// //         </Grid> */}


        
// //          {/* IMAGE */}
// //         <Grid item xs={12} >
// //           <Button component="label" variant="outlined"   sx={{
// //     fontSize: {
// //       xs: "12px",
// //       sm: "13px",
// //       md: "14px"
// //     },
// //     textTransform: "none"
// //   }}>
// //             Upload Product Image
// //             <input
// //               type="file"
// //               hidden
// //               accept="image/*"
// //               // value={from.product_img}
// //               onChange={handleImageChange}
// //             />
// //           </Button>

// //           {preview && (
// //             <Box mt={2}>
// //               <img
                
// //                 src={preview}
// //                 width="120"
// //                 style={{ borderRadius: 8 }}
// //               />
// //             </Box>
// //           )}
// //           {errors?.product_img && (
// //             <Typography color="error" variant="caption">
// //               {errors.product_img}
// //             </Typography>
// //           )}
// //         </Grid>

       

// //         {/* DESCRIPTION */}
// //         <Grid item xs={12} minWidth={"100%"} maxHeight={"350px"}>
// //           <TextField
// //             label="Description"
// //             name="description"
// //             multiline
// //             rows={4}
// //             fullWidth
// //             size="small"
// //             value={form.description}
// //             onChange={handleChange}
// // sx={inputLabelStyle}
// //           />
// //         </Grid>



// //          {/* <Grid item xs={12} md={6} minWidth={220}>
// //           <TextField
// //             label="Weight"
// //             name="weight"
// //             fullWidth
// //             size="small"
// //             value={form.weight}
// //             onChange={handleChange}
// //             error={!!errors?.weight}
// //             helperText={errors?.weight}
// // sx={inputLabelStyle}
// //           />
// //         </Grid> */}

// //         {/* ACCEPT CHECKBOX */}
        
// //         <Grid item xs={12} minWidth={220} sx = {{width:"100%"}}>
// //           <FormControlLabel
// //             control={
// //               <Checkbox
// //                 checked={accepted}
// //                 onChange={(e) =>
// //                   setAccepted(e.target.checked)
// //                 }
// //               />
// //             }
// //             label="I confirm that the above details are correct."
// //             sx={inputLabelStyle}
// //           />
// //           {errors?.accepted && (
// //             <Typography color="error" variant="caption">
// //               {errors.accepted}
// //             </Typography>
// //           )}
// //         </Grid>

// //         {/* SUBMIT */}
// //         {/* <Grid item xs={12} sx={{display:"flex",gap:"10px",justifyContent:"space-evenly",alignItems:"center", width:"100%"}}>
// //           <Button
// //             type="submit"
// //             variant="contained"
// //             fullWidth
// //           sx={buttonStyle}
// //           >
// //             Submit
// //           </Button>

// //            <Button
            
// //             variant="contained"
// //             fullWidth
// //           sx={buttonStyle}
// //             onClick={RefreshContent}
// //           >
// //             Reset All
// //           </Button>
// //         </Grid> */}

// //         {/* new */}
// //         <Grid  item xs={12} sx={{display:"flex",gap:"20px",justifyContent:"space-evenly",alignItems:"center", width:"50%",margin:"auto"}}>
        
// //                       <Button
// //                         type="submit"
// //                         variant="contained"
// //                         fullWidth
// //         sx={buttonStyle}              >
// //                         Save Product
// //                       </Button>
        
// //                       <Button
// //                         variant="contained"
// //                         onClick={RefreshForm}
// //                         fullWidth
// //                       sx={buttonStyle}              >
// //                         Reset
// //                       </Button>
// //                     </Grid>

// //       </Grid>
// //     </Box>
// //   </Paper>
// // </Box>
// // </>
// // );
// // };

// // export default UpdateProducts;











// import {
//   Box,
//   TextField,
//   Button,
//   Typography,
//   MenuItem,
//   IconButton,
//   Grid,
//   FormControlLabel,
//   Checkbox,
//   Paper,
// } from "@mui/material";
// import ClearIcon from "@mui/icons-material/Clear";
// import { useState, useEffect } from "react";
// import { productsAPI } from "./productAPI";
// import { dropdownAPI } from "../../services/dropdownAPI";
// import { useAuth } from "../../context/AuthContext";

// // ─── Styles ────────────────────────────────────────────────────────────────────

// const fromheading = {
//   fontWeight: 700,
//   color: "#1F2937",
//   fontSize: { xs: "16px", sm: "18px", md: "20px", lg: "22px" },
//   lineHeight: 1.3,
// };

// const inputLabelStyle = {
//   "& .MuiInputLabel-root": {
//     fontSize: { xs: "12px", sm: "13px", md: "14px" },
//     color: "#3679ff",
//   },
//   "& .MuiInputBase-input": {
//     fontSize: { xs: "12px", sm: "13px", md: "14px" },
//     color: "#6B7280",
//   },
//   "& .MuiFormControlLabel-label": {
//     fontSize: { xs: "12px", sm: "13px", md: "14px" },
//   },
// };

// export const buttonStyle = {
//   borderRadius: "8px",
//   fontWeight: 600,
//   height: { xs: 36, sm: 38, md: 40 },
//   fontSize: { xs: "12px", sm: "13px", md: "14px" },
//   textTransform: "none",
//   whiteSpace: "nowrap",
//   px: { xs: 2.5, sm: 3 },
// };

// const menuItemStyle = {
//   fontSize: { xs: "12px", sm: "13px", md: "14px" },
//   color: "#6B7280",
// };

// // ───────────────────────────────────────────────────────────────────────────────

// const UpdateProducts = ({ product, close, refresh }) => {
//   console.log("update product click", product.category_img);

//   const [form, setForm] = useState({
//     id: "",
//     tamil_name: "",
//     name: "",
//     price: "",
//     stock: "",
//     subcategory_id: "",
//     category_id: "",
//     current_trending_status: false,
//     status: false,
//     expiry_date: "",
//     weight: "",
//     description: "",
//     product_img: "",
//   });

//   const [subcatdrop, setsubCatdrop] = useState([]);
//   const [catdrop, setCatdrop] = useState([]);
//   const [preview, setPreview] = useState("");
//   const [accepted, setAccepted] = useState(false);
//   const [errors, setErrors] = useState({});

//   // ── LOAD PRODUCT DATA ──────────────────────────────────────────────────────
//   useEffect(() => {
//     if (!product?.data || catdrop.length === 0) return;

//     const products_select = product.data[0];
//     const matchedSubcategory = subcatdrop.find(
//       (item) => item.label.trim() === products_select.subcategory?.trim()
//     );
//     const matchedCategory = catdrop.find(
//       (item) => item.label.trim() === products_select.category?.trim()
//     );
//     console.log("product_data", product.data);
//     console.log("string", product.data[0].id);
//     console.log("string cate name", product.data[0].subcategory);
//     console.log("string cat name for subcat", product.data[0].subcategory);

//     setForm({
//       id: products_select.id || "",
//       name: products_select.name || "",
//       tamil_name: products_select.tamil_name || "",
//       price: products_select.price || "",
//       stock: products_select.stock || "",
//       subcategory_id: matchedSubcategory ? String(matchedSubcategory.value) : "",
//       category_id: matchedCategory ? String(matchedCategory.value) : "",
//       status: products_select.status ?? false,
//       current_trending_status: products_select.current_trending_status ?? false,
//       expiry_date: products_select.expiry_date || "",
//       weight: products_select.weight || "",
//       description: products_select.description || "",
//       product_img: products_select.product_img || "",
//       unit: products_select.unit || "",
//     });
//     console.log("SetForm Here %%%%", form);
//     console.log("Product subcategory:", product.data.category_img);
//     console.log("Dropdown:", catdrop);

//     if (products_select.product_img) {
//       setPreview(products_select.product_img);
//     }
//     console.log("preview 1 for image", preview);
//   }, [product, catdrop]);

//   // ── REFRESH CONTENT ────────────────────────────────────────────────────────
//   const RefreshContent = () => {
//     setForm((prev) => ({
//       ...prev,
//       name: "",
//       tamil_name: "",
//       price: "",
//       stock: "",
//       subcategory_id: "",
//       category_id: "",
//       expiry_date: "",
//       weight: "",
//       unit: "",
//       description: "",
//       product_img: "",
//     }));
//     setAccepted(false);
//     setPreview("");
//   };

//   // ── RESET ──────────────────────────────────────────────────────────────────
//   const RefreshForm = () => {
//     setForm({
//       name: "",
//       tamil_name: "",
//       price: "",
//       stock: "",
//       is_active: "",
//       subcategory_id: "",
//       expiry_date: "",
//       trend_status: false,
//       weight: "",
//       description: "",
//       product_img: "",
//     });
//     setPreview("");
//     setAccepted(false);
//     setErrors({});
//   };

//   // ── FETCH SUBCATEGORY DROPDOWN ─────────────────────────────────────────────
//   useEffect(() => {
//     const fetchDropdown = async () => {
//       try {
//         const res = await dropdownAPI.fetchDropSub();
//         setsubCatdrop(res?.data?.data || []);
//       } catch (error) {
//         console.log("Dropdown error:", error);
//       }
//     };
//     fetchDropdown();
//   }, []);

//   // ── FETCH CATEGORY DROPDOWN ────────────────────────────────────────────────
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

//   // ── HANDLE CHANGE ──────────────────────────────────────────────────────────
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     let errorMsg = "";
//     if (name === "name") {
//       if (!value.trim()) errorMsg = "Product name is required";
//       else if (!/^[A-Za-z\s]+$/.test(value)) errorMsg = "Only letters and spaces allowed";
//     }
//     if (name === "tamil_name") {
//       if (!value.trim()) errorMsg = "Tamil name is required";
//       else if (!/^[\u0B80-\u0BFF\s]+$/.test(value)) errorMsg = "Only Tamil letters allowed";
//     }
//     if (name === "price") {
//       if (value === "") errorMsg = "Price is required";
//       else if (!/^\d+(\.\d+)?$/.test(value)) errorMsg = "Only numbers allowed";
//       else if (Number(value) < 0) errorMsg = "Price cannot be negative";
//     }
//     if (name === "stock") {
//       if (value === "") errorMsg = "Stock is required";
//       else if (!/^\d+$/.test(value)) errorMsg = "Only whole numbers allowed";
//       else if (Number(value) < 0) errorMsg = "Stock cannot be negative";
//     }
//     if (name === "weight") {
//       if (value === "") errorMsg = "Weight is required";
//       else if (!/^\d+(\.\d+)?$/.test(value)) errorMsg = "Only numbers allowed";
//       else if (Number(value) < 0) errorMsg = "Weight cannot be negative";
//     }
//     if (name === "category_id") {
//       if (!value) errorMsg = "Select a category";
//     }
//     setForm({ ...form, [name]: value });
//     setErrors({ ...errors, [name]: errorMsg });
//   };

//   // ── VALIDATION ─────────────────────────────────────────────────────────────
//   const validate = () => {
//     let tempErrors = {};
//     if (!form.name.trim()) tempErrors.name = "Product name is required";
//     if (!form.tamil_name.trim()) tempErrors.tamil_name = "Tamil name is required";
//     if (!form.price) tempErrors.price = "Price is required";
//     if (!form.stock) tempErrors.stock = "Stock is required";
//     if (!form.category_id) tempErrors.category_id = "Select a category";
//     if (!form.expiry_date) tempErrors.expiry_date = "Select expiry date";
//     if (!form.weight) tempErrors.weight = "Weight is required";
//     if (!form.unit) tempErrors.unit = "Unit is required";
//     if (!form.product_img && !preview) tempErrors.product_img = "Please upload product image";
//     if (!accepted) tempErrors.accepted = "You must accept the details";
//     setErrors(tempErrors);
//     return Object.keys(tempErrors).length === 0;
//   };

//   // ── SUBMIT ─────────────────────────────────────────────────────────────────
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validate()) return;
//     try {
//       const formData = new FormData();
//       formData.append("id", Number(form.id));
//       formData.append("name", form.name);
//       formData.append("tamil_name", form.tamil_name);
//       formData.append("price", Number(form.price));
//       formData.append("stock", Number(form.stock));
//       formData.append("category_id", Number(form.category_id));
//       formData.append("weight", Number(form.weight));
//       formData.append("expiry_date", form.expiry_date);
//       formData.append("status", form.status);
//       formData.append("current_trending_status", form.current_trending_status);
//       formData.append("description", form.description);
//       formData.append("unit", form.unit);
//       console.log("product image", form.product_img);
//       if (form.subcategory_id) {
//         formData.append("subcategory_id", parseInt(form.subcategory_id, 10));
//       }
//       let imageFile;
//       if (form.product_img instanceof File) {
//         imageFile = form.product_img;
//       }
//       if (imageFile) {
//         formData.append("product_img", imageFile);
//       }
//       await productsAPI.updateProduct(formData);
//       close();
//     } catch (error) {
//       console.error("Update error:", error.response?.data);
//       console.error("FULL ERROR:", error);
//       console.error("RESPONSE:", error.response);
//       console.error("DATA:", error.response?.data);
//     }
//   };

//   // ── IMAGE CHANGE ───────────────────────────────────────────────────────────
//   const handleImageChange = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     setPreview(URL.createObjectURL(file));
//     setForm((prev) => ({ ...prev, product_img: file }));
//   };

//   if (!product) return null;

//   // ── RENDER ─────────────────────────────────────────────────────────────────
//   return (
//     <>
//       {console.log("preview", preview)}
//       <Box
//         sx={{
//           position: "fixed",
//           inset: 0,
//           backgroundColor: "rgba(0,0,0,0.5)",
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           zIndex: 1300,
//           p: { xs: 1, sm: 2, md: 3 },
//         }}
//       >
//         <Paper
//           elevation={8}
//           sx={{
//             width: "100%",
//             // maxWidth: { xs: "100%", sm: 560, md: 720, lg: 860 },
//             maxWidth: { xs: "100%", sm: 700, md: 900, lg: 1100 },
//             maxHeight: { xs: "95vh", sm: "90vh" },
//             borderRadius: { xs: 2, sm: 3 },
//             display: "flex",
//             flexDirection: "column",
//             overflow: "hidden",
//           }}
//         >
//           {/* ── Header ── */}
//           <Box
//             sx={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//               px: { xs: 2, sm: 3 },
//               py: { xs: 1.5, sm: 2 },
//               borderBottom: "1px solid #f0f0f0",
//               flexShrink: 0,
//             }}
//           >
//             <Typography sx={fromheading}>Update Product</Typography>
//             <IconButton onClick={close} size="small" sx={{ color: "#6B7280" }}>
//               <ClearIcon fontSize="small" />
//             </IconButton>
//           </Box>





//           <Box
//   component="form"
//   onSubmit={handleSubmit}
//   sx={{
//     overflowY: "auto",
//     px: { xs: 2, sm: 3 },
//     py: 2,
//   }}
// >
//   <Grid container spacing={2.5}>

//     {/* ================= BASIC INFO ================= */}
//     <Grid item xs={12}>
//       <Typography sx={{ fontWeight: 700, mb: 1 }}>
//         Basic Information
//       </Typography>
//     </Grid>

//     <Grid item xs={12} md={6}>
//       <TextField
//         label="Product Name"
//         name="name"
//         fullWidth
//         size="small"
//         value={form.name}
//         onChange={handleChange}
//         sx={inputLabelStyle}
//       />
//     </Grid>

//     <Grid item xs={12} md={6}>
//       <TextField
//         label="Tamil Name"
//         name="tamil_name"
//         fullWidth
//         size="small"
//         value={form.tamil_name}
//         onChange={handleChange}
//         sx={inputLabelStyle}
//       />
//     </Grid>


//     {/* ================= CATEGORY ================= */}
//     <Grid item xs={12}>
//       <Typography sx={{ fontWeight: 700, mt: 1 }}>
//         Category Details
//       </Typography>
//     </Grid>

//     <Grid item xs={12} sm={6} md={3}>
//       <TextField
//         select
//         label="Status"
//         fullWidth
//         size="small"
//         value={form.status}
//         onChange={(e) =>
//           setForm({ ...form, status: e.target.value })
//         }
//       >
//         <MenuItem value={true}>Active</MenuItem>
//         <MenuItem value={false}>Inactive</MenuItem>
//       </TextField>
//     </Grid>

//     <Grid item xs={12} sm={6} md={3}>
//       <TextField
//         select
//         label="Category"
//         name="category_id"
//         fullWidth
//         size="small"
//         value={form.category_id}
//         onChange={handleChange}
//       >
//         {catdrop.map((c) => (
//           <MenuItem key={c.value} value={c.value}>
//             {c.label}
//           </MenuItem>
//         ))}
//       </TextField>
//     </Grid>

//     <Grid item xs={12} sm={6} md={3}>
//       <TextField
//         select
//         label="Subcategory"
//         name="subcategory_id"
//         fullWidth
//         size="small"
//         value={form.subcategory_id}
//         onChange={handleChange}
//       >
//         {subcatdrop.map((s) => (
//           <MenuItem key={s.value} value={s.value}>
//             {s.label}
//           </MenuItem>
//         ))}
//       </TextField>
//     </Grid>

//     <Grid item xs={12} sm={6} md={3}>
//       <TextField
//         select
//         label="Trending"
//         fullWidth
//         size="small"
//         value={form.current_trending_status}
//         onChange={(e) =>
//           setForm({
//             ...form,
//             current_trending_status: e.target.value,
//           })
//         }
//       >
//         <MenuItem value={true}>Yes</MenuItem>
//         <MenuItem value={false}>No</MenuItem>
//       </TextField>
//     </Grid>


//     {/* ================= PRICING ================= */}
//     <Grid item xs={12}>
//       <Typography sx={{ fontWeight: 700, mt: 1 }}>
//         Pricing & Stock
//       </Typography>
//     </Grid>

//     <Grid item xs={12} sm={4}>
//       <TextField
//         label="Price"
//         name="price"
//         fullWidth
//         size="small"
//         value={form.price}
//         onChange={handleChange}
//       />
//     </Grid>

//     <Grid item xs={12} sm={4}>
//       <TextField
//         label="Stock"
//         name="stock"
//         fullWidth
//         size="small"
//         value={form.stock}
//         onChange={handleChange}
//       />
//     </Grid>

//     <Grid item xs={12} sm={4}>
//       <TextField
//         select
//         label="Unit"
//         name="unit"
//         fullWidth
//         size="small"
//         value={form.unit}
//         onChange={handleChange}
//       >
//         <MenuItem value="1kg">1kg</MenuItem>
//         <MenuItem value="1pcs">1pcs</MenuItem>
//       </TextField>
//     </Grid>


//     {/* ================= MEDIA ================= */}
//     <Grid item xs={12}>
//       <Typography sx={{ fontWeight: 700, mt: 1 }}>
//         Product Media
//       </Typography>
//     </Grid>

//     <Grid item xs={12}>
//       <Box
//         sx={{
//           border: "1px dashed #d1d5db",
//           borderRadius: 2,
//           p: 2,
//           display: "flex",
//           flexDirection: { xs: "column", sm: "row" },
//           alignItems: "center",
//           gap: 2,
//         }}
//       >
//         <Button component="label" variant="outlined">
//           Upload Image
//           <input hidden type="file" onChange={handleImageChange} />
//         </Button>

//         {preview && (
//           <Box
//             sx={{
//               width: 120,
//               height: 100,
//               borderRadius: 2,
//               overflow: "hidden",
//               border: "1px solid #e5e7eb",
//             }}
//           >
//             <img
//               src={preview}
//               style={{
//                 width: "100%",
//                 height: "100%",
//                 objectFit: "cover",
//               }}
//             />
//           </Box>
//         )}
//       </Box>
//     </Grid>


//     {/* ================= DESCRIPTION ================= */}
//     <Grid item xs={12}>
//       <TextField
//         label="Description"
//         name="description"
//         multiline
//         rows={4}
//         fullWidth
//         value={form.description}
//         onChange={handleChange}
//       />
//     </Grid>


//     {/* ================= FOOTER ================= */}
//     <Grid item xs={12}>
//       <Box
//         sx={{
//           display: "flex",
//           flexDirection: { xs: "column", sm: "row" },
//           justifyContent: "space-between",
//           alignItems: { xs: "flex-start", sm: "center" },
//           gap: 2,
//           mt: 1,
//         }}
//       >
//         <FormControlLabel
//           control={
//             <Checkbox
//               checked={accepted}
//               onChange={(e) => setAccepted(e.target.checked)}
//             />
//           }
//           label="Accept details"
//         />

//         <Box sx={{ display: "flex", gap: 1.5 }}>
//           <Button type="submit" variant="contained">
//             Save
//           </Button>
//           <Button onClick={RefreshForm} variant="outlined">
//             Reset
//           </Button>
//         </Box>
//       </Box>
//     </Grid>

//   </Grid>
// </Box>




          
//         </Paper>
//       </Box>
//     </>
//   );
// };

// export default UpdateProducts;











import {
  Box,
  TextField,
  Button,
  Typography,
  MenuItem,
  IconButton,
  Grid,
  FormControlLabel,
  Checkbox,
  Paper,
  Divider,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { useState, useEffect } from "react";
import { productsAPI } from "./productAPI";
import { dropdownAPI } from "../../services/dropdownAPI";
import { useAuth } from "../../context/AuthContext";

// ─── Styles ────────────────────────────────────────────────────────────────────

const modalHeading = {
  fontWeight: 700,
  color: "#1F2937",
  fontSize: { xs: "16px", sm: "18px", md: "20px" },
};

const sectionLabel = {
  fontWeight: 700,
  fontSize: { xs: "13px", sm: "14px", md: "15px" },
  color: "#1F2937",
  mb: 1,
};

const fieldStyle = {
  "& .MuiInputLabel-root": {
    fontSize: { xs: "12px", sm: "13px", md: "14px" },
    color: "#3679ff",
  },
  "& .MuiInputBase-input": {
    fontSize: { xs: "12px", sm: "13px", md: "14px" },
    color: "#374151",
  },
  "& .MuiOutlinedInput-root": {
    borderRadius: "8px",
  },
};

const menuItemStyle = {
  fontSize: { xs: "12px", sm: "13px", md: "14px" },
  color: "#374151",
};

// ───────────────────────────────────────────────────────────────────────────────

const UpdateProducts = ({ product, close, refresh }) => {
  const [form, setForm] = useState({
    id: "",
    tamil_name: "",
    name: "",
    price: "",
    stock: "",
    subcategory_id: "",
    category_id: "",
    current_trending_status: false,
    status: false,
    expiry_date: "",
    weight: "",
    description: "",
    product_img: "",
    unit: "",
  });

  const [subcatdrop, setsubCatdrop] = useState([]);
  const [catdrop, setCatdrop] = useState([]);
  const [preview, setPreview] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [errors, setErrors] = useState({});

  // ── LOAD PRODUCT DATA ──────────────────────────────────────────────────────
  useEffect(() => {
    if (!product?.data || catdrop.length === 0) return;
    const products_select = product.data[0];
    const matchedSubcategory = subcatdrop.find(
      (item) => item.label.trim() === products_select.subcategory?.trim()
    );
    const matchedCategory = catdrop.find(
      (item) => item.label.trim() === products_select.category?.trim()
    );
    setForm({
      id: products_select.id || "",
      name: products_select.name || "",
      tamil_name: products_select.tamil_name || "",
      price: products_select.price || "",
      stock: products_select.stock || "",
      subcategory_id: matchedSubcategory ? String(matchedSubcategory.value) : "",
      category_id: matchedCategory ? String(matchedCategory.value) : "",
      status: products_select.status ?? false,
      current_trending_status: products_select.current_trending_status ?? false,
      expiry_date: products_select.expiry_date || "",
      weight: products_select.weight || "",
      description: products_select.description || "",
      product_img: products_select.product_img || "",
      unit: products_select.unit || "",
    });
    if (products_select.product_img) {
      setPreview(products_select.product_img);
    }
  }, [product, catdrop]);

  // ── RESET ──────────────────────────────────────────────────────────────────
  const RefreshForm = () => {
    setForm({
      name: "", tamil_name: "", price: "", stock: "",
      subcategory_id: "", category_id: "", expiry_date: "",
      current_trending_status: false, status: false,
      weight: "", description: "", product_img: "", unit: "",
    });
    setPreview("");
    setAccepted(false);
    setErrors({});
  };

  // ── FETCH DROPDOWNS ────────────────────────────────────────────────────────
  useEffect(() => {
    const fetchDropdown = async () => {
      try {
        const res = await dropdownAPI.fetchDropSub();
        setsubCatdrop(res?.data?.data || []);
      } catch (error) {
        console.log("Dropdown error:", error);
      }
    };
    fetchDropdown();
  }, []);

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

  // ── HANDLE CHANGE ──────────────────────────────────────────────────────────
  const handleChange = (e) => {
    const { name, value } = e.target;
    let errorMsg = "";
    if (name === "name") {
      if (!value.trim()) errorMsg = "Product name is required";
      else if (!/^[A-Za-z\s]+$/.test(value)) errorMsg = "Only letters and spaces allowed";
    }
    if (name === "tamil_name") {
      if (!value.trim()) errorMsg = "Tamil name is required";
      else if (!/^[\u0B80-\u0BFF\s]+$/.test(value)) errorMsg = "Only Tamil letters allowed";
    }
    if (name === "price") {
      if (value === "") errorMsg = "Price is required";
      else if (!/^\d+(\.\d+)?$/.test(value)) errorMsg = "Only numbers allowed";
      else if (Number(value) < 0) errorMsg = "Price cannot be negative";
    }
    if (name === "stock") {
      if (value === "") errorMsg = "Stock is required";
      else if (!/^\d+$/.test(value)) errorMsg = "Only whole numbers allowed";
      else if (Number(value) < 0) errorMsg = "Stock cannot be negative";
    }
    if (name === "weight") {
      if (value === "") errorMsg = "Weight is required";
      else if (!/^\d+(\.\d+)?$/.test(value)) errorMsg = "Only numbers allowed";
      else if (Number(value) < 0) errorMsg = "Weight cannot be negative";
    }
    if (name === "category_id") {
      if (!value) errorMsg = "Select a category";
    }
    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: errorMsg });
  };

  // ── VALIDATION ─────────────────────────────────────────────────────────────
  const validate = () => {
    let tempErrors = {};
    if (!form.name.trim()) tempErrors.name = "Product name is required";
    if (!form.tamil_name.trim()) tempErrors.tamil_name = "Tamil name is required";
    if (!form.price) tempErrors.price = "Price is required";
    if (!form.stock) tempErrors.stock = "Stock is required";
    if (!form.category_id) tempErrors.category_id = "Select a category";
    if (!form.expiry_date) tempErrors.expiry_date = "Select expiry date";
    if (!form.weight) tempErrors.weight = "Weight is required";
    if (!form.unit) tempErrors.unit = "Unit is required";
    if (!form.product_img && !preview) tempErrors.product_img = "Please upload product image";
    if (!accepted) tempErrors.accepted = "You must accept the details";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  // ── SUBMIT ─────────────────────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      const formData = new FormData();
      formData.append("id", Number(form.id));
      formData.append("name", form.name);
      formData.append("tamil_name", form.tamil_name);
      formData.append("price", Number(form.price));
      formData.append("stock", Number(form.stock));
      formData.append("category_id", Number(form.category_id));
      formData.append("weight", Number(form.weight));
      formData.append("expiry_date", form.expiry_date);
      formData.append("status", form.status);
      formData.append("current_trending_status", form.current_trending_status);
      formData.append("description", form.description);
      formData.append("unit", form.unit);
      if (form.subcategory_id) {
        formData.append("subcategory_id", parseInt(form.subcategory_id, 10));
      }
      if (form.product_img instanceof File) {
        formData.append("product_img", form.product_img);
      }
      await productsAPI.updateProduct(formData);
      close();
    } catch (error) {
      console.error("Update error:", error.response?.data);
    }
  };

  // ── IMAGE CHANGE ───────────────────────────────────────────────────────────
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
    setForm((prev) => ({ ...prev, product_img: file }));
  };

  if (!product) return null;

  // ── RENDER ─────────────────────────────────────────────────────────────────
  return (
    <Box
      sx={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1300,
        p: { xs: 1, sm: 2, md: 3 },
      }}
    >
      <Paper
        elevation={8}
        sx={{
          width: "100%",
          maxWidth: { xs: "100%", sm: 600, md: 760 },
          maxHeight: { xs: "95vh", sm: "90vh" },
          borderRadius: { xs: 2, sm: 3 },
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >

        {/* ══════════════ MODAL HEADER ══════════════ */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            px: { xs: 2.5, sm: 3 },
            py: { xs: 1.5, sm: 2 },
            borderBottom: "1px solid #F3F4F6",
            flexShrink: 0,
          }}
        >
          <Typography sx={modalHeading}>Update Product</Typography>
          <IconButton onClick={close} size="small" sx={{ color: "#6B7280" }}>
            <ClearIcon fontSize="small" />
          </IconButton>
        </Box>

        {/* ══════════════ SCROLLABLE FORM ══════════════ */}
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            overflowY: "auto",
            px: { xs: 2.5, sm: 3 },
            pt: 2.5,
            pb: 3,
            flex: 1,
            /* KEY FIX: flex column with gap keeps each section block
               stacked vertically — headings can NEVER float beside fields */
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >

          {/* ─────────── SECTION 1: Basic Information ─────────── */}
          <Box>
            <Typography sx={sectionLabel}>Basic Information</Typography>
            <Divider sx={{ mb: 2 }} />
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Product Name"
                  name="name"
                  fullWidth
                  size="small"
                  value={form.name}
                  onChange={handleChange}
                  error={!!errors?.name}
                  helperText={errors?.name}
                  sx={fieldStyle}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Tamil Name"
                  name="tamil_name"
                  fullWidth
                  size="small"
                  value={form.tamil_name}
                  onChange={handleChange}
                  error={!!errors?.tamil_name}
                  helperText={errors?.tamil_name}
                  sx={fieldStyle}
                />
              </Grid>
            </Grid>
          </Box>

          {/* ─────────── SECTION 2: Category Details ─────────── */}
          <Box>
            <Typography sx={sectionLabel}>Category Details</Typography>
            <Divider sx={{ mb: 2 }} />
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  select
                  label="Status"
                  name="status"
                  fullWidth
                  size="small"
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value })}
                  sx={fieldStyle}
                >
                  <MenuItem value={true} sx={menuItemStyle}>Active</MenuItem>
                  <MenuItem value={false} sx={menuItemStyle}>Inactive</MenuItem>
                </TextField>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  select
                  label="Category"
                  name="category_id"
                  fullWidth
                  size="small"
                  value={form.category_id}
                  onChange={handleChange}
                  error={!!errors?.category_id}
                  helperText={errors?.category_id}
                  sx={fieldStyle}
                >
                  {catdrop.length > 0 ? (
                    catdrop.map((c) => (
                      <MenuItem key={c.value} value={String(c.value)} sx={menuItemStyle}>
                        {c.label}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem disabled sx={menuItemStyle}>No Category Found</MenuItem>
                  )}
                </TextField>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  select
                  label="Subcategory"
                  name="subcategory_id"
                  fullWidth
                  size="small"
                  value={form.subcategory_id}
                  onChange={handleChange}
                  sx={fieldStyle}
                >
                  {subcatdrop.length > 0 ? (
                    subcatdrop.map((s) => (
                      <MenuItem key={s.value} value={String(s.value)} sx={menuItemStyle}>
                        {s.label}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem disabled sx={menuItemStyle}>No Subcategory Found</MenuItem>
                  )}
                </TextField>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  select
                  label="Trend Status"
                  name="current_trending_status"
                  fullWidth
                  size="small"
                  value={form.current_trending_status}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      current_trending_status:
                        e.target.value === "true" || e.target.value === true,
                    })
                  }
                  sx={fieldStyle}
                >
                  <MenuItem value={true} sx={menuItemStyle}>Trending</MenuItem>
                  <MenuItem value={false} sx={menuItemStyle}>Not Trending</MenuItem>
                </TextField>
              </Grid>
            </Grid>
          </Box>

          {/* ─────────── SECTION 3: Pricing & Stock ─────────── */}
          <Box>
            <Typography sx={sectionLabel}>Pricing &amp; Stock</Typography>
            <Divider sx={{ mb: 2 }} />
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Price"
                  name="price"
                  fullWidth
                  size="small"
                  value={form.price}
                  onChange={handleChange}
                  error={!!errors?.price}
                  helperText={errors?.price}
                  sx={fieldStyle}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Stock"
                  name="stock"
                  fullWidth
                  size="small"
                  value={form.stock}
                  onChange={handleChange}
                  error={!!errors?.stock}
                  helperText={errors?.stock}
                  sx={fieldStyle}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  select
                  label="Unit"
                  name="unit"
                  fullWidth
                  size="small"
                  value={form.unit}
                  onChange={handleChange}
                  error={!!errors?.unit}
                  helperText={errors?.unit}
                  sx={{...fieldStyle, width:"90px"}}
                >
                  <MenuItem value="1bn" sx={menuItemStyle}>1bn</MenuItem>
                  <MenuItem value="1kg" sx={menuItemStyle}>1kg</MenuItem>
                  <MenuItem value="1 ltr" sx={menuItemStyle}>1 ltr</MenuItem>
                  <MenuItem value="1 pcs" sx={menuItemStyle}>1 pcs</MenuItem>
                </TextField>
              </Grid>
            </Grid>
          </Box>

          {/* ─────────── SECTION 4: Product Media ─────────── */}
          <Box>
            <Typography sx={sectionLabel}>Product Media</Typography>
            <Divider sx={{ mb: 2 }} />
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, flexWrap: "wrap" }}>
              <Button
                component="label"
                variant="outlined"
                size="small"
                sx={{
                  fontSize: { xs: "12px", sm: "13px", md: "14px" },
                  textTransform: "none",
                  borderRadius: "8px",
                  px: 2.5,
                  py: 0.9,
                  whiteSpace: "nowrap",
                }}
              >
                Upload Image
                <input hidden type="file" accept="image/*" onChange={handleImageChange} />
              </Button>

              {preview && (
                <Box
                  sx={{
                    width: 90,
                    height: 75,
                    borderRadius: 2,
                    overflow: "hidden",
                    border: "1px solid #E5E7EB",
                    flexShrink: 0,
                  }}
                >
                  <img
                    src={preview}
                    alt="preview"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </Box>
              )}
            </Box>
            {errors?.product_img && (
              <Typography color="error" variant="caption" sx={{ display: "block", mt: 0.5 }}>
                {errors.product_img}
              </Typography>
            )}
          </Box>

          {/* ─────────── Description ─────────── */}
          <Box>
            <TextField
              label="Description"
              name="description"
              multiline
              rows={4}
              fullWidth
              value={form.description}
              onChange={handleChange}
              sx={{
                ...fieldStyle,
                "& .MuiOutlinedInput-root": { borderRadius: "8px" },
              }}
            />
          </Box>

          {/* ─────────── FOOTER: Checkbox + Buttons ─────────── */}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              justifyContent: "space-between",
              alignItems: { xs: "flex-start", sm: "center" },
              gap: { xs: 1.5, sm: 0 },
            }}
          >
            <Box>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={accepted}
                    onChange={(e) => setAccepted(e.target.checked)}
                    size="small"
                  />
                }
                label={
                  <Typography
                    sx={{ fontSize: { xs: "12px", sm: "13px", md: "14px" }, color: "#374151" }}
                  >
                    Accept details
                  </Typography>
                }
              />
              {errors?.accepted && (
                <Typography color="error" variant="caption" sx={{ display: "block", ml: 4 }}>
                  {errors.accepted}
                </Typography>
              )}
            </Box>

            <Box sx={{ display: "flex", gap: 1.5, flexShrink: 0 }}>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  fontSize: { xs: "12px", sm: "13px", md: "14px" },
                  fontWeight: 600,
                  borderRadius: "8px",
                  textTransform: "none",
                  px: { xs: 3, sm: 4 },
                  py: { xs: 0.8, sm: 1 },
                }}
              >
                Save
              </Button>
              <Button
                variant="outlined"
                onClick={RefreshForm}
                sx={{
                  fontSize: { xs: "12px", sm: "13px", md: "14px" },
                  fontWeight: 600,
                  borderRadius: "8px",
                  textTransform: "none",
                  px: { xs: 3, sm: 4 },
                  py: { xs: 0.8, sm: 1 },
                }}
              >
                Reset
              </Button>
            </Box>
          </Box>

        </Box>
        {/* ══════════════ END FORM ══════════════ */}

      </Paper>
    </Box>
  );
};

export default UpdateProducts;
// import { useParams, useLocation, useNavigate } from "react-router-dom";
// import {
//   Box,
//   Typography,
//   Breadcrumbs,
//   Link
// } from "@mui/material";
// import useCategoryProductsSocket from "../hooks/UseCategoryProductsSocket";
// import ProductCard from "../components/product/ProductCard";

// const CategoryProductsPage = () => {
//   const { id } = useParams();
//   const location = useLocation();
//   const navigate = useNavigate();

//   const categoryName = location.state?.categoryName || "Category";

//   const { products, loading, error } = useCategoryProductsSocket(id);

//   if (loading)
//     return <Typography sx={{ p: 4 }}>Loading products...</Typography>;

//   if (error)
//     return <Typography sx={{ p: 4 }}>{error}</Typography>;

//   return (
//     <Box sx={{ p: 4 }}>

//       {/* Breadcrumb */}
//       <Box sx={{ mb: 4 }}>
//         <Breadcrumbs separator="/">
//           <Link
//             underline="hover"
//             color="inherit"
//             sx={{ cursor: "pointer" }}
//             onClick={() => navigate("/")}
//           >
//             Home
//           </Link>

//           <Typography color="text.primary">
//             {categoryName}
//           </Typography>
//         </Breadcrumbs>
//       </Box>

//       {/* Title */}
//       <Typography
//         variant="h5"
//         fontWeight={600}
//         sx={{ mb: 4, textAlign: "center" }}
//       >
//         {categoryName}
//       </Typography>

//       {/* Product Grid */}
//       <Box
//         sx={{
//           display: "grid",
//           gridTemplateColumns: "repeat(4, 1fr)",
//           gap: 3,
//           justifyContent: "center",
//           maxWidth: 1200,
//           margin: "0 auto"
//         }}
//       >
//         {products.map((product) => (
//           <ProductCard
//             key={product.id}
//             product={product}
            
//           />
//         ))}
//         {console.log("CATEGORY PRODUCTS PAGE RESPONSE", products)}
//       </Box>

//     </Box>
//   );
// };

// export default CategoryProductsPage;









// ethu final code 
import { useParams, useLocation, useNavigate } from "react-router-dom";
import {
  Box, Typography, Breadcrumbs, Link,
  Container, CircularProgress, Button,
} from "@mui/material";
import useCategoryProductsSocket from "../hooks/UseCategoryProductsSocket";
import useCategoryMenu from "../hooks/useCategoryMenu";
import ProductCard from "../components/product/ProductCard";
import { useState, useMemo, useEffect } from "react";

const CategoryProductsPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const categoryName = location.state?.categoryName || "Category";
  const [selectedSub, setSelectedSub] = useState(null); // null = "All"




  const { products, error, isInitialLoadDone } = useCategoryProductsSocket(id,selectedSub);
  const { subCategories, fetchSubCategories } = useCategoryMenu();


  console.log("product",products)

  useEffect(() => {
    if (id) fetchSubCategories(id);
  }, [id]);

  const currentSubCategories = subCategories[id] || [];

  // Selected subcategory object — breadcrumb name காட்ட

const selectedSubObj = currentSubCategories.find((s) => String(s.id) === String(selectedSub));


  const filteredProducts = products || [];

  if (!isInitialLoadDone) {
    return (
      <Box sx={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "70vh" }}>
          <CircularProgress />
        </Box>
      </Box>
    );
  }

  if (error) {
    return (
      <Typography sx={{ p: 4, textAlign: "center", color: "error.main" }}>
        {error}
      </Typography>
    );
  }




  return (
    <Box sx={{ backgroundColor: "#f5f5f5", minHeight: "100vh", py: { xs: 2, sm: 3, md: 4 } }}>
      <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 3, md: 4 } }}>

        {/* Breadcrumb + Subcategory Buttons - Same Line */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 1,
            mb: { xs: 1.5, sm: 2.5 },
          }}
        >
          {/* Left: Breadcrumb — dynamic ஆ மாறும் */}
          <Breadcrumbs separator="›">
            {/* Home */}
            <Link
              underline="hover"
              color="inherit"
              sx={{ cursor: "pointer", fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
              onClick={() => navigate("/")}
            >
              Home
            </Link>

            {/* Category — subcategory select ஆனா clickable ஆகும் */}
            {selectedSub ? (
              <Link
                underline="hover"
                color="inherit"
                sx={{ cursor: "pointer", fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
                onClick={() => setSelectedSub(null)} // 👈 category click = All products
              >
                {categoryName}
              </Link>
            ) : (
              <Typography
                color="text.primary"
                sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" }, fontWeight: 600 }}
              >
                {categoryName}
              </Typography>
            )}

            {/* Subcategory — select ஆனா மட்டும் show ஆகும் */}
            {selectedSub && selectedSubObj && (
              <Typography
                color="text.primary"
                sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" }, fontWeight: 600 }}
              >
                {selectedSubObj.name} {/* 👈 உங்கள் field name மாத்துங்க */}
              </Typography>
            )}
          </Breadcrumbs>

          {/* Right: Subcategory Filter Buttons */}



          {/* Right: Subcategory Filter Buttons */}
{currentSubCategories.length > 0 && (
  <Box
sx={{ display: "flex", gap: 1, flexWrap: "wrap"
    }}
  >
    {/* All Button */}
    <Button
      size="small"
      onClick={() => setSelectedSub(null)}
      sx={{
        borderRadius: "20px",
        px: { xs: 1.2, sm: 1.5, md: 2 },
        py: { xs: 0.3, sm: 0.4, md: 0.5 },
        minWidth: { xs: "36px", sm: "44px", md: "52px" },
        fontSize: { xs: "0.6rem", sm: "0.7rem", md: "0.7rem" },
        textTransform: "none",
        fontWeight: 600,
        backgroundColor: selectedSub === null ? "#1a1a1a" : "#fff",
        color: selectedSub === null ? "#fff" : "#1a1a1a",
        border: "1px solid #1a1a1a",
        whiteSpace: "nowrap",
        "&:hover": {
          backgroundColor: selectedSub === null ? "#333" : "#f0f0f0",
        },
      }}
    >
      All
    </Button>

    {/* Subcategory Buttons */}
    {currentSubCategories.map((sub) => (
      <Button
        key={sub.id}
        size="small"
        onClick={() => {
      setSelectedSub(sub.id);
    }}
        sx={{
          borderRadius: "20px",
          px: { xs: 1.2, sm: 1.5, md: 2 },
          py: { xs: 0.3, sm: 0.4, md: 0.5 },
          minWidth: { xs: "36px", sm: "44px", md: "52px" },
          fontSize: { xs: "0.6rem", sm: "0.7rem", md: "0.7rem" },
          textTransform: "none",
          fontWeight: 600,
          whiteSpace: "nowrap",
          backgroundColor: selectedSub === sub.id ?  "#3B6D11" : "#fff",
          color: selectedSub === sub.id ? "#fff" : "#1a1a1a",
          border: "1px solid #1a1a1a",
          "&:hover": {
            backgroundColor: selectedSub === sub.id ?  "#617f49" : "#f0f0f0",
          },
        }}
      >
        {sub.name}
      </Button>
    ))}
  </Box>
)}
        </Box>

        {/* Title — subcategory select ஆனா அது show ஆகும் */}
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            mb: { xs: 2, sm: 3 },
            fontSize: { xs: "1rem", sm: "1.25rem", md: "1.5rem" },
            color: "#1a1a1a",
          }}
        >
          {selectedSubObj ? selectedSubObj.name : categoryName} {/* 👈 title மாறும் */}
          <Box component="span" sx={{ color: "text.secondary", fontWeight: 400, ml: 1, fontSize: "0.8em" }}>
            ({filteredProducts.length} items)
          </Box>
        </Typography>

        {/* Product Grid */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "repeat(2, 1fr)",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
              lg: "repeat(4, 1fr)",
              xl: "repeat(5, 1fr)",
            },
            rowGap: { xs: 4, sm: 5, md: 6 },
            columnGap: { xs: 1.5, sm: 2, md: 2.5 },
            pb: 4,
          }}
        >
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              categoryId={id}
              categoryName={categoryName}
              source="categoryProducts"
            />
          ))}
        </Box>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <Box sx={{ textAlign: "center", py: 10 }}>
            <Typography variant="h6" color="text.secondary">
              No products found.
            </Typography>
          </Box>
        )}

      </Container>
    </Box>
  );
};

export default CategoryProductsPage;




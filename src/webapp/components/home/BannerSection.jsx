
import { Box } from "@mui/material";
import bannerImage from "../../../assets/home_page_banner_final.jpg";

export default function BannerSection() {
  return (
    <Box
      sx={{
        // mt: "7",
        width: "100%",
        lineHeight: 0,
        // backgroundColor: "#4caf1a", // match your banner's green exactly
        // Vertical padding gives height on mobile, removed on desktop
        // p: { xs: 2, sm: 1, md: 0 },
      }}
    >
      <Box
        component="img"
        src={bannerImage}
        alt="Promotional Banner"
        sx={{
          width: "100%",
          height: "auto",
          display: "block",
        }}
      />
    </Box>
  );
}
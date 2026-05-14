



import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from "@mui/material";

import PersonIcon from "@mui/icons-material/Person";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import { NavLink } from "react-router-dom";

const menu = [
  {
    label: "Profile",
    icon: <PersonIcon />,
    path: "/account/profile"
  },
  {
    label: "Orders",
    icon: <ReceiptLongIcon />,
    path: "/account/orders"
  },
  {
    label: "Wishlist",
    icon: <FavoriteBorderIcon />,
    path: "/account/wishlist"
  }
];

const AccountSidebar = () => {

  return (
    <Box
      sx={{
        width: 260,
        bgcolor: "white",
        borderRight: "1px solid #e0e0e0",
        minHeight: "calc(100vh - 64px)",
        pt: 2
      }}
    >
      <List>

        {menu.map((item) => (

          <ListItemButton
            key={item.label}
            component={NavLink}
            to={item.path}
            sx={{
              mx: 1,
              mb: 1,
              borderRadius: 2,

              "&.active": {
                backgroundColor: "#E8F5E9",
                color: "#4CAF50"
              },

              "&.active .MuiListItemIcon-root": {
                color: "#4CAF50"
              }
            }}
          >

            <ListItemIcon>
              {item.icon}
            </ListItemIcon>

            <ListItemText
              primary={item.label}
              primaryTypographyProps={{
                fontWeight: 500
              }}
            />

          </ListItemButton>

        ))}

      </List>
    </Box>
  );
};

export default AccountSidebar;
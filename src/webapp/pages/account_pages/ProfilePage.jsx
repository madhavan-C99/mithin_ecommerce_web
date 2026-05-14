import {
  Box,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Button,
  IconButton,
  Divider
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { useEffect, useState } from "react";

import {
  getCustomerProfile,
  updateCustomerProfile,
  fetchAllAddresses,
  deleteCustomerAddress
} from "../../api/AllApi";

import AddressDialog from "../../components/profile/AddressDialog";
import EditProfileDialog from "../../components/profile/EditProfileDialog";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {

  const { user, authLoading } = useAuth();
  const navigate = useNavigate(); // ✅ இங்கே initialize பண்ணினேன்

  const [profile, setProfile]               = useState(null);
  const [loading, setLoading]               = useState(true);
  const [error, setError]                   = useState(false);
  const [addressOpen, setAddressOpen]       = useState(false);
  const [editOpen, setEditOpen]             = useState(false);
  const [addresses, setAddresses]           = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError(false);

      const userId = user?.user_id;

      if (!userId) {
        setError(true);
        navigate("/login", { replace: true }); // ✅ login page
        return;
      }

      const profileResponse = await getCustomerProfile(userId);
      setProfile(profileResponse);

      const addressResponse = await fetchAllAddresses(userId);
      setAddresses(addressResponse);

    } catch (err) {
      console.error(err);
      setError(true);
      // ✅ token expire / API fail → login page
      navigate("/login", { replace: true });
    } finally {
      setLoading(false);
    }
  };

  // ✅ auth finish ஆனா மட்டும் fetch பண்ணு
  useEffect(() => {
    if (!authLoading) {
      fetchProfile();
    }
  }, [authLoading]);

  const handleProfileSave = async (formData) => {
    try {
      const payload = {
        user_id: user?.user_id, // ✅ localStorage பதில் useAuth
        name   : formData.name,
        email  : formData.email,
        mobile : profile.mobile
      };

      await updateCustomerProfile(payload);
      setEditOpen(false);
      fetchProfile();

    } catch (err) {
      console.error("Profile update failed", err);
    }
  };

  const handleAddressAdded   = () => fetchProfile();

  const handleAddressUpdated = () => {
    setSelectedAddress(null);
    fetchProfile();
  };

  const handleDeleteAddress = async (addressId) => {
    try {
      await deleteCustomerAddress(user?.user_id, addressId); // ✅ useAuth
      fetchProfile();
    } catch (error) {
      console.error("Delete address failed:", error);
    }
  };

  const handleEditAddress = (address) => {
    setSelectedAddress(address);
    setAddressOpen(true);
  };

  // ── Loading ──────────────────────────────────────────────
  if (loading) {
    return (
      <Box sx={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
        <Box
          sx={{
            display       : "flex",
            justifyContent: "center",
            alignItems    : "center",
            height        : "70vh",
          }}
        >
          <CircularProgress />
        </Box>
      </Box>
    );
  }

  // ── Error ────────────────────────────────────────────────
  if (error) {
    return (
      <Box sx={{ textAlign: "center", mt: 6 }}>
        <Typography variant="h6">Failed to load profile</Typography>
        {/* ✅ Retry → login page, page refresh ஆகாது */}
        <Button
          onClick={() => navigate("/login", { replace: true })}
          sx={{ mt: 2 }}
        >
          Retry
        </Button>
      </Box>
    );
  }

  // ── Main ─────────────────────────────────────────────────
  return (
    <Box>

      <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
        My Account
      </Typography>

      {/* PROFILE CARD */}
      <Card sx={{ mb: 3 }}>
        <CardContent>

          <Box
            sx={{
              display       : "flex",
              justifyContent: "space-between",
              alignItems    : "center",
              mb            : 2
            }}
          >
            <Typography variant="h6">Personal Information</Typography>
            <IconButton onClick={() => setEditOpen(true)}>
              <EditIcon />
            </IconButton>
          </Box>

          <Divider sx={{ mb: 2 }} />

          <Typography sx={{ mb: 1 }}>
            <strong>Name:</strong> {profile?.name}
          </Typography>
          <Typography>
            <strong>Email:</strong> {profile?.email}
          </Typography>

        </CardContent>
      </Card>

      {/* ADDRESS SECTION */}
      <Card sx={{ mt: 3 }}>
        <CardContent>

          <Typography variant="h6" sx={{ mb: 2 }}>
            Address Management
          </Typography>

          <Divider sx={{ mb: 2 }} />

          <Button
            variant="outlined"
            sx={{ mb: 2 }}
            onClick={() => {
              setSelectedAddress(null);
              setAddressOpen(true);
            }}
          >
            Add Address
          </Button>

          {addresses.length === 0 && (
            <Typography sx={{ color: "text.secondary" }}>
              No address added yet
            </Typography>
          )}

          {addresses.map((addr) => (
            <Card key={addr.id} sx={{ mb: 2, background: "#fafafa" }}>
              <CardContent>

                <Box
                  sx={{
                    display       : "flex",
                    justifyContent: "space-between",
                    alignItems    : "center",
                    mb            : 1
                  }}
                >
                  <Typography sx={{ fontWeight: 600 }}>
                    {addr.name} ({addr.category})
                  </Typography>

                  <Box>
                    <IconButton size="small" onClick={() => handleEditAddress(addr)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => handleDeleteAddress(addr.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Box>

                <Typography>{addr.address_line1}</Typography>
                <Typography>{addr.address_line2}</Typography>

                {addr.landmark && (
                  <Typography sx={{ color: "text.secondary" }}>
                    Landmark: {addr.landmark}
                  </Typography>
                )}

                <Typography>
                  {addr.city}, {addr.state} - {addr.pincode}
                </Typography>

                <Typography sx={{ mt: 1 }}>
                  Mobile: {addr.mobile}
                </Typography>

              </CardContent>
            </Card>
          ))}

        </CardContent>
      </Card>

      <AddressDialog
        open={addressOpen}
        onClose={() => {
          setAddressOpen(false);
          setSelectedAddress(null);
        }}
        onAddressAdded={handleAddressAdded}
        onAddressUpdated={handleAddressUpdated}
        editAddress={selectedAddress}
      />

      <EditProfileDialog
        open={editOpen}
        onClose={() => setEditOpen(false)}
        profile={profile}
        onSave={handleProfileSave}
      />

    </Box>
  );
};

export default ProfilePage;
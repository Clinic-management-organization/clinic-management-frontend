import { HealthAndSafety, Mail, Notifications, School } from "@mui/icons-material";
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Modal,
  InputBase,
  Menu,
  MenuItem,
  styled,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import "./NavBar.css";

import { useNavigate } from "react-router-dom";
const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
  background:
    "linear-gradient(50deg, rgba(131,58,180,1) 0%, rgba(141,29,253,1) 0%, rgba(252,176,69,1) 100%)",
});

const Search = styled("div")(({ theme }) => ({
  backgroundColor: "white",
  padding: "0 10px",
  borderRadius: theme.shape.borderRadius,
  width: "40%",
}));

const Icons = styled(Box)(({ theme }) => ({
  display: "none",
  alignItems: "center",
  gap: "20px",
  [theme.breakpoints.up("sm")]: {
    display: "flex",
  },
}));

const UserBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  [theme.breakpoints.up("sm")]: {
    display: "none",
  },
}));
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const Navbar = ({ socket }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [notifications, setNotifications] = useState({});
  const [openNotif, setOpenNotif] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {});
  const handleRead = () => {
    setNotifications({});
    setOpenNotif(false);
  };
  return (
    <AppBar position="sticky">
      <StyledToolbar>
        <Typography variant="h6" sx={{ display: { xs: "none", sm: "block" } }}>
          <HealthAndSafety />
          Clinique
        </Typography>
        <HealthAndSafety sx={{ display: { xs: "block", sm: "none" } }} />
        <Search>
          <InputBase placeholder="Rechercher..." />
        </Search>
        <Icons>
          <Badge badgeContent={4} color="error">
            <Mail />
          </Badge>

          <div className="icon" onClick={() => setOpenNotif(!openNotif)}>
            <Notifications />
            {notifications && <div className="counter">1</div>}
          </div>

          {openNotif && (
            <div className="notifications">
              <span className="notification">{`votre sujet pfe ${notifications?.title} a été affecté.`}</span>
              <button className="nButton" onClick={handleRead}>
                Ok
              </button>
            </div>
          )}

          <Avatar
            sx={{ width: 30, height: 30 }}
            src="https://images.pexels.com/photos/846741/pexels-photo-846741.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            onClick={(e) => setOpenMenu(true)}
          />
        </Icons>
        <UserBox onClick={(e) => setOpenMenu(true)}>
          <Avatar
            sx={{ width: 30, height: 30 }}
            src="https://images.pexels.com/photos/846741/pexels-photo-846741.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          />
          <Typography variant="span">John</Typography>
        </UserBox>
      </StyledToolbar>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        open={openMenu}
        onClose={(e) => setOpenMenu(false)}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem>Profil</MenuItem>
        <MenuItem onClick={handleOpen}>Mon Compte</MenuItem>

       
         
       
        <MenuItem
          onClick={() => {
            localStorage.clear();
            window.location = "/";
          }}
        >
          Se Déconnecter
        </MenuItem>
      </Menu>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Mise à jour de mot de passe
          </Typography>
        </Box>
      </Modal>
      {/* <Modal
        open={openLevel}
        onClose={handleCloseLevel}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
       
      </Modal> */}
    </AppBar>
  );
};

export default Navbar;

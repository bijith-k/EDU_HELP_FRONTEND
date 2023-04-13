// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { HiMenuAlt1 } from "react-icons/hi";
// import { MdClose } from "react-icons/md";

import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { ListSubheader } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Menu, MenuItem } from "@mui/material";
import { ExpandMore, ExpandLess } from "@mui/icons-material";

const drawerWidth = 240;
const navItems = [
  { name: "HOME", path: "/" },
  { name: "NOTES", path: "/notes" },
  { name: "EVENTS", path: "/events" },
  {name:'PLANS',path:'/plans'},
  { name: "TUTORS", path: "/tutors" },
  { name: "NEWS", path: "/news" },
  // { name: "ACCOUNT", path: "/account" },
];

const Navbar = (props) => {
  const navigate = useNavigate();
  // const [toggleNav, setToggleNav] = useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const [isOpens, setIsOpens] = React.useState(false);
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorE2, setAnchorE2] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClicks = (event) => {
    setAnchorE2(event.currentTarget);
  };

  const handleCloses = () => {
    setAnchorE2(null);
  };
  const handleLogout = () => {
    localStorage.removeItem("Stoken");
    navigate("/signin");
  };
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h5" sx={{ my: 2 }}>
        EDU-HELP
      </Typography>
      <Divider />
      <List>
        {navItems.map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton
              sx={{ textAlign: "center" }}
              onClick={() => navigate(item.path)}
            >
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
        <ListSubheader disableSticky>
          <ListItemButton sx={{ textAlign: "center" }}>
            <ListItemText primary="UPLOAD" />
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(!isOpen);
              }}
            >
              {isOpen ? <ExpandLess /> : <ExpandMore />}
            </IconButton>
          </ListItemButton>
        </ListSubheader>
        {isOpen && (
          <>
            <ListItem disablePadding>
              <ListItemButton
                sx={{ textAlign: "center" }}
                onClick={() => navigate("/upload-notes")}
              >
                <ListItemText primary="UPLOAD NOTES" />
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton
                sx={{ textAlign: "center" }}
                onClick={() => navigate("/upload-videos")}
              >
                <ListItemText primary="UPLOAD VIDEOS" />
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton
                sx={{ textAlign: "center" }}
                onClick={() => navigate("/upload-question-paper")}
              >
                <ListItemText primary="UPLOAD QUESTION PAPERS" />
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton
                sx={{ textAlign: "center" }}
                onClick={() => navigate("/add-events")}
              >
                <ListItemText primary="ADD EVENTS" />
              </ListItemButton>
            </ListItem>
          </>
        )}


<ListSubheader disableSticky>
          <ListItemButton sx={{ textAlign: "center" }}>
            <ListItemText primary="ACCOUNT" />
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                setIsOpens(!isOpens);
              }}
            >
              {isOpens ? <ExpandLess /> : <ExpandMore />}
            </IconButton>
          </ListItemButton>
        </ListSubheader>
        {isOpens && (
          <>
            <ListItem disablePadding>
              <ListItemButton
                sx={{ textAlign: "center" }}
                onClick={() => navigate("/upload-notes")}
              >
                <ListItemText primary="YOUR PROFILE" />
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton
                sx={{ textAlign: "center" }}
                onClick={() => navigate("/my-uploads")}
              >
                <ListItemText primary="YOUR UPLOADS" />
              </ListItemButton>
            </ListItem>
            {/* <ListItem>
              <ListItemButton
                sx={{ textAlign: "center" }}
                onClick={() => navigate("/upload-question-paper")}
              >
                <ListItemText primary="UPLOAD QUESTION PAPERS" />
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton
                sx={{ textAlign: "center" }}
                onClick={() => navigate("/add-events")}
              >
                <ListItemText primary="ADD EVENTS" />
              </ListItemButton>
            </ListItem> */}
          </>
        )}

        

        

        <ListItem disablePadding>
          <ListItemButton sx={{ textAlign: "center" }} onClick={handleLogout}>
            <ListItemText primary="LOGOUT" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    // <>
    //   <nav className="bg-blue-800 flex w-full border-b-2 fixed top-0 border-b-white  h-16 text-slate-50 items-center justify-between p-4 left-0 z-50 relative ">
    //     <span className="text-3xl font-bold cursor-pointer ">EDU-HELP</span>
    //     <span
    //       onClick={() => setToggleNav(!toggleNav)}
    //       className="text-2xl flex md:hidden"
    //     >
    //       {toggleNav ? <MdClose /> : <HiMenuAlt1 />}
    //     </span>
    //     <div className="hidden md:flex items-center justify-end space-x-4">
    //       <ul className="flex items-center cursor-pointer justify-end space-x-6">
    //         <li>HOME</li>
    //         <li>EVENTS</li>
    //         <li className="relative">
    //           <span>NOTES</span>
    //           <select name="" className="absolute top-full left-0 w-full" id="">
    //             <option value="">View notes</option>
    //             <option value="">Add notes</option>
    //           </select>
    //         </li>

    //         <li>NEWS</li>
    //         <li>TUTORS</li>
    //         <li>ACCOUNT</li>
    //         <li>CONTACT</li>
    //       </ul>
    //     </div>
    //   </nav>
    //   {toggleNav ? (
    //     <div
    //       className={`bg-teal-50 shadow-sm p-4 translate-x-0 transition-all delay-100`}
    //     >
    //       <ul className="flex flex-col items-start justify-center gap-4">
    //         <li>HOME</li>
    //         <li>EVENTS</li>
    //         <li>NOTES</li>
    //         <li>NEWS</li>
    //         <li>TUTORS</li>
    //         <li>ACCOUNT</li>
    //         <li>CONTACT</li>
    //       </ul>
    //     </div>
    //   ) : null}
    // </>

    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar component="nav" className="bg-blue-900">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            className="font-bold"
          >
            EDU-HELP
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map((item, index) => (
              <Button
                key={index}
                sx={{ color: "#fff" }}
                onClick={() => navigate(item.path)}
              >
                {item.name}
              </Button>
            ))}
            <Button
              id="upload-button"
              onClick={handleClick}
              sx={{ color: "#fff" }}
            >
              Upload
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
            >
              <MenuItem onClick={handleClose}>
                <Link to="/upload-notes"> UPLOAD NOTES</Link>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Link to="/upload-videos"> UPLOAD VIDEOS</Link>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Link to="/upload-question-paper"> UPLOAD QUESTION PAPERS</Link>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Link to="/add-events">ADD EVENTS</Link>
              </MenuItem>
            </Menu>
            <Button
              id="upload-button"
              onClick={handleClicks}
              sx={{ color: "#fff" }}
            >
              account
            </Button>
            <Menu
              anchorEl={anchorE2}
              open={Boolean(anchorE2)}
              onClose={handleCloses}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
            >
              <MenuItem onClick={handleCloses}>
                <Link to="/upload-notes"> YOUR PROFILE</Link>
              </MenuItem>
              <MenuItem onClick={handleCloses}>
                <Link to="/my-uploads"> YOUR UPLOADS</Link>
              </MenuItem>
              {/* <MenuItem onClick={handleClose}>
                <Link to="/upload-question-paper"> UPLOAD QUESTION PAPERS</Link>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Link to="/add-events">ADD EVENTS</Link>
              </MenuItem> */}
            </Menu>
            <Button
              id="upload-button"
              sx={{ color: "#fff" }}
              className="bg-red-500 ml-2 font-semibold"
              onClick={handleLogout}
            >
              LOGOUT
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
};

export default Navbar;

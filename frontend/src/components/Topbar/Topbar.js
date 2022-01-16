import React from "react";
import "./Topbar.css";
import LanguageIcon from "@mui/icons-material/Language";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

export default function Topbar() {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.userReducer.isAuth);
  // const handleLogout = () => {
  //   dispatch(logout());
  // };
  // const handleGetUser = () => {
  //   dispatch(current());
  // };
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">admin dashbord</span>
        </div>

        <div className="topRight">
          {isAuth ? (
            <>
              {" "}
              <div className="topbarIconContainer">
                <NotificationsIcon />
                <span className="topIconBadge">2</span>
              </div>
              <div className="topbarIconContainer">
                <LanguageIcon />
                <span className="topIconBadge">2</span>
              </div>
              <div className="topbarIconContainer">
                <SettingsIcon />
              </div>
              <img
                src="https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                alt=""
                className="topAvatar"
              />
            </>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </div>
      </div>
    </div>
  );
}

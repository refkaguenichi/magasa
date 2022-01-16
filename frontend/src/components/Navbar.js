import React, { useEffect, useState } from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import {
  Center,
  Container,
  Input,
  Language,
  Left,
  Logo,
  MenuItem,
  Right,
  SearchContainer,
  StyledBadge,
  Wrapper,
} from "../common/NavbarElements";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import { current, logout } from "../JS/actions/user";
import { Link } from "react-router-dom";

const Navbar = () => {
  // const [showInput, setshowInput] = useState(false);
  const [inputText, setInputText] = useState("");
  const isAuth = useSelector((state) => state.userReducer.isAuth);
  const user = useSelector((state) => state.userReducer.user);
  const dispatch = useDispatch();
  const params = useParams();
  const handleLogout = () => {
    dispatch(logout());
  };
  const handleGetUser = () => {
    dispatch(current());
  };
  const handleSearchChange = (e) => {
    e.preventDefault();
    setInputText(e.target.value);
  };
  //  useEffect(() => {
  //    if (inputText) {
  //      dispatch(getPostByTitle(inputText));
  //    } else dispatch(getAllposts());
  //  }, [dispatch, inputText, params.title]);
  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContainer>
            <Input
              placeholder="Search..."
              onChange={handleSearchChange}
              value={inputText}
              type="text"
            />
            <SearchIcon className="search-icon" />
          </SearchContainer>
        </Left>
        <Center>
          <Link to="/">
            <Logo>magasa</Logo>
          </Link>
        </Center>
        <Right>
          {isAuth ? (
            <MenuItem>
              <Link to="/login">
                <LogoutIcon onClick={handleLogout} />
              </Link>
              <Link to="/current">
                <AccountCircleIcon onClick={handleGetUser} />
              </Link>
            </MenuItem>
          ) : (
            <>
              <MenuItem>
                <Link to="/register">Register</Link>
              </MenuItem>
              <MenuItem>
                <Link to="/login">LogIn</Link>
              </MenuItem>
            </>
          )}
          {user.isAdmin === true && (
            <>
              <MenuItem to="">
                <Link to="/admin">
                  <AdminPanelSettingsIcon
                    style={{ fontSize: 28 }}
                    className="Nav-icons"
                  />
                </Link>
              </MenuItem>
            </>
          )}

          <MenuItem>
            <IconButton aria-label="cart">
              <StyledBadge badgeContent={4} color="primary" size="small">
                <ShoppingCartOutlinedIcon />
              </StyledBadge>
            </IconButton>
          </MenuItem>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;

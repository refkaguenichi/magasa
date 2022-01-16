import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { useHistory } from "react-router";
import { current, editUser } from "./../../JS/actions/user";
import {
  Container,
  Left,
  ImgContainer,
  Image,
  Username,
  Right,
  AboutWrapper,
  Title,
  Detail,
  DetailItem,
  CartWrapper,
  CartBody,
  CartItem,
  ButtonH,
} from "./../../common/ProfileElements";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

function ChildModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button onClick={handleOpen}>Open Child Modal</Button>
      <Modal
        hideBackdrop
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 200 }}>
          <h2 id="child-modal-title">Text in a child modal</h2>
          <p id="child-modal-description">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          </p>
          <Button onClick={handleClose}>Close Child Modal</Button>
        </Box>
      </Modal>
    </React.Fragment>
  );
}

const Profile = () => {
  const [edit, setEdit] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [userstate, setUserstate] = useState({
    avatar: "",
    firstname: "",
    lastname: "",
    username: "",
    phone: 0,
  });
  const [fileName, setFileName] = useState("");
  const dispatch = useDispatch();
  const params = useParams();
  const history = useHistory();
  const user = useSelector((state) => state.userReducer.user);
  const loadUser = useSelector((state) => state.userReducer.load);
  const errorUser = useSelector((state) => state.userReducer.error);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeFile = (e) => {
    setFileName(e.target.files[0]);
  };
  const handleUserChange = (e) => {
    setUserstate({ ...userstate, [e.target.name]: e.target.value });
  };
  const handleUserClick = () => {
    const formData = new FormData();
    formData.append("avatar", fileName);
    formData.append("firstname", userstate.firstname);
    formData.append("lastname", userstate.lastname);
    formData.append("username", userstate.username);
    formData.append("phone", userstate.phone);
    dispatch(editUser(params.id, formData, history));
  };

  useEffect(() => {
    dispatch(current());
  }, [dispatch]);

  useEffect(() => {
    if (params.id) {
      setEdit(true);
    } else {
      setEdit(false);
    }
    edit
      ? (function () {
          setUserstate(user);
        })()
      : setUserstate({
          avatar: "",
          firstname: "",
          lastname: "",
          username: "",
          phone: 0,
        });
  }, [edit, user, params.id]);

  return (
    <Container>
      <Left>
        <ImgContainer>
          <Image
            src={user.avatar ? `/upload/${user.avatar}` : `/assets/avatar.svg`}
          />
          <div class="add-icon">
            <label for="file-input">
              <AddAPhotoIcon />
            </label>

            <input
              id="file-input"
              type="file"
              filename="avatar"
              className="avatar"
              onChange={handleChangeFile}
              hidden
            />
          </div>
        </ImgContainer>
        <Username> {user.username}</Username>
        <ButtonH
          onClick={() => {
            handleOpen();
            history.push(`/users/edit/${user._id}`);
          }}
        >
          Edit profile
        </ButtonH>
        <>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
          >
            <Box sx={{ ...style, width: 400 }}>
              <h2 id="parent-modal-title">Edit your profile</h2>
              <input
                type="text"
                onChange={handleUserChange}
                name="username"
                required
                value={userstate && userstate.username}
              />

              <ButtonH onClick={handleUserClick}>Edit profile</ButtonH>
            </Box>
          </Modal>
        </>
      </Left>
      <Right>
        <AboutWrapper>
          <Title>About</Title>
          <Detail>
            <DetailItem>Fullname:{user.username}</DetailItem>
            <DetailItem>Email:{user.email}</DetailItem>
            <DetailItem>Phone:</DetailItem>
            <DetailItem>Address:</DetailItem>
            <DetailItem>Sex:</DetailItem>
          </Detail>
        </AboutWrapper>
        <CartWrapper>
          <Title>Cart</Title>
          <CartBody>
            <CartItem>your carts</CartItem>
          </CartBody>
        </CartWrapper>
      </Right>
    </Container>
  );
};

export default Profile;

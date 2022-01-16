import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { useForm } from "react-hook-form";
import { signUp } from "../../JS/actions/user";
import ErrorsNotifications from "../../components/ErrorNotifications";
import {
  Container,
  Wrapper,
  Button,
  Form,
  Input,
  Title,
  Agreement,
} from "../../common/RegisterElements";

const Register = () => {
  const [user, setUser] = useState({ username: "", email: "", password: "" });
  const errorsback = useSelector((state) => state.userReducer.errors);
  const history = useHistory();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const handleSignUp = () => {
    dispatch(signUp(user, history));
  };
  const handleUser = (e) => {
    e.preventDefault();
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = (data) => console.log(data);
  console.log(watch("example"));

  return (
    <Container className="sign-up">
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <label>Username</label>
          <Input
            {...register("UserName", {
              required: true,
            })}
            type="text"
            placeholder="Enter your username"
            name="username"
            onInput={handleUser}
            value={user.username}
          />
          {!user.username
            ? errors.UserName && <p>Field can't be empty!</p>
            : null}
          <label>Email</label>
          <Input
            {...register("Email", {
              required: true,
              pattern: ".+@globex.com",
            })}
            type="email"
            placeholder="Enter your email"
            name="email"
            onInput={handleUser}
            value={user.email}
          />
          {!user.email ? errors.Email && <p>Field can't be empty!</p> : null}
          {!user.email.match("@")
            ? errors.Email && <p>It should be an email!</p>
            : null}
          <label>Password</label>
          <Input
            {...register("Password", {
              required: true,
              min: 6,
            })}
            type="password"
            name="password"
            min={6}
            placeholder="Enter your Password"
            onInput={handleUser}
            value={user.password}
          />
          {!user.password
            ? errors.Password && <p>You must specify a password!</p>
            : null}
          {user.password.length < 6
            ? errors.Password && <p>Password must be at least 6 characters!</p>
            : null}
          <Agreement>
            <Link to="/login">Already have an account? Sign in</Link>
          </Agreement>
          <Button
            {...register("Submit", {
              required: true,
            })}
            type="submit"
            variant="contained"
            size="small"
            onClick={handleSignUp}
          >
            Sign up
          </Button>
          {errorsback
            ? errors.Submit && (
                <span>
                  {errorsback &&
                    errorsback.map((el) => <ErrorsNotifications errors={el} />)}
                </span>
              )
            : null}
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;

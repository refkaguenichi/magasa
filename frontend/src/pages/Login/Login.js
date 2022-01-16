import { useState } from "react";
import {
  Button,
  Container,
  Error,
  Form,
  Input,
  Link,
  Title,
  Wrapper,
} from "../../common/LoginElements";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { signIn } from "../../JS/actions/user";

const Login = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const history = useHistory();
  const dispatch = useDispatch();

  const handleSignIn = (e) => {
    e.preventDefault();
    dispatch(signIn(user,history));
  };
  const handleUser = (e) => {
    e.preventDefault();
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  return (
    <Container>
      <Wrapper>
        <Title>SIGN IN</Title>
        <Form>
          <Input
            type="email"
            name="email"
            placeholder="Enter your email"
            onInput={handleUser}
            value={user.email}
          />
          <Input
            type="password"
            name="password"
            min={6}
            placeholder="Enter your Password"
            onInput={handleUser}
            value={user.password}
          />
          <Button onClick={handleSignIn}>LOGIN</Button>
          {
            //   error &&
            <Error>Something went wrong...</Error>
          }
          <Link>DO NOT YOU REMEMBER THE PASSWORD?</Link>
          <Link>CREATE A NEW ACCOUNT</Link>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;

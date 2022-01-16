import React from "react";
import {
  Button,
  Container,
  Desc,
  Input,
  InputContainer,
  Title,
} from "../common/NewsletterElements";
import SendIcon from "@mui/icons-material/Send";

const Newsletter = () => {
  return (
    <Container>
      <Title>Newsletter</Title>
      <Desc>Get timely updates from your favorite products.</Desc>
      <InputContainer>
        <Input placeholder="Your email" />
        <Button>
          <SendIcon />
        </Button>
      </InputContainer>
    </Container>
  );
};

export default Newsletter;

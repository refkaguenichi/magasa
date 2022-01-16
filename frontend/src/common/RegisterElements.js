import styled from "styled-components";
export const Container = styled.div`
  width: 100%;
  height: 500px;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  p::before {
    display: inline;
    content: "⚠ ";
  }
  p {
    color: #bf1650;
  }

  label {
    padding: 5px 0;
    width: 300px;
  }
`;

export const Wrapper = styled.div`
  width: 340px;
  margin: 0 auto;
  padding: 20px;
  background-color: white;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`;

export const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

export const Form = styled.form`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const Input = styled.input`
  padding: 10px;
  width: 300px;
`;

export const Agreement = styled.span`
  font-size: 14px;
  margin: 10px 0px;
`;

export const Button = styled.button`
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

import styled from "styled-components";
export const Container = styled.div`
  margin: 10px auto;
  display: grid;
  grid-template-columns: 400px auto;
  //   grid-gap: 2em;
  max-width: 900px;
  min-height: 400px;
  border: 1px solid lightgrey;
`;
export const Left = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
export const Right = styled.div`
  display: flex;
  flex-direction: column;
  align-items: space-between;
`;
export const ImgContainer = styled.div`
  width: 250px;
  height: 250px;
  position: relative;
  .add-icon{
    position: absolute;
    bottom: 20%;
    left: 90%;
    font-size: 35px;
    color: teal;
    cursor:pointer; 
  }
`;
export const Image = styled.img`
  width: 250px;
  height: 250px;
  border-radius: 50%;
  position: absolute;
  background: linear-gradient(rgba(0, 0, 0, 0.2), rgba(255, 255, 255, 0.5));
  top: 0;
  left: 0;
`;
export const Username = styled.h2`
  margin: 15px 0;
  text-align: center;
`;
export const AboutWrapper = styled.div`
  height: 50%;
`;
export const CartWrapper = styled.div`
  height: 50%;
`;
export const Title = styled.h2`
  padding: 10px;
  color: teal;
`;
export const Detail = styled.div`
  display: flex;
  flex-direction: column;
  align-items: space-between;
  border: 1px solid lightgrey;
`;
export const DetailItem = styled.span`
  padding: 5px;
`;

export const CartBody = styled.div`
  padding: 5px;
  border: 1px solid lightgrey;
`;
export const CartItem = styled.span`
  padding: 5px;
`;

export const ButtonH = styled.button`
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

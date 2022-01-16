import styled from "styled-components";
import { styled as mstyled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import { mobile } from "./Responsive";

export const Container = styled.div`
  height: 60px;

  ${mobile({ height: "50px" })}
`;

export const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${mobile({ padding: "10px 0" })}
`;
export const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

export const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })}
`;

export const SearchContainer = styled.div`
  border: 0.5px solid lightgrey;
  border-radius: 5px;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;

  .search-icon {
    color: grey;
    font-size: 16px;
  }
`;

export const Input = styled.input`
  border: none;
  ${mobile({ width: "50px" })}
`;

export const Center = styled.div`
  flex: 1;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Logo = styled.h1`
  font-weight: bold;
  display: flex;
  align-items: center;
  ${mobile({ fontSize: "24px" })}
`;

export const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: "2", justifyContent: "center" })}
`;

export const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

export const StyledBadge = mstyled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

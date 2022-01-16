import React from "react";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
// import { useSelector } from "react-redux";
import StripeCheckout from "react-stripe-checkout";
import { useEffect, useState } from "react";
// import { userRequest } from "../requestMethods";
import { useHistory } from "react-router";
import {
  Bottom,
  Button,
  Container,
  Details,
  Hr,
  Image,
  Info,
  PriceDetail,
  Product,
  ProductAmount,
  ProductAmountContainer,
  ProductColor,
  ProductDetail,
  ProductId,
  ProductName,
  ProductPrice,
  ProductSize,
  Summary,
  SummaryItem,
  SummaryItemPrice,
  SummaryItemText,
  SummaryTitle,
  Title,
  Top,
  TopButton,
  TopText,
  TopTexts,
  Wrapper,
} from "../../common/CartElements";

const KEY = process.env.REACT_APP_STRIPE;

const Cart = () => {
  //   const cart = useSelector((state) => state.cart);
  const [cart, setCart] = useState(null);
  const [stripeToken, setStripeToken] = useState(null);
  const history = useHistory();

  const onToken = (token) => {
    setStripeToken(token);
  };

  //   useEffect(() => {
  //     const makeRequest = async () => {
  //       try {
  //         const res = await userRequest.post("/checkout/payment", {
  //           tokenId: stripeToken.id,
  //           amount: 500,
  //         });
  //         history.push("/success", {
  //           stripeData: res.data,
  //           products: cart,
  //         });
  //       } catch {}
  //     };
  //     stripeToken && makeRequest();
  //   }, [stripeToken, cart.total, history]);
  return (
    <Container>
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <TopButton>CONTINUE SHOPPING</TopButton>
          <TopTexts>
            <TopText>Shopping Bag(2)</TopText>
            <TopText>Your Wishlist (0)</TopText>
          </TopTexts>
          <TopButton type="filled">CHECKOUT NOW</TopButton>
        </Top>
        <Bottom>
          <Info>
            {
              // cart.products.map((product) => (
              <Product>
                <ProductDetail>
                  <Image
                  //   src={product.img}
                  />
                  <Details>
                    <ProductName>
                      <b>Product:</b>
                      {/* {product.title} */}
                    </ProductName>
                    <ProductId>
                      <b>ID:</b>
                      {/* {product._id} */}
                    </ProductId>
                    <ProductColor
                    // color={product.color}
                    />
                    <ProductSize>
                      <b>Size:</b>
                      {/* {product.size} */}
                    </ProductSize>
                  </Details>
                </ProductDetail>
                <PriceDetail>
                  <ProductAmountContainer>
                    <AddIcon />
                    <ProductAmount>{/* {product.quantity} */}</ProductAmount>
                    <RemoveIcon />
                  </ProductAmountContainer>
                  <ProductPrice>
                    ${/* {product.price * product.quantity} */}
                  </ProductPrice>
                </PriceDetail>
              </Product>
              // ))
            }
            <Hr />
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>$cart.total</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>$ 5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>$ -5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>$cart.total</SummaryItemPrice>
            </SummaryItem>
            <StripeCheckout
              name="magasa Shop"
              image="https://avatars.githubusercontent.com/u/1486366?v=4"
              billingAddress
              shippingAddress
              //   description={`Your total is $${cart.total}`}
              //   amount={cart.total * 100}
              token={onToken}
              stripeKey={KEY}
            >
              <Button>CHECKOUT NOW</Button>
            </StripeCheckout>
          </Summary>
        </Bottom>
      </Wrapper>
    </Container>
  );
};

export default Cart;

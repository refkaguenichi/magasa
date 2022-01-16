import { Switch, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { GlobalStyle } from "./common/AppElements";
import PrivateRoute from "./router/PrivateRoute";
import AdminRoute from "./router/AdminRoute";
import Announcement from "./components/Announcement";
import Navbar from "./components/Navbar";
import Home from "./pages/Home/Home";
import Newsletter from "./components/Newsletter";
import Footer from "./components/Footer";
import Errors from "./pages/Errors/Errors";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import ProductList from "./pages/ProductList/ProductList";
import Product from "./pages/Product/Product";
import NewProduct from "./pages/NewProduct/NewProduct";
import Cart from "./pages/Cart/Cart";
import Success from "./pages/Success/Success";
import Profile from "./pages/Profile/Profile";
import { current } from "./JS/actions/user";
import UserList from "./pages/UserList/UserList";
import User from "./pages/User/User";
import NewUser from "./pages/NewUser/NewUser";
import AdminDash from "./pages/AdminDash/AdminDash";
import AdminProductList from "./pages/AdminProductList/AdminProductList";
import AdminProduct from "./pages/AdminProduct/AdminProduct";

const App = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      dispatch(current());
    }
  }, [dispatch, token]);
  return (
    <>
      <GlobalStyle />
      <Announcement />
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/products" component={ProductList} />
        <Route path="/products/find/:id" component={Product} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <PrivateRoute
          path={["/current", "/users/edit/:id"]}
          component={Profile}
        />
        <PrivateRoute exact path="/carts" component={Cart} />
        <AdminRoute path="/admin" component={AdminDash} />
        <AdminRoute exact path="/admin/users" component={UserList} />
        <AdminRoute exact path="/admin/users/:userId" component={User} />
        <AdminRoute exact path="/admin/newUser" component={NewUser} />
        <AdminRoute exact path="/admin/products" component={AdminProductList} />
        <AdminRoute
          exact
          path="/admin/products/:productId"
          component={AdminProduct}
        />
        <AdminRoute exact path="/admin/newProduct" component={NewProduct} />
        <Route exact path="/success" component={Success} />
        <Route path="/*" component={Errors} />
      </Switch>
      <Newsletter />
      <Footer />
    </>
  );
};

export default App;

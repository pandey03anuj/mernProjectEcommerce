import "./App.css";
import { useEffect, useState, Fragment, Suspense } from "react";
import Header from "./component/layout/Header/Header.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WebFont from "webfontloader";
import React from "react";
import Footer from "./component/layout/Footer/Footer.js";
import Home from "./component/Home/Home.js";
// import Loader from "./component/layout/Loader/Loader";
import ProductDetails from "./component/Product/ProductDetails.js";
import Products from "./component/Product/Products.js";
import Search from "./component/Product/Search.js";
import LoginSignUp from "./component/User/LoginSignUp";
import store from "./store";
import { loadUser } from "./actions/userAction";
import UserOptions from "./component/layout/Header/UserOptions.js";
import { useSelector } from "react-redux";
import Profile from "./component/User/Profile.js";
import ProtectedRoute from "./component/ProtectedRoute";
import UpdateProfile from "./component/User/UpdateProfile.js";
import UpdatePassword from "./component/User/UpdatePassword.js";
import ForgotPassword from "./component/User/ForgotPassword.js";
import ResetPassword from "./component/User/ResetPassword.js";
import Cart from "./component/Cart/Cart.js";
import Shipping from "./component/Cart/Shipping.js";
import ConfirmOrder from "./component/Cart/ConfirmOrder.js";
import axios from "axios";
import Payment from "./component/Cart/Payment.js";
// import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import ElementsLayout from "./component/Route/ElementsLayout.js";
import OrderSuccess from "./component/Cart/OrderSuccess.js";
import MyOrders from "./component/Order/MyOrders.js";
import OrderDetails from "./component/Order/OrderDetails.js";
import Dashboard from "./component/admin/Dashboard.js";
import ProductList from "./component/admin/ProductList.js";
import NewProduct from "./component/admin/NewProduct.js";
import UpdateProduct from "./component/admin/UpdateProduct.js";
import OrderList from "./component/admin/OrderList.js";
import ProcessOrder from "./component/admin/ProcessOrder.js";
import UsersList from "./component/admin/UsersList.js";
import UpdateUser from "./component/admin/UpdateUser.js";
import ProductReviews from "./component/admin/ProductReviews";
import Contact from "./component/layout/Contact/Contact.js";
import About from "./component/layout/About/About.js";
import NotFound from "./component/layout/NotFound/NotFound.js";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");

    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

    store.dispatch(loadUser());

    getStripeApiKey();
  }, []);

  // window.addEventListener("contextmenu", (e) => e.preventDefault());

  return (
    <Suspense>
      <Router>
        <Header />
        {isAuthenticated && <UserOptions user={user} />}

        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route exact path="/products" element={<Products />} />
          <Route exact path="/contact" element={<Contact />} />
          <Route exact path="/about" element={<About />} />
          <Route path="/products/:keyword" element={<Products />} />
          <Route exact path="/Search" element={<Search />} />
          <Route exact path="/login" element={<LoginSignUp />} />
          <Route exact path="/cart" element={<Cart />} />
          <Route exact path="/password/forgot" element={<ForgotPassword />} />
          <Route
            exact
            path="/password/reset/:token"
            element={<ResetPassword />}
          />

          <Route element={<ProtectedRoute />}>
            <Route path="/account" element={<Profile />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route path="/me/update" element={<UpdateProfile />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route path="/password/update" element={<UpdatePassword />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route path="/shipping" element={<Shipping />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route path="/order/confirm" element={<ConfirmOrder />} />
          </Route>

          {stripeApiKey && (
            <Route
              element={<ElementsLayout stripe={loadStripe(stripeApiKey)} />}
            >
              <Route path="/process/payment" element={<Payment />} />
            </Route>
          )}

          <Route element={<ProtectedRoute />}>
            <Route path="/success" element={<OrderSuccess />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route path="/orders/me" element={<MyOrders />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route path="/order/:id" element={<OrderDetails />} />
          </Route>

          <Route element={<ProtectedRoute isAdmin={true} />}>
            <Route path="/admin/dashboard" element={<Dashboard />} />
          </Route>

          <Route element={<ProtectedRoute isAdmin={true} />}>
            <Route path="/admin/products" element={<ProductList />} />
          </Route>

          <Route element={<ProtectedRoute isAdmin={true} />}>
            <Route path="/admin/product" element={<NewProduct />} />
          </Route>

          <Route element={<ProtectedRoute isAdmin={true} />}>
            <Route path="/admin/product/:id" element={<UpdateProduct />} />
          </Route>

          <Route element={<ProtectedRoute isAdmin={true} />}>
            <Route path="/admin/orders" element={<OrderList />} />
          </Route>

          <Route element={<ProtectedRoute isAdmin={true} />}>
            <Route path="/admin/order/:id" element={<ProcessOrder />} />
          </Route>
          <Route element={<ProtectedRoute isAdmin={true} />}>
            <Route path="/admin/users" element={<UsersList />} />
          </Route>

          <Route element={<ProtectedRoute isAdmin={true} />}>
            <Route path="/admin/user/:id" element={<UpdateUser />} />
          </Route>

          <Route element={<ProtectedRoute isAdmin={true} />}>
            <Route path="/admin/reviews" element={<ProductReviews />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </Router>
    </Suspense>
  );
}

export default App;

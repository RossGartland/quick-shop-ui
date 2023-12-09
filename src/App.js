import React, { Component, Router } from "react";
import { Routes, Route, Link, Outlet, BrowserRouter } from "react-router-dom";
import "./App.css";
import AuthService from "./services/auth.service";
import Register from "./components/auth-components/register/register.component";
import Home from "./pages/home/home.page";
import Profile from "./pages/profile/profile.page";
import MyLayout from "./components/layout/layout.component";
import Login from "./components/auth-components/login/login.component";
import LoginPage from "./pages/home/auth-pages/login/login.page";
import MyStores from "./pages/my-stores/my-stores.component";
import PartnerInfo from "./pages/partner-info/partner-info";
import MyStore from "./pages/my-store/my-store.component";
import PartnerSignUp from "./components/partner-signup/partner-signup";
import AddProduct from "./components/products/add-product/add-product.component";
import Product from "./pages/product/product.component";
import EditProduct from "./components/products/edit-product/edit-product.component";
import Stores from "./pages/stores/stores.component";
import Store from "./pages/store/store.component";
import Checkout from "./pages/checkout/checkout.component";
import OrderComplete from "./pages/checkout/order-complete/order-complete.component";
import StoreOrders from "./components/orders/store-order/store-orders.component";
import StoreOrder from "./components/orders/store-orders/store-order.component";
import EditStore from "./pages/my-store/edit-my-store/edit-my-store.component";
import CustomerOrder from "./components/customer-order/customer-order";
import NotFound from "./pages/not-found/not-found.component";
import ProductSettings from "./pages/product/product-settings.component";
import StoreReviews from "./pages/reviews/store-reviews.component";
import AddStoreReview from "./components/review/add-store-review.component";
import ResetPassword from "./components/auth-components/reset-password/reset-password.component";

const App = () => {
  const currentUser = AuthService.getCurrentUser();
  return (
    <div>
      <MyLayout />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/search" element={<Stores />} />
        <Route exact path="/stores" element={<Profile />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route exact path="/signin" element={<LoginPage />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/mystores" element={<MyStores />} />
        <Route exact path="/add-store" element={<PartnerSignUp />} />
        <Route exact path="partnersinfo" element={<PartnerInfo />} />
        <Route exact path="mystores/:id" element={<MyStore />} />
        <Route exact path="mystores/:id/edit" element={<EditStore />} />
        <Route exact path="stores/:id" element={<Store />} />
        <Route exact path="/checkout" element={<Checkout />} />
        <Route exact path="/order-complete" element={<OrderComplete />} />
        <Route exact path="mystores/:id/orders" element={<StoreOrders />} />
        <Route
          exact
          path="mystores/:id/orders/:orderID"
          element={<StoreOrder />}
        />
        <Route
          exact
          path="customer/:customerID/orders/:orderID"
          element={<CustomerOrder />}
        />
        <Route exact path="mystores/:id/add-product" element={<AddProduct />} />
        <Route
          exact
          path="store/:storeID/product/:productID"
          element={<Product />}
        />
        <Route
          exact
          path="store/:storeID/product/:productID/edit"
          element={<ProductSettings />}
        />
        <Route exact path="/resetpassword" element={<ResetPassword />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};
export default App;

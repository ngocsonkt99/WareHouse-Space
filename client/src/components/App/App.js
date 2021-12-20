import React, { Fragment } from 'react';
import './App.css';
import 'react-quill/dist/quill.snow.css';
import { Header, Footer, DealPage, TrangChu, ActivationAccount, ResetPassword, ForgetPassword, TimKiem, Customer, BanHang_DangKy, ErrorPhanQuyen, ShopPage, CategorySanPham, SanPhamDetail, BaiViet, CheckoutCart, CheckoutShipping, CheckoutPayment, BanHang, ResultSuccessPage } from '../allJS';
import MainAdmin from '../Admin/MainAdmin';
import { Switch, Route, Redirect } from "react-router-dom";
import { useSelector } from 'react-redux';

function App() {
  const showHeader = useSelector(state => state.showHeader);
  return (
    <Fragment>
      {
        showHeader === true && (
          <Header></Header>
        )
      }
      <Switch>
        <Route exact path="/" component={TrangChu}></Route>
        <Route path="/banhang" component={BanHang}></Route>
        <Route path="/customer" component={Customer}></Route>
        <Route path="/error/403" component={ErrorPhanQuyen}></Route>
        <Route path="/dang-ky-gian-hang" component={BanHang_DangKy}></Route>
        <Route path="/shop/:id/:slug" component={ShopPage}></Route>
        <Route path="/deal" component={DealPage}></Route>
        <Route path="/checkout/payment/success/:id" component={ResultSuccessPage}></Route>
        <Route path="/category/:id/:slug" component={CategorySanPham}></Route>
        <Route path="/admin" component={MainAdmin}></Route>
        <Route path="/detail/:id/:slug" component={SanPhamDetail}></Route>
        <Route path="/baiviet/:id/:slug" component={BaiViet}></Route>
        <Route path="/checkout/cart" component={CheckoutCart}></Route>
        <Route path="/checkout/shipping" component={CheckoutShipping}></Route>
        <Route path="/checkout/payment" component={CheckoutPayment}></Route>
        <Route path="/timkiem" component={TimKiem}></Route>
        <Route path="/users/activate/:token" component={ActivationAccount}></Route>
        <Route path="/users/password/forget" component={ForgetPassword}></Route>
        <Route path="/users/password/reset/:token" component={ResetPassword}></Route>
        <Route component={TrangChu}></Route>
      </Switch>
      <Footer></Footer>
    </Fragment>
  );
}

export default App;

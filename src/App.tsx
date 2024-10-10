import React, { useEffect } from "react";
import "./App.css";
import "./styles/sb-admin-2.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/Account/Login";
import Admin from "./components/Admin/Admin";
import { PrivateRoute } from "./common/components/PrivateRoute";
import { AccountRoute } from "./common/components/AccountRoute";
import { useDispatch } from "react-redux";
import { LOGIN_SUCCESS } from "./store/actions/account.actions";
import BlogsList from "./components/MainBlog/BlogsList";
import BlogDetails from "./components/MainBlog/BlogDetails";
import BlogCategories from "./components/MainBlog/BlogCategories";
import BlogsListByCategoryId from "./components/MainBlog/BlogsListByCategoryId";
import ContactForm from "./components/ContactForm";

const App: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const storedDataString = localStorage.getItem("loginUserData");
    let storedData: any;
    if (storedDataString) {
      storedData = JSON.parse(storedDataString);
      console.log(storedData);
    }
    dispatch({
      type: LOGIN_SUCCESS,
      payload: {
        token: localStorage.getItem("authToken"),
        data: storedData,
        email: localStorage.getItem("loginEmail"),
        fullName: localStorage.getItem("logiFullName"),
      },
    });
  }, []);

  return (
    <div className="App" id="wrapper">
      <Router>
        <Switch>
          {/* Public Routes */}
          <Route path="/blogs" exact component={BlogsList} />
          <Route path="/blog/:id" exact component={BlogDetails} />
          <Route path="/blog-by-category/:id" exact component={BlogsListByCategoryId} />
          <Route path="/categories" exact component={BlogCategories} />
          <Route path="/contact-us" exact component={ContactForm} />

          {/* Authentication Protected Routes */}
          <AccountRoute path="/login">
            <Login />
          </AccountRoute>
          <PrivateRoute path="/admin">
            <Admin />
          </PrivateRoute>

          {/* Default route should be admin after login */}
          <PrivateRoute path="/">
            <Admin />
          </PrivateRoute>
        </Switch>
      </Router>
    </div>
  );
};

export default App;

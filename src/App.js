import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import Menu from "./components/menu/menu";
import "./App.css";
import Home from "./pages/home/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import UserList from "./pages/userList/UserList";
import Us from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import Mail from "./pages/mail/Mail";

import ReactNotification from "react-notifications-component";
import { store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import "animate.css";

const User = Us.User;

function App() {
  return (
    <Router>
      <div className="grid-container">
        <div className="grid-item">
          {/* <ReactNotification /> */}

          <Topbar />
          {/* <Menu /> */}
        </div>
        {/* <div className="grid-item"></div> */}
        <div className="grid-item">
          <ReactNotification />
          <Sidebar />
        </div>
        <div className="grid-item">
          {/* <ReactNotification /> */}
          <Switch>
            <Route exact path="/main">
              <Home />
            </Route>
            <Route exact path="/user/NewUser">
              <NewUser />
            </Route>
            <Route path="/analytics">
              <Home />
            </Route>
            <Route path="/users">
              <UserList />
            </Route>
            <Route path="/user/:userId">
              <User />
            </Route>
            <Route path="/user/create">
              <ProductList />
            </Route>
            <Route path="/newUser">
              <NewUser />
            </Route>
            <Route path="/products">
              <ProductList />
            </Route>
            <Route path="/product/:productId">
              <Product />
            </Route>
            <Route path="/newproduct">
              <NewProduct />
            </Route>
            <Route path="/mail">
              <Mail />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;

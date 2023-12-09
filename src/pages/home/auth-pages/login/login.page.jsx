import React from "react";
import Login from "../../../../components/auth-components/login/login.component";
import "./login.style.css";

class LoginPage extends React.Component {
  render() {
    return (
      <div className="container">
        <Login />
      </div>
    );
  }
}
export default LoginPage;

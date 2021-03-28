import React from "react";
import logoFull from "../../Logo/rendered-full.png";
import { Segment, Button, Header } from "semantic-ui-react";

import "./auth.css";

const config = require("../../config")

export default class Auth extends React.Component {
  render() {
    return (
      <div id="login">
        <img className="unselectable" id="main_logo" src={logoFull} alt="rendered-full.png" />
        <Header id="quote">
            Send your friends &nbsp;<div className="blue" >anytime</div>, &nbsp;<div className="blue">anywhere</div>.
        </Header>
        <Segment id="auth_container">
          <p> Select authentification method. </p>
          <Button id="google_button" compact basic onClick={(e)=>{
            e.preventDefault();
            window.location.href=`${config.server}:${config.port}/auth/google`
          }}>
            <img
              className="unselectable"
              id="google_logo"
              src="https://developers.google.com/identity/images/g-logo.png"
              alt="google"
            />
            SIGN IN WITH GOOGLE
          </Button>
        </Segment>
      </div>
    );
  }
}

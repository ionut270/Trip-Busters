import React from "react";
import logoIcon from "../../Logo/icon.png";
import { Segment } from "semantic-ui-react";

import "./footer.css";


export default class Footer extends React.Component {
  render() {
    return (
      <Segment id="footer">
        <img className="unselectable" id="footer_logo" src={logoIcon} alt="logo icon" />
        Trip Busters 2021, All rights reserved, licensed under GNU GENERAL PUBLIC LICENSE
      </Segment>
    );
  }
}

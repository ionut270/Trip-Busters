import React from "react";
import { Menu, Dropdown, Icon } from "semantic-ui-react";

import "./header.css";
import fullLogo from "../../Logo/rendered-full.png";

const config = require("../../config");

const options = [
  { key: "profile",   text: "Your Profile", href: `${config.server}/profile` },
  { key: "sign-out",  text: "Sign Out",     href: `${config.server}/logout` },
];
const trigger = (
  <span><Icon name="user" /></span>
);

export default class Header extends React.Component {
  state = {};

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });
  showMobile = (e) => {
    var menu_items = document.getElementsByClassName("menu_item");
    for (var i = 0; i < menu_items.length; i++)
      menu_items[i].classList.contains("header_hidden")
        ? menu_items[i].classList.remove("header_hidden")
        : menu_items[i].classList.add("header_hidden");
  };
  render() {
    const { activeItem } = this.state;

    return (
      <Menu id="header" stackable>
        <Menu.Item id="header_logo" onClick={this.showMobile}>
          <img id="logo" src={fullLogo} alt="logo" />
        </Menu.Item>
        <Menu.Item
          name="Map"
          className="menu_item header_hidden"
          active={activeItem === "Map"}
          href={`${config.server}/map`}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          name="Calendar"
          className="menu_item header_hidden"
          active={activeItem === "Calendar"}
          href={`${config.server}/calendar`}
          onClick={this.handleItemClick}
        />
        <Menu.Item className="menu_item header_hidden" position="right">
          <Dropdown trigger={trigger} options={options} simple direction='right'/>
        </Menu.Item>
      </Menu>
    );
  }
}

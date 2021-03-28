import React from "react";
import { Menu, Dropdown, Icon } from "semantic-ui-react";

import "./header.css";
import fullLogo from "../../Logo/rendered-full.png";

const config=require('../../config')

const options = [
  {
    key: "user",
    text: (
      <span>
        Signed in as <strong>{localStorage.family_name}</strong>
      </span>
    ),
    disabled: true,
  },
  { key: "profile", text: "Your Profile" },
  { key: "stars", text: "Your Stars" },
  { key: "explore", text: "Explore" },
  { key: "integrations", text: "Integrations" },
  { key: "help", text: "Help" },
  { key: "settings", text: "Settings" },
  { key: "sign-out", text: "Sign Out", href:`${config.server}/logout` },
];
const trigger = (
  <span>
    <Icon name="user" /> Hello, {localStorage.family_name}
  </span>
);

export default class Header extends React.Component {
  state = {};

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

    return (
      <Menu stackable id="header">
        <Menu.Item>
          <img id="logo" src={fullLogo} alt="logo" />
        </Menu.Item>
        <Menu.Item
          name="feed"
          active={activeItem === "feed"}
          onClick={this.handleItemClick}
        >
          Feed
        </Menu.Item>

        <Menu.Item
          name="reviews"
          active={activeItem === "reviews"}
          onClick={this.handleItemClick}
        >
          Reviews
        </Menu.Item>

        <Menu.Item
          name="upcomingEvents"
          active={activeItem === "upcomingEvents"}
          onClick={this.handleItemClick}
        >
          Upcoming Events
        </Menu.Item>

        <Menu.Item>
          <Dropdown trigger={trigger} options={options} />
        </Menu.Item>
      </Menu>
    );
  }
}

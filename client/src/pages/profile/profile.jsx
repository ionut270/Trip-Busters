import React from "react";
import { Card, Icon, Image, Loader, Dimmer } from "semantic-ui-react";
import "./profile.css";

const config = require("../../config");

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    fetch(`${config.server}/profile/data`)
      .then((res) => res.json())
      .then((res) => {
        localStorage.family_name = res.family_name;
        localStorage.given_name = res.given_name;
        localStorage.picture = res.picture;
        this.setState({ user: res });
      })
      .catch((err) => console.error(err));
  }

  render() {
    return (
      <div id="profile">
        <Card>
          {!this.state.user ? (
            <Dimmer active>
              <Loader />
            </Dimmer>
          ) : null}

          <Image
            src={this.state.user ? this.state.user.picture : null}
            wrapped
            ui={false}
          />
          <Card.Content>
            <Card.Header>
              {this.state.user ? this.state.user.family_name : null}{" "}
              {this.state.user ? this.state.user.given_name : null}
            </Card.Header>
            <Card.Meta>
              <span className="date">
                Locale : {this.state.user ? this.state.user.locale : null}
              </span>
            </Card.Meta>
          </Card.Content>
          <Card.Content extra>
            <a>
              <Icon name="mail" />
              {this.state.user ? this.state.user.email : null}
            </a>
          </Card.Content>
        </Card>
      </div>
    );
  }
}

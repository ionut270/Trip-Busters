import React from "react";
import "./calendar.css";
import { Checkbox, Card } from "semantic-ui-react";

const config = require("../../config");

export default class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      calendars: [],
      activities: [],
      activeCalendar: "",
    };
    this.changeActiveCalendar = this.changeActiveCalendar.bind(this);
  }
  componentDidMount() {
    fetch(`${config.server}/calendar/get`)
      .then((res) => res.json())
      .then((res) => {
        this.setState({ calendars: res.items });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  getEvents(id){
    fetch(`${config.server}/calendar/get/${id}/self`)
    .then((res) => res.json())
    .then((res) => {
      this.setState({ activities: res.items });
    })
    .catch((err) => console.error(err));
  }

  changeActiveCalendar(id) {
    this.setState({ activeCalendar: id });
    this.getEvents(id);
  }

  render() {
    return (
      <div id="calendar_container">
        <table>
          <thead>
            <tr>
              {" "}
              <th>Select active calendar</th>{" "}
            </tr>
          </thead>
          <tbody>
            {this.state.calendars.map((calendar, key) => (
              <tr key={key}>
                <td>{calendar.summary}</td>
                <td id="checkbox_cell">
                  <Checkbox
                    id={calendar.id}
                    toggle
                    checked={this.state.activeCalendar === calendar.id}
                    onChange={(e) => {
                      this.changeActiveCalendar(calendar.id);
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div id="activities_container">
          {this.state.activities.map((activity, key) => (
            <Card key={key} className="activity_card" href={activity.htmlLink}>
              <Card.Content>
                <Card.Header>{activity.summary ? activity.summary : "Unamed"}</Card.Header>
                <Card.Meta>
                  <span className="date">Start {activity.start.dateTime}</span>
                </Card.Meta>
                <Card.Meta>
                  <span className="date">End {activity.end.dateTime}</span>
                </Card.Meta>
              </Card.Content>
              <Card.Content extra>{activity.status}</Card.Content>
            </Card>
          ))}
        </div>
      </div>
    );
  }
}

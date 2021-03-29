import React from "react";
import "./calendar.css";
import { Checkbox } from "semantic-ui-react";

const config = require("../../config");

export default class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      calendars: [],
      activeCalendar : ''
    };
    this.changeActiveCalendar = this.changeActiveCalendar.bind(this)
  }
  componentDidMount(){
    fetch(`${config.server}/calendar`).then((res) => res.json()).then((res) => {this.setState({ calendars: res.items })}).catch((err) => {console.error(err);});
  }

  changeActiveCalendar(id){
      console.log(id);
    this.setState({activeCalendar : id})
  }

  render() {
    return (
      <div id="calendar_container">
        <table>
          <thead><tr> <th>Calendar</th> </tr></thead>
          <tbody>
            {this.state.calendars.map((calendar,key) => (
              <tr key={key}>
                <td>{calendar.summary}</td>
                <td id="checkbox_cell"><Checkbox id={calendar.id} toggle checked={this.state.activeCalendar === calendar.id} onChange={
                    (e)=>{
                        this.changeActiveCalendar(calendar.id)}
                    } /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

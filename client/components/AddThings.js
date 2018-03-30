import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Input, Button, message } from 'antd';
import axios from 'axios';
const { TextArea } = Input;

class AddThings extends Component {
  constructor() {
    super()

    this.state = {
      things: ['', '', '']
    }

    this.changeHandler = this.changeHandler.bind(this)
  }

  changeHandler(event, i) {
    let things = [...this.state.things];
    things[i] = event.target.value;
    console.log(things[i])
    this.setState({ things });
  }

  saveHandler(event, i) {
    let thing = this.state.things[i];
    if (thing.length < 1) {
      message.error('Type out a thing to save')
      return
    }
    if (thing.length > 150) {
      message.error('That thing is a little too long')
      return
    }
    axios.save()
  }

  render() {
    return (
      <div className="three-thing-input">

        <div className="thing-container">
          <div className="input-wrapper">
            <h2 className="thing-num">1</h2>
            <TextArea className="thing-input" rows={2} value={this.state.things[0]} onChange={(ev) => this.changeHandler(ev, 0)} />
          </div>
          <div className="input-button-wrapper" >
            <Button type="primary">Save</Button>
          </div>
        </div>
        <div className="thing-container">
          <div className="input-wrapper">
            <h2 className="thing-num">2</h2>
            <TextArea className="thing-input" rows={2} value={this.state.things[1]} onChange={(ev) => this.changeHandler(ev, 1)} />
          </div>
          <div className="input-button-wrapper" >
            <Button type="primary">Save</Button>
          </div>
        </div>
        <div className="thing-container">
          <div className="input-wrapper">
            <h2 className="thing-num">3</h2>
            <TextArea className="thing-input" rows={2} value={this.state.things[2]} onChange={(ev) => this.changeHandler(ev, 2)} />
          </div>
          <div className="input-button-wrapper" >
            <Button type="primary">Save</Button>
          </div>
        </div>
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapState)(AddThings);

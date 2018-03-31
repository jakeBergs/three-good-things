import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Input, Button, message } from 'antd';
import axios from 'axios';
const { TextArea } = Input;

class AddThings extends Component {
  constructor() {
    super()

    this.state = {
      things: ['', '', ''],
      saved: 0
    }

    this.changeHandler = this.changeHandler.bind(this);
    this.saveHandler = this.saveHandler.bind(this);
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
    } else if (thing.length > 150) {
      message.error('That thing is a little too long')
    }
    console.log('saved', this.state.saved)
    this.setState({saved: this.state.saved + 1})
  }

  render() {
    return (
      <div className="three-thing-input">

        <div className={`thing-container ${this.state.saved === 0 ? 'active' : ''} ${this.state.saved > 0 ? 'saved' : ''}`}>
          <div className="input-wrapper">
            <h2 className="thing-num">1</h2>
            <TextArea className="thing-input" rows={2} value={this.state.things[0]} onChange={(ev) => this.changeHandler(ev, 0)} disabled={this.state.saved > 0} />
          </div>
          <div className="input-button-wrapper" >
            <Button onClick={ev => this.saveHandler(ev, 0)} type="primary">Save</Button>
          </div>
        </div>
        <div className={`thing-container ${this.state.saved === 1 ? 'active' : ''} ${this.state.saved > 1 ? 'saved' : ''}`}>
          <div className="input-wrapper">
            <h2 className="thing-num">2</h2>
            <TextArea className="thing-input" rows={2} value={this.state.things[1]} onChange={(ev) => this.changeHandler(ev, 1)} disabled={this.state.saved > 1} />
          </div>
          <div className="input-button-wrapper" >
            <Button type="primary" onClick={ev => this.saveHandler(ev, 1)}>Save</Button>
          </div>
        </div>
        <div className={`thing-container ${this.state.saved === 2 ? 'active' : ''} ${this.state.saved > 2 ? 'saved' : ''}`}>
          <div className="input-wrapper">
            <h2 className="thing-num">3</h2>
            <TextArea className="thing-input" rows={2} value={this.state.things[2]} onChange={(ev) => this.changeHandler(ev, 2)} disabled={this.state.saved > 2} />
          </div>
          <div className="input-button-wrapper" >
            <Button type="primary" onClick={ev => this.saveHandler(ev, 2)}>Save</Button>
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
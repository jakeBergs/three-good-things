import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Input} from 'antd';
const {TextArea} = Input;

import {fetchThing, updateThing} from '../store/currThing';

class MoreInfo extends Component {
  constructor() {
    super()

    this.submitDescription = this.submitDescription.bind(this)
  }

  componentDidMount() {
    this.props.getThing()
  }

  submitDescription(event) {
    event.preventDefault();
    this.props.saveDescription(event.target.description.value);
    this.props.history.push('/addThings')
  }

  render() {
    console.log(this.props)
    return (
      <div>
        <h2>{this.props.thing === undefined ?
      'loading' : this.props.thing.content}</h2>
        <form onSubmit={this.submitDescription} >
          <TextArea name="description" />
          <input type="submit" value="click dis" />
        </form>
      </div>
    )
  }
}

const mapState = (state) => ({
  thing: state.currThing
})

const mapDispatch = (dispatch, origProps) => ({
  getThing() {
    dispatch(fetchThing(origProps.match.params.id))
  },
  saveDescription(description) {
    dispatch(updateThing(origProps.match.params.id, description))
  }
})

export default connect(mapState, mapDispatch)(MoreInfo)


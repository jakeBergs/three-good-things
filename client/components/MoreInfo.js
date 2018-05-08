import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Input} from 'antd';
const {TextArea} = Input;

import {fetchThing, updateThing} from '../store/currThing';

class MoreInfo extends Component {
  constructor() {
    super()
  }

  componentDidMount() {
    this.props.getThing()
  }

  render() {
    return (
      <div>
        <h2>The saved thing</h2>
        <form>
          <TextArea />
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


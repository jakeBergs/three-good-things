import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import axios from 'axios'

/**
 * COMPONENT
 */
export class UserHome extends Component {
  constructor() {
    super()

    this.state = {
      thing: {
        content: '...',
        date: null
      }
    }

    this.handleGetThing = this.handleGetThing.bind(this)
  }

  handleGetThing(event) {
    event.preventDefault();
    const { userId } = this.props;

    axios.get(`/api/users/${userId}/thing/random`)
      .then(res => res.data)
      .then(thing => {
        this.setState({thing})
      })
  }

render() {
  const { email, saved} = this.props;
  const {content, date} = this.state.thing;
  console.log(content, typeof date);
  return (
    <div className="home-content flex">
      <div className="welcome flex">
        <h2>Welcome, {email}</h2>
        <h3>April 1, 2018</h3>
      </div>
      <div className="home-things flex">
        <div className="saved-info" >
          <h3>You have saved {saved} memories today</h3>
          {
            saved < 3 ? <Link to="/addThings" className="add-more" >Add More</Link> : <h4>Stay Positive</h4>
          }

        </div>
        <div id="good-thing-display">
          <p className="thing-received">{content}</p>
          <p>{date ? `${date.substring(5, 7)}/${date.substring(8, 10)}/${date.substring(0, 4)}` : ''}</p>
          <button onClick={this.handleGetThing}>Get Something Positive</button>
        </div>
      </div>
    </div>
  )
}

}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    email: state.user.email,
    userId: state.user.id,
    saved: state.saved
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string,
}

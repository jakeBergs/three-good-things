import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

/**
 * COMPONENT
 */
export const UserHome = (props) => {
  const { email } = props

  console.log(Date())
  const now = Date();
  return (
    <div>
      <div>
        <h2>Welcome, {email}</h2>
        <h3>April 1, 2018</h3>
      </div>
      <div>
        <div>
          <h3>You have saved 0 memories today</h3>
          <Link to="/addThings" >add more</Link>
        </div>
        <div>
          <p>...</p>
          <button>get something positive</button>
        </div>
      </div>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    email: state.user.email
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}

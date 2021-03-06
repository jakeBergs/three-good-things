import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../store'
import { loadThings } from '../store/things'

class Navbar extends Component{
  constructor() {
    super()

  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isLoggedIn){
      console.log('sup')
      nextProps.loadTodaysThings(nextProps.userId)
    }
  }

  render() {
    let {handleClick, isLoggedIn} = this.props
    return (
      <div className = "flex custom-nav" >
        <h1 id="title">Three Good Things</h1>
        <nav>
          {isLoggedIn ? (
            <div>
              {/* The navbar will show these links after you log in */}
              <Link to="/home">Home</Link>
              <a href="#" onClick={handleClick}>
                Logout
            </a>
              <Link to="/addThings">Add Things</Link>
            </div>
          ) : (
              <div>
                {/* The navbar will show these links before you log in */}
                <Link to="/login">Login</Link>
                <Link to="/signup">Sign Up</Link>
              </div>
            )}
        </nav>
    </div>
    )
  }

}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    userId: state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    },
    loadTodaysThings(id) {
      dispatch(loadThings(id))
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}

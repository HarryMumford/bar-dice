import React, { Component } from 'react'
import { NavLink } from 'reactstrap'
import { connect } from 'react-redux'
import { logout } from '../../flux/actions/auth-actions'
import PropTypes from 'prop-types'

// eslint-disable-next-line react/prefer-stateless-function
class Logout extends Component {
  static propTypes = {
    logout: PropTypes.func.isRequired,
  }

  render() {
    return (
      <>
        <NavLink onClick={this.props.logout} href="#">
          Logout
        </NavLink>
      </>
    )
  }
}

export default connect(null, { logout })(Logout)

import React from 'react'
import { connect } from 'react-redux'

class Header extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <header>
        Header
      </header>
    )
  }
}

export default connect()(Header)
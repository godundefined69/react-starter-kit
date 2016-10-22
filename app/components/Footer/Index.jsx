import React from 'react'
import { connect } from 'react-redux'

class Footer extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <footer>
        Footer
      </footer>
    )
  }
}

export default connect()(Footer)
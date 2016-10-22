import React from 'react'
import Helmet from 'react-helmet'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import Header from 'components/Header/Index.jsx'
import Footer from 'components/Footer/Index.jsx'

class App extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <Helmet title='React starter kit by godundefined69' />

        <Header />
          {this.props.children}
        <Footer />
      </div>
    )
  }
}

export default connect()(App)
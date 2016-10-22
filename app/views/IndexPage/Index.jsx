import React from 'react'
import Helmet from 'react-helmet'
import { connect } from 'react-redux'
import { api } from 'constants/api.jsx'

class IndexPage extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    console.log(api('users.get'))
    document.getElementById('index').style.display = 'none'
  }

  render() {
    return (
      <div>
        <Helmet
          title='React starter kit - index page'
          meta={[{name: 'description', content: 'Index page'}]}
        />

        <h1 id="index">Index page</h1>
      </div>
    )
  }
}

export default IndexPage
import React from 'react'

import Header from 'components/Header/Index.jsx'
import Footer from 'components/Footer/Index.jsx'

class PageNotFound extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <Header />

        <h1>Page not found</h1>
      </div>
    )
  }
}

export default PageNotFound

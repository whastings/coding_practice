import React from 'react'
import { Link } from 'react-router-dom'

const HomePage = () => {
  return (
    <ul>
      <li>
        <Link to={'/repos/foo'}>Foo</Link>
      </li>
      <li>
        <Link to={'/repos/bar'}>Bar</Link>
      </li>
      <li>
        <Link to={'/repos/baz'}>Baz</Link>
      </li>
    </ul>
  )
}

export default HomePage

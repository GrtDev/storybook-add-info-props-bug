import React, { SFC } from 'react'
import ReactDOM from 'react-dom'
import { Card } from './components/Card'

const App = () => (
  <div>
    <Card>Hello World</Card>
  </div>
)

const render = async (Component: SFC) => {
  ReactDOM.hydrate(<App />, document.getElementById('root'))
}

render(App)

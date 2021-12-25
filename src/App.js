import React from 'react'

export default class App extends React.Component {
  static propTypes = {
    age: Number,
    grow: Function
  }
  constructor (props) {
    super(props)
    this.grow = this.grow.bind(this)
  }

  render () {
    return <div>
      <h1>User Age Is {this.props.age}</h1>
      <button onClick={this.props.grow}>GROW</button>
    </div>
  }
}

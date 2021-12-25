import React from 'react'

export default class App extends React.Component {
  static propTypes = {
    age: Number,
    grow: Function
  }

  render () {
    return <div>
      <h1>User Age Is {this.props.age}</h1>
      <button onClick={this.props.grow}>GROW</button>
    </div>
  }
}

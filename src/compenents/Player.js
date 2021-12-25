import React from 'react'
const { floor } = Math
const progressTimeFormat = sec => {
  new Date().getSeconds
  const minutes = floor(sec / 60)
  const seconds = sec % 60
  return minutes === 0 ? `${seconds}''` : `${minutes}'${seconds}''`
}
export default class Screen extends React.Component {
  constructor (props) {
    super(props)
    this.playTimeId = null
    this.audio = null
    this.state = {
      currentTime: 0,
      duration: 0
    }
    this.play = this.play.bind(this)
    this.pause = this.pause.bind(this)
  }

  render () {
    return <div id='player'>
      <div>{
        progressTimeFormat(this.state.currentTime)
      }/{
        progressTimeFormat(this.state.duration)
      }</div>
      <button onClick={this.play}>play</button>
      <button onClick={this.pause}>pause</button>
    </div>
  }

  play () {
    this.playTimeId = setInterval(() => {
      this.updateProgress()
    }, 1000)
    this.audio.play()
  }

  pause () {
    clearInterval(this.playTimeId)
    this.audio.pause()
  }

  replay () {

  }

  updateProgress () {
    this.setState({
      currentTime: Math.floor(this.audio.currentTime),
      duration: Math.floor(this.audio.duration)
    })
  }

  componentDidMount () {
    this.audio = new Audio('/mojito.mp3')
    const player = document.getElementById('player')
    player.appendChild(this.audio)
  }
}

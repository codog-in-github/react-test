import React from 'react'
import Lyric from './Lyric'
import Progress from './Progress'

const { floor } = Math

const progressTimeFormat = sec => {
  let minutes = floor(sec / 60).toString()
  let seconds = (sec % 60).toString()
  if (minutes.length === 1) {
    minutes = '0' + minutes
  }
  if (seconds.length === 1) {
    seconds = '0' + seconds
  }
  return minutes === 0 ? `${seconds}"` : `${minutes}'${seconds}"`
}

export default class Screen extends React.Component {
  constructor (props) {
    super(props)
    this.playTimeId = null
    this.audio = null
    this.state = {
      currentTime: 0,
      duration: 0,
      isPlay: false
    }
    this.play = this.play.bind(this)
    this.pause = this.pause.bind(this)
    this.onCurrentTimeChange = this.onCurrentTimeChange.bind(this)
  }

  onCurrentTimeChange (currentTime) {
    this.audio.currentTime = currentTime
    this.setState({ currentTime })
  }

  render () {
    return <div id='player' className='player'>
      <Lyric
        currentTime={this.state.currentTime}
        onCurrentTimeChange={this.onCurrentTimeChange}
      />
      <Progress
        onCurrentTimeChange={this.onCurrentTimeChange}
        complete={this.state.currentTime}
        total={this.state.duration}
        label={progressTimeFormat(this.state.currentTime) + '/' + progressTimeFormat(this.state.duration)}
      />
      {
        this.state.isPlay ? <div className='play-btn' onClick={this.pause}>pause</div>
          : <div className='play-btn' onClick={this.play}>play</div>
      }

    </div>
  }

  play () {
    this.updateProgress()
    this.setMusicProgressUpdater()
    this.audio.play()
    this.setState({ isPlay: true })
  }

  pause () {
    this.removeMusicProgressUpdater()
    this.audio.pause()
    this.setState({ isPlay: false })
  }

  replay () {

  }

  setMusicProgressUpdater () {
    this.playTimeId = setInterval(() => {
      this.updateProgress()
    }, 1000)
  }

  removeMusicProgressUpdater () {
    clearInterval(this.playTimeId)
  }

  updateProgress () {
    const currentTime = floor(this.audio.currentTime)
    const duration = floor(this.audio.duration)
    this.setState({
      currentTime,
      duration
    })
    if (currentTime === duration) {
      this.setState({ isPlay: false })
    }
  }

  componentDidMount () {
    this.audio = new Audio('/mojito.mp3')
    const player = document.getElementById('player')
    player.appendChild(this.audio)
  }

  componentWillUnmount () {
    this.removeMusicProgressUpdater()
  }
}

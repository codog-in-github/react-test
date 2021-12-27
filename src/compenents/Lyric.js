import React from 'react'
import PropTypes from 'prop-types'
import lyric from '../assset/lyric.json'

const SHOW_LYRIC_MAX_LINE = 5
const LYRIC_LINE_HEIGHT = 20
const LYRIC_FONT_SIZE = 14

const getTimeMap = lyric => {
  const timeMap = {}
  const minutesToSeconds = minutes => {
    const time = minutes.split(':')
    return time[0] * 60 + Number(time[1])
  }
  let i = 0
  for (const minutes in lyric) {
    timeMap[i++] = minutesToSeconds(minutes)
  }
  return timeMap
}

const timeMap = getTimeMap(lyric)
const lyricText = Object.values(lyric)

export default class Lyric extends React.Component {
  static propTypes = {
    currentTime: PropTypes.number
  }

  findCurrentLyricRow () {
    let currentKey = 0
    for (let i = 0; i < lyricText.length; i++) {
      if (timeMap[i] <= this.props.currentTime) {
        currentKey = i
      } else {
        break
      }
    }
    return currentKey
  }

  render () {
    const currentRow = this.findCurrentLyricRow(this.props.currentTime)
    console.log('currentRow ', currentRow)
    return <div className='lyric' style={{
      height: SHOW_LYRIC_MAX_LINE * LYRIC_LINE_HEIGHT + 'px',
      fontSize: LYRIC_FONT_SIZE + 'px'
    }}>
      <div className='rolling-box' style={{
        top: -currentRow * LYRIC_LINE_HEIGHT + 'px',
        lineHeight: LYRIC_LINE_HEIGHT + 'px'
      }}>
        {lyricText.map((row, i) => <div key={i}>{row}</div>)}
      </div>
    </div>
  }
}

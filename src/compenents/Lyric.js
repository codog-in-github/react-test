import React from 'react'
import PropTypes from 'prop-types'
import lyric from '../assset/lyric.json'

const SHOW_LYRIC_MAX_LINE = 5
const LYRIC_LINE_HEIGHT = 20
const LYRIC_FONT_SIZE = 14
const LYRIC_MARGIN = 10
const FOCUS_LINE_INDEX = 3
const FOCUS_LINE_HEIGHT = 25
const FOCUS_FONT_SIZE = 25
const FOCUS_EXTRA_STYLE = {
  color: '#ff6090'
}

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

  draw () {

  }

  render () {
    const currentRow = this.findCurrentLyricRow(this.props.currentTime)

    return <div className='lyric' style={{
      height: (SHOW_LYRIC_MAX_LINE - 1) * (LYRIC_LINE_HEIGHT + LYRIC_MARGIN * 2) + FOCUS_LINE_HEIGHT + 'px',
      fontSize: LYRIC_FONT_SIZE + 'px'
    }}>
      <div className='rolling-box' style={{
        top: -(currentRow - FOCUS_LINE_INDEX) * (LYRIC_LINE_HEIGHT + LYRIC_MARGIN) + 'px',
        lineHeight: LYRIC_LINE_HEIGHT + 'px'
      }}>
        {lyricText.map((row, i) =>
          <div key={i} className='row' style={i === currentRow ? {
            margin: LYRIC_MARGIN + 'px 0',
            lineHeight: FOCUS_LINE_HEIGHT + 'px',
            height: FOCUS_LINE_HEIGHT + 'px',
            fontSize: FOCUS_FONT_SIZE + 'px',
            ...FOCUS_EXTRA_STYLE
          } : {
            margin: LYRIC_MARGIN + 'px 0',
            height: LYRIC_LINE_HEIGHT + 'px'
          }}>{row || ' '}</div>
        )}
      </div>
    </div>
  }
}

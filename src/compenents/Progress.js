import React from 'react'
import PropTypes from 'prop-types'

export default class Progress extends React.Component {
  static propTypes = {
    label: PropTypes.string,
    total: PropTypes.number,
    complete: PropTypes.number,
    onCurrentTimeChange: PropTypes.func
  }

  constructor (props) {
    super(props)
    this.progressClick = this.progressClick.bind(this)
  }

  progressClick (e) {
    this.props.onCurrentTimeChange(
      Math.floor(e.nativeEvent.offsetX / this.bar.offsetWidth * this.props.total)
    )
  }

  componentDidMount () {
    this.bar = document.getElementById('bar')
  }

  render () {
    const rate = this.props.total && this.props.complete / this.props.total * 100 + '%'

    return <div className='progress'>
      <div className='bar' id='bar' onClick={this.progressClick}>
        <div className='complete' style={{ width: rate }}></div>
        {/* <div className='control' style={{ left: rate }} onClick={e => e.nativeEvent.preventDefault()}></div> */}
      </div>
      <div className='label'>
        {this.props.label}
      </div>
    </div>
  }
}

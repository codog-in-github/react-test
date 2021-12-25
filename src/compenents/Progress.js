import React from 'react'
import PropTypes from 'prop-types'

export default class Progress extends React.Component {
  static propTypes = {
    label: PropTypes.string,
    total: PropTypes.number,
    complete: PropTypes.number
  }

  render () {
    const rate = this.props.total && this.props.complete / this.props.total * 100 + '%'

    return <div className='progress'>
      <div className='bar'>
        <div className='complete' style={{ width: rate }}></div>
        <div className='control' style={{ left: rate }}></div>
      </div>
      <div className='label'>
        {this.props.label}
      </div>
    </div>
  }
}

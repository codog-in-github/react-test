import { configureStore } from '@reduxjs/toolkit'
import { connect } from 'react-redux'

export const store = configureStore({
  reducer (state = { userAge: 1 }, action) {
    switch (action.type) {
      case 'userGrow':
        return {
          ...state,
          userAge: state.userAge + 1
        }
      default:
        return state
    }
  }
})

const connectConfig = {
  mapStateToProps (state) {
    return { age: state.userAge }
  },
  mapDispatchToProps (dispatch) {
    return {
      grow () {
        dispatch({ type: 'userGrow' })
      }
    }
  }
}

export const storeConnectComponent = component => connect(connectConfig)(component)

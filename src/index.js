import reactDom from 'react-dom'
import { Provider } from 'react-redux'
import App from './App'
import { storeConnectComponent, store } from './store'
const StoreApp = storeConnectComponent(App)

reactDom.render(
  <Provider store={store}>
    <StoreApp />
  </Provider>,
  document.getElementById('root')
)

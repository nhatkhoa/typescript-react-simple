import 'normalize.css'
import 'purecss'
import './styles/main.scss'

import * as React from 'react'
import { Provider } from 'mobx-react'
import CommonView from './components/CommonView'
import { IStores } from './stores'

export interface IAppProps {
  stores: IStores
}

class App extends React.Component<IAppProps, {}> {
  render() {
    const { stores } = this.props
    
    return (
      <Provider {...stores}>
        <CommonView /> 
      </Provider>
    )
  }
}

export default App
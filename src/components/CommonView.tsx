import * as React from 'react'
import { observer } from 'mobx-react'

@observer
class CommonView extends React.Component<{}, {}> {
  render() {
    return (
      <div>
        Tasks left:
      </div>
    )
  }
}

export default CommonView
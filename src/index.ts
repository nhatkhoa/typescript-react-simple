import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { useStrict } from 'mobx'

useStrict(false)

function createDOM(className: string) {
  const wrapper = document.createElement('div')
  wrapper.setAttribute('class', className)
  document.body.appendChild(wrapper)
  return wrapper
}
const wrapper = createDOM('kaira-box')

function onRenderError(error: Error): void {
  const RedBox = require('redbox-react').default
  ReactDOM.render(<RedBox error={error} /> , wrapper)
}

/**
 * Mount the app.
 */
async function renderApp(): Promise<HTMLElement> {
  const createMobxStores = require('./stores/index.ts').default
  const stores = createMobxStores()
  const App = require('./App').default  
  ReactDOM.render(<App stores={stores} /> , wrapper)
  return wrapper
}

async function renderDevTools(): Promise<void> {
  const DevTools = require('mobx-react-devtools').default
  const devWrapper = await createDOM('dev-wrapper')
  ReactDOM.render(<DevTools />, devWrapper)
}

renderApp().catch(onRenderError)

if (module.hot) {
  module.hot.accept('./App.tsx', () => {
    console.log('Rerender')
    ReactDOM.unmountComponentAtNode(wrapper)
    renderApp().catch(onRenderError)
  })
}

if (module.hot) {
  renderDevTools().catch(onRenderError)
}

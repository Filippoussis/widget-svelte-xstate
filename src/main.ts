import './app.css'
import App from './App.svelte'

const app = new App({
  target: document.getElementById('vendor-root') as HTMLElement,
})

export default app

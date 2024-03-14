import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { AppRoute } from './.routes'

import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <AppRoute />
  // </StrictMode>,
)

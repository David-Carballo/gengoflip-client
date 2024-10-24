import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './styles/index.css'
import {BrowserRouter} from 'react-router-dom'
import { AuthWrapper } from './context/auth.context.jsx'
import { NotifyWrapper } from './context/notify.context.jsx'

createRoot(document.getElementById('root')).render(
  <AuthWrapper>
    <NotifyWrapper>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </NotifyWrapper>
  </AuthWrapper>
)

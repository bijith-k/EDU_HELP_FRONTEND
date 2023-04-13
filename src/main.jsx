import { StyledEngineProvider } from '@mui/material'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import store from './app/store'
import App from './App'
import './index.css'
// import { PersistGate } from 'redux-persist/integration/react';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    {/* <StyledEngineProvider injectFirst > */}
    {/* <PersistGate  persistor={persistor}> */}
    <App />
    {/* </StyledEngineProvider> */}
    {/* </PersistGate> */}
    </Provider>
  </React.StrictMode>,
)

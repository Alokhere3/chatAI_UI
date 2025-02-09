import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Provider } from 'react-redux'
import { persistor, store } from './store/store.jsx'
import { PersistGate } from 'redux-persist/integration/react';


createRoot(document.getElementById('root')).render(
 
   <Provider store={store}>
  <PersistGate loading={null} persistor={persistor}>
    <App />
  </PersistGate>
</Provider>

)

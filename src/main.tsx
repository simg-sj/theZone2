import React from 'react';
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {Provider} from "react-redux";
import {store} from "./redux/store";
import Loading from "./components/loading.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <Provider store={store}>
          <Loading/>
          <App />
      </Provider>,
  </React.StrictMode>,
)

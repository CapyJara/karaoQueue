import React from 'react';
import { render } from 'react-dom';
import App from './components/App';
import { SocketProvider } from './socket';
import { reducer } from './reducers/reducer';

render(
  <SocketProvider 
    reducer={reducer}
    eventNames={[
      'CURRENT_PLAYLIST'
    ]}>
      
    <App />
  </SocketProvider>,
  document.getElementById('root')
);

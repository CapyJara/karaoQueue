/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

//RYANS KILLER SOCKET CODE COPYRIGHT RYAN 5EVER
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:7891');
// const socket = io.connect('https://karaoqueue.herokuapp.com/');

const SocketContext = createContext(socket);

export const SocketProvider = ({ children, reducer, eventNames }) => {

  const [state, dispatch] = useReducer(reducer, {
    playlist: null
  });

  useEffect(() => {
    eventNames.forEach(eventName => {
      socket.on(eventName, payload => dispatch({
        type: eventName,
        payload
      }));
    });
  }, []);

  return (
    // eslint-disable-next-line no-undef
    <SocketContext.Provider value={{ socket, state }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const { socket } = useContext(SocketContext);
  return socket;
};

export const usePlayListState = () => {
  const { state } = useContext(SocketContext);
  return state;
};

export const useEmitEvent = eventName => {
  const socket = useSocket();
  return data => {
    socket.emit(eventName, data);
  };
};

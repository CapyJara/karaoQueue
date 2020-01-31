/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import usePlaylistEmitters from '../../hooks/playlistState';
import styles from './splash.css';
import shortid  from 'short-id';

const Start = ({ history }) => {
  const [newRoomName, setNewRoomName] = useState('');
  const [roomToJoin, setRoomToJoin] = useState('');

  const { createRoom, joinRoom } = usePlaylistEmitters();


  const handleChange = ({ target }) => {
    const update = {
      new: setNewRoomName(target.value),
      join: setRoomToJoin(target.value)
    };
    update[target.name];
  };

  const createARoom = e => {
    e.preventDefault();
    const id = shortid.generate();
    createRoom({ id, newRoomName });
    history.push(`/${id}`);
  };
  
  const joinARoom = e => {
    e.preventDefault();
    joinRoom(roomToJoin);
    history.push(`/${roomToJoin}`);
  };

  return (
    <div className={styles.Splash}>
      
      <header>
        <h1>KaraoQueue</h1>
      </header>

      <section>
        <form onSubmit={createARoom}>
          <h2>start a new concert</h2>
          <input type="string" name="new" onChange={handleChange} placeholder="name of new concert"/>
          <button>create</button>
        </form>

        <form onSubmit={joinARoom}>
          <h2>join an existing concert</h2>
          <p>ex: karaoqueue.netlify.com/
            <span>7d3534</span>
          </p>
          <input type="string" name="join" onChange={handleChange} placeholder="id of current concert"/>
          <button>join</button>
        </form>
      </section>

    </div>
  );
};

export default Start;

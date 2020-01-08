import React, { useState } from 'react';
import styles from './Splash.css';
import usePlaylistEmitters from '../hooks/playlistState';
import { usePlayListState } from '../../socket';

const Splash = () => {
  const [link, setLink] = useState(null);
  const { addLink } = usePlaylistEmitters();
  const { playlist } = usePlayListState();

  const handleChange = e => {
    setLink(e.target.value);
  };

  const submit = e => {
    e.preventDefault();
    addLink(link);
    setLink('');
  };

  console.log(playlist);

  return (
    <section className={styles.Splash}>
      <h1>Welcome</h1>
      <form onSubmit={submit}>
        <input type="text" onChange={handleChange} value={link || ''}/>
        <button>Enter</button>
      </form>
      <ul>
        {playlist && playlist.map(i => {
          return <li key={i} >{i}</li>;
        })}
      </ul>
    </section>
  );
};

export default Splash;

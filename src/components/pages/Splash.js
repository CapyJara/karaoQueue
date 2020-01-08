import React, { useState } from 'react';
import styles from './Splash.css';
import usePlaylistEmitters from '../hooks/playlistState';
import { usePlayListState } from '../../socket';
import YouTube from 'react-youtube';

const Splash = () => {
  const [link, setLink] = useState(null);
  const { addLink, finishedSong } = usePlaylistEmitters();
  const { playlist } = usePlayListState();

  const handleChange = e => {
    setLink(e.target.value);
  };

  const submit = e => {
    e.preventDefault();
    addLink(link);
    setLink('');
  };

  const opts = {
    height: '390',
    width: '640'
  };

  const onEnd = () => {
    finishedSong();
  };

  return (
    <section className={styles.Splash}>
      <h1>Welcome</h1>
      
      {playlist && <YouTube
        videoId={playlist[0]}
        opts={opts}
        onEnd={onEnd}
      />}

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

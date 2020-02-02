/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import styles from './concert.css';
import usePlaylistEmitters from '../../hooks/playlistState';
import { usePlayListState } from '../../socket';
import YouTube from 'react-youtube';
import { Link } from 'react-router-dom';
import Modal from '../modal/Modal';
import PlayList from '../playlist/Playlist';

const Concert = ({ match }) => {
  const [modal, toggleModal] = useState(false);
  const { finishedSong, joinRoom } = usePlaylistEmitters();
  const { playlist } = usePlayListState();
  const roomId = match.params.roomId;

  useEffect(() => {
    joinRoom(roomId);
  }, []);
  
  const open = () => toggleModal(true);
  const close = () => toggleModal(false);
  
  const onEnd = () => finishedSong(roomId);

  const copyLink = e => {
    e.preventDefault();
    var dummy = document.createElement('input'),
      text = window.location.href;

    document.body.appendChild(dummy);
    dummy.value = text;
    dummy.select();
    document.execCommand('copy');
    document.body.removeChild(dummy);

    const link = document.getElementById('link');
    link.classList.add(styles.clicked);
    setTimeout(() => link.classList.remove(styles.clicked), 200);
  };

  return (
    <section className={styles.Concert}>
      <Link to='/'>KaraoQueue</Link>
      {playlist && <header>
        <h1>{playlist.roomName}</h1>
        <h3>Share link to invite friends</h3>
        <button id="link" className={styles.Link} onClick={copyLink}>Click to copy shareable link</button>
      </header>}
      {playlist && <YouTube
        videoId={playlist.playlist[0] ? playlist.playlist[0].song.videoId : null }
        onEnd={onEnd}
      />}

      {playlist && <button 
        className={styles['New-Song']}
        onClick={open}
      >Add Song to the Queue</button>}

      {modal && <Modal close={close}/>}

      {playlist && <PlayList playlist={playlist.playlist}/>}

      {!playlist && <div>
        <h1>Could not find room with id {match.params.roomId.split('//')[0]}</h1>
      </div>}

    </section>
  );
};

export default Concert;


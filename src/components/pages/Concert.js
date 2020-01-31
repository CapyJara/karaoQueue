/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import styles from './concert.css';
import usePlaylistEmitters from '../../hooks/playlistState';
import { usePlayListState } from '../../socket';
import YouTube from 'react-youtube';
import search from '../../services/youtubeSearch';
import { Link } from 'react-router-dom';
import Modal from '../modal/Modal';

const superSecretCode = 'AIzaSyBwTEj5b5Vol3PHBtF2ZzChHSzbSNpk24c';

const Concert = ({ match }) => {
  const [modal, toggleModal] = useState(false);
  const { finishedSong, joinRoom, removeSong } = usePlaylistEmitters();
  const { playlist } = usePlayListState();
  const roomId = match.params.roomId;

  useEffect(() => {
    joinRoom(roomId);
  }, [roomId]);
  
  const open = () => toggleModal(true);
  const close = () => toggleModal(false);
  
  const onEnd = () => {
    finishedSong(roomId);
  };


  const deleteFromPlaylist = data => removeSong(data);

  const copyLink = e => {
    e.preventDefault();
    var dummy = document.createElement('input'),
      text = window.location.href;

    document.body.appendChild(dummy);
    dummy.value = text;
    dummy.select();
    document.execCommand('copy');
    document.body.removeChild(dummy);
  };

  return (
    <section className={styles.Concert}>
      <Link to='/'>KaraoQueue</Link>
      {playlist && <header>
        <h1>{playlist.roomName}</h1>
        <h3>Shareable Link :</h3>
        <h3 id="link" className={styles.Link} onClick={copyLink}>{window.location.href.split('//')[1]}</h3>
      </header>}
      {playlist && <YouTube
        videoId={playlist.playlist[0] ? playlist.playlist[0].song.videoId : null }
        onEnd={onEnd}
      />}

      <button 
        className={styles['New-Song']}
        onClick={open}
      >Add Song to the Queue</button>

      {modal && <Modal close={close}/>}

      <ul className={styles.Playlist}>
        {playlist && playlist.playlist.map(i => {
          return <li key={i.song.videoId} >
            <h2>{i.name}</h2>
            <h3>{i.song.title}</h3>
            <div onClick={() => deleteFromPlaylist(i)}>X</div>
          </li>;
        })}
      </ul>

    </section>
  );
};

export default Concert;



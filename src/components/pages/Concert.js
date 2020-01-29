/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import styles from './concert.css';
import usePlaylistEmitters from '../hooks/playlistState';
import { usePlayListState } from '../../socket';
import YouTube from 'react-youtube';
import search from '../../services/youtubeSearch';
import { Link } from 'react-router-dom';

const superSecretCode = 'AIzaSyBwTEj5b5Vol3PHBtF2ZzChHSzbSNpk24c';

const Concert = ({ match }) => {
  const [link, setLink] = useState('');
  const [name, setName] = useState('');
  const [searchList, setSearchList] = useState([]);
  const [modal, toggleModal] = useState(false);
  const { addLink, finishedSong, joinRoom, removeSong } = usePlaylistEmitters();
  const { playlist } = usePlayListState();
  const roomId = match.params.roomId;

  useEffect(() => {
    joinRoom(roomId);
  }, [roomId]);

  const handleNameChange = e => {
    setName(e.target.value);
  };

  const handleLinkChange = e => {
    setLink(e.target.value);
  };

  const submit = e => {
    e.preventDefault();
    videoSearch(`${link} karaoke`);
    setLink('');
  };
  
  const open = () => toggleModal(true);
  const close = () => toggleModal(false);
  
  const onEnd = () => {
    finishedSong(roomId);
  };
  
  const videoSearch = (term) => {
    search({ key: superSecretCode, term }, (videos) => {
      setSearchList(videos.map(i => {
        const { thumbnails, title } = i.snippet;
        const { videoId } = i.id;
        const image = thumbnails.medium ? thumbnails.medium.url : thumbnails.default.url;

        return {
          image,
          title,
          videoId
        };
      }));
    });
  };

  const addToPlayList = (song) => {
    if(name) {
      const data = {
        song,
        roomId,
        name
      };
      addLink(data);
      setSearchList([]);
      close();
    }
    else {
      document.getElementsByName('name')[0].className = styles.Shake;
      setTimeout(() => {
        document.getElementsByName('name')[0].className = '';
      }, 1100);
    }
  };

  const deleteFromPlaylist = data => removeSong(data);

  console.log(playlist);
  return (
    <section className={styles.Concert}>
      <Link to='/'>KaraoQueue</Link>
      {playlist && <h1>{playlist.roomName}&rsquo;s Concert</h1>}
      {playlist && <YouTube
        videoId={playlist.playlist[0] ? playlist.playlist[0].song.videoId : null }
        onEnd={onEnd}
      />}

      <button 
        className={styles['New-Song']}
        onClick={open}
      >Add Song</button>

      {modal && <section className={styles.Modal}>
        <button className={styles.Exit} onClick={close}>X</button>
        <form onSubmit={submit}>
          <input type="text" name="name" onChange={handleNameChange} value={name} placeholder="Your Name" autoComplete="off"/>
          <input type="text" name="link" onChange={handleLinkChange} value={link} placeholder="enter name of song" autoComplete="off"/>
          <button>Search</button>
        </form>
        
        <ul>
          {searchList.map(i => {
            return (
              <li key={i.videoId} onClick={() => addToPlayList(i)}>
                <img src={i.image}/>
                <h2>{i.title}</h2>
              </li>);
          })}
        </ul>        
      </section>}

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



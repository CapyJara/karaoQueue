import React, { useState } from 'react';
import styles from './Splash.css';
import usePlaylistEmitters from '../hooks/playlistState';
import { usePlayListState } from '../../socket';
import YouTube from 'react-youtube';
import YTSearch from 'youtube-api-search';

const superSecretCode = 'AIzaSyBwTEj5b5Vol3PHBtF2ZzChHSzbSNpk24c';

const Splash = () => {
  const [link, setLink] = useState(null);
  const [searchList, setSearchList] = useState([]);
  const { addLink, finishedSong } = usePlaylistEmitters();
  const { playlist } = usePlayListState();

  const handleChange = e => {
    setLink(e.target.value);
  };

  const submit = e => {
    e.preventDefault();
    setLink('');
    videoSearch(`${link} karaoke`);
  };

  const opts = {
    height: '390',
    width: '640'
  };

  const onEnd = () => {
    finishedSong();
  };

  const videoSearch = (term) => {
    YTSearch({ key: superSecretCode, term }, (videos) => {
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
    addLink(song);
    setSearchList([]);
  };

  return (
    <section className={styles.Splash}>
      <h1>KaraoQueue</h1>
      
      {playlist && <YouTube
        videoId={playlist[0] ? playlist[0].videoId : null }
        opts={opts}
        onEnd={onEnd}
      />}

      <form onSubmit={submit}>
        <input type="text" onChange={handleChange} value={link || ''}/>
        <button>Enter</button>
      </form>
      <ul>
        {playlist && playlist.map(i => {
          return <li key={i} >{i.title}</li>;
        })}
      </ul>
      <ul>
        {searchList.map(i => {
          return (
            <li key={i.channelId} onClick={() => addToPlayList(i)}>
              <img src={i.image}/>
              <h2>{i.title}</h2>
            </li>);
        })}
      </ul>
    </section>
  );
};

export default Splash;

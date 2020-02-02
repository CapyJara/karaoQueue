import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './modal.css';
import search from '../../services/youtubeSearch';
import usePlaylistEmitters from '../../hooks/playlistState';

const superSecretCode = 'AIzaSyBwTEj5b5Vol3PHBtF2ZzChHSzbSNpk24c';

const Modal = ({ match, close }) => {
  const [link, setLink] = useState('');
  const [name, setName] = useState('');
  const [searchList, setSearchList] = useState([]);
  const { addLink } = usePlaylistEmitters();
  const roomId = match.params.roomId;

  const handleNameChange = e => setName(e.target.value);
  const handleLinkChange = e => setLink(e.target.value);

  const submit = e => {
    e.preventDefault();
    videoSearch(`${link} karaoke`);
    setLink('');
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

  return (
    <section className={styles.Modal}>

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
          
    </section>
  );
};

Modal.propTypes = {
  match: PropTypes.object.isRequired,
  close: PropTypes.func.isRequired
};

export default withRouter(Modal);

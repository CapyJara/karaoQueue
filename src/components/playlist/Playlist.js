import React from 'react';
import PropTypes from 'prop-types';
import styles from './playlist.css';
import usePlaylistEmitters from '../../hooks/playlistState';

const PlayList = ({ playlist }) => {
  const { removeSong } = usePlaylistEmitters();
  const deleteFromPlaylist = data => removeSong(data);

  return (
    <ul className={styles.Playlist}>

      {playlist && playlist.map(i => {
        return <li key={i.song.videoId} >
          <h2>{i.name}</h2>
          <h3>{i.song.title}</h3>
          <div onClick={() => deleteFromPlaylist(i)}>X</div>
        </li>;
      })}
      
    </ul>
  );
};

PlayList.propTypes = {
  playlist: PropTypes.array.isRequired
};

export default PlayList;

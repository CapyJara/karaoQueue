import { useEmitEvent } from '../socket';

export default function usePlaylistEmitters() {
  const createRoom = useEmitEvent('CREATE_ROOM');
  const joinRoom = useEmitEvent('JOIN_ROOM');
  const addLink = useEmitEvent('ADD_LINK');
  const finishedSong = useEmitEvent('FINISHED_SONG');
  const removeSong = useEmitEvent('REMOVE_SONG');
  return { addLink, finishedSong, createRoom, joinRoom, removeSong };
}


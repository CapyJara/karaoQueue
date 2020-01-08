import { useEmitEvent } from '../../socket';

export default function usePlaylistEmitters() {
  const addLink = useEmitEvent('ADD_LINK');
  const finishedSong = useEmitEvent('FINISHED_SONG');
  const createRoom = useEmitEvent('CREATE_ROOM');
  const joinRoom = useEmitEvent('JOIN_ROOM');
  return { addLink, finishedSong, createRoom, joinRoom };
}


import { useEmitEvent } from '../../socket';

export default function usePlaylistEmitters() {
  const addLink = useEmitEvent('ADD_LINK');
  const finishedSong = useEmitEvent('FINISHED_SONG');
  return { addLink, finishedSong };
}


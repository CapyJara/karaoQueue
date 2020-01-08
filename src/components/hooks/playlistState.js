import { useEmitEvent } from '../../socket';

export default function usePlaylistEmitters() {
  const addLink = useEmitEvent('ADD_LINK');
  return { addLink };
}


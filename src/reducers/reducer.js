export const reducer = (state, { type, payload }) => {
  switch(type) {
    case 'CURRENT_PLAYLIST': { return { ...state, playlist: payload }; }
    default: return state;
  }
};

const axios = require('axios');

const ROOT_URL = 'https://www.googleapis.com/youtube/v3/search';

const search = (options, callback) => {
  if(!options.key) {
    throw new Error('Youtube Search expected key, received undefined');
  }

  const params = {
    type: 'video',
    videoEmbeddable: true,
    videoSyndicated: true,
    part: 'snippet',
    key: options.key,
    q: options.term,
  };

  axios.get(ROOT_URL, { params })
    .then((response) => {
      if(callback) { callback(response.data.items); }
    })
    .catch((error) => {
      console.error(error);
    });
};

export default search;

const axios = require('axios');
let giphyApiKey = 'dqLjAwvBVnjvUxGpqZWSkic6GlKXNFsw';
let limit=5;


axios.get(`http://api.giphy.com/v1/gifs/trending?api_key=${giphyApiKey}&limit=${limit}`)
  .then(response => {
    let gifs = response.data.data;
    console.log(gifs)
  })
  .catch(error => {
    console.log('Error: ', error);
  });

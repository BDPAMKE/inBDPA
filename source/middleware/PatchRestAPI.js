const https = require('https');
module.exports = {
    patchWithBearerToken: function  (url, token, data) {
      fetch(url, {
  method: 'PATCH',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(data)
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error(error))
    }
    };
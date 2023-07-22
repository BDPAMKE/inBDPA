const https = require('https');
module.exports = {
  patchWithBearerToken: function  (url, token, data) {
    fetch(url, {
method: 'PATCH',
headers: {
  Authorization: `Bearer ${token}`,
  'Content-Type': 'application/json'
},
body: JSON.stringify(data)
})
.then(response => response.json())
.then(data => {console.log("patch",data)
             return data})

.catch(error => console.error(error))
  }
  };

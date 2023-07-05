const https = require('https');
module.exports = {
  deleteWithBearerToken: function (url, token) {
    const options = {
      Method:'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
  
    return new Promise((resolve, reject) => {
      const req = https.get(url, options, res => {
        let data = '';
        res.on('data', chunk => {
          data += chunk;
        });
        res.on('end', () => {
          resolve(JSON.parse(data));
        });
      });
  
      req.on('error', error => {
        reject(error);
      });
  
      req.end();
    });
  }
};
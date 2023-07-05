const https = require('https');
module.exports = {
    patchWithBearerToken: function  (url, token, data) {
  const options = {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  };
  //console.log('url'+url);
  //console.log('data:'+data);
  return new Promise((resolve, reject) => {
    const req = https.request(url, options, res => {
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

    req.write(JSON.stringify(data));
    req.end();
  });
}
};
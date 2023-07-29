function startSession(view, viewed_id) {
    const newSession = {};
        newSession.view = view;
        newSession.viewed_id = viewed_id;

        var newSessionBody = JSON.stringify(newSession);
        
          const options = {
            method: 'POST',
            headers: {
              'Authorization': 'Bearer ' + process.env.BEARER_TOKEN,
              'Content-Type': 'application/json'
            },
            body: newSessionBody
          };

          const varHttpRequest = 'https://inbdpa.api.hscc.bdpa.org/v1/sessions'; //Setting uri based on user input
          
          fetch(varHttpRequest, options)
            .then(response => response.json())
            .then(async data => {
              if (data.success === false){  
                res.render('error', { title: 'Error', message: 'Something Went Wrong'});
                return "error";
              }
              else{
                console.log("Session Started!!!")
                return data.session_id;
              }
            })
            .catch(error => { //Error in the fetch
              console.error(error);
              res.render('login', { title: 'Invalid User', message: 'Invalid username or password', data: error.data });
              return "error";
            })
        }

 function continueSession(session_id) {
          const options = {
            method: 'PATCH',
            headers: {
              'Authorization': 'Bearer ' + process.env.BEARER_TOKEN,
              'Content-Type': 'application/json'
            },
          };
      
          const varHttpRequest = 'https://inbdpa.api.hscc.bdpa.org/v1/sessions/' + session_id; //Setting uri based on user input
          
          fetch(varHttpRequest, options)
            .then(response => response.json())
            .then(async data => {
              if (data.success === false){  
                res.render('error', { title: 'Error', message: 'Something Went Wrong'});
                return "error";
              }
              else{
                console.log("Session Continued!!!")
              }
            })
            .catch(error => { //Error in the fetch
              console.error(error);
              res.render('login', { title: 'Invalid User', message: 'Invalid username or password', data: error.data });
              return "error";
            })
        }

        function endSession(session_id) {
          const options = {
            method: 'DELETE',
            headers: {
              'Authorization': 'Bearer ' + process.env.BEARER_TOKEN,
              'Content-Type': 'application/json'
            },
          };
      
          const varHttpRequest = 'https://inbdpa.api.hscc.bdpa.org/v1/sessions/' + session_id; //Setting uri based on user input
          
          fetch(varHttpRequest, options)
            .then(response => response.json())
            .then(async data => {
              if (data.success === false){  
                res.render('error', { title: 'Error', message: 'Something Went Wrong'});
                return "error";
              }
              else{
                console.log("Session Ended!!!")
              }
            })
            .catch(error => { //Error in the fetch
              console.error(error);
              res.render('login', { title: 'Invalid User', message: 'Invalid username or password', data: error.data });
              return "error";
            })
        }

        module.exports = {
          manageSession(view, viewed_id, currentPage) {
          var session_id = startSession(view, viewed_id)
          continueSession(session_id)
          const path = req.originalUrl.replace(/\?.*$/, '');
          if(path == currentPage){
            setInterval(manageSession(view, viewed_id, currentPage), 30000);
          }
          else{
            endSession(session_id)
          }
        }
      }

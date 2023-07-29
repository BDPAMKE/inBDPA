

async function startSession(view, view_id) {

    var newSession={};
    
        newSession.view = view;
        newSession.viewed_id = view_id;

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
                var session_id = data.session_id;
                console.log("Session Started!!!");
                continueSession(session_id);
                return session_id;
              }
            })
            .catch(error => { //Error in the fetch
              console.error(error);
              res.render('login', { title: 'Invalid User', message: 'Invalid username or password', data: error.data });
              return "error";
            })
        }

        module.exports = startSession;
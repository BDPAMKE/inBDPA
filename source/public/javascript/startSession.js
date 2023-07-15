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
      
          const varHttpRequest = 'https://inbdpa.api.hscc.bdpa.org/v1/sessions '; //Setting uri based on user input
          
          fetch(varHttpRequest, options)
            .then(response => response.json())
            .then(async data => {
              if (data.success === false){  
                res.render('error', { title: 'Error', message: 'Something Went Wrong'});
                return "error";
              }
            })
            .catch(error => { //Error in the fetch
              console.error(error);
              res.render('login', { title: 'Invalid User', message: 'Invalid username or password', data: error.data });
              return "error";
            })
        }

    module.export = { startSession };


//  setInterval(myFunction, 5000);


//  function continueSession() {
//     const newSession = {};
//         newSession.view = req.body.createOpportunityTitle;
//         newSession.viewed_id = req.body.createOpportunityContent;

//         var newSessionBody = JSON.stringify(newSession);
        
//           const options = {
//             method: 'POST',
//             headers: {
//               'Authorization': 'Bearer ' + process.env.BEARER_TOKEN,
//               'Content-Type': 'application/json'
//             },
//             body: newSessionBody
//           };
      
//           const varHttpRequest = 'https://inbdpa.api.hscc.bdpa.org/v1/sessions '; //Setting uri based on user input
          
//           fetch(varHttpRequest, options)
//             .then(response => response.json())
//             .then(async data => {
//               if (data.success === false){  
//                 res.render('error', { title: 'Error', message: 'Something Went Wrong'});
//                 return "error";
//               }
//             })
//             .catch(error => { //Error in the fetch
//               console.error(error);
//               res.render('login', { title: 'Invalid User', message: 'Invalid username or password', data: error.data });
//               return "error";
//             })
//         }
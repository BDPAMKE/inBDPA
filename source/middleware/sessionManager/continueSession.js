
function continueSession(session_id) {
    const options = {
      method: 'PATCH',
      headers: {
        'Authorization': 'Bearer ' + process.env.BEARER_TOKEN,
        'Content-Type': 'application/json'
      },
    };

    const varHttpRequest = 'https://inbdpa.api.hscc.bdpa.org/v1/sessions/' + session_id; //Setting uri based on user input
    console.log(varHttpRequest)

    fetch(varHttpRequest, options)
      .then(response => response.json())
      .then(async data => {
        if (data.success === false){  
          console.log(data)
          return "error";
        }
        else{
          setTimeout(() => {
          console.log("Session Continued!!!")
          continueSession(session_id)
          }, 30000);
        }
      })
      .catch(error => { //Error in the fetch
        console.error(error);
        return "error";
      })
  }

  module.exports = continueSession;
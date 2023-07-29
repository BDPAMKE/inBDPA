
    async function endSession(session_id) {
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
          console.log("Error")
        if (data.success === false){  
          return "error";
        }
        else{
          console.log("Session Ended!!!")
        }
      })
      .catch(error => { //Error in the fetch
        console.error(error);
        return "error";
      })
  }

  module.exports = endSession;

async function incrementViewsOpportunity (varHttpRequest) {
        const newOpportunity = {};
        newOpportunity.views = "increment";
      
        var newOpportunityBody = JSON.stringify(newOpportunity);
          const options = {
            method: 'PATCH',
            headers: {
              'Authorization': 'Bearer ' + process.env.BEARER_TOKEN,
              'Content-Type': 'application/json'
            },
            body: newOpportunityBody
          };
    
          fetch(varHttpRequest, options)
            .then(response => response.json())
            .then(async data => {
              if (data.success === false){  
                return "error";
              }
              else 
              {
                console.log("SUCCESSFULLY INCREMENTED VIEWS")
                return;
              }
            })
            .catch(error => { //Error in the fetch
              console.error(error);
              return "error";
            })
        }

    module.exports = incrementViewsOpportunity;
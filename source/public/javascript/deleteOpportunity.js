function deleteOpportunity(opportunityId){
    const options = {
        method: 'DELETE',
        headers: {
          'Authorization': 'Bearer ' + process.env.BEARER_TOKEN,
          'Content-Type': 'application/json'
        }
      };
  
      const varHttpRequest = 'https://inbdpa.api.hscc.bdpa.org/v1/opportunities/' + opportunityId; //Setting uri based on user input
      
      fetch(varHttpRequest, options)
        .then(response => response.json())
        .then(async data => {
          if (data.success === false){  
            res.render('error', { title: 'Error', message: 'Something Went Wrong'});
            return "error";
          }
          else 
          {
            res.redirect("/opportunities");
          }
        })
        .catch(error => { //Error in the fetch
          console.error(error);
          res.render('login', { title: 'Invalid User', message: 'Invalid username or password', data: error.data });
          return "error";
        })
}

module.export = { deleteOpportunity };
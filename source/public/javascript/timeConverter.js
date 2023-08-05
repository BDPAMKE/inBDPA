module.exports = {
    
timeConverter(createdAt, updatedAt){
    var created = new Date(createdAt);
    var updated = new Date(updatedAt);
    var time = "";

    var now = new Date();
    var diffTime = new Date(Math.abs(updated - now));
  
    var days = Math.floor(diffTime / (1000 * 60 * 60 * 24))
    if( days < 1){
        var ms = diffTime % 1000;
        diffTime = (diffTime - ms) / 1000;
        var secs = diffTime % 60;
        diffTime = (diffTime - secs) / 60;
        var mins = diffTime % 60;
        var hrs = (diffTime - mins) / 60;

        if((hrs == 0) && (mins == 0)){
          time = secs + " seconds";
          return { time, created, updated }
        }
        else if(hrs == 0){
          time = mins + " minutes";
          return { time, created, updated }
        }
        else{
          time = hrs + " hours";
          return { time, created, updated }
        }
    }
    else if (days = 1){
      time = days + " day";
      return { time, created, updated }
    }
    else{
      time = days + " days";
      return { time, created, updated }
    }
  }

};
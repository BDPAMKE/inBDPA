function msToTime(s) {
    const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    if( days < 1){
        var ms = s % 1000;
        s = (s - ms) / 1000;
        var secs = s % 60;
        s = (s - secs) / 60;
        var mins = s % 60;
        var hrs = (s - mins) / 60;

    return hrs + ':' + mins + ':' + secs + '.' + ms;
    }
    else{
        return days;
    }
  }
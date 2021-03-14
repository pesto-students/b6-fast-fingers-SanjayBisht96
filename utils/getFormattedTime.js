 const getFormattedTime = (timeInMilliSeconds) => {
    function pad(n, z) {
      z = z || 2;
      return ('00' + n).slice(-z);
    }

    const ms = timeInMilliSeconds % 1000;
    timeInMilliSeconds = (timeInMilliSeconds - ms) / 1000;
    const secs = timeInMilliSeconds % 60;
    timeInMilliSeconds = (timeInMilliSeconds - secs) / 60;
    const mins = timeInMilliSeconds % 60;
    const hrs = (timeInMilliSeconds - mins) / 60;
    return pad(hrs) + ':' + pad(mins) + ':' + pad(secs) + '.' + pad(ms, 3);
  }


  export default getFormattedTime;
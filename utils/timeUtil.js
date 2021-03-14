const FULL_DASH_ARRAY = 283;

function calculateTimeFraction(timeLeft,TIME_LIMIT) {
  const rawTimeFraction = timeLeft / TIME_LIMIT;
  return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
  }
      
  function setCircleDasharray(timeLeft,TIME_LIMIT) {
    const circleDasharray = `${(
      calculateTimeFraction(timeLeft,TIME_LIMIT) * FULL_DASH_ARRAY
    ).toFixed(0)} 283`;
    if(document
      .getElementById("base-timer-path-remaining"))
    document
      .getElementById("base-timer-path-remaining")
      .setAttribute("stroke-dasharray", circleDasharray);
  }
  export {
      setCircleDasharray
  }
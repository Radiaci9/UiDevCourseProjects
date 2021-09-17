import React, { useEffect, useRef, useState } from "react";

/*
  Instructions:
    You're building an app to see how many times you can click
    a button in 10 seconds. 

    The UI has three parts, a button, a timer counting down from 10,
    and a count of how many times you've clicked the button.

    Once the timer reaches 0, remove the button from the UI.
*/
const useTimer = (startTime = 10) => {
  const [time, setTime] = React.useState(startTime)
  let id = useRef(null)

  const clear = () => {
    clearInterval(id.current)
  }
  useEffect(() => {
    id.current = setInterval(() => setTime((prevTime) => prevTime - 1), 1000)

    return clear
  }, [])

  useEffect(() => {
    if (time === 0) clear()
  }, [time])

  return time
}
export default function ClickGamePage () {
  const [clickCount, setClickCount] = useState(0)
  const time = useTimer(10)

  return (
    <div className="App" style={{ display: 'flex', flexDirection: 'column'}}>
      <p>Time left: {time}</p>
      {
        time === 0
          ? null
          : (
            <button
              style={{ height: '100px'}}
              onClick={() => setClickCount((prevCount) => prevCount + 1)}
            >
              Click me!
            </button>
          )
      }
      <p>Clicked: {clickCount}</p>
    </div>
  );
}

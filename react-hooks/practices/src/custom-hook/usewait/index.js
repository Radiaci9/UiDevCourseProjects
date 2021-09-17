import React from "react";

/*
  Instructions:
    Finish implementing the `useWait` custom Hook.
    `useWait` should return a boolean that changes from
    `false` to `true` after `delay` seconds. 
*/

function useWait (delay) {
  const [show, setShow] = React.useState(false)

  React.useEffect(() => {
    const id = setTimeout(() => setShow(true), delay)
    return () => { clearTimeout(id) }
  }, [delay])
  return show
}

function Wait({ delay = 1000, placeholder, ui }) {
  const show = useWait(delay)

  return show === true
    ? ui
    : placeholder
}

export default function UseWaitPage() {
  return (
    <div className="App">
      <Wait
        delay={3000}
        placeholder={<p>Waiting...</p>}
        ui={<p>This text should appear after 3 seconds.</p>}
      />
    </div>
  );
}

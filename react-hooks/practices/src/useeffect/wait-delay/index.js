import React, { useEffect, useState } from "react";

import "./styles.css";

/*
  Instructions:
    You'll notice below that we have a Wait component.
    The purpose of Wait is to render the `ui` prop after
    `delay` seconds. Before `delay` seconds, it should
    render `placeholder`.
*/

function Wait ({ delay = 1000, placeholder, ui }) {
  const [component, setComponent] = useState(placeholder)

  useEffect(() => {
    const id = setTimeout(() => setComponent(ui), delay)

    return () => clearTimeout(id)
  }, [delay])

  return component
}

export default function WaitDelayPage() {
  return (
    <div className="waitDelayApp">
      <Wait 
        delay={3000}
        placeholder={<p>Waiting...</p>}
        ui={<p>This text should appear after 3 seconds.</p>}
      />
    </div>
  );
}

import React, { useEffect, useState } from "react";

import "./styles.css";

/*
  Instructions:
    Assume you're creating an app that allows the user to 
    post status updates (ala Twitter). Your UI should have a
    textarea and a button. The button should be disabled if the
    length of the textarea is 0 or greater than 240 characters.
    The document's title should inform the user on how many
    characters they have left to type before they hit the 240
    character limit - "115 characters left."
*/

export default function CharacterLimitPage() {
  const [areaValue, setAreaValue] = useState('')

  useEffect(() => {
    document.title = `${240 - areaValue.length} characters left.`
    return () => { document.title = 'Practices' }
  }, [areaValue])

  return (
    <div className="characterLimitApp">
      <textarea
        className="characterLimitTextarea"
        value={areaValue}
        onChange={(e) => setAreaValue(e.target.value)}
        placeholder="Type something"
      />
      <button
        type="button"
        className="characterLimitBtn"
        disabled={areaValue.length === 0 || areaValue.length > 240}
        onClick={() => {console.log('Click!')}}
      >
        Post
      </button>
    </div>
  );
}

import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

const styles = {
  content: {
    fontSize: '35px',
    position: 'absolute',
    left: '0',
    right: '0',
    marginTop: '20px',
    textAlign: 'center',
  }
}

export default function Loading ({
  text,
  speed,
}) {
  console.log(text)
  console.log(speed)
  const [content, setContent] = React.useState(text)

  useEffect(() => {
    const id = setInterval(() => {
      setContent((oldContent) => oldContent === text + '...' ? text : `${oldContent}.`)
    }, speed)
    return () => clearInterval(id)
  }, [text, speed])

  return (
    <p style={styles.content}>
      {content}
    </p>
  )
}

Loading.propTypes = {
  text: PropTypes.string,
  speed: PropTypes.number,
}

Loading.defaultProps = {
  text: 'Loading',
  speed: 300
}
import React, { useState } from "react";
import './styles.css'

/*
  INSTRUCTIONS:
  Convert the code below from a Class component
  using setState to a function component using 
  the useState Hook.
*/

class Theme extends React.Component {
  state = {
    theme: "light"
  }
  toDark = () => this.setState({ theme: "dark" })
  toLight = () => this.setState({ theme: "light" })
  render() {
    const { theme } = this.state

    return (
      <div className={theme}>
        {theme === "light" 
          ? <button className="themeBtn" onClick={this.toDark}>🔦</button>
          : <button className="themeBtn" onClick={this.toLight}>💡</button>}
      </div>
    )
  }
}

export default function ThemeFunc () {
  const [theme, setTheme] = useState('light')
  const toDark = () => setTheme(() => 'dark')
  const toLight = () => setTheme(() => 'light')

  return (
    <div className={theme}>
      {theme === "light" 
        ? <button className="themeBtn" onClick={toDark}>🔦</button>
        : <button className="themeBtn" onClick={toLight}>💡</button>}
    </div>
  )
}

import React from "react"
import "./App.scss"
import Slider from "./components/Slider"
import logo from "./logo.svg"

export default function App() {
  return (
    <div className="container-master">
      <img src={logo}/>
      <h2>Adjust your settings</h2>
      <p>Optimize the focus-break balance to your needs</p>
      <Slider default={1} min={1} max={120}/>
    </div>
  )
}


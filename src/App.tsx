import React from "react"
import ScreenStart from "./screens/ScreenStart"
import styles from "./App.module.scss"

export default function App() {
  
  return (
    <div className="containerMaster">
      <div className="containerScreens">
        <ScreenStart/>
      </div>
      <button className={styles.btn}>
        <div className={styles.icon}/>
      </button>
    </div>
  )
}


import React, { useState } from "react"
import ScreenStart from "./screens/ScreenStart"
import styles from "./App.module.scss"

export default function App() {

  const [actived, setActived] = useState("")
  
  return (
    <div className={styles.masterContainer}>
      <div className={styles.topContainer}/>
      <div className={styles.screensContainer}>
        <ScreenStart/>
      </div>
      <div className={styles.btnContainer}>
        <button className={styles.btn}>
          <div className={styles.icon}/>
        </button>
      </div>
    </div>
  )
}

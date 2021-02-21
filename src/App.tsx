import React, { useEffect, useState } from "react"
import ScreenStart from "./screens/ScreenStart"
import styles from "./App.module.scss"

export default function App() {

  const [activated, setActivated] = useState("")
  const [ripple, setRipple] = useState("")

  useEffect(() => {
    if (ripple.length > 0) {
      const rippleTimer = setTimeout(function(){
        setRipple("")
      }, 400)
      return () => {
        clearTimeout(rippleTimer)
      }
    }
  }, [ripple])
  
  function _handleButtonPress() {
    activated.length > 0 ? setActivated("") : setActivated(styles.activated)
    setRipple(styles.rippleActivated)
  }

  return (
    <div className={styles.masterContainer}>
      <div className={styles.topContainer}/>
      <div className={styles.screensContainer}>
        <div className={styles.screenWrapper + " " + styles.setup + " " + activated}>
          <ScreenStart/>
        </div>
        <div className={styles.screenWrapper + " " + styles.start + " " + activated}>
          Test
        </div>
      </div>
      <div className={styles.btnContainer}>
        <button onClick={_handleButtonPress} className={styles.btn}>
          <div className={styles.icon + " " + activated}/>
          <div className={styles.ripple + " " + ripple}/>
        </button>
      </div>
    </div>
  )
}

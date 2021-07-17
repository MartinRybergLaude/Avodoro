import React, { useEffect, useState } from "react"
import ScreenStart from "./screens/ScreenStart"
import styles from "./App.module.scss"
import { atom, useRecoilValue } from "recoil"
import { setItem } from "./utils/storageUtils"
import ScreenTimer from "./screens/ScreenTimer"
import ScreenLoading from "./screens/ScreenLoading"

export const focusValueState = atom({
  key: "focusValueState",
  default: 25
})
export const shortBreakValueState = atom({
  key: "shortBreakValueState", 
  default: 5
})
export const longBreakValueState = atom({
  key: "longBreakValueState",
  default: 15
})

export default function App() {

  const focusValue = useRecoilValue(focusValueState)
  const shortBreakValue = useRecoilValue(shortBreakValueState)
  const longBreakValue = useRecoilValue(longBreakValueState)

  const [activated, setActivated] = useState("deactivated")
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
  useEffect(() => {
    console.log("activated: " + activated)
  }, [activated])

  function _handleButtonPress() {
    console.log("activated: " + activated)
    activated === styles.activated ? setActivated("deactivated") : setActivated(styles.activated)
    setRipple(styles.rippleActivated)
    setItem("focusLength", focusValue.toString())
    setItem("shortBreakLength", shortBreakValue.toString())
    setItem("longBreakLength", longBreakValue.toString())
  }

  return (
    <div className={styles.masterContainer}>
      <ScreenLoading/>
      <div className={styles.topContainer}/>
      <div className={styles.screensContainer}>
        <div className={styles.screenWrapper + " " + styles.start + " " + activated}>
          <ScreenStart/>
        </div>
        <div className={styles.screenWrapper + " " + styles.timer + " " + activated}>
          {activated === styles.activated &&
            <ScreenTimer focusLength={focusValue} shortBreakLength={shortBreakValue} longBreakLength={longBreakValue} />
          }
        </div>
      </div>
      <div className={styles.btnContainer}>
        <button onClick={_handleButtonPress} className={styles.btn + " " + activated}>
          <div className={styles.icon + " " + activated}/>
          <div className={styles.ripple + " " + ripple}/>
        </button>
      </div>
    </div>
  )
}

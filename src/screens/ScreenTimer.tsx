import React, { useEffect, useState } from "react"
import styles from "./ScreenTimer.module.scss"

enum TimerTypes {
  FOCUS,
  SHORTBREAK,
  LONGBREAK
}

interface Props {
  start: boolean
}

export default function ScreenTimer(props: Props) {
  const [timerType, setTimerType] = useState(TimerTypes.FOCUS)
  const [timerTime, setTimerTime] = useState(0)

  useEffect(() => {
    if (props.start) startTimer()
    else clearTimer()
  }, [props.start])

  function startTimer() {
  
  }

  function clearTimer() {

  }
  
  return (
    <div className={styles.masterContainer}>
    </div>
  )
}

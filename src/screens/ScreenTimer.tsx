import React, { useEffect, useState } from "react"
import { useRecoilValue } from "recoil"
import styles from "./ScreenTimer.module.scss"

enum TimerTypes {
  FOCUS,
  SHORTBREAK,
  LONGBREAK
}

interface Props {
  start: boolean
  focusLength: number
  shortBreakLength: number
  longBreakLength: number
}

export default function ScreenTimer(props: Props) {
  const [timerType, setTimerType] = useState(TimerTypes.FOCUS)
  const [timerTime, setTimerTime] = useState(0)

  useEffect(() => {
    setTimerTime(props.focusLength * 60)
  }, [props.focusLength])

  function getFormattedTime() {
    if (timerTime === 60*60) return "60:00"
    return new Date(timerTime * 1000).toISOString().substr(14, 5)
  }
  
  return (
    <div className={styles.masterContainer}>
      <h1>{getFormattedTime()}</h1>
    </div>
  )
}

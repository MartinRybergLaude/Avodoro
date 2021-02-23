import React, { useEffect, useState } from "react"
import { useRecoilValue } from "recoil"
import styles from "./ScreenTimer.module.scss"

enum TimerTypes {
  FOCUS,
  SHORTBREAK,
  LONGBREAK
}

interface Props {
  run: boolean
  focusLength: number
  shortBreakLength: number
  longBreakLength: number
}

export default function ScreenTimer(props: Props) {
  const [timerType, setTimerType] = useState(TimerTypes.FOCUS)
  const [time, setTime] = useState(props.focusLength * 60)

  useEffect(() => {
    const interval = setInterval(tickTime, 1000)
    return () => {
      clearInterval(interval)
    }
  }, [])

  function tickTime() {
    setTime(time => time-1)
  }

  function getFormattedTime() {
    if (time === 60*60) return "60:00"
    return new Date(time * 1000).toISOString().substr(14, 5)
  }
  
  return (
    <div className={styles.masterContainer}>
      <h1>{getFormattedTime()}</h1>
    </div>
  )
}

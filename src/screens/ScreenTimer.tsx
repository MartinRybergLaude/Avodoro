import React, { useEffect, useState } from "react"
import { useRecoilValue } from "recoil"
import Explosion from "../components/Explosion"
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
  const [time, setTime] = useState(props.focusLength)

  let doShortbreak = true
  let startTime = Date.now()
  let timeSeconds: number

  useEffect(() => {
    timeSeconds = props.focusLength * 60
    const interval = setInterval(() => {
      tickTimer()
    }, 1000)
    return () => {
      clearInterval(interval)
    }
  }, [])

  function tickTimer() {
    const timeLeft = timeSeconds - Math.floor((Date.now() - startTime)/1000)
    if (timeLeft <= 0) {
      switch(timerType) {
      case TimerTypes.FOCUS:
        if (doShortbreak) {
          doShortbreak = false
          setTime(props.shortBreakLength)
          setTimerType(TimerTypes.SHORTBREAK)
        } else {
          doShortbreak = true
          setTime(props.longBreakLength)
          setTimerType(TimerTypes.LONGBREAK)
        }
        break
      case TimerTypes.SHORTBREAK: 
        setTime(props.focusLength)
        setTimerType(TimerTypes.FOCUS)
        break
      case TimerTypes.LONGBREAK:
        setTime(props.focusLength)
        setTimerType(TimerTypes.FOCUS)
        break
      }
      startTime = Date.now()
    } else if (Math.ceil(timeSeconds / 60) !== time) {
      setTime(Math.ceil(timeSeconds / 60))
    }
  }

  function getTimerTypeString(): string {
    if (timerType === TimerTypes.FOCUS) return "Keep focusing"
    else return "Relax for a bit"
  }

  function getRunExplosion(): number {
    switch(timerType) {
    case TimerTypes.FOCUS:
      return 0
    case TimerTypes.SHORTBREAK:
      return 1
    case TimerTypes.LONGBREAK:
      return 2
    }
  }
  
  return (
    <div className={styles.masterContainer}>
      <h2>{getTimerTypeString()}</h2>
      <h1>{time}</h1>
      <p>{time > 1 ? "minutes remaining" : "minute remaining"}</p>
      <Explosion run={getRunExplosion()} />
    </div>
  )
}

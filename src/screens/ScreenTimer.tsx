import React, { useEffect, useRef, useState } from "react"
import Explosion from "../components/Explosion"
import styles from "./ScreenTimer.module.scss"
import logopng from "../logo192.png"

enum TimerTypes {
  FOCUS,
  SHORTBREAK,
  LONGBREAK
}

interface Props {
  focusLength: number
  shortBreakLength: number
  longBreakLength: number
}

let doShortBreak = true
let interval: NodeJS.Timer

export default function ScreenTimer(props: Props) {
  const [timerType, setTimerType] = useState(TimerTypes.FOCUS)
  const [time, setTime] = useState(props.focusLength)

  const startTime = Date.now()
  const firstUpdate = useRef(true)

  let timeSeconds: number

  useEffect(() => {
    switch(timerType) {
    case TimerTypes.FOCUS:
      setTime(props.focusLength)
      timeSeconds = props.focusLength * 60
      break
    case TimerTypes.SHORTBREAK:
      setTime(props.shortBreakLength)
      timeSeconds = props.shortBreakLength * 60
      break
    case TimerTypes.LONGBREAK:
      setTime(props.longBreakLength)
      timeSeconds = props.longBreakLength * 60
      break
    }
    // Detects if this is the first render
    if (firstUpdate.current) {
      firstUpdate.current = false
      return
    }
    // Should not run on initial render to avoid notification spam
    if (window.Notification && Notification.permission === "granted") {
      showNotification()
    }
  }, [timerType])

  useEffect(() => {
    interval = setInterval(() => {
      tickTimer(interval)
    }, 1000)
    
    // Cleanup function
    return () => {
      clearInterval(interval)
    }
  }, [timerType])

  function showNotification() {
    let title: string
    let body: string

    switch(timerType) {
    case TimerTypes.FOCUS:
      title = "Focus"
      body = "Break has ended, focus!"
      break
    case TimerTypes.SHORTBREAK:
      title = "Relax"
      body = "Take a short break"
      break
    case TimerTypes.LONGBREAK:
      title = "Relax"
      body = "Take a longer break"
      break
    default:
      title = "Focus"
      body = "Break has ended, focus!"
      break
    }
    const options = {
      body,
      icon: logopng,
      badge: logopng,
      tag: "session",
      renotify: true
    }
    Notification.requestPermission(function(result) {
      if (result === "granted") {
        navigator.serviceWorker.ready.then(function(registration) {
          registration?.showNotification(title, options)
        })
      }
    })
  }
  function tickTimer(interval: NodeJS.Timer) {
    const timeLeft = timeSeconds - Math.floor((Date.now() - startTime)/1000)
    if (timeLeft <= 0) {
      switch(timerType) {
      case TimerTypes.FOCUS:
        if (doShortBreak) {
          doShortBreak = false
          setTimerType(TimerTypes.SHORTBREAK)
        } else {
          doShortBreak = true
          setTimerType(TimerTypes.LONGBREAK)
        }
        break
      case TimerTypes.SHORTBREAK: 
        setTimerType(TimerTypes.FOCUS)
        break
      case TimerTypes.LONGBREAK:
        setTimerType(TimerTypes.FOCUS)
        break
      }
      clearInterval(interval)
    } else if (Math.ceil(timeLeft / 60) !== time) {
      setTime(Math.ceil(timeLeft / 60))
    }
  }

  function getTimerTypeString(): string {
    switch(timerType) {
    case TimerTypes.FOCUS:
      return "Keep focusing"
    case TimerTypes.SHORTBREAK:
      return "Relax for a bit"
    case TimerTypes.LONGBREAK:
      return "Relax a bit longer"
    }
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

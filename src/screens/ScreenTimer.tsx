import { useEffect, useRef, useState } from "react";
import Explosion from "../components/Explosion";
import styles from "./ScreenTimer.module.scss";
import logopng from "../logo192.png";
import ProgressBar from "../components/ProgressBar";

enum TimerTypes {
  FOCUS,
  SHORTBREAK,
  LONGBREAK,
}

interface Props {
  focusLength: number;
  shortBreakLength: number;
  longBreakLength: number;
  run: boolean;
  pauseCallback: () => void;
}

let interval: NodeJS.Timer;

export default function ScreenTimer(props: Props) {
  const [timerType, setTimerType] = useState(TimerTypes.FOCUS);
  const [time, setTime] = useState(props.focusLength);
  const [showExplosion, setShowExplosion] = useState(false);
  const [sessionsCompleted, setSessionsCompleted] = useState(0);

  const startTime = Date.now();
  const firstUpdate = useRef(true);

  let timeSeconds: number;

  useEffect(() => {
    // Detects if this is the first render
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    // Should not run on initial render to avoid notification spam
    if (
      !props.run &&
      window.Notification &&
      Notification.permission === "granted"
    ) {
      showNotification();
    }
  }, [props.run]);

  useEffect(() => {
    switch (timerType) {
      case TimerTypes.FOCUS:
        setTime(props.focusLength);
        timeSeconds = props.focusLength * 60;
        break;
      case TimerTypes.SHORTBREAK:
        setTime(props.shortBreakLength);
        timeSeconds = props.shortBreakLength * 60;
        break;
      case TimerTypes.LONGBREAK:
        setTime(props.longBreakLength);
        timeSeconds = props.longBreakLength * 60;
        break;
    }
  }, [timerType, props.run]);

  useEffect(() => {
    if (props.run) {
      interval = setInterval(() => {
        tickTimer();
      }, 1000);
      setShowExplosion(true);
    } else {
      clearInterval(interval);
    }
    // Cleanup function
    return () => {
      clearInterval(interval);
    };
  }, [timerType, props.run]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowExplosion(false);
    }, 2000);
    return () => {
      clearTimeout(timeout);
    };
  }, [showExplosion]);

  function showNotification() {
    let title: string;
    let body: string;

    switch (timerType) {
      case TimerTypes.FOCUS:
        title = "Next: Focus";
        body = "Ready to focus?";
        break;
      case TimerTypes.SHORTBREAK:
        title = "Next: Short break";
        body = "Ready for a short break?";
        break;
      case TimerTypes.LONGBREAK:
        title = "Next: Long break";
        body = "Ready for a longer break?";
        break;
      default:
        title = "Next: Focus";
        body = "Ready to focus?";
        break;
    }
    const options = {
      body,
      icon: logopng,
      badge: logopng,
      tag: "session",
      renotify: true,
    };
    Notification.requestPermission(function (result) {
      if (result === "granted") {
        navigator.serviceWorker.ready.then(function (registration) {
          registration?.showNotification(title, options);
        });
      }
    });
  }
  function tickTimer() {
    const timeLeft = timeSeconds - Math.floor((Date.now() - startTime) / 1000);
    if (timeLeft <= 0) {
      switch (timerType) {
        case TimerTypes.FOCUS:
          if (sessionsCompleted !== 3) {
            setTimerType(TimerTypes.SHORTBREAK);
          } else {
            setTimerType(TimerTypes.LONGBREAK);
          }
          break;
        case TimerTypes.SHORTBREAK:
          setSessionsCompleted(sessionsCompleted + 1);
          setTimerType(TimerTypes.FOCUS);
          break;
        case TimerTypes.LONGBREAK:
          setSessionsCompleted(0);
          setTimerType(TimerTypes.FOCUS);
          break;
      }
      props.pauseCallback();
    } else if (Math.ceil(timeLeft / 60) !== time) {
      setTime(Math.ceil(timeLeft / 60));
    }
  }

  function getTimerTypeString(): string {
    switch (timerType) {
      case TimerTypes.FOCUS:
        return "Keep focusing";
      case TimerTypes.SHORTBREAK:
        return "Relax for a bit";
      case TimerTypes.LONGBREAK:
        return "Relax a bit longer";
    }
  }

  function getNextTypeString(): string {
    switch (timerType) {
      case TimerTypes.FOCUS:
        return "Focus";
      case TimerTypes.SHORTBREAK:
        return "Short break";
      case TimerTypes.LONGBREAK:
        return "Long break";
    }
  }

  return (
    <div className={styles.masterContainer}>
      {props.run ? (
        <>
          <h2>{getTimerTypeString()}</h2>
          <h1>{time}</h1>
          <p>{time > 1 ? "minutes remaining" : "minute remaining"}</p>
        </>
      ) : (
        <>
          <h2>Next up: {getNextTypeString()}</h2>
          <p className={styles.ready}>Ready?</p>
        </>
      )}
      <ProgressBar stage={sessionsCompleted + 1} />
      {showExplosion && <Explosion />}
    </div>
  );
}

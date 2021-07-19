import React, { useEffect } from "react"
import styles from "./ScreenStart.module.scss"
import Slider from "../components/Slider"
import logo from "../logo.svg"
import {getItem} from "../utils/storageUtils"
import { useRecoilState } from "recoil"
import { focusValueState, shortBreakValueState, longBreakValueState } from "../App"

export default function ScreenStart() {
  const [focusValue, setFocusValue] = useRecoilState(focusValueState)
  const [shortBreakValue, setShortBreakValue] = useRecoilState(shortBreakValueState)
  const [longBreakValue, setLongBreakValue] = useRecoilState(longBreakValueState)

  useEffect(() => {
    applyInitialSettingsValues()
    requestNotifications()
  }, [])

  function requestNotifications() {
    if (window.Notification) {
      Notification.requestPermission()
    }
  }
  function applyInitialSettingsValues() {
    setFocusValue(parseSetting(getItem("focusLength"), 25))
    setShortBreakValue(parseSetting(getItem("shortBreakLength"), 5))
    setLongBreakValue(parseSetting(getItem("longBreakLength"), 15))
  }
  
  function parseSetting(setting: string | null, defaultSetting: number): number {
    if (setting != null && parseInt(setting)) {
      return parseInt(setting)
    } else {
      return defaultSetting
    }
  }

  return (
    <div className={styles.masterContainer}>
      <img src={logo}/>
      <h2>Avodoro</h2>
      <p className={styles.subtext}>Optimize the focus-break balance to your needs</p>
      <div className={styles.settingsContainer}>
        <Slider title="Focus" value={focusValue} min={1} max={60} callback={setFocusValue}/>
        <Slider title="Short break" value={shortBreakValue} min={1} max={60} callback={setShortBreakValue}/>
        <Slider title="Long break" value={longBreakValue} min={1} max={60} callback={setLongBreakValue}/>
      </div>
    </div>
  )
}

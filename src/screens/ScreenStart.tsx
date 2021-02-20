import React, { useEffect, useState } from "react"
import styles from "./ScreenStart.module.scss"
import Slider from "../components/Slider"
import logo from "../logo.svg"
import {setItem, getItem} from "../utils/storageUtils"

interface ISettings {
  focusLength: number
  shortBreakLength: number
  longBreakLength: number 
}
export default function ScreenStart() {
  const [settingsValues, setSettingsValues] = useState<ISettings>()
  useEffect(() => {
    applySettingsValues()
  }, [])

  function applySettingsValues() {
    setSettingsValues({
      focusLength: parseSetting(getItem("focusLength"), 25),
      shortBreakLength: parseSetting(getItem("shortBreakLength"), 5),
      longBreakLength: parseSetting(getItem("longBreakLength"), 15)
    })
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
      <h2>Adjust your settings</h2>
      <p className={styles.subtext}>Optimize the focus-break balance to your needs</p>
      {settingsValues &&
        <div className={styles.settingsContainer}>
          <Slider title="Focus" default={settingsValues.focusLength} min={1} max={120}/>
          <Slider title="Short break" default={settingsValues.shortBreakLength} min={1} max={120}/>
          <Slider title="Long break" default={settingsValues.longBreakLength} min={1} max={120}/>
        </div>
      }
    </div>
  )
}

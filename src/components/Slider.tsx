import React, { ChangeEvent, CSSProperties, useEffect, useState } from "react"
import styles from "./Slider.module.scss"

interface Props {
  callback: (value: number) => void
  title: string
  value: number
  max: number
  min: number
}

interface CSSStyles {
  input: CSSProperties
  output: CSSProperties
}

export default function Slider(props: Props) {

  const [style, setStyle] = useState<CSSStyles>()
  
  useEffect(() => {
    setProgressStyles()
  }, [props.value])

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    props.callback(e.currentTarget.valueAsNumber)
  }
  function setProgressStyles() {
    const newValue = (props.value - props.min) * 100 / (props.max - props.min)
    setStyle({
      input: {background: `linear-gradient(to right, var(--color-accent), var(--color-accent) ${(props.value-props.min)/(props.max-props.min)*100}%, rgba(var(--color-accent-rgb), 0.5) ${(props.value-props.min)/(props.max-props.min)*100}%,rgba(var(--color-accent-rgb), 0.5) 100%)`},
      output: {left: `calc(${newValue}% + (${14 - newValue * 0.28}px))`}
    })
  }
  return (
    <div className={styles.masterContainer}>
      <div className={styles.titleContainer}>
        <p>{props.title}</p>
        <p>{props.value + " min"}</p>
      </div>
      
      <div className={styles.sliderContainer}>
        <div className={styles.sliderWrapper}>
          <input style={style?.input} type="range" min={props.min} max={props.max} value={props.value} onChange={handleChange} className={styles.slider}/>
          <output style={style?.output} className={styles.bubble}>{props.value}</output>
        </div>
      </div>
    </div>
  )
}

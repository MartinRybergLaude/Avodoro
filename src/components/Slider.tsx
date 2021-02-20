import React, { ChangeEvent, CSSProperties, useEffect, useState } from "react"
import { callbackify } from "util"
import styles from "./Slider.module.scss"

interface Props {
  default: number
  max: number
  min: number
}

interface CSSStyles {
  input: CSSProperties
  output: CSSProperties
}

export default function Slider(props: Props) {

  const [value, setValue] = useState(props.default)
  const [style, setStyle] = useState<CSSStyles>()
  
  useEffect(() => {
    setProgressStyles()
  }, [value])

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setValue(e.currentTarget.valueAsNumber)
  }
  function setProgressStyles() {
    const newValue = (value - props.min) * 100 / (props.max - props.min)
    setStyle({
      input: {background: `linear-gradient(to right, var(--color-primary), var(--color-primary) ${(value-props.min)/(props.max-props.min)*100}%, var(--color-text-secondary) ${(value-props.min)/(props.max-props.min)*100}%, var(--color-text-secondary) 100%)`},
      output: {left: `calc(${newValue}% + (${14 - newValue * 0.28}px))`}
    })
  }
  return (
    <div className={styles.container}>
      <div className={styles.sliderContainer}>
        <input style={style?.input} type="range" min={props.min} max={props.max} value={value} onChange={handleChange} className={styles.slider}/>
        <output style={style?.output} className={styles.bubble}>{value}</output>
      </div>
    </div>
  )
}

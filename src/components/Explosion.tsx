import React, { ReactElement, useEffect, useState } from "react"
import styles from "./Explosion.module.scss"
import logo from "../logo.svg"

interface Props {
  run: number
}

export default function Explosion(props: Props) {

  const [showExplosion, setShowExplosion] = useState(false)

  const particles: Array<ReactElement> = []

  for (let i = 0; i < 20; i++) {
    particles.push(<img key={i} src={logo} className={styles.particle}/>)
  }

  useEffect(() => {
    setShowExplosion(true)
    const timer = setTimeout(() => {
      setShowExplosion(false)
    }, 2000)
    return (() => {
      clearTimeout(timer)
    })
  }, [props.run])
  
  return (
    <div className={styles.masterContainer}>
      {showExplosion && particles}
    </div>
  )
}

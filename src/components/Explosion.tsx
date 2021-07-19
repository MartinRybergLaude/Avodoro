import React, { ReactElement, useEffect, useState } from "react"
import styles from "./Explosion.module.scss"
import logo from "../logo.svg"

export default function Explosion() {

  const particles: Array<ReactElement> = []

  for (let i = 0; i < 20; i++) {
    particles.push(<img key={i} src={logo} className={styles.particle}/>)
  }
  
  return (
    <div className={styles.masterContainer}>
      {particles}
    </div>
  )
}

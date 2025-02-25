import type React from "react"
import styles from "./icon-module.scss"

interface IconItemProps {
  icon: React.ReactNode
  label: string
}

const IconItem: React.FC<IconItemProps> = ({ icon, label }) => {
  return (
    <div className={styles.iconItem}>
      <div className={styles.iconWrapper}>{icon}</div>
      <span className={styles.label}>{label}</span>
    </div>
  )
}

export default IconItem


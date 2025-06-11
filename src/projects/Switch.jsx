import styles from "./Switch.module.css";

export default function Switch({active, onClick}) {
    let backingStyle = active ? styles.on : styles.off

    return <div
        className={styles.switch}
        onClick={onClick}
    >
        <div className={backingStyle + " " + styles.backing}/>
        <div className={styles.knob}/>
    </div>
}
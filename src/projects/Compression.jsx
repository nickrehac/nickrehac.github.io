import styles from "./ProjectPages.module.css";

export default function Compression({devMode}) {
    if(devMode) return <div className={styles.content}>
        PLACEHOLDER
    </div>
    else return <div className={styles.content}>
        <div className={styles.row}>
            <p>
                I wrote this while taking my data structures class
            </p>
        </div>
    </div>
}
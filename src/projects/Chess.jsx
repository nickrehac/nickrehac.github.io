import styles from "./ProjectPages.module.css";

export default function Chess({devMode}) {
    if(devMode) return <div className={styles.content}>
        PLACEHOLDER
    </div>
    else return <div className={styles.content}>
        <div className={styles.row}>
            <p>
                This is a player vs computer chess app I wrote in C++ for windows and linux.
            </p>
        </div>
    </div>
}
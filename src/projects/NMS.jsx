import styles from "./ProjectPages.module.css"

export default function NMS({devMode}) {
    if(devMode) return <div className={styles.content}>
        PLACEHOLDER
    </div>
    else return <div className={styles.content}>
        <div className={styles.row}>
            <p>
                I built this app to help navigate the universe of No Man's Sky, a space exploration game by Hello Games.
                I wrote it for Android after being inspired by a mobile programming class had just taken at the time.
            </p>
        </div>
    </div>
}
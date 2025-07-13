import styles from './TextNotification.module.css';

export default function TextNotification({onClick}) {
    return <div className={styles.textNotification} onClick={onClick}>
        <div className={styles.counterChip}>4</div>
        New Messages
    </div>
}
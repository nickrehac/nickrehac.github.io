import styles from "./NotFoundPage.module.css"

function NotFoundPage() {
    return <div className={styles.notFoundCard + " card"}>
        Page Not Found.
        <br/>
        <br/>
        <a href="/">Go Back</a>
    </div>
}

export default NotFoundPage;
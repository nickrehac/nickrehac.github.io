import styles from "./NotFoundPage.module.css"
import "./main.css"
import { createRoot } from "react-dom/client";

createRoot(document.getElementById('root')).render(
    <div className={styles.notFoundCard + " card"}>
        Page Not Found.
        <br/>
        <br/>
        <a href="/">Go Back</a>
    </div>
)
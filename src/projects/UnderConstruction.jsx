import styles from "./ProjectPages.module.css"
import under_construction from "../assets/under_construction.png";

export default function UnderConstruction() {
    return <div>
        <p>
            Still working on this, please come back later!
        </p>
        <img src={under_construction} alt="under construction"/>
    </div>
}
import styles from "./Homepage.module.css"

import placeholder from "./assets/react.svg"
import Minesweeper from "./minesweeper/Minesweeper.jsx";
import profilePic from "./assets/1000007292.jpg"

const projects = [
    ["Chess", placeholder,"Chess"],
    ["File Compression", placeholder,"Compression"],
    ["AsciiGL", placeholder,"AsciiGL"],
    ["No Man's Sky Companion App", placeholder,"NMS"]
]
function Homepage() {
    return <div className={styles.homepage}>
        <div className={styles.profile}>
            Nicholas Rehac
            <br/>
            <br/>
            <img src={profilePic}/>
        </div>
        <div className={"card " + styles.projectContainer}>
            Projects
            <br/>
            <br/>
            <div>
                { projects.map((it, index) => (
                    <ProjectCard
                        name = { it[0] }
                        img = { it[1] }
                        href = { it[2] }
                        key = { index }
                    />
                ))}
            </div>
        </div>
        <div className={styles.minesweeperContainer}>
            <Minesweeper/>
        </div>
    </div>
}

function ProjectCard({name, img, href}) {
    return <div className={styles.projectCard}>
        <a href={href} className={styles.projectCard}/>
        {name}
        <br/>
        <img src={img} alt="" className={styles.projectCard}/>
    </div>
}

export default Homepage;
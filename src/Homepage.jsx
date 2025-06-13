import styles from "./Homepage.module.css"

import whiteQueen from "./assets/whitequeen.svg"
import NMSLogo from "./assets/NMSLogo.webp"
import fish from "./assets/fish.png"
import compressionLogo from "./assets/compressionLogo.svg"

import profilePic from "./assets/1000007292.jpg"

import ProjectCard from "./projects/ProjectCard";
import {useState} from "react";
import Chess from "./projects/Chess.jsx";
import Compression from "./projects/Compression.jsx";
import AsciiGL from "./projects/AsciiGL.jsx";
import NMS from "./projects/NMS.jsx";
import FluidCanvas from "./FluidCanvas.jsx";
import Minesweeper from "./minesweeper/Minesweeper.jsx";

const projects = [
    ["Chess", whiteQueen, Chess],
    ["File Compression", compressionLogo, Compression],
    ["AsciiGL", fish, AsciiGL],
    ["No Man's Sky Companion App", NMSLogo, NMS]
]
function Homepage() {
    const [hideExtras, setHideExtras] = useState(false)
    const [fluidActive, setFluidActive] = useState(true)

    let fluidElement
    let profileElement
    let minesweeperElement

    if(!hideExtras) {
        fluidElement =

        profileElement = <div className={styles.profile}>
            Nicholas Rehac
            <br/>
            <br/>
            <img src={profilePic}/>
        </div>

        minesweeperElement = <div className={styles.minesweeperContainer}>
            <Minesweeper/>
        </div>
    }

    return <>
        <FluidCanvas active={fluidActive}/>
        <div className={styles.homepage}>
            {profileElement}
            <div className={"card " + styles.projectContainer}>
                Projects
                <br/>
                <br/>
                <div>
                    {projects.map((it, index) => (
                        <ProjectCard
                            name={it[0]}
                            img={it[1]}
                            //open={openProject === index}
                            onUpdate={(state) => {
                                if(state === "opening") {
                                    setFluidActive(false)
                                } else if (state === "open") {
                                    setHideExtras(true)
                                } else if (state === "closing") {
                                    setHideExtras(false)
                                } else if(state === "closed") {
                                    setFluidActive(true)
                                }
                            }}
                            key={index}
                            Content={it[2]}
                        />
                    ))}
                </div>
            </div>
            {minesweeperElement}
        </div>
    </>
}


export default Homepage;
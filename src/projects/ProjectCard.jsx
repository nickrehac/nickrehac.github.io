import styles from "./ProjectCard.module.css";
import {useEffect, useRef, useState} from "react";

const ANIM_DURATION = .75

export default function ProjectCard({name, img, children, onUpdate}) {
    let card = useRef(null);

    let [scaffold, setScaffold] = useState({x: 0, y: 0, width: 0, height: 0})

    function updateScaffold() {
        let bRect = card.current.getBoundingClientRect()
        setScaffold({
            x: bRect.x,
            y: bRect.y,
            width: bRect.width,
            height: bRect.height
        })
    }

    useEffect(updateScaffold, [])

    const [animState, setAnimState] = useState("popIn")

    const open = animState === "open"
    const opening = animState === "opening"
    const closing = animState === "closing"
    const closed = animState === "closed"
    const popIn = animState === "popIn"

    let projectCardStyle = styles.projectCard
    if(closed || popIn) projectCardStyle += " " + styles.projectCardHoverable

    let manualCardStyle = {}
    let manualInnerStyle = {}
    if ((open || opening) && card.current !== null) {
        manualCardStyle = {
            width: "100vw",
            height: "100vh",
            zIndex: 5,
            borderRadius: 0
        }
        if(opening) {
            manualCardStyle = {
                ...manualCardStyle,
                top: -scaffold.y + "px",
                left: -scaffold.x + "px",
                transitionDuration: ANIM_DURATION + "s"
            }
        } else {
            manualCardStyle = {
                ...manualCardStyle,
                position: "fixed",
                top: 0,
                left: 0,
                transitionDuration: "0s"
            }
        }
        manualInnerStyle = {
            width: "100%",
            height: "100%",
        }
    }
    if(closing && card.current !== null) {
        manualCardStyle = {
            position: "fixed",
            top: scaffold.y,
            left: scaffold.x,
            width: scaffold.width,
            height: scaffold.height,
            zIndex: 5,
            transitionDuration: ANIM_DURATION + "s"
        }
    }
    if(closed) {
        manualCardStyle = {
            transitionDuration: "0s"
        }
    }

    let backButton
    if(open) {
        backButton = <button
            className={styles.backButton} onClick={() => {
                updateScaffold()
                setAnimState("closing")
                onUpdate("closing")
                setTimeout(() => {
                    setAnimState("closed")
                }, ANIM_DURATION * 1000)
                setTimeout(updateScaffold, 10)
            }}
        >
            Back
        </button>
    }

    return <div className={styles.projectCardScaffold} ref={card}>
        <div
            className={projectCardStyle}
            onClick={() => { if (closed || popIn) {
                updateScaffold()
                setAnimState("opening")
                onUpdate("opening")
                setTimeout(() => {
                    setAnimState("open")
                    onUpdate("open")
                }, ANIM_DURATION * 1000)
            }}}
            style={manualCardStyle}
        >
            {backButton}
            {name}
            <img src={img} alt=""/>
            <div className={styles.innerContent} style={manualInnerStyle}>
                {children}
            </div>
        </div>
    </div>

}
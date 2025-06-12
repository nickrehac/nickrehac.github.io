import styles from "./ProjectCard.module.css";
import {useEffect, useRef, useState} from "react";
import Switch from "./Switch.jsx";

const ANIM_DURATION = .75

export default function ProjectCard({name, img, Content, onUpdate}) {
    let card = useRef(null);

    let [scaffold, setScaffold] = useState({x: 0, y: 0, width: 0, height: 0})
    const [devMode, setDevMode] = useState(false)

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

    const [animState, setAnimState] = useState("closed")

    const open = animState === "open"
    const opening = animState === "opening"
    const closing = animState === "closing"
    const closed = animState === "closed"
    const reattaching = animState === "reattaching"

    let projectCardStyle = styles.projectCard
    if(closed) projectCardStyle += " " + styles.projectCardHoverable

    let manualCardStyle = {}
    let manualInnerStyle = {}
    if ((open || opening) && card.current !== null) {
        manualCardStyle = {
            fontSize: "xxx-large",
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
                transitionDuration: ANIM_DURATION + "s",
                overflow: "hidden"
            }
            manualInnerStyle = {
                width: "100%",
                height: "100%",
                opacity: 1
            }
        } else {
            manualCardStyle = {
                ...manualCardStyle,
                position: "fixed",
                top: 0,
                left: 0,
                transitionDuration: "0s",
                overflow: "scroll"
            }
            manualInnerStyle = {
                width: "100%",
                height: "fit-content",
                opacity: 1
            }
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
        manualInnerStyle = {
            height: "100%"
        }
    }
    if(reattaching) {
        manualCardStyle = {
            transitionDuration: "0s"
        }
        setTimeout(() => setAnimState("closed"),50)
    }

    let backButton
    let codeSwitch
    if(open) {
        backButton = <button
            className={styles.backButton} onClick={() => {
                updateScaffold()
                setAnimState("closing")
                onUpdate("closing")
                setTimeout(() => {
                    setAnimState("reattaching")
                }, ANIM_DURATION * 1000)
                setTimeout(updateScaffold, 10)
            }}
        >
            Back
        </button>

        codeSwitch = <div className={styles.codeSwitchContainer}>
            Dev Mode:
            <Switch onClick={() => {setDevMode(!devMode)}} active={devMode}/>
        </div>
    }

    return <div className={styles.projectCardScaffold} ref={card}>
        <div
            className={projectCardStyle}
            onClick={() => { if (closed) {
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
            {codeSwitch}
            {name}
            <img src={img} alt=""/>
            <div className={styles.innerContent} style={manualInnerStyle}>
                <Content devMode={devMode}/>
            </div>
        </div>
    </div>

}
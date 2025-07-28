import {StrictMode, useEffect, useState} from 'react'
import { createRoot } from 'react-dom/client'

import styles from "./darling.module.css"
import Phone from "./Phone.jsx";
import TextNotification from "./TextNotification.jsx";

import jigsaw from "./images/jigsaw.png"
import CardOpener from "./CardOpener.jsx";


createRoot(document.getElementById('root')).render(
    <Main/>
)

const NOTIFICATION_DELAY = 2000

function Main() {
    const [showNotification, setShowNotification] = useState(false)
    const [showPhone, setShowPhone] = useState(false)

    useEffect(() => {
        let timoutID = setTimeout(() => {
            setShowNotification(true)
        }, NOTIFICATION_DELAY)

        return () => clearTimeout(timoutID)
    }, []);

    return <>
        {showNotification &&
            <TextNotification onClick={() => setShowPhone(true)}/>
        }

        <div className={styles.sawRant}>
            HAPPY BIRTHDAY MY LOVE!
            <br/>
            I HAVE SOME GAMES FOR YOU TO PLAY
            <br/>
            MUAHHAHAHAHAHAHAHA
            <br/>
            <img className={styles.jigsaw} src={jigsaw} alt="jigsaw"/>
        </div>

        <CardOpener/>

        shazam

        {showPhone && <Phone onClose={() => setShowPhone(false)}/>}
    </>
}

/*
* favorite pics
* favorite moments
*
* 8-ball
*
* celebrity texts
* kiya photocard opener
* kiss-a-kiya
*
* billie
* skz
* faye
* */
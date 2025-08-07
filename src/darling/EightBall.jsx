import {useEffect, useState} from "react";

import styles from "./EightBall.module.css"

const questions = [
    ["Who is the prettiest girl in the world?", "Kiya"],
    ["Who does Nick love the most (even more than his mom!)", "Kiya"],
    ["Does Nick love Kiya the most?", "Yes"],
    ["Does Kiya love Nick the mostest?", "Maybe"],
    ["Should Kiya ever stop yapping?", "No"],
    ["Will Kiya and Nick live together with two kids, a dog, and a cat in a few years?", "Yes"],
    ["Will Miguel propose to Kiya?", "No"],
    ["","Nick"],
    ["","Nick"],
]

function randomPair() {
    return questions[Math.floor(questions.length * Math.random())]
}

const SPIN_TIME = 3000
const SPIN_SPEED = 5

export default function EightBall() {
    const [spinning, setSpinning] = useState(false)
    const [pair, setPair] = useState(() => {
        let newPair
        while((newPair = randomPair())[0] === "");
        return newPair
    })
    const [answer, setAnswer] = useState(null)

    function newQuestion() {
        let newPair = pair
        while(newPair === pair || newPair[0] === "") newPair = randomPair()
        setPair(newPair)
        setAnswer(null)
    }

    useEffect(() => {
        if(spinning) {
            const spinInterval = setInterval(() => {
                setAnswer(randomPair()[1])
            }, 1000 / SPIN_SPEED)

            setTimeout(() => {
                setSpinning(false)
                setAnswer(pair[1])
                clearInterval(spinInterval)
            }, SPIN_TIME)
        }
    }, [spinning, pair]);

    let activeStyle = null
    if(spinning) activeStyle = styles.inactive
    else activeStyle = styles.active

    return <div className={styles.eightBall}>
        <h3>Eight Ball</h3>
        <div onClick={!spinning && newQuestion} className={styles.newQuestion + " " + activeStyle}>
            New Question
        </div>
        <div className={styles.question}>
            {pair[0]}
        </div>
        {answer &&
            <div className={styles.answer + " " + (spinning && styles.wiggle)}>
                {answer}
            </div>
        }
        <div onClick={!spinning && (() => setSpinning(true))} className={styles.getAnswer + " " + activeStyle}>
            Get Answer
        </div>
    </div>
}
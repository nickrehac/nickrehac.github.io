import {useEffect, useRef, useState} from "react";

import styles from "./KissKiya.module.css"

import kiyaFace from "./images/pout.jpg"
import kiss from "./images/kiss.png"

function dist(a, b) {
    let x = b[0] - a[0]
    let y = b[1] - a[1]
    return Math.sqrt(x*x + y*y)
}

const DAMPING = 1
const CENTER_STRENGTH = 10
const PUSH_STRENGTH = 0.5

export default function KissKiya() {
    const [kiyaPos, setKiyaPos] = useState([0,0])
    const kiyaVelocity = useRef([0,0])
    const mousePos = useRef([0,0])
    const container = useRef(null)
    const kiyaRef = useRef(null)
    const kissRef = useRef(null)

    useEffect(() => {
        if(!container.current || !kiyaRef.current) return



        let containerRef = container.current

        let containerBox = container.current.getBoundingClientRect()
        let containerWidth = containerBox.width
        let containerHeight = containerBox.height

        setKiyaPos(pos => {
            if(pos[0] === 0 && pos[1] === 0) {
                return [containerWidth/2, containerHeight/2]
            } else return pos
        })
        if(mousePos.current && mousePos.current[0] === 0 && mousePos.current[1] === 0) {
            mousePos.current = [containerWidth/2, containerHeight/2]
        }


        let timer = setInterval(() => {
            if(mousePos.current[0] === 0 && mousePos.current[1] === 0) return;

            setKiyaPos((pos) => {
                let dTime = 0.05
                let centerDist = dist([containerWidth/2, containerHeight/2], pos)
                if(centerDist === 0) centerDist = 1
                let pushDist = dist(mousePos.current, pos)
                if(isNaN(pushDist) || pushDist === 0) pushDist = 1
                let centeringForce = Math.pow(2 * centerDist / containerWidth, 2) * CENTER_STRENGTH * containerWidth
                let pushForce = containerWidth/Math.pow(pushDist/containerWidth,2) * PUSH_STRENGTH


                let pushDirection = [
                    (pos[0] - mousePos.current[0]) / pushDist,
                    (pos[1] - mousePos.current[1]) / pushDist,
                ]

                let centerDirection = [
                    (containerWidth/2-pos[0]) / centerDist,
                    (containerHeight/2-pos[1]) / centerDist
                ]

                let force = [
                    centeringForce* centerDirection[0] + pushDirection[0] * pushForce,
                    centeringForce* centerDirection[1] + pushDirection[1] * pushForce
                ]

                let dampingTerm = (1-DAMPING*dTime)

                kiyaVelocity.current = [
                    kiyaVelocity.current[0] * dampingTerm + force[0] * dTime,
                    kiyaVelocity.current[1] * dampingTerm + force[1] * dTime
                ]

                return [
                    pos[0] + kiyaVelocity.current[0] * dTime,
                    pos[1] + kiyaVelocity.current[1] * dTime,
                ]
            })
        }, 50)

        let onMouseMove = function(e) {
            if(!container.current) return;

            let containerBox = container.current.getBoundingClientRect()

            let newX = e.clientX - containerBox.x
            let newY = e.clientY - containerBox.y
            if(newY <= containerBox.height && newX <= containerBox.width && newY >= 0 && newX >= 0) {
                mousePos.current = [newX, newY]
            }

            e.stopPropagation()
        }

        containerRef.addEventListener("mousemove", onMouseMove)

        return () => {
            containerRef.removeEventListener("mousemove", onMouseMove)
            clearInterval(timer)
        }

    }, []);

    let kiyaWidth = 0
    let kiyaHeight = 0

    if(kiyaRef.current) {
        let kiyaBox = kiyaRef.current.getBoundingClientRect()
        kiyaWidth = kiyaBox.width
        kiyaHeight = kiyaBox.height
    }

    let kissWidth = 0
    let kissHeight = 0

    if(kissRef.current) {
        let kissBox = kissRef.current.getBoundingClientRect()
        kissWidth = kissBox.width
        kissHeight = kissBox.height
    }

    return <div className={styles.kissKiyaContainer}>
        Kiss Kiya !!
        <div className={styles.kissKiya} ref={container}>
            <img className={styles.kissCursor}
                 ref={kissRef}
                 src={kiss}
                 style={{top: mousePos.current[1] - kissHeight / 2, left: mousePos.current[0] - kissWidth / 2}}
            />
            <img src={kiyaFace}
                 className={styles.kiya}
                 style={{top: kiyaPos[1] - kiyaHeight / 2, left: kiyaPos[0] - kiyaWidth / 2}}
                 ref={kiyaRef}
            />
        </div>
    </div>
}
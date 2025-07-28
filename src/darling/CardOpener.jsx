import styles from "./CardOpener.module.css"
import {useEffect, useRef, useState} from "react";

import placeholder from "./messageImages/arianacake.jpg"

import ferriswheel from "./images/ferriswheel.jpg"
import fisheye from "./images/fisheye.jpg"
import newplace from "./images/newplace.jpg"
import newyork from "./images/newyork.jpg"
import partygirl from "./images/partygirl.jpg"
import pout from "./images/pout.jpg"
import pout2 from "./images/pout2.jpg"
import theOG from "./images/theOG.jpg"

const cards = [
    {
        name: "Ferris Kiya",
        image: ferriswheel
    },
    {
        name: "Fisheye Kiya",
        image: fisheye
    },
    {
        name: "Move-In Kiya",
        image: newplace
    },
    {
        name: "New York Fashion Kiya",
        image: newyork
    },
    {
        name: "Party Girl Kiya",
        image: partygirl
    },
    {
        name: "Nerdy Pout Kiya",
        image: pout
    },
    {
        name: "Pout Kiya",
        image: pout2
    },
    {
        name: "My Kiya <3",
        image: theOG
    }
]

for(let i = 0; i < cards.length; i++) {
    let cur = cards[i]
    let rnd = Math.floor(Math.random() * cards.length)

    cards[i] = cards[rnd]
    cards[rnd] = cur
}

export default function CardOpener() {
    const [revealedCards, setRevealedCards] = useState(0)

    function nextCard() {
        setRevealedCards((a) => a+1)
    }


    return <div className={styles.cardOpener}>
        <div className={styles.cardCollection}>
            {cards.map((card, i) => {
                let revealed = i < revealedCards

                if(i > revealedCards) return null

                return <Card
                    name={card.name}
                    image={card.image}
                    rarity={card.rarity}
                    flipped={!revealed}
                    key={i}
                />
            })}
        </div>
        { (cards.length !== revealedCards) &&
            <div onClick={nextCard} className={styles.cardButton}>
                REVEAL!
            </div>
        }
    </div>
}

function Card({image, name, rarity, flipped}) {
    let backStyle = styles.card
    if(flipped) backStyle = backStyle + " " + styles.flipped

    return <div className={backStyle}>
        <div className={styles.cardFront}>
            <img src={image}/>
            <br/>
            {name}
            <br/>
            {rarity}
        </div>
        <div className={styles.cardBack}>
            KIYA KARDS
        </div>
    </div>
}
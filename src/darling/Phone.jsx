import styles from "./Phone.module.css"
import {useContext, useEffect, useState} from "react";
import arianaCake from "./messageImages/arianacake.jpg"
import arianaFace from "./messageImages/arianaFace.jpg"
import beyCake from "./messageImages/beyonceCake.webp"


const chats = [
    {
        name: "Queen Bey",
        pic: arianaFace,
        messages: [
            "Happy Birthday to my girl Kiya!",
            [<img src={beyCake}/>, "Make a wish!"]
        ],
        visibleMessages: []
    },
    {
        name: "Ari",
        pic: arianaFace,
        messages: [
            "Happy Birthday to my favorite girl in the world!",
            "God is a woman",
            "but girl ur a goddess",
            [<img src={arianaCake}/>, "My honest reaction to it being ur birthday"],
            "What's wrong with a little bit of poison? Get crunk tonight!"
        ],
        visibleMessages: []
    },
    {
        name: "Harry",
        pic: arianaFace,
        messages: [
            "Oi oi oi its me harry styles"
        ],
        visibleMessages: []
    },
    {
        name: "",
        pic: arianaFace,
        messages: [],
        visibleMessages: []
    }
]


export default function Phone() {

    const [openChat, setOpenChat] = useState(null)

    let screenContent

    let mobileMode = false

    if (openChat !== null) screenContent = <ChatPage chat={openChat} onClose={() => setOpenChat(null)}/>
    else screenContent = <ListPage onClick={(m) => setOpenChat(m)}/>

    if (mobileMode) return <div className={styles.screen}>
        {screenContent}
    </div>
    else return <div className={styles.phoneModal}>
        <div className={styles.deviceBorder1}>
            <div className={styles.deviceBorder2}>
                <div className={styles.screen}>
                    {screenContent}
                </div>
            </div>
        </div>
    </div>

}

function ChatListing({chat, onClick}) {
    return <div className={styles.chatListing} onClick={() => onClick(chat)}>
        <div className={styles.chatImage}>
            <img src={chat.pic}/>
        </div>
        <div className={styles.chatPreviewText}>
            {chat.name}
            <br/>
            <div className={styles.preview}>1 New Message</div>
        </div>
        <div>
            &gt;
        </div>
    </div>
}

function ListPage({onClick}) {
    return <div className={styles.chatList}>
        <div className={styles.listPageTitle}>
            Messages
        </div>

        {chats.map((chat, index) =>
            <ChatListing
                chat={chat}
                onClick={onClick}
                key={index}
            />
        )}
    </div>
}

function Message({message}) {
    if(Array.isArray(message)) return message.map((message) => <Message
        key={message}
        message={message}
    />)

    if(typeof message !== "string") return <div className={styles.messageRow}>
        <div className={styles.messageImage}>{message}</div>
    </div>

    return <div className={styles.messageRow}>
        <div className={styles.message}>
            {message}
        </div>
    </div>
}

function ChatPage({chat, onClose}) {
    const [dummy, setDummy] = useState(0)

    let nextMessage = function() {
        if(chat.messages.length === chat.visibleMessages.length) return

        chat.visibleMessages.push(chat.messages[chat.visibleMessages.length])
        setDummy(dummy+1)
    }

    useEffect(() => {
        let timeout
        if(dummy === 0) timeout = 20
        else if(dummy === 1) timeout = 700
        else timeout = 1000 + 1000*Math.random()

        let timer = setTimeout(nextMessage, timeout)
        return () => clearTimeout(timer)
    }, );


    return <div className={styles.chatPage}>
        <div className={styles.chatHeader}>
            <div className={styles.chatBackButton} onClick={onClose}>&lt;</div>
            <div className={styles.chatImage}>
                <img src={chat.pic}/>
            </div>
            {chat.name}
        </div>
        <div className={styles.messageField}>
            {chat.visibleMessages.map((message) => <Message
                message={message}
                key={message}
            />)}
        </div>
    </div>
}